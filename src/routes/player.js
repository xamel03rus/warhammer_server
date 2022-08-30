import express from 'express'
import PlayerService from "../services/PlayerService.js"
import verifyToken from "../middleware/jwt.js"

var router = express.Router()

router.get('/', verifyToken, function(req, res) {
    PlayerService.getPlayer(req, res)
})

export default router