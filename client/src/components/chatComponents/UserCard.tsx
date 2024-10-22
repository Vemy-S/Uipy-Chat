import { Link } from "react-router-dom"
import { GrConfigure } from "react-icons/gr"
import { useAuthStore } from "../../store/useAuthStore"

type userCardProps = {
    handleLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function UserCard({ handleLogout }: userCardProps) {
  const credentials = useAuthStore(state => state.credentials)
  return (
    <div
        className="flex justify-between bg-indigo-950 p-3 rounded-lg text-gray-300 "
        >
        <div className="flex">
            <h1 className="font-extrabold text-xl">{credentials.username}#{credentials.user_id}</h1>
            <Link 
                    to={'/settings'} 
                    className="mt-1 text-white"
                ><GrConfigure size={20}/>
            </Link>

        </div>
         
            <button
                onClick={handleLogout}
                className="hover:text-white flex gap-1"
            > Desconectarse
           
            </button>
        
    </div>
  )
}
