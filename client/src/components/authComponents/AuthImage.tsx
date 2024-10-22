import chatting from '../../assets/chatting.svg'

export default function AuthImage() {
  return (
    <div className='rounded-lg flex flex-col items-center justify-center h-[350px] w-[350px]  mx-auto p-6 max-w-full md:h-[700px] md:w-[800px]'>
        <img 
            src={chatting} 
            alt="image in auth section" 
            className='max-w-full h-auto'
            />
    </div>
  )
}
