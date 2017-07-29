const showMapLoader = (show, total, index) => {
  return {
    type: 'SHOW_MAP_LOADER',
    showLoadingWheel: show,
    tilesToLoad: total,
    tilesLoaded: index
  }
}

export default showMapLoader
