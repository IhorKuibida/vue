// FROM FLTR

const fromFltrKey = 'from-filter';

//
function setFromFltr() {
    sessionStorage.setItem(fromFltrKey, true);
}

// getFromPrj
function removeFromFltr() {
    sessionStorage.removeItem(fromFltrKey);
}

// getFromPrj
function getFromFltr() {
    let status = false;

    if (sessionStorage.getItem(fromFltrKey)) {
        status = true;
    }

    return status;
}



const filterQueryKey = 'filter-query';

function setFilterQuery(query) {
    let newQuery = JSON.stringify(query);
    sessionStorage.setItem(filterQueryKey, newQuery);
}

function removeFilterQuery() {
    sessionStorage.removeItem(filterQueryKey);
}

function getFilterQuery() {
    let query = sessionStorage.getItem(filterQueryKey)
    let newQuery = JSON.parse(query)
    return newQuery;
}





// FROM PRJ

const fromPrjKey = 'from-project';

//
function setFromPrj() {
    sessionStorage.setItem(fromPrjKey, true);
}

// getFromPrj
function removeFromPrj() {
    sessionStorage.removeItem(fromPrjKey);
}

// getFromPrj
function getFromPrj() {
    let status = false;

    if (sessionStorage.getItem(fromPrjKey)) {
        status = true;
    }

    return status;
}

export {
    setFromFltr,
    removeFromFltr,
    getFromFltr,

    setFilterQuery,
    removeFilterQuery,
    getFilterQuery,

    setFromPrj,
    removeFromPrj,
    getFromPrj,
};

