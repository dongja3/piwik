function DataTable_RowActions_CatChain(dataTable) {
    this.dataTable = dataTable;
}

DataTable_RowActions_CatChain.prototype = new DataTable_RowAction;

DataTable_RowActions_CatChain.registeredReports = [];
DataTable_RowActions_CatChain.registerReport = function (handler) {
    console.info('DataTable_RowActions_CatChain.registerReport ');
    DataTable_RowActions_CatChain.registeredReports.push(handler);
}


DataTable_RowActions_CatChain.prototype.onClick = function (actionA, tr, e) {
     var label=this.getAllLevelLabelsFromTr(tr);
     var date = piwik.currentDateString.replace('-','').replace('-','');
     var period = piwik.period;
     var catlink = CatChain_Helper.getCatLink(this.dataTable.param.idSite, period,date,label);
     catlink ='http://localhost:8080/cat/r/chain?op=history'+catlink;
  actionA.attr({
      target: '_blank',
      href: catlink
  });
    return true;
};

DataTable_RowActions_CatChain.prototype.getAllLevelLabelsFromTr=function(tr){
    var allClasses = tr.attr('class');
    var matches = allClasses.match(/level[0-9]+/);
    var level = parseInt(matches[0].substring(5, matches[0].length), 10);
    var label = this.getLabelFromTr(tr).replace('@','');
    while (level>0){
        var findLevel = 'level' + (level - 1);
        var ptr = tr;
        while ((ptr = ptr.prev()).size() > 0) {
            if (!ptr.hasClass(findLevel) || ptr.hasClass('nodata')) {
                continue;
            }
            var t = this.getLabelFromTr(ptr).replace('@','');
            label = t+"/"+label;
            break;
        }
        level--;
    }
    return label;
}

DataTable_RowActions_Registry.register({
    name: 'CatChain',

    dataTableIcon: 'plugins/CatChain/images/catchain_icon.png',
    dataTableIconHover: 'plugins/CatChain/images/catchain_icon_hover.png',

    order: 20,

    dataTableIconTooltip: [
      'CAT Chain',
      'Cat Call Chain view'
    ],

    createInstance: function (dataTable) {
        return new DataTable_RowActions_CatChain(dataTable);
    },

    isAvailableOnReport: function (dataTableParams) {
        if('getPageTitles'===dataTableParams.action){
          if('day'==piwik.period||'month'==piwik.period||'week'==piwik.period)
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
