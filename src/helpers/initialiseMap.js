let L

if (global.window) {
  L = require('leaflet')
}

export default (el, center, zoom) => {
  L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet/v0.7.7/images'

  const OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    id: 'OpenStreetMap',
    detectRetina: true
  })

  const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    id: 'OSM Topographic',
    maxZoom: 16,
    detectRetina: true,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  })

  const WorldTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    id: 'Esri World Topographic Map',
    detectRetina: true,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  })

  const map = window.map = L.map(el, {
    center: center || [34.59704, -13.62305],
    zoom: zoom || 3,
    layers: [OpenStreetMap],
    renderer: new L.Canvas(),
    detectRetina: false
  })

  const waitForMapQuest = () => {
    if (window.MQ && window.MQ.mapLayer) {
      L.control.layers({
        'OpenStreetMap': OpenStreetMap,
        'MapQuest OSM': window.MQ.mapLayer(),
        'OSM Topographic': OpenTopoMap,
        'Esri World Topographic Map': WorldTopo
      }).addTo(map)
    } else {
      setTimeout(waitForMapQuest, 150)
    }
  }

  waitForMapQuest()

  return map
}
