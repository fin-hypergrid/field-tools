# fin-hypergrid-field-tools

This module serves as a namespace for miscellaneous tools that operate on Hypergrid fields.

> NOTE: This module is a [built-in module](https://github.com/fin-hypergrid/core/wiki/Client-Modules#built-in-modules)
 and therefore will not be found on the CDN.

## Usage

### Bundled apps
Applications that bundle the [Hypergrid npm module](https://www.npmjs.com/package/fin-hypergrid)
with other npm modules:
```html
<script src="my-bundled-application.js"></script>
```
Use Browserify's or webpack's `require()`:
```js
var Hypergrid = require('fin-hypergrid');
var fields = require('fin-hypergrid-field-tools')
```
### CDN apps
Appications that load the Hypergrid build file from the CDN:
```html
<script src=https://fin-hypergrid.github.io/core/3.0.0/build/fin-hypergrid.min.js"></script>
```

Application scripts packaged as [Hypergrid Client Modules](https://github.com/fin-hypergrid/core/wiki/Client-Modules)
use the same require syntax as above (although in this case it is actually Hypergrid's `require()`),
which means that the same scripts can be used with either approach, making migrating to npm modules painless.

Application scripts _not_ packaged as Hypergrid Client Modules use either of the following calling patterns instead:

````js
var fields = Hypergrid.require('fin-hypergrid-field-tools');
```
````js
var fields = Hypergrid.modules['fin-hypergrid-field-tools'];
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

npmjs.org as npm modules, are also packaged as client modules and pushed to the Hypergrid CDN.
