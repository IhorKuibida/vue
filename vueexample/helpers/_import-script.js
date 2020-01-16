// =============================================================================
// IMPORT SCRIPT
// =============================================================================

let importScript = (function (oHead) {

    function loadError (oError) {
        throw new URIError("The script " + oError.target.src + " is not accessible.");
    }

    return function (sSrc, fOnload) {
        let oScript = document.createElement('script');
        oScript.async = false;
        oScript.type = 'text\/javascript';
        oScript.onerror = loadError;
        if (fOnload) { oScript.onload = fOnload; }
        oHead.appendChild(oScript);
        oScript.src = sSrc;
    }

})(document.head || document.getElementsByTagName('head')[0]);

export { importScript };

// end IMPORT SCRIPT