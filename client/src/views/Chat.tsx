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
    <section className="grid md:grid-cols-3 min-h-screen px-4 md:px-6 gap-6">
      
      <aside className="rounded-lg bg-gray-100 border border-gray-300 shadow-lg p-4">
        <UserCard handleLogout={handleLogout} />
        <h1 className="text-2xl font-bold m-2">Chats</h1>
        <Search />
        <TitleDivider />
        <ContactList />
      </aside>

      <section className="flex flex-col col-span-2 ml-4 bg-slate-50 rounded-lg p-4 shadow-md"> {/*ACA TA PA CAMBIAR EL COLOR DE LO Q YO SE */}
        <MessageList />
        <div className="bg-gray-800 p-2 rounded-b-lg">
          <MessageForm />
        </div>
      </section>

</section>
  )
}
