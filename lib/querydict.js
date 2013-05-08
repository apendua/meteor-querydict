/**
 * @author apendua / apendua@gmail.com
 */

QueryDict = function () {
  this._properties = {};
  this._dependency = {};
};

QueryDict.prototype = {

  get: function (key) {
    this.depend(key);
    return this._properties[key];
  },

  has: function (key, options) {
    options = options || {};
    if (options.reactive === undefined || options.reactive) this.depend(key);
    return this._properties.hasOwnProperty(key);
  },

  set: function (key, value) {
    if (value === this._properties[key])
      return;
    this._properties[key] = value;
    this.changed(key);
  },

  unset: function (key) {
    if (!_.has(this._properties, key))
      return;
    delete this._properties[key];
    this.changed(key);
  },

  fetch: function (key, value) {
    var self = this, data = {};
    _.each(this._properties, function (value, key) {
      data[key] = self.get(key);
    });
    return data;
  },

  copy: function (object) {
    var self = this;
    _.each(object, function (value, key) {
      self.set(key, value);
    });
    _.each(this._properties, function (value, key) {
      if (!_.has(object, key))
        self.unset(key);
    });
  },

  depend: function (key) {
    if (Deps.active) {
      if (this._dependency[key] === undefined)
        this._dependency[key] = new Deps.Dependency;
      Deps.depend(this._dependency[key]);
    }
  },

  changed: function (key) {
    if (this._dependency[key])
      this._dependency[key].changed();
  },

  update: function (querystring) {
    if (Meteor.isClient)
      //TODO: get rid of this dependency
      this.copy($.deparam(querystring));
  },

  //TODO: consider adding some additional features like 'merge' or 'defaults'
  //TODO: do not invalidate computation if the value was not changed

};

