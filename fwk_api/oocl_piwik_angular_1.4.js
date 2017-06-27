var oocl_piwik_interceptor = function ($q) {
  return {
    request: function (config) {
      for (var i = 0; i < oocl_piwik_config.piwik_sites.length; i++) {
        if (window.location.href.indexOf(oocl_piwik_config.piwik_sites[i].url) != -1) {
          if (!oocl_piwik_config.piwik_sites[i].canIgnoreRequest || !oocl_piwik_config.piwik_sites[i].canIgnoreRequest(config)) {
            var bfname = oocl_piwik_common._ignoreServicePrefix(config.url);
            oocl_piwik_tracker.setupContext(bfname);
            var piwik_uuid = oocl_piwik_tracker._createContext();
            // oocl_piwik_common._setPiwikHeader(piwik_uuid);
            config.headers['piwik_uuid'] = piwik_uuid;
            config.headers['cat_url'] = bfname;
            oocl_piwik_tracker._startTiming(piwik_uuid);
          }
          break;
        }
      }
      return config;
    },

    requestError: function (err) {
      oocl_piwik_tracker._endTiming(err.config.headers.piwik_uuid, err.config.headers.cat_url);
      return $q.reject(err);
    },

    response: function (result) {
      oocl_piwik_tracker._endTiming(result.config.headers.piwik_uuid, result.config.headers.cat_url);
      return result;
    },

    responseError: function (rejection) {
      oocl_piwik_tracker._endTiming(rejection.config.headers.piwik_uuid, rejection.config.headers.cat_url);
      return $q.reject(rejection);
    }
  }
};

oocl_piwik_tracker.setInterceptor = function (module) {
  if (!module) {
    return;
  }
  module.config(function ($httpProvider) {
    $httpProvider.interceptors.push(oocl_piwik_interceptor);
  });
}