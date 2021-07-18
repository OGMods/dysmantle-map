L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    emptyString: 'Unavailable',
    numDigits: 5,
    format: undefined,
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    if (this.options.format) {
      this._container.innerHTML = this.options.format(e);
    }
    else {
      var lng = L.Util.formatNum(e.latlng.lng, this.options.numDigits);
      var lat = L.Util.formatNum(e.latlng.lat, this.options.numDigits);
      var value =  lng + ", " + lat;
      var prefixAndValue =  'Loc : ' + value;
      this._container.innerHTML = prefixAndValue;
    }
  }

});

L.Map.mergeOptions({
  positionControl: false
});

L.Map.addInitHook(function () {
  if (this.options.positionControl) {
    this.positionControl = new L.Control.MousePosition();
    this.addControl(this.positionControl);
  }
});

L.control.mousePosition = function (options) {
  return new L.Control.MousePosition(options);
};
