import { useSearchStore } from "../store/searchStore"
import { Link } from "react-router-dom"
import { LuUser2 } from "react-icons/lu";

export default function ContactList() {

  const user = useSearchStore(state => state.searchedUser)
  return (
    <ul className="space-y-2">
      <li className="bg-gray-800 m-2 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md">
        <Link to={`/chat/${user.user_id}`} className="flex items-center">
          <LuUser2 size={25} className="mr-4 text-gray-300" />
          <div>
            <h1 className="text-lg font-bold text-gray-200">{user.username}</h1>
            <p className="text-sm text-gray-400">Último mensaje</p>
          </div>
        </Link>
      </li>
    </ul>
  )
}
