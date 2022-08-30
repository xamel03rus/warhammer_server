import { GameServer } from "../models/GameServer.js";

class GameServerService
{
    createGameServer(req, res)
    {
        const {title, player_count} = req.body
        if(!title || !player_count)
            res.status(400).send("All is required")

        GameServer.findOne({
            creator_id: req.player._id
        }, function (err, gameServer) {
            if(err) throw err
            if(gameServer) res.status(400).send("Already exist")

            gameServer = new GameServer({
                title: title,
                player_count: player_count,
                creator_id: req.player._id
            })
            gameServer.save()

            res.status(201).send(gameServer)
        })
    }

    async connectToGameServer(req, res)
    {
        const {game_server_id} = req.body
        if(!game_server_id) {
            res.status(400).send('No server id')
            return
        }

        const gameServer = await GameServer.findById(game_server_id).exec()
        if(!gameServer) {
            res.status(404).send('server not found')
            return
        }

        let playerExist = gameServer.players.filter(p => p.player.equals(req.player._id))
        if(playerExist.length) {
            res.status(400).send("already connected")
            return
        }

        gameServer.players.push({
            player: req.player
        })
        gameServer.save()

        res.status(200).send("You're connect to game server")
    }

    async disconnectFromGameServer(req, res)
    {
        const {game_server_id} = req.body
        if(!game_server_id) {
            res.status(400).send('No server id')
            return
        }

        const gameServer = await GameServer.findById(game_server_id).exec()
        if(!gameServer) {
            res.status(404).send('server not found')
            return
        }

        gameServer.players = gameServer.players.filter(p => p.player.equals(req.player._id) === false)
        gameServer.save()

        res.status(200).send("You're disconnect to game server")
    }

    getGameServersList(req, res)
    {
        GameServer.find().exec(function(err, gameServers) {
            if(err) throw err
            res.status(200).send({
                gameservers: gameServers
            })
        })
    }
}

export default new GameServerService()