import { Buffer } from 'node:buffer'
import {Player} from "../models/Player.js"
import {GameServer} from "../models/GameServer.js"

class MessageService
{
    async Handle(server, address, port, mes)
    {
        let data = JSON.parse(mes)
        if(!data.player_id || !data.game_server_id) return

        const currentPlayer = await Player.findById(data.player_id).exec()
        const gameServer = await GameServer.findById(data.game_server_id).exec()
        if(!gameServer || !currentPlayer) return

        gameServer.players.forEach(p => {
            if(p.player.equals(currentPlayer._id) === false) return

            p.address = address
            p.port = port
            p.position = data.position
            p.rotation = data.rotation
            p.aim_target = data.aim_target
            p.bone_target = data.bone_target
        })
        gameServer.save()

        this.translateToPlayer(server, address, port, JSON.stringify({players: gameServer.players}))
    }

    translateToPlayer(server, address, port, mes)
    {
        if(!address || !port) return

        var response = Buffer.from(mes)
        server.send(response, port, address,function(error){
            if(error){
                client.close()
            }else{
                console.log(`Data sent to ${address}:${port}`)
            }
        })

    }
}

export default new MessageService()