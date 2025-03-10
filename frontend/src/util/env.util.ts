import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_GATEWAY_HOST: z.string(),
})

const env = envSchema.parse({
  NEXT_PUBLIC_API_GATEWAY_HOST: process.env.NEXT_PUBLIC_API_GATEWAY_HOST
})

export default env
