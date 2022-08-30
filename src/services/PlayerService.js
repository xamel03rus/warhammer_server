class PlayerService
{
    getPlayer(req, res)
    {
        res.status(200).send(req.player)
    }
}

export default new PlayerService()