import db from '@/lib/db'

export const getUserByCondition = async (condition: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: condition,
      },
    })
    return existingUser
  } catch {
    null
  }
}
