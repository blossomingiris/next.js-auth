import { FiLogOut } from 'react-icons/fi'

import LogoutButton from './LogoutButton'

export default function Navbar() {
  return (
    <nav className="bg-white absolute top-6 flex justify-between items-center p-3 rounded-xl w-[95vw] shadow-sm max-w-[600px]">
      <LogoutButton>
        <FiLogOut size={20} />
      </LogoutButton>
    </nav>
  )
}
