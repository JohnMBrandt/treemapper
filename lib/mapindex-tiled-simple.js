
/* ########################################
####### FUNCTIONALITY FOR NAVBAR ##########
######################################## */

/* SEARCHABLE CITY SELECT FUNCTIONALITY */

/* TO ADD A NEW INDICATOR */
/* 1. Update the HTML for index and splitscr */
/* 2. create a getColorIndicator function */
/* 3. create Indicatorstyle function */
/* 4. create Indicatorlegend function */
/* 5. create Indicatorstyle_set function */
/* 6. update changecity function */
/* 7. update removelegends function */
/* 8. Update set_current_style function */

$('.ui.dropdown')
    .dropdown()
    ;
const urlParams = new URLSearchParams(window.location.search);
const url_city = urlParams.get('location');
console.log(url_city)


/* ################### *
// m.setMaxBounds([[38.19, 114.42], [42.19, 118.42]]).setView([40.19, 116.42], 9),
/* The following functions give functionality to the navbar and to the indicator selectors*/

function applyMargins() {
    var leftToggler = $(".mini-submenu-left");
    if (leftToggler.is(":visible")) {
        $("#map .ol-zoom")
            .css("margin-left", 0)
            .removeClass("zoom-top-opened-sidebar")
            .addClass("zoom-top-collapsed");
    } else {
        $("#map .ol-zoom")
            .css("margin-left", $(".sidebar-left").width())
            .removeClass("zoom-top-opened-sidebar")
            .removeClass("zoom-top-collapsed");
    }
}

function isConstrained() {
    return $(".sidebar").width() == $(window).width();
}
function applyInitialUIState() {
    if (isConstrained()) {
        $(".sidebar-left .sidebar-body").fadeOut('slide');
        $('.mini-submenu-left').fadeIn();
    }
}

var selected_city = 'tigray'
var sidebyside
var item

$(function () {
    $('.sidebar-left .slide-submenu').on('click', function () {
        var thisEl = $(this);
        thisEl.closest('.sidebar-body').fadeOut('slide', function () {
            $('.mini-submenu-left').fadeIn();
            applyMargins();
        });
    });
    $('.mini-submenu-left').on('click', function () {
        var thisEl = $(this);
        $('.sidebar-left .sidebar-body').toggle('slide');
        thisEl.hide();
        applyMargins();
    });
    $(window).on("resize", applyMargins);


    /// This function makes it so that when a user clicks outside of the popover it closes
    $(document).on('click', function (e) {
        $('[data-toggle="popover"],[data-original-title]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
            }

        })
    });
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
  applyInitialUIState();
  applyMargins();
})

(document).ready(function () {
    //incstyle();
    $('.ui.dropdown')
        .dropdown()
        ;
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

});