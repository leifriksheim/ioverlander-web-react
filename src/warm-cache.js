'use strict'

const models = require('./db/models')
const speakingurl = require('speakingurl')
const request = require('superagent')

let allPlaces = []
let i = 0

const warmCacheForIndex = (i) => {
  console.log('Warming index ' + i)
  request.get('http://localhost:3000/api/place/' + allPlaces[i].id).end(() => {
    if (i !== allPlaces.length - 1) {
      i += 1
      warmCacheForIndex(i)
    }
  })
}

models.places.findAll().then((places) => {
  allPlaces = places
  warmCacheForIndex(i)
})
