import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

    const { messages, selectedUser, setSelectedUser, sendMessage,
        getMessages } = useContext(ChatContext)

    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()

    const [input, setInput] = useState('');

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return null;
        await sendMessage({ text: input.trim() });
        setInput("")
    }

    // Handle sending an image
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("select an image file")
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return selectedUser ? (
        // Main Container: Flex column layout handles heights better than absolute positioning
        <div className='flex flex-col h-full relative bg-slate-900/50 backdrop-blur-lg overflow-hidden'>

            {/* ------- Header ------- */}
            <div className='flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md z-10'>
                <img
                    src={selectedUser.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full border border-white/20 shadow-lg"
                />
                <div className='flex-1 min-w-0'>
                    <p className='text-lg font-semibold text-white truncate flex items-center gap-2'>
                        {selectedUser.fullName}
                        {onlineUsers.includes(selectedUser._id) && (
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        )}
                    </p>
                    <p className='text-xs text-gray-400'>
                        {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden w-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity' />
                    <img src={assets.help_icon} alt="" className='max-md:hidden w-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity' />
                </div>
            </div>

            {/* ------- Chat Area ------- */}
            {/* flex-1 allows this area to take all available space, pb-24 makes room for the input bar */}
            <div className='flex-1 overflow-y-scroll p-6 pb-24 flex flex-col gap-6 custom-scrollbar'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>

                        {/* Avatar for receiver only */}
                        {msg.senderId !== authUser._id && (
                            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full mb-1 border border-white/10' />
                        )}

                        <div className={`flex flex-col ${msg.senderId === authUser._id ? 'items-end' : 'items-start'} max-w-[75%] sm:max-w-[60%]`}>

                            {msg.image ? (
                                <div className='relative group'>
                                    <img src={msg.image} alt="" className='max-w-full sm:max-w-[280px] rounded-2xl border border-white/10 shadow-lg mb-1' />
                                </div>
                            ) : (
                                <div className={`p-3.5 px-5 text-[15px] leading-relaxed shadow-md mb-1 break-words
                                    ${msg.senderId === authUser._id
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-none'
                                        : 'bg-white/10 backdrop-blur-sm border border-white/10 text-gray-100 rounded-2xl rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            )}

                            <p className='text-[10px] font-medium text-gray-400 px-1 opacity-70'>
                                {formatMessageTime(msg.createdAt)}
                            </p>
                        </div>

                        {/* Avatar for sender only */}
                        {msg.senderId === authUser._id && (
                            <img src={authUser?.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full mb-1 border border-white/10' />
                        )}
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* ------- Bottom Input Area ------- */}
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent'>
                <div className='flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-2xl'>

                    {/* Image Upload Button */}
                    <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
                    <label htmlFor="image" className='p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors group'>
                        <img src={assets.gallery_icon} alt="" className="w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </label>

                    {/* Text Input */}
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
                        type="text"
                        placeholder="Type a message..."
                        className='flex-1 bg-transparent text-white placeholder-gray-400 text-sm px-2 outline-none'
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        className={`p-2.5 rounded-full transition-all duration-300 ${input.trim() ? 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/30' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        <img src={assets.send_button} alt="" className={`w-5 ${input.trim() ? 'invert brightness-0' : 'opacity-60'}`} />
                    </button>

                </div>
            </div>

        </div>
    ) : (
        // Empty State - Consistent Theme
        <div className='flex flex-col items-center justify-center h-full gap-4 text-white bg-slate-900/50 backdrop-blur-lg max-md:hidden'>
            <div className='relative'>
                <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <img src={assets.logo_icon} className='relative w-24 opacity-90 drop-shadow-2xl' alt="" />
            </div>
            <div className='text-center space-y-2'>
                <h2 className='text-2xl font-bold tracking-wide'>Welcome to QuickChat</h2>
                <p className='text-gray-400'>Select a chat to start messaging</p>
            </div>
        </div>
    )
}

export default ChatContainer









// $ old version
// import React, { useContext, useEffect, useRef, useState } from 'react'
// import assets from '../assets/assets'
// import { formatMessageTime } from '../lib/utils'
// import { ChatContext } from '../../context/ChatContext'
// import { AuthContext } from '../../context/AuthContext'
// import toast from 'react-hot-toast'

// const ChatContainer = () => {

//     const { messages, selectedUser, setSelectedUser, sendMessage,
//         getMessages } = useContext(ChatContext)

//     const { authUser, onlineUsers } = useContext(AuthContext)

//     const scrollEnd = useRef()

//     const [input, setInput] = useState('');

//     // Handle sending a message
//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (input.trim() === "") return null;
//         await sendMessage({ text: input.trim() });
//         setInput("")
//     }

//     // Handle sending an image
//     const handleSendImage = async (e) => {
//         const file = e.target.files[0];
//         if (!file || !file.type.startsWith("image/")) {
//             toast.error("select an image file")
//             return;
//         }
//         const reader = new FileReader();

//         reader.onloadend = async () => {
//             await sendMessage({ image: reader.result })
//             e.target.value = ""
//         }
//         reader.readAsDataURL(file)
//     }

//     useEffect(() => {
//         if (selectedUser) {
//             getMessages(selectedUser._id)
//         }
//     }, [selectedUser])

//     useEffect(() => {
//         if (scrollEnd.current && messages) {
//             scrollEnd.current.scrollIntoView({ behavior: "smooth" })
//         }
//     }, [messages])

//     return selectedUser ? (
//         <div className='h-full overflow-scroll relative backdrop-blur-lg'>
//             {/* ------- header ------- */}
//             <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
//                 <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
//                 <p className='flex-1 text-lg text-white flex items-center gap-2'>
//                     {selectedUser.fullName}
//                     {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
//                 </p>
//                 <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
//                 <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
//             </div>
//             {/* ------- chat area ------- */}
//             <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
//                         {msg.image ? (
//                             <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
//                         ) : (
//                             <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
//                         )}
//                         <div className="text-center text-xs">
//                             <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
//                             <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={scrollEnd}></div>
//             </div>

//             {/* ------- bottom area ------- */}
//             <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
//                 <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
//                     <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder="Send a message"
//                         className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
//                     <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
//                     <label htmlFor="image">
//                         <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
//                     </label>
//                 </div>
//                 <img onClick={handleSendMessage} src={assets.send_button} alt="" className="w-7 cursor-pointer" />
//             </div>


//         </div>
//     ) : (
//         <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
//             <img src={assets.logo_icon} className='max-w-16' alt="" />
//             <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
//         </div>
//     )
// }

// export default ChatContainer
