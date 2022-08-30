import {Player} from '../models/Player.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

class AuthService
{
    authorizePlayer(req, res)
    {
        try {
            const { nickname, password } = req.body

            if (!(nickname && password)) {
                res.status(400).send("All input is required")
            }

            Player.findOne({ nickname }, function (err, player) {
                if(err) throw err

                if(!player || !(bcrypt.compare(password, player.password))) res.status(400).send("Invalid Credentials")

                res.status(200).json({
                    token: jwt.sign(
                        {player_id: player._id, nickname},
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        })
                })
            })
        } catch (err) {
            throw err
        }
    }
}

export default new AuthService()