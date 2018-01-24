'use strict';

/**
 * @name fields
 * @namespace
 */

var REGEXP_META_PREFIX = /^__/, // starts with double underscore
    REGEXP_WORD_SEPARATORS = /[\s\-_]*([^\s\-_])([^\s\-_]+)/g,
    REGEXP_CAPITAL_LETTERS = /[A-Z]/g,
    REGEXP_LOWER_CASE_LETTER = /[a-z]/;

/**
 * Returns an array of keys (field names) of the given data row object.
 * Field names beginning with double underscore (`__`) are considered reserved for system use and are excluded from the results.
 * @param {object} [dataRow] - If omitted or otherwise falsy, returns an empty array.
 * @returns {string[]} Member names from `dataRow` that do _not_ begin with double-underscore.
 * @memberOf namespace:fields
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

var shortWords = ['of', 'at', 'by', 'from', 'and', 'but', 'for', 'a', 'an', 'the'];

/**
 * Separates camel case or white-space-, hypen-, or underscore-separated-words into truly separate words and capitalizing the first letter of each except for members of `shortWords`.
 * @param string
 * @returns {string}
 * @memberOf namespace:fields
 */
function titleize(string) {
    var title = (REGEXP_LOWER_CASE_LETTER.test(string) ? string : string.toLowerCase())
        .replace(REGEXP_WORD_SEPARATORS, capitalize)
        .replace(REGEXP_CAPITAL_LETTERS, ' $&')
        .trim();

    shortWords.forEach(function(word) {
        word = ' ' + word + ' ';
        title = title.replace(new RegExp(word, 'gi'), word);
    });

    return title;
}

/**
 * Derive a schema from field names, including derived header when field name unsuitable as such.
 * A suitable field name has no underscores _and_ contains spaces and/or mixed case (but not camelCase).
 * @param data
 * @returns {Array}
 * @memberOf namespace:fields
 */
function getSchema(data){
    // find first defined dataRow
    var dataRow = data.find(function(dataRow) { return dataRow; }) || {};

    return getFieldNames(dataRow).map(function(name) {
        return name.indexOf('_') < 0 && (
            name.indexOf(' ') >= 0 ||
            /[a-z]/.test(name) && /[A-Z]/.test(name) && !/[^a-z][A-Z]/.test(name)
        ) ?
            {
                name: name
            } : {
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
