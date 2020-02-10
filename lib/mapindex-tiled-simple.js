// initalize leaflet map
$(function () {
    var map = L.map('map').setView([13.310919, 2.603680], 14);
    map.createPane('left')
    map.createPane('right')
    map.getPane('left').style.zIndex = 1
    map.getPane('right').style.zIndex = 2

    // add OpenStreetMap basemap
    var myLayer1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            minZoom: 13, maxZoom: 17, zIndex: 1}).addTo(map);

    var myLayer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
           attribution: '<a href="https://www.wri.org">World Resources Institute</a> | Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
           minZoom: 13, maxZoom: 17, zIndex:1, pane: 'left'}).setZIndex(-2).addTo(map);
    var sidebyside

    var url_to_geotiff_file = "https://cors-anywhere.herokuapp.com/https://restoration-hosting.storage.googleapis.com/niger.tif";
    //https://cors-anywhere.herokuapp.com/

    parseGeoraster(url_to_geotiff_file).then(georaster => {
      console.log("georaster:", georaster);

      /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */
      var layer = new GeoRasterLayer({
          attribution: "Planet",
          georaster: georaster,
          resolution: 100,
          pixelValuesToColorFn: values => values[0] >= 0 ? "#9fbb52" : null,
      });
      layer.addTo(map);
      layer.bringToFront()
      layer.setZIndex(100);

      sidebyside = L.control.sideBySide([myLayer1, layer], [myLayer2])
      sidebyside.addTo(map);
  });
})
