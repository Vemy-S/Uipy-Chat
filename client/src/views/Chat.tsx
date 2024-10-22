import MessageList from "../components/MessageList"
import ContactList from "../components/ContactList"
import MessageForm from "../components/MessageForm"
import Search from "../components/Search"
import { useAuthStore } from "../store/useAuthStore"
import { useMessageStore } from "../store/useMessageStore"
import { useSocketStore } from "../store/useSocketStore"
import { useSocketConnection } from "../hooks/useSocketConnection"
import { useSearchStore } from "../store/searchStore"
import UserCard from "../components/chatComponents/UserCard"
import TitleDivider from "../components/chatComponents/TitleDivider"

export default function Chat() {

  const clear = useAuthStore(state => state.clear)
  const clearMessages = useMessageStore(state => state.clearMessageList)
  const disconnect = useSocketStore(state => state.disconnect)
  const clearSearchedUser = useSearchStore(state => state.clearSearchedUser)
  useSocketConnection()
 
  const handleLogout = () => {
    clear()
    clearMessages()
    disconnect()
    clearSearchedUser()
  }

  return (
    <section className=" grid md:grid-cols-2">
      
        <aside className="">

        <UserCard
          handleLogout={handleLogout}
        />
        <h1 className="text-2xl font-bold">Chats</h1> 
          <Search/>
          <TitleDivider/>
          <ContactList/>
        </aside>

        <section className="flex flex-col">
            <MessageList/>
            <div>
                <MessageForm/>
            </div>
        </section>
    </section>
  )
}
