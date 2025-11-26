import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    // Get all the images from the messages and set them to state
    useEffect(() => {
        if (messages) {
            setMsgImages(
                messages.filter(msg => msg.image).map(msg => msg.image)
            )
        }
    }, [messages])

    return selectedUser ? (
        // Main Container: Dark Glassmorphism to match ChatContainer
        // Added border-l for separation and h-full to fill height
        <div className={`bg-slate-900/50 backdrop-blur-lg border-l border-white/10 text-white w-full h-full relative overflow-y-scroll custom-scrollbar ${selectedUser ? "max-md:hidden" : ""}`}>

            {/* ------- Profile Header ------- */}
            <div className='pt-12 pb-8 flex flex-col items-center gap-4 text-center mx-auto px-6'>

                {/* Image Container with Glow */}
                <div className='relative group'>
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <img
                        src={selectedUser?.profilePic || assets.avatar_icon}
                        alt=""
                        className='relative w-28 h-28 aspect-square rounded-full object-cover border-4 border-slate-900 shadow-xl'
                    />
                    {/* Online Status Dot - Positioned on avatar for cleaner look */}
                    {onlineUsers.includes(selectedUser._id) && (
                        <div className='absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]'></div>
                    )}
                </div>

                <div className='space-y-1'>
                    <h1 className='text-xl font-bold tracking-wide flex items-center justify-center gap-2'>
                        {selectedUser.fullName}
                    </h1>
                    <p className='text-sm text-gray-400 font-light max-w-[200px] leading-relaxed'>
                        {selectedUser.bio || "No bio available"}
                    </p>
                </div>
            </div>

            <hr className="border-white/10 w-[85%] mx-auto" />

            {/* ------- Media Section ------- */}
            <div className="p-6">
                <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4'>Shared Media</p>

                {/* Media Grid */}
                {msgImages.length > 0 ? (
                    <div className='grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1'>
                        {msgImages.map((url, index) => (
                            <div
                                key={index}
                                onClick={() => window.open(url)}
                                className='group relative cursor-pointer rounded-xl overflow-hidden aspect-square border border-white/5 bg-white/5 hover:border-purple-500/50 transition-all'
                            >
                                <img
                                    src={url}
                                    alt=""
                                    className='w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-500'
                                />
                                {/* Hover overlay */}
                                <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors'></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-8 text-gray-500 text-sm italic'>
                        No media shared yet
                    </div>
                )}
            </div>

            {/* ------- Logout Button ------- */}
            {/* Added padding bottom to container so content isn't hidden behind button */}
            <div className='absolute bottom-8 left-0 right-0 px-8'>
                <button
                    onClick={() => logout()}
                    className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-purple-900/20 transform hover:-translate-y-0.5 transition-all duration-200 text-sm tracking-wide'
                >
                    Logout
                </button>
            </div>

            {/* Spacer for bottom scrolling */}
            <div className="h-24"></div>
        </div>
    ) : null
}

export default RightSidebar










// $ old version
// import React, { useContext, useEffect, useState } from 'react'
// import assets from '../assets/assets'
// import { ChatContext } from '../../context/ChatContext'
// import { AuthContext } from '../../context/AuthContext'

// const RightSidebar = () => {

//     const { selectedUser, messages } = useContext(ChatContext)
//     const { logout, onlineUsers } = useContext(AuthContext)
//     const [msgImages, setMsgImages] = useState([])

//     // Get all the images from the messages and set them to state
//     useEffect(() => {
//         setMsgImages(
//             messages.filter(msg => msg.image).map(msg => msg.image)
//         )
//     }, [messages])

//     return selectedUser && (
//         <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>

//             <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
//                 <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
//                     className='w-20 aspect-[1/1] rounded-full' />
//                 <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
//                     {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
//                     {selectedUser.fullName}
//                 </h1>
//                 <p className='px-10 mx-auto'>{selectedUser.bio}</p>
//             </div>

//             <hr className="border-[#ffffff50] my-4" />

//             <div className="px-5 text-xs">
//                 <p>Media</p>
//                 <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
//                     {msgImages.map((url, index) => (
//                         <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
//                             <img src={url} alt="" className='h-full rounded-md' />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <button onClick={() => logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
//                 Logout
//             </button>
//         </div>
//     )
// }

// export default RightSidebar
