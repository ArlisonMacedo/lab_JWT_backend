import express from 'express'
import { create, login, profile } from './controllers/UserController'
import { auth } from './middlewares/auth'
const routes = express.Router()

routes.post('/users', create)
routes.post('/users/session', login)

routes.use(auth)

routes.get('/profile/:email', profile)
export default routes
