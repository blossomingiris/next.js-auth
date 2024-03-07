import { User } from '@prisma/client'

type UserTableProps = {
  users: User[]
}

export const UsersTable = (props: UserTableProps) => {
  const { users } = props

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[300px] border-collapse border border-gray-200 w-full">
        <thead>
          <tr className="bg-sky-100">
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Full Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-200 p-2">{user.id}</td>
              <td className="border border-gray-200 p-2">{user.name}</td>
              <td className="border border-gray-200 p-2">{user.email}</td>
              <td className="border border-gray-200 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
