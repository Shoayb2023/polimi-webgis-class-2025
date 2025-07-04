import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, XYZ, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Fill, Stroke } from 'ol/style';




// OpenStreetMap base map
let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

// SlovakiaBoundary Boundary
let SlovakiaBoundary = new Image({
    title: "Slovakia__boundarie",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',     
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia__boundaries' }
    }),
    visible: true
});


// SlovakiaBoundary Boundary
let AAD	 = new Image({
    title: "Pm10 AAD",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',     
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_pm10 _2017-2021_AAD_map _2022' }
    }),
    visible: false
});

// bivariate__atatis
let bivariateatatis = new Image({
    title: "bivariate__atatis",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',     
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_pm10_2020_bivariate' }
    }),
    visible: false
});


// Slovakia_LC_reclassiffied_2022
var Slovakia_LC_reclassiffied_2022 = new Image({
    title: "Slovakia_LC_reclassiffied_2022",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_LC_reclassiffied_2022' }
    }),
    opacity: 0.5,
    visible: false
});

// 
// Slovakia_average_no2_2022
var Slovakia_average_no2_2022 = new Image({
    title: "Slovakia_average_no2_2022",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_average_no2_2022' }
    }),
    visible: false
});

// Slovakia_no2_concentration_map_2020
var Slovakia_no2_concentration_map_2020 = new Image({
    title: "Slovakia_no2_concentration_map_2020",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_no2_concentration_map_2020' }
    }),
    visible: false
});

// Slovakia_pm2.5_concentration_map_2020
var Slovak_pm25_concentration_map_2020 = new Image({
    title: "Slovakia_pm2.5_concentration_map_2020",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovak_pm2.5_concentration_map_2020' }
    }),
    visible: false
});

// Slovak_CAMS_pm25_2022_12
var Slovak_CAMS_pm25_2022_12 = new Image({
    title: "Slovakia_CAMS_pm2.5_2022_12",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovak_CAMS_pm2.5_2022_12', 'STYLES': 'default' }
    }),
    visible: false
});

// Slovak_CAMS_pm25_2022_12
var SLOVAKIA_pm10_concentration_map_2020 = new Image({
    title: "SLOVAKIA_pm10_concentration_map_2020",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:SLOVAKIA_pm10_concentration_map_2020' }
    }),
    visible: false,
});

// Slovak_CAMS_pm25_2022_12
var SLOVAKIA_pm10_concentration_map_2022 = new Image({
    title: "Slovakia average PM10 2022",
    type: "overlay",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_19:Slovakia_average_pm10_2022' }
    }),
    visible: false,
});



// Add the layer groups code here:
let basemapLayers = new Group({
    title: 'Base Maps',
    layers: [osm]
});
let overlayLayers = new Group({
    title: 'Overlay Layers',
    layers: [
        SlovakiaBoundary,
        Slovakia_LC_reclassiffied_2022,
        Slovakia_average_no2_2022,
        Slovakia_no2_concentration_map_2020,
        Slovak_pm25_concentration_map_2020,
        SLOVAKIA_pm10_concentration_map_2020,
        SLOVAKIA_pm10_concentration_map_2022,
        bivariateatatis,
        AAD

    ]
});


// Map Initialization
let mapOrigin = fromLonLat([19.699, 48.669]);
let zoomLevel = 8.3;
let map = new Map({
    target: document.getElementById('map'),
    //layers: [basemapLayers, overlayLayers],
    layers: [],
    view: new View({
        center: mapOrigin,
        zoom: zoomLevel
    }),
    projection: 'EPSG:3857'
});

// Add the map controls here:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

// Add the LayerSwitcher control here:
var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

// Add the Stadia Basemaps here:
var stamenWatercolor = new Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
});
var stamenToner = new Tile({
    title: 'Stamen Toner',
    type: 'base',
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
});
basemapLayers.getLayers().extend([stamenWatercolor, stamenToner]);

