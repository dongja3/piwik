var oocl_piwik_interceptor = function ($q) {
  return {
    request: function (config) {
      var bfname = oocl_piwik_common._ignoreServicePrefix(config.url);
      oocl_piwik_tracker.setupContext(bfname);

      var piwik_uuid = oocl_piwik_tracker._createContext();
      // oocl_piwik_common._setPiwikHeader(piwik_uuid);
      config.headers['piwik_uuid'] = piwik_uuid;
      oocl_piwik_tracker._startTiming(piwik_uuid);
      return config;
    },

    response: function (result) {
      oocl_piwik_tracker._endTiming(result.config.headers.piwik_uuid, result.config.headers.cat_uri);
      return result;
    },

    responseError: function (rejection) {
      oocl_piwik_tracker._endTiming(rejection.config.headers.piwik_uuid, rejection.config.headers.cat_uri);
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