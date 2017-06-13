var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
_piwik_cvalue = '';


(function () {

  var i;
  var my_url;
  var callback;
  var cname;
  for (i = 0; i < oocl_piwik_config.piwik_sites.length; i++) {
    my_url = oocl_piwik_config.piwik_sites[i].url;
    callback = oocl_piwik_config.piwik_sites[i].cookieid_callback;
    if (window.location.href.indexOf(my_url) != -1) {
      var u = oocl_piwik_config.piwik_sites[i].piwik_url + '/';
      _paq.push(['setTrackerUrl', u + 'piwik.php']);
      _paq.push(['setSiteId', oocl_piwik_config.piwik_sites[i].siteId]);
      if (callback && typeof (callback) === "function") {
        cname = callback();
      } else {
        cname = oocl_piwik_config.piwik_sites[i].cookieid + '=';
      }
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'piwik.js'; s.parentNode.insertBefore(g, s);
      break;
    }
  }

  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      _piwik_cvalue = c.substring(cname.length, c.length);
      break;
    }
  }
  var removedKeys = new Array();
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf("oocl_piwik") == 0) {
      removedKeys.push(localStorage.key(i));
    }
  }
  for (var i = 0; i < removedKeys.length; i++) {
    localStorage.removeItem(removedKeys[i]);
  }
})();

var oocl_piwik_bfName = null;
var oocl_piwik_customUrl = null;
window.addEventListener('hashchange', function () {
  _paq.push(['deleteCustomVariables', 'page']);
  _paq.push(['setUserId', _piwik_cvalue]);
  _paq.push(['setReferrerUrl', window.location.href]);
  // make Piwik aware of newly added content
  var content = document.getElementById('content');
  _paq.push(['MediaAnalytics::scanForMedia', content]);
  _paq.push(['FormAnalytics::scanForForms', content]);
  _paq.push(['trackContentImpressionsWithinNode', content]);
  _paq.push(['enableLinkTracking']);
});

if (typeof oocl_piwik === 'undefined') { oocl_piwik = {}; }

