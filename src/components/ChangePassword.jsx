import React, { useState } from 'react'
import supabase from '../supabase'
import WalkingAnime from '../mineComponents/WalkingAnime'

const ChangePassword = () => {
   const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://study-metrila-hub.vercel.app/updatepassword", // update with your URL
    })

    if (error) {
      setMessage(`❌ Error: ${error.message}`)
    } else {
      setMessage("✅ Reset link sent! Check your email.")
    }

    setLoading(false)
  }

  return (
    <div className="changepasswordpagediv">
      
      <form
        onSubmit={handleForgotPassword}
        className="signupdivforminputs"
      >
        <h1 className='gradient-title' >
               StudyMetrilaHub 
          </h1>

        <div className='Walkinganimestyle'>
            <WalkingAnime />
          </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  )
}

export default ChangePassword
