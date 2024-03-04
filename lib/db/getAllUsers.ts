import db from './db'

export const getAllUsers = async () => {
  try {
    const existingUsers = await db.user.findMany()
    return existingUsers
  } catch {
    null
  }
}
