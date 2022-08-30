import { Player } from '../models/Player.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class RegistrationService
{
    registrationPlayer(req, res)
    {
        try {
            const { nickname, email, password } = req.body


            if (!(email && password && nickname)) {
                res.status(400).send("All input is required")
            }

            Player.findOne({ nickname }, function (err, player) {
                if(err) throw err
                if(player) res.status(409).send("Player Already Exist. Please Login")

                player = new Player({
                    nickname,
                    email: email.toLowerCase(),
                    password: bcrypt.hashSync(password, 10),
                })
                player.save()

                res.status(201).json({
                    token: jwt.sign(
                        { player_id: player._id, nickname },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    )
                })
            })
        } catch (err) {
            throw err
        }
    }
}

export default new RegistrationService()