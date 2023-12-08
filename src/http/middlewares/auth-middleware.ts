import { FastifyRequest, FastifyReply } from 'fastify'

interface jwt {
  sub: string
  iat: number
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decodedToken: jwt = await request.jwtVerify()
    
    if (Math.floor(Date.now() / 1000) >= decodedToken.iat + (60 * 60)) {
      return reply.status(401).send({message: 'Unauthorized.'})
    }

  } catch (error) {
    console.log(error)
    return reply.status(401).send({message: 'Unauthorized.'})
  }
}