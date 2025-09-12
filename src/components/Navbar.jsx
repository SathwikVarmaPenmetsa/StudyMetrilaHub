import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import supabase from '../supabase'
import { IoMdMenu } from "react-icons/io";

const Navbar = ({isLogin,role,userName}) => {

  const [view ,setView] = useState()
  const menuRef = useRef(null)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("User logged out successfully");
    }
  };

   const linkClass = ({ isActive }) =>
    isActive ? "links active " : "links ";

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  return (
    <div className='Navbar'>

        <div className='userName'>
            {userName}
        </div>

        {/* <input type="search" placeholder='search...' /> */}

        <div className='nav-links'>
            {isLogin || (<div>
              <NavLink to={'/'} className={linkClass}>Login</NavLink>
              <NavLink to={'About'} className={linkClass}>About</NavLink>
            </div>)}
            
            
            {isLogin && role === 'admin' ? (
              <div>
              <NavLink to={'/Admin'} className={linkClass} >Dashboard</NavLink>
              <NavLink to={'/Uplode'} className={linkClass} >Upload PDF</NavLink>
              <NavLink to={'/pdfcards'} className={linkClass} >View PDFs</NavLink>
              <NavLink to={'About'} className={linkClass} >About</NavLink>
              </div>
            ): null}
           

            {isLogin && role === 'teacher' ? (
              <div>
                <NavLink to={'/Uplode'} className={linkClass} >Upload PDF</NavLink>
                <NavLink to={'/pdfcards'} className={linkClass} >View PDFs</NavLink>
                <NavLink to={'About'} className={linkClass} >About</NavLink>
              </div>
            ):
              null
            }

            {isLogin && role === "student" ? (
              <div>
                <NavLink to={'/pdfcards'} className={'links'} >View PDFs</NavLink>
                <NavLink to={'About'} className={'links'} >About</NavLink>
              </div>
            ) : null}

        </div>

        <div className='nav-menu'><IoMdMenu  style={{fontSize:'2rem',cursor:'pointer'}} onClick={()=>setView(prev=>!prev)}/>

          {view?<div className='nav-links-mobile' >
              {isLogin || (<div>
                <NavLink to={'/'} className={linkClass}>Login</NavLink>
                <NavLink to={'About'} className={linkClass}>About</NavLink>
              </div>)}
              
              {isLogin && role === 'admin' ? (
                <div ref={menuRef}>
                <NavLink to={'/Admin'} className={linkClass} >Dashboard</NavLink>
                <NavLink to={'/Uplode'} className={linkClass} >Upload PDF</NavLink>
                <NavLink to={'/pdfcards'} className={linkClass} >View PDFs</NavLink>
                <NavLink to={'About'} className={linkClass} >About</NavLink>
                </div>
              ): null}

              {isLogin && role === 'teacher' ? (
                <div>
                  <NavLink to={'/Uplode'} className={linkClass} >Upload PDF</NavLink>
                  <NavLink to={'/pdfcards'} className={linkClass} >View PDFs</NavLink>
                  <NavLink to={'About'} className={linkClass} >About</NavLink>
                </div>
              ):
                null
              }

              {isLogin && role === "student" ? (
                <div>
                  <NavLink to={'/pdfcards'} className={'links'} >View PDFs</NavLink>
                  <NavLink to={'About'} className={'links'} >About</NavLink>
                </div>
              ) : null}

                

          </div>:null}
  
        </div>
        
        <div>
          {isLogin&& <button onClick={handleLogout} className='logoutBtn'>Logout</button>}
        </div>
      
    </div>
  )
}

export default Navbar
