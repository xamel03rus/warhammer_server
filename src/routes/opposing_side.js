import express from 'express'
import OpposingSideService from "../services/OpposingSideService.js";

var router = express.Router()

router.post('/', function(req, res) {
    OpposingSideService.createOpposingSide(req, res)
})

router.put('/*', function (req, res) {
    OpposingSideService.updateOpposingSide(req, res)
})

router.delete('/*', function (req, res) {
    OpposingSideService.deleteOpposingSide(req, res)
})

export default router
