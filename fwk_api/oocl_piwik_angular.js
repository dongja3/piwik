var app = angular.module('my-app', [], function() {})

var interceptor = function($q, $location) {
  return {
    request: function(config) {
      var piwik_uuid=oocl_piwik_tracker._createContext();
      // oocl_piwik_common._setPiwikHeader(piwik_uuid);
      config.headers['piwik_uuid']=piwik_uuid;
      oocl_piwik_tracker._startTiming(piwik_uuid);
      return config;
    },

    response: function(result) {
      oocl_piwik_tracker._endTiming(result.config.headers.piwik_uuid,result.config.headers.cat_uri);
      return result;
    },

    responseError: function(rejection) {
      oocl_piwik_tracker._endTiming(rejection.config.headers.piwik_uuid,rejection.config.headers.cat_uri);
      return $q.reject(rejection);
    }
  }
};

app.config(function($httpProvider) {
  $httpProvider.interceptors.push(interceptor);
});