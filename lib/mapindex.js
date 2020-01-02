
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

    var current_indicator = "income";

    var m = L.map('map', { zoomControl: false })
    //m.setMaxBounds[(13.54, 38.155), (13.58, 38.159)]
    m.setView([7.420111, -1.225223], 15)
    

    //m.setMaxBounds[(13.5, 38.15), (13.6, 38.16)]

    /* ###################################
    ### INSTANTIATE MAP AND SET   ########
    ### COORDINATES. CREATE BASE  ########
    ### MAP SWITCHER              ########
    ################################### */

    m.createPane('left')
    m.createPane('right')

    var myLayer1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            minZoom: 13, maxZoom: 17}).addTo(m);

    var myLayer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '<a href="https://www.wri.org">World Resources Institute</a> | Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            minZoom: 13, maxZoom: 17, pane: 'right'}).addTo(m);


    var tigray = L.leafletGeotiff(url = "includes/tigray.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})

    var makueni = L.leafletGeotiff(url = "includes/makueni.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})

    var niger = L.leafletGeotiff(url = "includes/niger.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})


    var cameroon = L.leafletGeotiff(url = "includes/cameroon.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var ghana = L.leafletGeotiff(url = "includes/ghana.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var mamprusi = L.leafletGeotiff(url = "includes/mamprusi.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var upperwest = L.leafletGeotiff(url = "includes/upperwest.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var bonoeast = L.leafletGeotiff(url = "includes/bonoeast.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var brazil = L.leafletGeotiff(url = "includes/brazil.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var makueni2 = L.leafletGeotiff(url = "includes/makueni-2.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})
    var elsalvador = L.leafletGeotiff(url = "includes/elsalvador.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var india = L.leafletGeotiff(url = "includes/india.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var malawi = L.leafletGeotiff(url = "includes/malawi.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var paraiba = L.leafletGeotiff(url = "includes/paraiba.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var usa = L.leafletGeotiff(url = "includes/usa.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var campeche = L.leafletGeotiff(url = "includes/campeche.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    makueni.addTo(m);
    makueni2.addTo(m);
    niger.addTo(m)
    cameroon.addTo(m)
    ghana.addTo(m)
    mamprusi.addTo(m)
    upperwest.addTo(m)
    bonoeast.addTo(m)
    tigray.addTo(m)
    elsalvador.addTo(m)
    brazil.addTo(m)
    india.addTo(m)
    malawi.addTo(m)
    paraiba.addTo(m)
    campeche.addTo(m)

    L.control.sideBySide(myLayer1, [myLayer2, tigray, campeche, paraiba, malawi, makueni2, india, elsalvador, makueni,brazil, bonoeast, upperwest, niger, cameroon, ghana, mamprusi]).addTo(m);


    new L.Control.Zoom({ position: 'topright' }).addTo(m);
    new L.control.scale().addTo(m);

    //var overlayMaps = {
    //    "Data": tigray
    //};

    //L.control.layers(null, tigray).addTo(m);

    //m.doubleClickZoom.disable();
    //Highlight on mouse over
    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.2
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    //Remove highlight on mouse leave
    function resetHighlight(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 1,
            color: 'black',
            dashArray: '',
            opacity: 1,
            fillOpacity: 0.6
        });
    }

    /* ###############################
    ####### ON EACH LAYER  ###########
    ################################## */

    //creates a pop up layer showing name, income, and population
    //tells the geojson to highlight upon mouse over
    function onEachFeature(feature, layer) {
        pzoom = m.getZoom();
        layer.on({
            mouseover: highlightFeature,
            click: zoomToFeature,
            mouseout: resetHighlight
        })
    }
    window.change_window = function() {
        if( selected_city == 'tigray') {
            m.setView([13.56341, 38.22082], 15)
        }
        if(selected_city == 'makueni') {
            m.setView([-2.536161, 38.139274], 15)
        }
        if(selected_city == 'rwanda') {
            m.setView([-1.515869, 29.953997], 15)
        }
        if(selected_city == 'niger') {
            m.setView([13.310919, 2.603680], 15)
        }
        if(selected_city == 'cameroon') {
            m.setView([10.123827, 13.74121], 15)
        }
        if(selected_city == 'campeche') {
            m.setView([18.253495, -92.090215], 15)
        }
        if(selected_city == 'elsalvador') {
            m.setView([14.255732, -89.375679], 15)
        }
        if(selected_city == 'malawi') {
            m.setView([ -11.024091, 33.853034], 15)
        }
        if(selected_city == 'ghana') {
            m.setView([10.119017, -2.390068], 15)
        }
        if(selected_city == 'mamprusi') {
            m.setView([10.415084, -0.806330], 15)
        }
        if(selected_city == 'upperwest') {
            m.setView([7.420111, -1.225223], 15)
        }
        if(selected_city == 'bonoeast') {
            m.setView([7.726058, -0.670011], 15)
        }
        if(selected_city == 'brazil') {
            m.setView([-20.130326, -40.7930080], 15)
        }
        if(selected_city == 'makueni-2') {
            m.setView([-1.79509, 37.51063], 15)
        }
        if(selected_city == 'india') {
            m.setView([24.0870469, 81.6526], 15)
        }
        if(selected_city == 'paraiba') {
            m.setView([-22.539943, -44.139629], 15)
        }
        if(selected_city == 'usa') {
            m.setView([38.887018, -77.052450], 15)
        }
    }

    applyInitialUIState();
    applyMargins();
})

function changeFunc($i) {
    console.log($i);
    selected_city = $i;
    change_window()
}

$(document).ready(function () {
    //incstyle();
    $('.ui.dropdown')
        .dropdown()
        ;
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

});
