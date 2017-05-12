
Ext.Ajax.on("beforerequest", function(conn, options){
	//oocl_piwik_tracker.setupContext('search/userids');
	var piwik_uuid=oocl_piwik_tracker._createContext();
	oocl_piwik_common._setPiwikHeader(piwik_uuid);
	oocl_piwik_tracker._clearContext();
	oocl_piwik_tracker._startTiming(piwik_uuid);
});
Ext.Ajax.on("requestcomplete",function(conn, response, options){
	oocl_piwik_tracker._endTiming(options.headers.piwik_uuid);
});
Ext.Ajax.on("requestexception",function(conn, response, options){
	oocl_piwik_tracker._endTiming(options.headers.piwik_uuid);
});
