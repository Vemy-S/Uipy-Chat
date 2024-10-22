import { useAuthStore } from "../store/useAuthStore"
import { sendMessage } from "../services/messageService"
import { useParams } from "react-router-dom"
import { useSocketStore } from "../store/useSocketStore"
import { useMessageStore } from "../store/useMessageStore"
import { useSearchStore } from "../store/searchStore"
import { IoIosSend } from "react-icons/io";


export default function MessageForm() {
  const user = useAuthStore(state => state.credentials)
  const setMessage = useMessageStore(state => state.setMessage)
  const message = useMessageStore(state => state.message)
  const setTemporalMessage = useMessageStore(state => state.setTemporalMessage)
  const searchedUser = useSearchStore(state => state.searchedUser)


  const { id } = useParams()

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    if(!id || !searchedUser){
      return console.log('No user selected') //TEST, mandar un mensaje visual y controlar errores, cambiar.
    }
    const receiverId = parseInt(id, 10)
    if(!receiverId) return

    setMessage({
      content: e.target.value,
      senderId: user.user_id,
      receiverId: receiverId,
      groupSender: null,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const messageToSend: any = message
    //TEST
    if(!messageToSend) return

    const messageWithDetails = {
      ...messageToSend,
      sender: {
        user_id: user.user_id,
        username: user.username
      },
      receiver: {
        user_id: searchedUser.user_id,
        username: searchedUser.username
      }
    }
    setTemporalMessage(messageWithDetails)
    sendMessageSocket(messageToSend)
    
    setMessage(null) 
    await sendMessage(messageToSend)
  } 

  const socket = useSocketStore(state => state.socket)

  const sendMessageSocket = (message: any) => {
    const messageWithUsername = {
      ...message,
      receiver: {
        username: searchedUser.username
      },
      sender: {
        username: user.username
      }
    }
    if(socket != null)
    socket.emit('socketMessage', messageWithUsername)
  } 

  return (
    <form
      onSubmit={handleSubmit}
      className="p-1 m-2 rounded-lg"
    >
      <div className="flex">
        <textarea 
          id="message"
          className="bg-gray-200 rounded-lg w-full p-3 m-2 outline-none border border-gray-300 focus:border-blue-400"
          rows={1}
          style={{ resize: "none" }}
          placeholder="Escribe..."
          value={message ? message.content : ''}
          onChange={handleInput}
        />
         <button 
  type="submit" 
  className="bg-indigo-400 hover:bg-indigo-600 transition-colors duration-200 rounded-xl p-3 m-2"
>
  <IoIosSend size={25} className="text-white"/>
</button>

      </div>
    </form>
  )
}
