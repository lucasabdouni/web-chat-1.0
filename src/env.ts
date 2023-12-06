// import { z } from 'zod'

// const envSchema = z.object({
//   NEXT_PUBLIC_API_BASE_URL: z.string().url(),
//   APP_URL: z.string().url(),
// })

// console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

// const parsedEnv = envSchema.safeParse(process.env)

// if (!parsedEnv.success) {
//   console.error(
//     'Invalid environment variables',
//     parsedEnv.error.flatten().fieldErrors,
//   )

//   throw new Error('Invalid environment variables.')
// }

// export const env = parsedEnv.data