oocl_piwik.UUID = function () {

  this.generateUUID = function () {
    return this._createUUID();
  };

  this._createUUID = function () {
    var utcStart = new Date(1582, 10, 15, 0, 0, 0, 0).getTime();
    var current = new Date().getTime();
    var time = (utcStart < 0) ? Math.abs(utcStart) + current : current - utcStart;
    var timeStr = time.toString(16).toLocaleUpperCase();

    var part1 = timeStr.substr(0, 8);
    var part2 = timeStr.substr(8, timeStr.length);
    while (part2.length < 4) {
      part2 = part2 + '0';
    }
    var part3 = this._random4Bits();
    var part4 = this._random4Bits() + this._random4Bits();

    return 'oocl_piwik' + '-' + part1 + '-' + part2 + '-' + part3 + '-' + part4;
  };

  this._random4Bits = function () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
  };
};
oocl_piwik.uuid = new oocl_piwik.UUID();
oocl_piwik.Common = function () { };
oocl_piwik.Common = function () {
  this._isExt = function () {
    if (typeof Ext == 'undefined') {
      return false;
    }

    return true;
  };
  this._setCatHeader = function (bfName) {
    if (oocl_piwik_common._isExt()) {
      Ext.Ajax.defaultHeaders = {
        'cat_uri': bfName
      };
    }
    // if(oocl_piwik_common._isAngular()){
    //   angular.module('cmcd').run(function($http) {
    // 	$http.defaults.headers.common['cat_uri'] = bfName;
    //   });
    // }

  };
  this._setPiwikHeader = function (uuid) {
    if (oocl_piwik_common._isExt()) {
      Ext.Ajax.defaultHeaders = {
        'piwik_uuid': uuid
      };
    }
    // if(oocl_piwik_common._isAngular()){
    //   angular.module('cmcd').run(function($http) {
    // 	$http.defaults.headers.common['piwik_uuid'] = uuid;
    //   });
    // }

  };
  this._isAngular = function () {
    if (typeof angular == 'undefined') {
      return false;
    }
    return true;
  };

  this._getDocTitle = function () {
    if (oocl_piwik_common._isAngular()) {
      var url = window.location.hash.substr(1).replace('!/', '');
      return oocl_piwik_common._ignoreServicePrefix(url);
    }
    return document.title;
  };

  this._getCustomUrl = function () {
    if (oocl_piwik_common._isAngular()) {
      var url = window.location.hash.substr(1).replace('!/', '');
      return oocl_piwik_common._ignoreServicePrefix(url);
    }
    var url = window.location.href;
    return oocl_piwik_common._ignoreServicePrefix(url);
  };

  this._ignoreServicePrefix = function (url) {
    var customUrl = url;
    // if (oocl_piwik_config.ignoreServicePrefix.length != 0) {
    //   var i;
    //   var ignoreUrl;
    //   for (i = 0; i < oocl_piwik_config.ignoreServicePrefix.length; i++) {
    //     ignoreUrl = oocl_piwik_config.ignoreServicePrefix[i];
    //     if (customUrl.indexOf(ignoreUrl) != -1) {
    //       customUrl = customUrl.substring(customUrl.indexOf(ignoreUrl) + ignoreUrl.length, customUrl.length);
    //       break;
    //     }
    //   }
    // }
    if (customUrl.indexOf('//') != -1) {
      customUrl = customUrl.substring(customUrl.indexOf('//')+2,url.length);
    }
    if (customUrl.indexOf('/') != -1) {
      customUrl = customUrl.substring(customUrl.indexOf('/'),url.length);
    }
    if (customUrl.indexOf('?') != -1) {
      customUrl = customUrl.substring(0, customUrl.indexOf('?'));
    }
    return customUrl;
  }
};
oocl_piwik_common = new oocl_piwik.Common();
oocl_piwik.Tracker = function () { };
oocl_piwik.Tracker = function () {
  this.setupContext = function (bfName) {
    oocl_piwik_bfName = bfName;
    oocl_piwik_customUrl = bfName;
  }
  this._clearContext = function () {
    oocl_piwik_bfName = null;
    oocl_piwik_customUrl = null;
  }
  this._createContext = function () {
    var context = new oocl_piwik.Context(oocl_piwik_bfName, oocl_piwik_customUrl);
    var uuid = oocl_piwik.uuid.generateUUID();
    localStorage.setItem(uuid, JSON.stringify(context));
    oocl_piwik_common._setCatHeader(oocl_piwik_bfName);
    this._clearContext();
    return uuid;
  };
  this._startTiming = function (uuid) {
    var context = JSON.parse(localStorage.getItem(uuid));
    if (context === null) {
      return;
    }
    context.startTime = new Date();
    localStorage.setItem(uuid, JSON.stringify(context));
  };
  this._endTiming = function (uuid, bfName) {
    var context = JSON.parse(localStorage.getItem(uuid));
    if (context === null) {
      return;
    }
    context.endTime = new Date();
    context.startTime = new Date(context.startTime);
    _paq.push(['setCustomUrl', context.customUrl]);


    //For Cat case which will return business function name in response
    if (typeof (bfName) === 'undefined' || bfName === null || bfName.length === 0) {
      _paq.push(['setDocumentTitle', context.bfName]);
    } else {
      _paq.push(['setDocumentTitle', bfName]);
    }
    _paq.push(['setGenerationTimeMs', context.endTime.getTime() - context.startTime.getTime()]);
    _paq.push(['setUserId', _piwik_cvalue]);
    _paq.push(['trackPageView']);
    localStorage.removeItem(uuid);
  }
};
oocl_piwik_tracker = new oocl_piwik.Tracker();

oocl_piwik.Context = function (bfName, customUrl) {
  if (bfName == undefined) {
    this.bfName = oocl_piwik_common._getDocTitle()
  } else {
    this.bfName = bfName;
  }
  oocl_piwik_bfName = this.bfName;

  if (customUrl == undefined) {
    this.customUrl = oocl_piwik_common._getCustomUrl()
  } else {
    this.customUrl = customUrl;
  }
  oocl_piwik_customUrl = this.customUrl;
}


//http://www.angulartutorial.net/2014/05/set-headers-for-all-http-calls-in.html
//http://stackoverflow.com/questions/26111734/how-to-set-common-request-headers-for-every-ajax-request-in-ext5
