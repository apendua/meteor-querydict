/**
 * @author apendua / apendua@gmail.com
 */

QueryDict = new ReactiveDict();

page('*', function (context, next) {
  _.each($.deparam(context.querystring), function (value, key) {
    QueryDict.set(key, value);
  });
  next();
});

_.extend(QueryDict, {

  fetch: function () {
    var self = this, data = {};
    _.each(self.keys, function (value, key) {
      data[key] = self.get(key);
    });
    return data;
  },

  encode: function () {
    return $.param(this.fetch());
  },

});
