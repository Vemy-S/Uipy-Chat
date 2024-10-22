import { Link } from "react-router-dom"
import { GrConfigure } from "react-icons/gr"
import { useAuthStore } from "../../store/useAuthStore"

type userCardProps = {
    handleLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function UserCard({ handleLogout }: userCardProps) {
  const credentials = useAuthStore(state => state.credentials)
  return (
    <div className="flex justify-between bg-gray-800 p-4 rounded-lg text-gray-300 shadow-md">
      <div className="flex items-center">
        <h1 className="font-extrabold text-xl mr-2">
          {credentials.username}#{credentials.user_id}
        </h1>
        <Link 
          to={'/settings'} 
          className="mt-1 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <GrConfigure size={20} />
        </Link>
      </div>
      
      <button
        onClick={handleLogout}
        className="hover:text-white flex items-center transition-colors duration-200"
      >
        Desconectarse
      </button>
    </div>
  )
}
