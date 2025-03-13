import { z } from 'zod'

const envSchema = z.object({
  REDIS_HOST: z.string(),
})

const env = envSchema.parse({
  REDIS_HOST: process.env.REDIS_HOST
})

export default env
