import express from 'express'
import RegisterService from "../services/RegistrationService.js"
import AuthService from "../services/AuthService.js"

var router = express.Router()

router.post('/register', function(req, res) {
    RegisterService.registrationPlayer(req, res)
})

router.post('/login', function(req, res) {
    AuthService.authorizePlayer(req, res)
})

export default router