// eslint-disable-next-line
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export const auth = async (request: Request, response: Response, next: NextFunction) => {
  const auth = request.headers.authorization

  if (!auth) {
    return response.status(401).json({ error: 'Token is required' })
  }

  const [, token] = auth.split(' ')

  try {
    await jwt.verify(token, String(process.env.APP_SECRET_KEY))
    next()
  } catch (error) {
    return response.status(401).json({ msg: 'Token is Invalid' })
  }
}
