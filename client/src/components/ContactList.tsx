import { useSearchStore } from "../store/searchStore"
import { Link } from "react-router-dom"
import { LuUser2 } from "react-icons/lu";

export default function ContactList() {

  const user = useSearchStore(state => state.searchedUser)
  return (
    <>
    <ul className="">
    <li className="bg-indigo-950 m-2 p-4 rounded-lg hover:bg-indigo-500">
      <Link to={`/chat/${user.user_id}`} className="flex items-center">
        <LuUser2 size={25} className="mr-4 text-indigo-300" />
        <div>
          <h1 className="text-lg font-bold text-indigo-100">{user.username}</h1> 
          <p className="text-sm text-gray-300">Last message</p> 
        </div>
      </Link>
    </li>
  </ul>
    </>
  )
}
