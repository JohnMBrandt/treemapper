
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
    m.setView([13.59341, 38.2182], 15)
    

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


    var tigray = L.leafletGeotiff(url = "includes/tigray_leaflet2.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})

    var makueni = L.leafletGeotiff(url = "includes/makueni.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})

    var rwanda = L.leafletGeotiff(url = "includes/rwanda.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})


    var niger = L.leafletGeotiff(url = "includes/niger.tif",
                                         options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})


    var cameroon = L.leafletGeotiff(url = "includes/cameroon.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var campeche = L.leafletGeotiff(url = "includes/campeche.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var elsalvador = L.leafletGeotiff(url = "includes/elsalvador.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})

    var malawi = L.leafletGeotiff(url = "includes/malawi.tif",
                                         options = { band: 0, displayMin: 0.01,
                                                     displayMax: 1, colorScale: 'viridis', 
                                                     clampLow: false, clampHigh: true, pane: "right"})


    makueni.addTo(m);
    rwanda.addTo(m)
    niger.addTo(m)
    cameroon.addTo(m)
    campeche.addTo(m)
    elsalvador.addTo(m)
    malawi.addTo(m)

    L.control.sideBySide(myLayer1, [myLayer2, tigray, makueni, malawi, rwanda, niger, cameroon, campeche, elsalvador]).addTo(m);


    new L.Control.Zoom({ position: 'topright' }).addTo(m);
    new L.control.scale().addTo(m);
   
    m.addLayer(tigray)
    m.addLayer(makueni)
    m.addLayer(rwanda)
    m.addLayer(niger)
    m.addLayer(cameroon)
    m.addLayer(campeche)
    m.addLayer(elsalvador)
    m.addLayer(malawi)

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
            m.setView([13.59341, 38.21382], 15)
        }
        if(selected_city == 'makueni') {
            m.setView([-2.064450, 37.748559], 15)
        }
        if(selected_city == 'rwanda') {
            m.setView([-1.515869, 29.953997], 15)
        }
        if(selected_city == 'niger') {
            m.setView([13.330919, 2.603680], 15)
        }
        if(selected_city == 'cameroon') {
            m.setView([10.123827, 13.74121], 15)
        }
        if(selected_city == 'campeche') {
            m.setView([19.362103, -90.665212], 15)
        }
        if(selected_city == 'elsalvador') {
            m.setView([14.231732, -89.418679], 15)
        }
        if(selected_city == 'malawi') {
            m.setView([ -11.044091, 33.818034], 15)
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
