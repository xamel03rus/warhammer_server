import mongoose from 'mongoose'
import {Player} from "./Player.js";

const { Schema } = mongoose

const GameServerSchema = new Schema({
    title: String,
    creator_id: String,
    player_count: Number,
    players: [
        {
            player: {
                type: Schema.Types.ObjectId,
                ref: 'Player'
            },
            position: {
                x: Number,
                y: Number,
                z: Number
            },
            rotation: {
                x: Number,
                y: Number,
                z: Number
            },
            aim_target: {
                x: Number,
                y: Number,
                z: Number
            },
            bone_target: {
                x: Number,
                y: Number,
                z: Number
            },
            address: String,
            port: Number
        }
    ]
});

const GameServer = mongoose.model('GameServer', GameServerSchema)

export {GameServerSchema, GameServer}