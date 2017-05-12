function DataTable_RowActions_CatChain(dataTable) {
    this.dataTable = dataTable;
}

DataTable_RowActions_CatChain.prototype = new DataTable_RowAction();

DataTable_RowActions_CatChain.isPageUrlReport = function (module, action) {
    return false;
};

DataTable_RowActions_CatChain.isPageTitleReport = function (module, action) {
    return true;
};

DataTable_RowActions_CatChain.registeredReports = [];
DataTable_RowActions_CatChain.registerReport = function (handler) {
    DataTable_RowActions_CatChain.registeredReports.push(handler);
}

DataTable_RowActions_CatChain.prototype.performAction  = function (label, tr, e) {
  var separator = ' > '; // LabelFilter::SEPARATOR_RECURSIVE_LABEL
   var labelParts = label.split(separator);
   for (var i = 0; i < labelParts.length; i++) {
       var labelPart = labelParts[i].replace('@', '');
       labelParts[i] = $.trim(decodeURIComponent(labelPart));
   }
   label = labelParts.join(piwik.config.action_url_category_delimiter);
   var date = piwik.currentDateString.replace('-','').replace('-','');
   var period = piwik.period;
   var link = CatChain_Helper.getCatLink(this.dataTable.param.idSite, period,date,label);
   DataTable_RowActions_CatChain.prototype.openPopover.apply(this, [link]);
};

DataTable_RowActions_CatChain.prototype.doOpenPopover = function (urlParam) {
  params = urlParam.substring(urlParam.indexOf('&domain='),urlParam.length);
  var link ='http://localhost:8080/cat/r/chain?op=history'+params;
  window.open(link, "_blank");
};




DataTable_RowActions_Registry.register({
    name: 'CatChain',

    dataTableIcon: 'plugins/CatChain/images/catchain_icon.png',
    dataTableIconHover: 'plugins/CatChain/images/catchain_icon_hover.png',

    order: 70,

    dataTableIconTooltip: [
      'CAT Chain',
      'Cat Call Chain view'
    ],

    createInstance: function (dataTable) {
        return new DataTable_RowActions_CatChain(dataTable);
    },

    isAvailableOnReport: function (dataTableParams) {
        if('getPageTitles'===dataTableParams.action){
          return true;
        }

        return false;
    },

    isAvailableOnRow: function (dataTableParams, tr) {
        if (tr.hasClass('subDataTable')) {
            return false;
        }
        return true;
    }

});
