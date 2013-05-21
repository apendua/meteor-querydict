# meteor-querydict

The goal of this package is to provide an easy session-like access to the data
encoded in URL. The URI encoding/decoding is done by the
[jquery-bbq-plugin](http://benalman.com/projects/jquery-bbq-plugin/).

## API

To use `QuryDict` in your meteor app type:
```
mrt add querydict
```
Now you can access your URL data at any point of your app
using `get` routine like this:
```javascript
QueryDict.get('keywords');
```
Supposing that your current location is
```
http://localhost:3000?keywords=some+search+phrase
```
the above call should return the following string
```javascript
"some search phrase"
```
Please note, that `QueryDict` is a reactive data source.

### QueryDict.encode

```javascript
QueryDict.encode = function (object, options) { ... }
```
It returns `object` data encoded in the form of a query string.
Additionally you can pass the following two options:
```javascript
options = {
  reactive: false; // default is true
  defaults: false; // default is true
}
```
The first `options.reactive` is self-explanatory. Set the second to `false`
(`true` is the default) if you don't want to use the current contents
of `QueryDict` as the default values for missing keys
("missing" means `undefined` or `null`).
