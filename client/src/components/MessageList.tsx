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

  //Agregar keys, cambiar.
  return (
    <>
         <div className="p-4 space-y-2 flex-grow">
        {filteredMessages.map(messageInfo => (
          <ul 
            key={messageInfo.message_id} 
            className={`flex ${messageInfo.senderId === userAuth ? 'justify-end' : 'justify-start'}`}
          >
            <li className="mr-2 font-semibold">
              {messageInfo.senderId === userAuth ? 'Tú' : messageInfo.sender.username}:
            </li>
            <li className="bg-gray-200 p-2 rounded-lg">
              {messageInfo.content}
            </li>
          </ul>
        ))}
      </div> 
    </>
  )
}
