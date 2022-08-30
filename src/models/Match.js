import mongoose from 'mongoose'
import {Map} from "./Map.js";

const { Schema } = mongoose

const MatchSchema = new Schema({
    date: {type: Date, default: Date.now},
    map: {
        type: Schema.Types.ObjectId,
        ref: 'Map'
    }
});
const Match = mongoose.model('Match', MatchSchema)

export {MatchSchema, Match}