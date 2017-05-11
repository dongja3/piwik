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
        var catDomain='CMCD';
      //  var url = 'index.php?module=Overlay&period=' + encodeURIComponent(period) + '&date=' + encodeURIComponent(date) + '&idSite=' + encodeURIComponent(idSite);
        var url='http://localhost:8080/cat/r/chain?op=history&domain='+catDomain
        url = url+ '&date=' + encodeURIComponent(date) + '&reportType='+encodeURIComponent(period) +'&name='+encodeURIComponent(actionName);
        return url;
    }

};
