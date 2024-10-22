import { useNavigate, useLocation} from "react-router-dom"
import { getSearchedUser } from "../services/searchService"
import { useEffect, useState } from "react"
import { useSearchStore } from "../store/searchStore"
import { CiSearch } from "react-icons/ci"


export default function Search() {

  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const username = query.get('username') 

  const [inputValue, setInputValue] = useState('')

  const getSearchUser = useSearchStore(state => state.getSearchUser)
 

  useEffect(()=> {
    if(username){
      const fetchSearchedUser = async() => {
        const result = await getSearchedUser(username)
        getSearchUser(result)
      }
      fetchSearchedUser()
    }
  }, [username])
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      
    navigate(`/chat/?username=${inputValue}`)    
  }
   
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
    
  
  return (
    <form onSubmit={handleSearch} className="flex items-center">
      
      <div className="relative w-full mt-2">
        <input
          type="text"
          name="username"
          value={inputValue}
          placeholder="buscar usuario"
          onChange={handleInput}
          className="rounded-md w-full pl-3 pr-10 py-2 border border-gray-300  " 
        />
        <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <button type="submit" className="hidden"></button> 
      </div>
    </form>
  )
}
