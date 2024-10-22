import { useGetMessage } from "../services/getMessage"
import { useMessageStore } from "../store/useMessageStore"
import { useSocketMessages } from "../hooks/useSocketMessage"
import { useAuthStore } from "../store/useAuthStore"
import { useSearchStore } from "../store/searchStore"

export default function MessageList() {
  useGetMessage()
  useSocketMessages()
  const messageList = useMessageStore(state => state.messageList)
  const userAuth = useAuthStore(state => state.credentials.user_id)
  const selectedUser = useSearchStore(state => state.searchedUser.username)

  const filteredMessages = messageList.filter((message)=>
    message.sender.username === selectedUser ||
    message.receiver.username === selectedUser
  )

  return (
    <section className="flex flex-col flex-grow col-span-2 ml-4 bg-slate-50 rounded-lg p-4">
  {filteredMessages.map((messageInfo, index) => (
    <div key={messageInfo.message_id} className="mb-2">
      <ul 
        className={`flex ${messageInfo.senderId === userAuth ? 'justify-end' : 'justify-start'}`}
      >
        <li className={`mr-2 font-semibold text-gray-800 ${index > 0 && filteredMessages[index - 1].senderId === messageInfo.senderId ? 'invisible' : ''}`}>
          {messageInfo.senderId === userAuth ? 'Tú' : messageInfo.sender.username}:
        </li>
        <li className={`p-2 rounded-lg shadow-md transition duration-200 ease-in-out hover:shadow-lg ${
          messageInfo.senderId === userAuth 
            ? 'bg-yellow-400 text-gray-800 border border-yellow-600' 
            : 'bg-slate-100 text-gray-800 border border-slate-300'
        }`}>
          {messageInfo.content}
        </li>
      </ul>
    </div>
  ))}
</section>
  )
}

