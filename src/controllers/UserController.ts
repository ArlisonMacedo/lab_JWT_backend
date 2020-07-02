// eslint-disable-next-line
import { Request, Response } from 'express'
import connection from '../database/connection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const create = async (request: Request, response: Response) => {
  const { name, email, password } = request.body

  const passwordHash = await bcrypt.hash(password, 8)

  const user = await connection('users').insert({
    name,
    email,
    password: passwordHash
  })

  return response.json(user)
}

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = await connection('users').where('email', email).select('*')

  if (user.length === 1) {
    if (await bcrypt.compare(password, user[0].password)) {
      const token = jwt.sign(
        { id: user[0].id },
        String(process.env.APP_SECRET_KEY),
        {
          expiresIn: '1d'
        }
      )

      // await connection('tokens').insert({
      //   token,
      //   user_id: user[0].id
      // })

      const data = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token
      }

      return response.json(data)
    } else {
      return response.status(404).json({ error: 'user not found' })
    }
  } else {
    return response.status(404).json({ error: 'User not found' })
  }
}

export const profile = async (request: Request, response: Response) => {
  const { email } = request.params
  const user = await connection('users')
    .where('email', email)
    .select('*')
    .first()

  return response.json(user)
}
