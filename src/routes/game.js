import express from 'express'
import GameServerService from '../services/GameServerService.js'

var router = express.Router()

router.get('/', function (req, res) {
    GameServerService.getGameServersList(req, res)
})

router.post('/', function(req, res) {
    GameServerService.createGameServer(req, res)
})

router.post('/connect', function (req, res) {
    GameServerService.connectToGameServer(req, res)
})

router.post('/disconnect', function (req, res) {
    GameServerService.disconnectFromGameServer(req, res)
})

export default router
