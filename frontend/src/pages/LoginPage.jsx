import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  
  // New state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
  }

  return (
    // Updated background to a deep purple gradient to match the image
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col'>

      {/* -------- left -------- */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)] drop-shadow-2xl' />

      {/* -------- right -------- */}
      <form onSubmit={onSubmitHandler} className='bg-white/10 border border-white/20 p-8 flex flex-col gap-6 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-md'>
        
        <h2 className='font-bold text-3xl text-white flex justify-between items-center'>
          {currState}
          {isDataSubmitted && 
            <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity' />
          }
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <div className='flex flex-col gap-1'>
            <input 
              onChange={(e) => setFullName(e.target.value)} 
              value={fullName}
              type="text" 
              className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all' 
              placeholder="Full Name" 
              required 
            />
          </div>
        )}

        {!isDataSubmitted && (
          <div className='flex flex-col gap-4'>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder='Email Address' 
              required 
              className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all' 
            />
            
            {/* Password Field with Hide/Unhide Logic */}
            <div className="relative w-full">
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  type={showPassword ? "text" : "password"} 
                  placeholder='Password' 
                  required 
                  className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12' 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? (
                    // Eye Off Icon (SVG)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye Open Icon (SVG)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
            </div>
          </div>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            rows={4} 
            className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none' 
            placeholder='Provide a short bio...' 
            required>
          </textarea>
        )
        }

        <button type='submit' className='py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-300'>
          <input type="checkbox" className="accent-purple-500 w-4 h-4 cursor-pointer" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-400'>Already have an account? <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='font-medium text-purple-300 hover:text-purple-200 cursor-pointer underline underline-offset-2'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-400'>Create an account <span onClick={() => setCurrState("Sign up")} className='font-medium text-purple-300 hover:text-purple-200 cursor-pointer underline underline-offset-2'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage










// $ old version
// import React, { useContext, useState } from 'react'
// import assets from '../assets/assets'
// import { AuthContext } from '../../context/AuthContext'

// const LoginPage = () => {

//   const [currState, setCurrState] = useState("Sign up")
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [bio, setBio] = useState("")
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const { login } = useContext(AuthContext)

//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     if (currState === 'Sign up' && !isDataSubmitted) {
//       setIsDataSubmitted(true)
//       return;
//     }

//     login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
//   }

//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

//       {/* -------- left -------- */}
//       <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

//       {/* -------- right -------- */}

//       <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
//         <h2 className='font-medium text-2xl flex justify-between items-center'>
//           {currState}
//           {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
//           }

//         </h2>

//         {currState === "Sign up" && !isDataSubmitted && (
//           <input onChange={(e) => setFullName(e.target.value)} value={fullName}
//             type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder="Full Name" required />
//         )}

//         {!isDataSubmitted && (
//           <>
//             <input onChange={(e) => setEmail(e.target.value)} value={email}
//               type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
//             <input onChange={(e) => setPassword(e.target.value)} value={password}
//               type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
//           </>
//         )}

//         {currState === "Sign up" && isDataSubmitted && (
//           <textarea onChange={(e) => setBio(e.target.value)} value={bio}
//             rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required></textarea>
//         )
//         }

//         <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
//           {currState === "Sign up" ? "Create Account" : "Login Now"}
//         </button>

//         <div className='flex items-center gap-2 text-sm text-gray-500'>
//           <input type="checkbox" />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>

//         <div className='flex flex-col gap-2'>
//           {currState === "Sign up" ? (
//             <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
//           ) : (
//             <p className='text-sm text-gray-600'>Create an account <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
//           )}
//         </div>

//       </form>
//     </div>
//   )
// }

// export default LoginPage
