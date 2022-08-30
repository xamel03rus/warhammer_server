import mongoose from 'mongoose'
const { Schema } = mongoose

const OpposingSideSchema = new Schema({
    name:  String
})
const OpposingSide = mongoose.model('OpposingSide', OpposingSideSchema)

export {OpposingSideSchema, OpposingSide}