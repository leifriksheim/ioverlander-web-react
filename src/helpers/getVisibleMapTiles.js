let L

if (global.window) {
  L = require('leaflet')
}

export default (map) => {
  var topRight = map.project(map.getBounds()._northEast, 7)
  var bottomLeft = map.project(map.getBounds()._southWest, 7)

  var layerWidth = topRight.x - bottomLeft.x
  var layerHeight = bottomLeft.y - topRight.y

  var tileWidth = 256
  var tileHeight = 256

  var visibleTilesX = Math.ceil((layerWidth) / tileWidth) + 1
  var visibleTilesY = Math.ceil((layerHeight) / tileHeight) + 1

  var originX = tileWidth * (Math.ceil(bottomLeft.x / tileWidth) - 1)
  var originY = tileHeight * (Math.ceil(topRight.y / tileHeight) - 1)

  var TILES = []

  var column = 0
  var row = 0

  while (row < visibleTilesY) {
    while (column < visibleTilesX) {
      var tile = new L.LatLngBounds([
        map.unproject(new L.Point(originX + (tileWidth * column), originY + (tileHeight * row)), 7),
        map.unproject(new L.Point(originX + (tileWidth * column) + tileWidth, originY + (tileHeight * row)), 7),
        map.unproject(new L.Point(originX + (tileWidth * column), originY + (tileHeight * row) + tileHeight), 7),
        map.unproject(new L.Point(originX + (tileWidth * column) + tileWidth, originY + (tileHeight * row) + tileHeight), 7)
      ])

      // new L.rectangle(tile).addTo(map)

      TILES.push(tile)
      column += 1
    }
    row += 1
    column = 0
  }

  return TILES
}
