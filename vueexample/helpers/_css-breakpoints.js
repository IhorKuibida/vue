// =============================================================================
// GET BREAKPOINTS WITH CSS
// =============================================================================

// get breakpoints with css
const cssBreakpoints = {};
cssBreakpoints.refreshValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    // console.log(this.value);
};
cssBreakpoints.refreshValue();

export default cssBreakpoints;

// end GET BREAKPOINTS WITH CSS