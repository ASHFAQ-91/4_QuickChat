import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

    const { getUsers, users, selectedUser, setSelectedUser,
        unseenMessages, setUnseenMessages } = useContext(ChatContext);

    const { logout, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState(false)

    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    return (
        // Main Container: Dark Glassmorphism Theme
        <div className={`bg-slate-900/50 backdrop-blur-lg border-r border-white/10 h-full p-5 overflow-y-scroll custom-scrollbar text-white flex flex-col ${selectedUser ? "max-md:hidden" : 'w-full'}`}>

            <div className='pb-6'>
                {/* Header: Logo and Menu */}
                <div className='flex justify-between items-center mb-6'>
                    <img src={assets.logo} alt="logo" className='max-w-[130px] drop-shadow-lg opacity-90' />

                    {/* Menu Dropdown */}
                    <div className="relative py-2 group">
                        <button className='p-2 hover:bg-white/10 rounded-full transition-colors'>
                            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer opacity-80 group-hover:opacity-100' />
                        </button>

                        {/* Dropdown Content */}
                        <div className='absolute top-full right-0 z-50 w-40 p-2 mt-1 rounded-xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md text-gray-200 hidden group-hover:block transform origin-top-right transition-all'>
                            <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm px-4 py-2 hover:bg-white/10 rounded-lg transition-colors'>Edit Profile</p>
                            <div className="my-1 border-t border-white/10" />
                            <p onClick={() => logout()} className='cursor-pointer text-sm px-4 py-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors'>Logout</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 py-3 px-4 focus-within:border-purple-500 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300'>
                    <img src={assets.search_icon} alt="Search" className='w-4 opacity-50' />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 flex-1'
                        placeholder='Search users...'
                    />
                </div>

            </div>

            {/* User List */}
            <div className='flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar pr-1'>
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group
                            ${selectedUser?._id === user._id
                                ? 'bg-gradient-to-r from-purple-900/40 to-slate-900/40 border border-purple-500/30'
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-10 h-10 aspect-square rounded-full object-cover border border-white/10' />
                            {onlineUsers.includes(user._id) &&
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full'></span>
                            }
                        </div>

                        {/* User Info */}
                        <div className='flex flex-col flex-1 min-w-0'>
                            <div className="flex justify-between items-baseline">
                                <p className={`text-sm font-medium truncate ${selectedUser?._id === user._id ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                    {user.fullName}
                                </p>
                            </div>

                            {/* Subtext (Online status or last message preview could go here) */}
                            {onlineUsers.includes(user._id)
                                ? <span className='text-green-400/80 text-xs font-medium'>Online</span>
                                : <span className='text-gray-500 text-xs'>Offline</span>
                            }
                        </div>

                        {/* Unseen Message Badge */}
                        {unseenMessages[user._id] > 0 && (
                            <div className='flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30'>
                                <p className='text-[10px] font-bold text-white'>{unseenMessages[user._id]}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Sidebar










// $ old version
// import React, { useContext, useEffect, useState } from 'react'
// import assets from '../assets/assets'
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { ChatContext } from '../../context/ChatContext';

// const Sidebar = () => {

//     const { getUsers, users, selectedUser, setSelectedUser,
//         unseenMessages, setUnseenMessages } = useContext(ChatContext);

//     const { logout, onlineUsers } = useContext(AuthContext)

//     const [input, setInput] = useState(false)

//     const navigate = useNavigate();

//     const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

//     useEffect(() => {
//         getUsers();
//     }, [onlineUsers])

//     return (
//         <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
//             <div className='pb-5'>
//                 <div className='flex justify-between items-center'>
//                     <img src={assets.logo} alt="logo" className='max-w-40' />
//                     <div className="relative py-2 group">
//                         <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
//                         <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
//                             <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
//                             <hr className="my-2 border-t border-gray-500" />
//                             <p onClick={() => logout()} className='cursor-pointer text-sm'>Logout</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
//                     <img src={assets.search_icon} alt="Search" className='w-3' />
//                     <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...' />
//                 </div>

//             </div>

//             <div className='flex flex-col'>
//                 {filteredUsers.map((user, index) => (
//                     <div onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
//                         key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
//                         <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full' />
//                         <div className='flex flex-col leading-5'>
//                             <p>{user.fullName}</p>
//                             {
//                                 onlineUsers.includes(user._id)
//                                     ? <span className='text-green-400 text-xs'>Online</span>
//                                     : <span className='text-neutral-400 text-xs'>Offline</span>
//                             }
//                         </div>
//                         {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
//                     </div>
//                 ))}
//             </div>

//         </div>
//     )
// }

// export default Sidebar
