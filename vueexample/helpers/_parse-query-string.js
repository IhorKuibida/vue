// =============================================================================
// PARSE QUERY STRING
// =============================================================================

export default function(query) {
    var vars = query.split("&");
    var query_string = {};

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {

            if (decodeURIComponent(pair[1]) === "undefined") {
                continue;
            }

            query_string[pair[0]] = decodeURIComponent(pair[1]);

        // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;

        // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    if(Object.keys(query_string).length == 0) {
        query_string = false;
    }

    return query_string;
};

// end PARSE QUERY STRING