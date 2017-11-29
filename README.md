# fin-hypergrid-field-tools

This API serves as a namespace for miscellaneous tools that operate on Hypergrid fields.

## Usage
### Implicit
This tiny API is used implicitly by [`fin-hypergrid-data-source-origin`](https://github.com/fin-hypergrid/fin-hypergrid-data-source-origin) to derive a column schema when no explicit schema has been provided.

Developers might choose to make similar use of this API in custom data source objects.

### Explicit
Application developers can access this API explicitly as follows.

If using the Hypergrid [npm module](https://www.npmjs.com/package/fin-hypergrid) access via Browserify's or webpack's `require`:
```js
var fields = require('fin-hypergrid-field-toolss')
```
If using the Hypergrid 3.0.0 build file:
```html
<script src=https://fin-hypergrid.github.io/core/3.0.0/build/fin-hypergrid.min.js"></script>
```
If your file is a Hypergrid Client Module, the syntax is the same as above for npm files.
If not, access via `Hypergrid.require`:
````js
var fields = Hypergrid.require('fin-hypergrid-field-tools);
```

## API

The API consists of three functions:

### `getFieldNames(dataRow)`
Given a data row object, returns an array string:
* Array consists of the keys (field names) of the given data row object.
* Field names beginning with double underscore (`__`) are considered reserved for system use and are excluded from the results.
* The order of the names in the resulting array is undefined.

### `getSchema(data)`
Given an array of data row objects, returns a data schema based on the first data row.
That is, an array of column schema objects, one for each field of the first data row object (excluding reserved fields, as defined above):
* Each element of the returned array is an object with two members of string type:
  * `name` - the data row object's vermatim key
  * `header` - a header string derived via `titleize(name)`
* The order of the columns in the resulting schema is undefined.

### `titleize(fieldName)`
Given a field name containing words delimited by white space, hyphens, underscores, or camelCase,
returns a new string with:
* each word separate by a single space character
* the first letter of each word is capitalized

For custom headerification, override `fields.titleize` with a custom function that conforms to the above calling convention.