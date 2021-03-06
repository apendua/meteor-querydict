/**
 * @author apendua / apendua@gmail.com
 */

QueryDict = new ReactiveDict();

page('*', function (context, next) {
  var data = $.deparam(context.querystring);
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
    data = data || {}; options = options || {};
    // default options
    var reactive = options.reactive !== undefined ? options.reactive : true;
    var defaults = options.defaults !== undefined ? options.defaults : true;
    // set up defaults
    var self = this;
    _.each(self.keys, function (value, key) {
      if (defaults && data[key] == undefined) { // null or undefined
        if (reactive)
          data[key] = self.get(key);
        else data[key] = parse(value);
      }
    });
    return $.param(data);
  },

});

page.start();
