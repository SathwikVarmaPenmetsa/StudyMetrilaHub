import React, {  useState } from 'react'
import WalkingAnime from '../mineComponents/WalkingAnime';
import supabaseAdmin from '../supabaseadmin';

const AddteacherAccount = () => {
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage,SetErrorMessage] = useState({
        usernameError:"",
        emailError:"",
        passwordError:""
    })
    const [mainError,setMainError] = useState('')

    const handlesignUp = async () =>{



       const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        

        const validatePassword = (password) => {
            const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
            return passwordRegex.test(password);
        };


        if(!username){
            SetErrorMessage(prev=>{
                return {...prev,usernameError:'enter your Name'}
            })
        }else if(!email){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'enter your email',usernameError:''}
            })
        }else if(!validateEmail(email)){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'Please enter a valid email address. ',usernameError:''}
            })
        }else if(!password){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:'create password'}
            })
        }else if(!validatePassword(password)){
            SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:'Password must be 8+ chars with uppercase, lowercase, number & special character.'}
            })
        }else{

            SetErrorMessage(prev=>{
                return {...prev,emailError:'',usernameError:'',passwordError:''}
            })
            try {
              const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true, 
              });
              if (error) {
                console.error("Error creating teacher:", error.message);
                setMainError(error.message)
                return;
              }
              const user = data.user;
              const { error: profileError } = await supabaseAdmin
                    .from("profiles")
                    .insert([
                      {
                        id: user.id,
                        name: username,
                        email,
                        role: "teacher",
                      },
                    ]);

                if (profileError) {
                  console.error("Error inserting into profiles:", profileError.message);
                } else {
                  alert('account Created')
                  setEmail('')
                  setUserName('')
                  setPassword('')
                  setMainError('')
                }
            } catch (err) {
              console.error("Unexpected error:", err);
            }
        }

  }


  return (
    <div className='signuppageDiv'>
        <div className='signupdivform signuppageDivMargenTop'>
            <h1 className='gradient-title title-none' >
                StudyMetrilaHub
            </h1>
            <div className='signupdivforminputs '>
                <div className='Walkinganimestyle'>
                    <WalkingAnime />
                </div>
                <h2>Create Teacher Account</h2>
                <p>It's quick and easy.</p>
                <input type="text" placeholder='userName' onChange={(e)=>setUserName(e.target.value)} value={username}/>
                {errorMessage.usernameError? <span>{errorMessage.usernameError}</span>:null}
                <input type="email" placeholder='enter your Email' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} />
                {errorMessage.emailError? <span>{errorMessage.emailError}</span>:null}
                <input type="password" name="password" placeholder='create password...' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                {errorMessage.passwordError? <span>{errorMessage.passwordError}</span>:null}
                {mainError?<span>❌ {mainError}</span>:null}
                <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                <button onClick={handlesignUp}>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default AddteacherAccount

