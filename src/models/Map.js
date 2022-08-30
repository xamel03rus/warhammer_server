import mongoose from 'mongoose'
import {OpposingSide} from "./OpposingSide.js";

const { Schema } = mongoose

const MapSchema = new Schema({
    title:  String,
    opposing_sides: [{
        opposing_side: {
            type: Schema.Types.ObjectId,
            ref: 'OpposingSide'
        },
        group: Number
    }]
})
const Map = mongoose.model('Map', MapSchema)

export {MapSchema, Map}