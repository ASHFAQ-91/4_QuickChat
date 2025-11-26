import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    }
  }

  // Helper to decide which image to show
  const displayImage = selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.logo_icon);

  return (
    // 1. Background: Changed to the dark purple gradient from the LoginPage
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>

      {/* 2. Main Card: Kept the layout but made it dark and transparent (glassmorphism) */}
      <div className='relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden flex max-md:flex-col-reverse'>

        {/* Left Section: Form Fields */}
        {/* Removed bg-white/40 and changed text colors to white/gray for dark mode */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-8 p-10 sm:p-16 flex-1 w-full">

          <div>
            <h3 className="text-4xl font-extrabold text-white tracking-tight">Edit Profile</h3>
            <p className="text-gray-300 mt-2">Update your personal details and present your best self.</p>
          </div>

          <div className="space-y-6">
            {/* Name Input with Icon */}
            <div className="relative group">
              <label className="text-sm font-semibold text-gray-300 mb-2 block ml-1">Display Name</label>
              <div className="relative">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  required
                  placeholder='e.g., Jane Doe'
                  // Changed input style to dark and transparent
                  className='w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300'
                />
                {/* User SVG Icon - changed color */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Bio Textarea */}
            <div className="relative group">
              <label className="text-sm font-semibold text-gray-300 mb-2 block ml-1">About You</label>
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Tell the world a little bit about yourself..."
                required
                // Changed textarea style to dark and transparent
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 resize-none"
                rows={5}>
              </textarea>
            </div>
          </div>

          {/* Submit Button - Updated shadow to match dark theme */}
          <button type="submit" className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Save Changes
          </button>

        </form>

        {/* Right Section: Image Upload */}
        {/* Changed background to a dark, subtle gradient and updated text colors */}
        <label htmlFor="avatar" className='relative flex-1 min-h-[400px] bg-gradient-to-br from-white/5 to-purple-900/20 flex flex-col items-center justify-center p-10 cursor-pointer group overflow-hidden border-l border-white/10'>
          <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />

          {/* Kept the noise texture but made it more subtle for dark mode */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

          <div className='relative z-10 flex flex-col items-center transition-transform duration-300 group-hover:scale-105'>
            {/* The Image Container */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                // Updated border and default background for the image
                className={`relative w-64 h-64 object-cover rounded-[40px] border-[6px] border-white/20 shadow-2xl ${displayImage ? 'rounded-[40px]' : 'rounded-full p-8 bg-white/10'}`}
                src={displayImage}
                alt="Profile"
              />
              {/* Overlay icon on hover */}
              <div className="absolute inset-0 bg-slate-900/50 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
            </div>

            <div className="mt-8 text-center">
              {/* Updated text colors for dark mode */}
              <p className="text-white text-lg font-bold group-hover:text-purple-300 transition-colors">
                {selectedImg ? "Change Image" : "Upload Photo"}
              </p>
              <p className="text-gray-400 text-sm mt-2 font-medium">Tap to select from gallery</p>
            </div>
          </div>
        </label>

      </div>
    </div>
  )
}

export default ProfilePage











// $ old version
// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import assets from '../assets/assets';
// import { AuthContext } from '../../context/AuthContext';

// const ProfilePage = () => {

//   const { authUser, updateProfile } = useContext(AuthContext)

//   const [selectedImg, setSelectedImg] = useState(null)
//   const navigate = useNavigate();
//   const [name, setName] = useState(authUser.fullName)
//   const [bio, setBio] = useState(authUser.bio)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedImg) {
//       await updateProfile({ fullName: name, bio });
//       navigate('/');
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedImg);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       await updateProfile({ profilePic: base64Image, fullName: name, bio });
//       navigate('/');
//     }

//   }

//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
//       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
//           <h3 className="text-lg">Profile details</h3>
//           <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
//             <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
//             <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
//             upload profile image
//           </label>
//           <input onChange={(e) => setName(e.target.value)} value={name}
//             type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
//           <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Write profile bio" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" rows={4}></textarea>

//           <button type="submit" className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer">Save</button>
//         </form>
//         <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
//       </div>

//     </div>
//   )
// }

// export default ProfilePage
