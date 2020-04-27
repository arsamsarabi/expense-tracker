import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithm: ['RS256'],
})
