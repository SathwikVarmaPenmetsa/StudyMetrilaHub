import React, { useEffect, useState } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom'
import WalkingAnime from '../mineComponents/WalkingAnime'

export default function UpdatePassword() {
   const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    // Listen for password recovery session from reset link
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Password recovery session:", session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setMessage(`❌ Error: ${error.message}`)
    } else {
      setMessage("✅ Password updated successfully!")
      setPassword("")
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <div className="changepasswordpagediv">
      <form
        onSubmit={handleUpdatePassword}
        className="signupdivforminputs"
      >
        <div className='Walkinganimestyle'>
            <WalkingAnime />
          </div>

          <h1 className='gradient-title' >
                StudyMetrilaHub
          </h1>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  )
}
