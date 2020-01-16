// =============================================================================
// Filters Obj
// =============================================================================

export default function(filtersObj, store, route, $t, consultationFormData, activeFilters) {
    'use strict'

        let dataAllApartments = store;

        let filters = {};
        for (var item in filtersObj){
            let subResult = [];
            for (var subitem in filtersObj[item].items){
                if (filtersObj[item].items[subitem].checked == 1) {
                    subResult.push(filtersObj[item].items[subitem].value);
                }
            }
            if(subResult.length > 0){
                filters[item] = subResult;
            }
        }
        
        let infoStr = getInfoStr(filters, filtersObj);
        setConsultationFormData(infoStr, consultationFormData);
        
        let getFiltersArr =  transformArrToGetStr(filtersObj);
        route.push({ path: '/', query: getFiltersArr});

        const filterKeys = Object.keys(filters);
        return dataAllApartments.filter((item) => {
            return filterKeys.every(function(key) {
                if(key == 'area'){

                    let from = filters[key][0];
                    let to = filters[key][1];
                    return ( item[key] >= from && item[key] <=  to);
                }
                if(key == 'prjPlaces') {

                    let placesInObj = item[key];
                    let selectPlacesInObj = filters[key];

                    var showPlace = true;
                    selectPlacesInObj.forEach(function(place, i, arr) {
                      if (!placesInObj.in_array(place)) {
                            showPlace = false;
                        }
                    });

                    return showPlace;
                }
                if(key == 'flat_parameters') {

                    if (!item[key] || (item[key].length < 2 && item[key][0] == '') ) {
                        return false;
                    }

                    let paramsInObj = item[key];
                    let selectParamsInObj = filters[key];


                    var showParams = true;
                    selectParamsInObj.forEach(function(params, i, arr) {
                      if (!paramsInObj.in_array(params, true) ) {
                            showParams = false;
                        }
                    });
                    return showParams;
                }
                return filters[key].indexOf(item[key]) !== -1
            });
        });
};

Array.prototype.in_array = function(p_val, paire = false) {
    for(var i = 0, l = this.length; i < l; i++) {
        if(paire){
            if(this[i] == p_val && i%2 == 0) {
                return true;
            }
        }else{   
            if(this[i] == p_val) {
                return true;
            }
        }
    }
    return false;
};

function  transformArrToGetStr( filtersObj ){
    var result = {};

    for (var item in filtersObj){
        let subResult = [];
        for (var subitem in filtersObj[item].items){
            if (filtersObj[item].items[subitem].checked == 1) {
                subResult.push(subitem);
            }
        }
        if(subResult.length > 0){
            result[item] = subResult.join();
        }
    }

    let area = [filtersObj.area.items.min.value, filtersObj.area.items.max.value];
    result.area = area.join();
    return result;
}

function getInfoStr(selectedFilter, filtersObj) {
    var result = '';

    for (var item in filtersObj){
        let subResult = [];
        for (var subitem in filtersObj[item].items){
            if (filtersObj[item].items[subitem].checked == 1) {
                subResult.push(filtersObj[item].items[subitem].label);
            }
        }
        if(subResult.length > 0 && item == 'area'){
            let area = filtersObj.area;
            result += area.options.label + ': ' +
                area.items.min.value  + '-' +
                area.items.max.value +
                area.items.max.label + '; ';
        }else if(subResult.length > 0){
            result += filtersObj[item].options.label + ': ' + subResult.join(', ') + '; ';
        }
    }
    return result;
}

function setSeoInfo(infoStr) {
    document.title = infoStr;
}

function setConsultationFormData(infoStr, formData) {
    formData.str = infoStr;
    formData.url = window.location.href;
}

// end Filters Obj