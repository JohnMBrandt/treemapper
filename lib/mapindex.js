$('.ui.dropdown')
    .dropdown()
    ;
const urlParams = new URLSearchParams(window.location.search);
const url_city = urlParams.get('location');
console.log(url_city)


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

    var m = L.map('map', { zoomControl: false})
    //m.setMaxBounds[(13.54, 38.155), (13.58, 38.159)]
    m.setView([7.420111, -1.225223], 15)
    var loadingControl = L.Control.loading({
                    separate: true,
                    position: 'topright'
                });
    m.addControl(loadingControl);
    var optionstoggle = L.control({position: "bottomright"});
    optionstoggle.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<b>Data</b><br><input id="toggle-event" name="toggle-event" type="checkbox" checked data-toggle="toggle" data-width="90" data-height="5" data-on="Raw" data-off="Indicator">'
        return div;
    }
    optionstoggle.addTo(m)
    $('#toggle-event').bootstrapToggle('enable')

    
    /* ###################################
    ### INSTANTIATE MAP AND SET   ########
    ### COORDINATES. CREATE BASE  ########
    ### MAP SWITCHER              ########
    ################################### */

    m.createPane('left')
    m.createPane('right')

    window.change_window = function() {
        m.removeControl(sidebyside)
        m.removeLayer(item);
        item = L.leafletGeotiff(url = "includes/" + selected_city + ".tif",
                options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})

        item.on('_drawImage', function (event) {
            m.fireEvent('dataloading', event);
            console.log("loading")
        });
        item.addTo(m)
        sidebyside = L.control.sideBySide(myLayer1, [myLayer2, item])

        console.log(sidebyside)
        sidebyside.addTo(m);
        if( selected_city == 'tigray') {
            m.setView([13.59341, 38.27082], 14)
        }
        if(selected_city == 'makueni') {
            m.setView([-2.516161, 38.159274], 14)
        }
        if(selected_city == 'rwanda') {
            m.setView([-1.505869, 29.983997], 15)
        }
        if(selected_city == 'senegal') {
            m.setView([15.85, -15.33], 15)
        }
        if(selected_city == 'stlucia') {
            m.setView([14.12111685908108, -60.908224779173715], 15)
        }
        if(selected_city == 'niger') {
            m.setView([13.310919, 2.603680], 15)
        }
        if(selected_city == 'cameroon') {
            m.setView([10.655, 14.3922], 14) // 10.596, 14.2722, 10.694, 14.355 upper right
        }
        if(selected_city == 'honduras') {
            m.setView([14.176664, -88.620304], 14) // 10.596, 14.2722, 10.694, 14.355 upper right
        }
        if(selected_city == 'campeche') {
            m.setView([18.253495, -92.090215], 15)
        }
        if(selected_city == 'jakarta') {
            m.setView([-6.332580, 106.717072], 15)
        }
        if(selected_city == 'elsalvador') {
            m.setView([14.255732, -89.375679], 15)
        }
        if(selected_city == 'kochi') {
            m.setView([9.929083, 76.303594], 15)
        }
        if(selected_city == 'malawi') {
            m.setView([ -10.97091, 33.943034], 14)
        }
        if(selected_city == 'colombia-talima') {
            m.setView([4.189529, -74.869171], 15)
        }
        if(selected_city == 'caf') {
            m.setView([5.790917, 14.831618], 15)
        }
        if(selected_city == 'drc-kafubu') {
            m.setView([-11.719636, 27.636622], 15)
        }
        if(selected_city == 'guinea') {
            m.setView([11.604298, -12.452513], 15)
        }
        if(selected_city == 'madagascar') {
            m.setView([-18.940152, 47.499587], 15)
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
            m.setView([-1.795009, 37.51063], 15)
        }
        if(selected_city == 'india') {
            m.setView([24.1070469, 81.726], 14)
        }
        if(selected_city == 'paraiba') {
            m.setView([-22.539943, -44.139629], 15)
        }
        if(selected_city == 'usa') {
            m.setView([44.865106, -123.093435], 15)
        }
        if(selected_city == 'kwahu') {
            m.setView([6.54909, -0.78008], 15)
        }
        if(selected_city == 'guatemala') {
            m.setView([16.042170, -90.104511], 15)
        }
        if(selected_city == 'imposible') {
            m.setView([13.777749, -89.974949], 15)
        }
        if(selected_city == 'tanzania') {
            m.setView([-6.262258, 36.709824], 15)
        }
        if(selected_city == 'nicaragua') {
            m.setView([12.418014, -86.933042], 15)
        }
        if(selected_city == 'bonanza') {
            m.setView([13.983745, -84.60842], 14)
        }
        if(selected_city == "thailand-khon-kaen") {
            m.setView([15.729725, 102.576518])
        }
        if(selected_city == "brazil-goias") {
            m.setView([-14.875595, -48.867399])
        }
        if(selected_city == 'australia-west') {
            m.setView([-32.626762, 117.441197], 15)
        }
    }

    colorscale=[[0.0, "rgb(165,0,38)"],
                [0.1111111111111111, "rgb(215,48,39)"],
                [0.2222222222222222, "rgb(244,109,67)"]
                [0.3333333333333333, "rgb(253,174,97)"],
                [0.4444444444444444, "rgb(254,224,144)"],
                [0.5555555555555556, "rgb(224,243,248)"],
                [0.6666666666666666, "rgb(171,217,233)"],
                [0.7777777777777778, "rgb(116,173,209)"],
                [0.8888888888888888, "rgb(69,117,180)"],
                [1.0, "rgb(49,54,149)"]]
    var city = 'upperwest'

    var myLayer1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            minZoom: 11, maxZoom: 17}).addTo(m);

    var myLayer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '<a href="https://www.wri.org">World Resources Institute</a> | Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            minZoom: 11, maxZoom: 17, pane: 'right'}).addTo(m);

    item = L.leafletGeotiff(url = "includes/" + city + ".tif",
        options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"}).addTo(m)
    item.on('getValueAtLatLng', function (event) {
            m.fireEvent('dataloading', event);
            console.log("loading")
    });

    item.addTo(m)
    sidebyside = L.control.sideBySide(myLayer1, [myLayer2, item])
    sidebyside.addTo(m);


    new L.Control.Zoom({ position: 'topright' }).addTo(m);
    new L.control.scale().addTo(m);


    if(url_city) {
        city = url_city
        $('#selectBox').dropdown('set selected', url_city);
        selected_city = url_city
        change_window()

    }

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

    $(function() {
        $('#toggle-event').change(function() {
            if($(this).prop('checked')) {
                layer = ""
            } else {
                layer = "1"
            }

            m.removeControl(sidebyside)
            m.removeLayer(item)
            item = L.leafletGeotiff(url = "includes/" + selected_city + layer + ".tif",
                options = { band: 0, displayMin: 0.01, displayMax: 1, colorScale: 'viridis', clampLow: false, clampHigh: true, pane: "right"})
            item.on('loading', function (event) {
                m.fireEvent('dataloading', event);
                console.log("loading")
            });
            item.addTo(m)
            sidebyside = L.control.sideBySide(myLayer1, [myLayer2, item])
            sidebyside.addTo(m)
        })
    })


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
