<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\CatChain;

class CatChain extends \Piwik\Plugin
{
    /**
     * @see Piwik\Plugin::registerEvents
     */
    function registerEvents()
    {
        return array(
            'AssetManager.getJavaScriptFiles'        => 'getJsFiles'
        );
    }

    /**
     * Returns required Js Files
     * @param $jsFiles
     */
    public function getJsFiles(&$jsFiles)
    {
        $jsFiles[] = 'plugins/CatChain/javascripts/catchain.js';
        $jsFiles[] = 'plugins/CatChain/javascripts/catchain_helper.js';
    }
}
