
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

        });
    });

    /* ####################################
    ####### BEGIN MAP JAVASCRIPT ##########
    ####################################### */

    var m = L.map('map', { zoomControl: false })
    m.setView([13.310919, 2.603680], 15)
    var city = 'upperwest'

    //var myLayer1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
     //       minZoom: 13, maxZoom: 17}).addTo(m);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(m);

    var url_to_geotiff_file = "https://storage.googleapis.com/restoration-hosting/niger.tif";

      parseGeoraster(url_to_geotiff_file).then(georaster => {
        console.log("georaster:", georaster);

        var layer = new GeoRasterLayer({
            attribution: "WRI",
            georaster: georaster,
            resolution: 10,
            pixelValuesToColorFn: values => values[0] >= 0.5 ? null : "#ff0000",
        });
        layer.addTo(m);
        //sidebyside = L.control.sideBySide(myLayer1, [myLayer2, layer])
       //sidebyside.addTo(m);
    })
    applyInitialUIState();
    applyMargins();
})


$(document).ready(function () {
    //incstyle();
    $('.ui.dropdown')
        .dropdown()
        ;
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

});
