import express from 'express'
import MapService from "../services/MapService.js";

var router = express.Router()

router.post('/', function(req, res) {
    MapService.createMap(req, res)
})

router.put('/*', function (req, res) {
    MapService.updateMap(req, res)
})

router.delete('/*', function (req, res) {
    MapService.deleteMap(req, res)
})

export default router
