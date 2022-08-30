import mongoose from 'mongoose'

const { DATABASE_URL } = process.env

export default async function databaseConnect() {
    await mongoose.connect(DATABASE_URL)
}