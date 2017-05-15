/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

var CatChain_Helper = {

    /** Encode the iframe url to put it behind the hash in sidebar mode */
    encodeFrameUrl: function (url) {
        // url encode + replace % with $ to make sure that browsers don't break the encoding
        return encodeURIComponent(url).replace(/%/g, '$')
    },

    /** Decode the url after reading it from the hash */
    decodeFrameUrl: function (url) {
        // reverse encodeFrameUrl()
        return decodeURIComponent(url.replace(/\$/g, '%'));
    },

    /** Get the url to launch overlay */
    getCatLink: function (idSite, period, date, actionName) {
       var currentHour=null;
       if(date==CatChain_Helper.getCurrentDateStr()){
         currentHour=CatChain_Helper.getCurrentDateHourStr();
       }

        if(piwik.siteName.indexOf('#')==-1){
          return null;
        }
        var catDoamin =piwik.siteName.substring(0,piwik.siteName.indexOf('#'));
        var catHost= piwik.siteName.substring(piwik.siteName.indexOf('#')+1,piwik.siteName.length);
      //  var url = 'index.php?module=Overlay&period=' + encodeURIComponent(period) + '&date=' + encodeURIComponent(date) + '&idSite=' + encodeURIComponent(idSite);
        var url='http://'+catHost+"/cat/r/chain";
        if(currentHour==null){
          url = url+'?op=history&domain='+catDoamin.toUpperCase()+ '&date=' + encodeURIComponent(date)+'&reportType='+encodeURIComponent(period);
        }else{
            url =url+'?domain='+catDoamin.toUpperCase()+ '&date=' + encodeURIComponent(currentHour);
        }
        url = url+'&name='+encodeURIComponent(actionName);
        return url;
    },

    getCurrentDateStr: function(){
      var date = new Date();
      var year = date.getYear()+1900;
      var month=date.getMonth()+1;
      if(month<10){
        month='0'+month;
      }
      var date = date.getDate();
      if(date<10){
        date = '0'+date;
      }
      return year+''+month+''+date;
    },

    getCurrentDateHourStr: function(){
      var str = CatChain_Helper.getCurrentDateStr();
      var hour = (new Date()).getHours();
      if(hour<10){
        hour = '0'+hour;
      }
      return str+''+hour;
    }

};