// Add the ESRI XYZ basemaps here:
var esriTopoBasemap = new Tile({
    title: 'ESRI Topographic',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});
var esriWorldImagery = new Tile({
    title: 'ESRI World Imagery',
    type: 'base',
    visible: false,
    source: new XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
});
basemapLayers.getLayers().extend([
    esriTopoBasemap, esriWorldImagery
]);

// Add the WFS layer here:
// First, the URL definition:
var wfsUrl = "https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_19/wfs?" + 
"service=WFS&" + 
"version=2.0.0&" +
"request=GetFeature&" + 
"typeName=gisgeoserver_19:SVK_water_lines_dcw&" + 
"srsname=EPSG:404000&" + 
"outputFormat=application/json";
// Then the Source and Layer definitions:
let wfsSource = new VectorSource({});
let wfsLayer = new Vector({
    title: "Water Areas",
    source: wfsSource,
    visible: true,
    style: new Style({
        fill: new Fill({
            color: "#bde0fe"
        }),
        stroke: new Stroke({
            width: 2,
            color: "#a2d2ff"
        })
    })
});


// Add the local static GeoJSON layer here:
let staticGeoJSONSource = new VectorSource({
    url: '../docs/geojson/Slovakia_adm2.geojson', 
    format: new GeoJSON()
});

let staticGeoJSONLayer = new Vector({
    title: "Slovakia County",
    source: staticGeoJSONSource,
    style: new Style({
        fill: new Fill({
            color: "rgba(255, 127, 80, 0.5)"
        }),
        stroke: new Stroke({
            width: 2,
            color: "#ff7f50"
        })
    })
});

//overlayLayers.getLayers().push(staticGeoJSONLayer);

// Add the popup code here:
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popup = new Overlay({
    element: container
}); 

map.addOverlay(popup);

closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur(); 
    return false;
};


// Add the singleclick event code here
map.on('singleclick', function (event) {
    var feature = map.forEachFeatureAtPixel(
        event.pixel, 
        function (feature, layer) {
            if(layer == staticGeoJSONLayer){
                return feature;
            }
        }
    );

    if (feature != null) {
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);

        content.innerHTML =
            '<h5>Administrative Level 2</h5><br>' +
            '<span>' +
            feature.get('name_2') + ', ' +
            feature.get('name_1')
            '</span>';
    }
});

// Add the pointermove event code here:
map.on('pointermove', function(event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});







function getLegendElement(title, color){
    return '<li>' + 
        '<span class="legend-color" style="background-color: ' + color + ' ">' + 
        '</span><span>' + 
        title +
        '</span></li>';
}

async function updateLegend() {
    let legendHTMLString = '<ul>';
    for (let overlayLayer of overlayLayers.getLayers().getArray()) {
        if (overlayLayer.getSource() instanceof ImageWMS && overlayLayer.getVisible()) {
            // Instead of JSON, request the PNG image:
            let legendUrl = overlayLayer.getSource().getLegendUrl();
            let layerTitle = overlayLayer.get('title');
            legendHTMLString += `<li>
                <span>${layerTitle}</span><br>
                <img src="${legendUrl}" style="max-width: 150px; border:1px solid #ccc; background:white;">
                </li>`;
        } else if (overlayLayer.getVisible()) {
            let layerStyle = overlayLayer.getStyle();
            let layerColor = layerStyle.getFill().getColor();
            let layerTitle = overlayLayer.get('title');
            legendHTMLString += getLegendElement(layerTitle, layerColor);
        }
    }
    legendHTMLString += "</ul>";
    document.getElementById('legend-content').innerHTML = legendHTMLString;
}

// Listen for visibility changes on each overlay layer
for (let overlayLayer of overlayLayers.getLayers().getArray()) {
    overlayLayer.on('change:visible', updateLegend);
}

// Update legend at startup
updateLegend();





// Add the layer groups to the map here, at the end of the script!
map.addLayer(basemapLayers);
map.addLayer(overlayLayers);



