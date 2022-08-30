import jwt from 'jsonwebtoken'
import {Player} from "../models/Player.js";

export default async function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }

    try {
        let jwt_data = jwt.verify(token, process.env.TOKEN_KEY)
        const player = await Player.findById(jwt_data.player_id).exec()

        if(!player) throw err

        req.player = player
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
    return next();
};