import mongoose from 'mongoose'
const { Schema } = mongoose

const PlayerSchema = new Schema({
    nickname: String,
    email: String,
    password: String
})
const Player = mongoose.model('Player', PlayerSchema)

export { PlayerSchema, Player }