 var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _piwik_cvalue='';


  (function() {
    var l=document.getElementsByTagName('noscript')[0].getAttribute("src");
    var u=l.substring(0,l.indexOf('?'))+'/';
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', l.substring(l.indexOf('?')+8,l.indexOf('&'))]);
    var cname=l.substring(l.indexOf('&')+10,l.length)+'=';
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            _piwik_cvalue= c.substring(cname.length, c.length);
            break;
        }
    }
    var removedKeys = new Array();
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf("oocl_piwik") ==0){
          removedKeys.push(localStorage.key(i));
      }
    }
    for(var i=0;i<removedKeys.length;i++){
      localStorage.removeItem(removedKeys[i]);
    }
  })();

var oocl_piwik_bfName=null;
var oocl_piwik_customUrl=null;
window.addEventListener('hashchange', function() {
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

if(typeof oocl_piwik==='undefined'){oocl_piwik={};}

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

        return  'oocl_piwik'+'-'+part1 + '-' + part2 + '-' + part3 + '-' + part4;
    };

    this._random4Bits = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
    };
};
oocl_piwik.uuid= new oocl_piwik.UUID();
oocl_piwik.Common = function(){};
oocl_piwik.Common = function(){
  this._isExt = function(){
    if(typeof Ext =='undefined'){
      return false;
    }

    return true;
  };
  this._setCatHeader = function(bfName){
  	if(oocl_piwik_common._isExt()){
  	  Ext.Ajax.defaultHeaders = {
          'cat_url':bfName
  	  };
  	}
  	if(oocl_piwik_common._isAngular()){
  	  angular.module('cmcd').run(function($http) {
  		$http.defaults.headers.common['cat_url'] = bfName;
  	  });
  	}
  };
   this._setPiwikHeader = function(uuid){
  	if(oocl_piwik_common._isExt()){
  	  Ext.Ajax.defaultHeaders = {
          'piwik_uuid':uuid
  	  };
  	}
  	if(oocl_piwik_common._isAngular()){
  	  angular.module('cmcd').run(function($http) {
  		$http.defaults.headers.common['piwik_uuid'] = uuid;
  	  });
  	}
  };
  this._isAngular = function(){
    if(typeof angular =='undefined'){
      return false;
    }
    return true;
  };

  this._getDocTitile = function(){
    if(oocl_piwik_common._isAngular()){
      return window.location.hash.substr(1).replace('!/','')
    }
    return document.title;
  };

  this._getCustomUrl = function(){
    if(oocl_piwik_common._isAngular()){
      return window.location.hash.substr(1).replace('!/','')
    }
    return window.location.href;
  };
};
oocl_piwik_common= new oocl_piwik.Common();
oocl_piwik.Tracker = function(){};
oocl_piwik.Tracker = function(){
this.setupContext  = function(bfName){
  	oocl_piwik_bfName=bfName;
    oocl_piwik_customUrl=bfName;
  }
this._clearContext =function(){
	oocl_piwik_bfName=null;
	oocl_piwik_customUrl=null;
}
  this._createContext = function(){
    var context = new oocl_piwik.Context(oocl_piwik_bfName,oocl_piwik_customUrl);
    var uuid = oocl_piwik.uuid.generateUUID();
    localStorage.setItem(uuid, JSON.stringify(context));
    oocl_piwik_common._setCatHeader(oocl_piwik_bfName)
    return uuid;
  };
  this._startTiming = function(uuid){
    var context = JSON.parse(localStorage.getItem(uuid));
    if(context===null){
      return;
    }
    context.startTime=new Date();
    localStorage.setItem(uuid, JSON.stringify(context));
  };
  this._endTiming = function(uuid){
    var context = JSON.parse(localStorage.getItem(uuid));
    if(context===null){
      return;
    }
    context.endTime=new Date();
    context.startTime= new Date(context.startTime);

    _paq.push(['setCustomUrl','/', context.customUrl]);
    _paq.push(['setDocumentTitle', context.bfName]);
    _paq.push(['setGenerationTimeMs', context.endTime.getTime()-context.startTime.getTime()]);
	_paq.push(['setUserId', _piwik_cvalue]);
    _paq.push(['trackPageView']);
    localStorage.removeItem(uuid);
  }
};
oocl_piwik_tracker= new oocl_piwik.Tracker();

oocl_piwik.Context= function(bfName,customUrl){
  if(bfName==undefined){
    this.bfName=oocl_piwik_common._getDocTitile()
  }else{
    this.bfName=bfName;
  }
  oocl_piwik_bfName=this.bfName;

  if(customUrl==undefined){
    this.customUrl=oocl_piwik_common._getCustomUrl()
  }else{
    this.customUrl=customUrl;
  }
  oocl_piwik_customUrl=this.customUrl;

}


//http://www.angulartutorial.net/2014/05/set-headers-for-all-http-calls-in.html
//http://stackoverflow.com/questions/26111734/how-to-set-common-request-headers-for-every-ajax-request-in-ext5
