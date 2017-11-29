// fin-hypergrid-field-tools@1.0.0

(function(require, module, exports) {

'use strict';

/**
 * @name fields
 * @module
 */

var REGEXP_META_PREFIX = /^__/, // starts with double underscore
    REGEXP_WORD_SEPARATORS = /[\s\-_]*([^\s\-_])([^\s\-_]+)/g,
    REGEXP_CAPITAL_LETTERS = /[A-Z]/g,
    REGEXP_LOWER_CASE_LETTER = /[a-z]/;

/**
 * Returns an array of keys (field names) of the given data row object.
 * Field names beginning with double underscore (`__`) are considered reserved for system use and are excluded from the results.
 * @param {object} hash
 * @returns {string[]} Member names from `dataRow` that do _not_ begin with double-underscore.
 * @memberOf module:fields
 */
function getFieldNames(dataRow) {
    return Object.keys(dataRow || []).filter(function(fieldName) {
        return !REGEXP_META_PREFIX.test(fieldName);
    });
}

// Replacement function for use in the default titleize function below.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function capitalize(a, b, c) {
    return b.toUpperCase() + c;
}

/**
 * Separates camel case or white-space-, hypen-, or underscore-separated-words into truly separate words and capitalizing the first letter of each.
 * @param string
 * @returns {string}
 * @memberOf module:fields
 */
function titleize(string) {
    return (REGEXP_LOWER_CASE_LETTER.test(string) ? string : string.toLowerCase())
        .replace(REGEXP_WORD_SEPARATORS, capitalize)
        .replace(REGEXP_CAPITAL_LETTERS, ' $&')
        .trim();
}

function getSchema(data){
    return getFieldNames(data && data[0] || {}).map(function(name) {
        return {
            name: name,
            header: titleize(name)
        };
    });
}

module.exports = {
    getFieldNames: getFieldNames,
    titleize: titleize,  // override as needed for custom header titleization
    getSchema: getSchema
};


})(fin.Hypergrid.require, fin.Hypergrid.modules, fin.Hypergrid.modules.exports = {});

fin.Hypergrid.modules.exports.$$VERSION = '1.0.0';
fin.Hypergrid.modules['fin-hypergrid-field-tools'] = fin.Hypergrid.modules.exports;
delete fin.Hypergrid.modules.exports;

