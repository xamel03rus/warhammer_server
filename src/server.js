import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import gameServerRouter from './routes/game.js'
import mapRouter from './routes/map.js'
import opposingSideRouter from './routes/opposing_side.js'
import playerAuthManageRouter from './routes/auth.js'
import playerRouter from "./routes/player.js"
import databaseConnect from './database.js'
import listenSocket from "./socket.js"
import verifyToken from "./middleware/jwt.js"

const app = express()
const port = process.env.APP_PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', playerAuthManageRouter)
app.use('/player', playerRouter)
app.use('/game_servers', verifyToken, gameServerRouter)
app.use('/maps', verifyToken, mapRouter)
app.use('/opposing_sides', verifyToken, opposingSideRouter)

databaseConnect().catch(err => console.log(err))
listenSocket()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
