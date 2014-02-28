/**
 * @author apendua / apendua@gmail.com
 */

QueryDict = new ReactiveDict();

var parseQueryString = function (querystring) {

  // this is a method by Andy E. copy/pasted from:
  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

  var match,
      params = {},
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

  params = {};
  while (match = search.exec(querystring)) {
    params[decode(match[1])] = decode(match[2]);
  }

  return params;
}

page('*', function (context, next) {
  var data = parseQueryString(context.querystring);

  _.each(data, function (value, key) {
    QueryDict.set(key, value);
  });
  _.each(QueryDict.keys, function (value, key) {
    if (data[key] === undefined)
      QueryDict.set(key, undefined);
  });
  next();
});

// from reactive-dict package
var parse = function (serialized) {
  if (serialized === undefined || serialized === 'undefined')
    return undefined;
  return EJSON.parse(serialized);
};

_.extend(QueryDict, {

  // XXX when ReactiveDict has clear, we can get rid of this
  clear: function () {
    _.each(self.keys, function (value, key) {
      self.set(key, undefined);
    });
  },

  fetch: function () {
    var self = this, data = {};
    _.each(self.keys, function (value, key) {
      data[key] = self.get(key);
    });
    return data;
  },

  encode: function (data, options) {
    var reactive = true,
        defaults = true,
        query    = [],
        sp       = /\ /g, // Regex for replacing space symbol with a plus sign
        encode   = function (s) { return encodeURIComponent(s).replace(sp, '+'); }
    //-----------------------------------------
    data = data || {}; options = options || {};
    // apply options
    reactive = (options.reactive !== false);
    defaults = (options.defaults !== false);
    // set up defaults
    var self = this;
    _.each(self.keys, function (value, key) {
      if (defaults && data[key] == undefined) { // null or undefined
        if (reactive) {
          data[key] = self.get(key);
        } else {
          data[key] = parse(value);
        }
      }
    });
    //----------------------------------
    _.each(data, function (value, key) {
      query.push(encode(key) + '=' + encode(value));
    });
    //---------------------
    return query.join('&');
  },

});

page.start();
