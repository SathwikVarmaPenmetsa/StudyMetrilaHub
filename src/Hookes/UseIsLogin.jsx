import React, { useEffect, useState } from 'react'
import supabase from '../supabase';

const UseIsLogin = () => {

    const [isLogin, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // check once on load
        supabase.auth.getSession().then(({ data: { session } }) => {
        setIsLoggedIn(!!session); // true if session exists
        });

        // listen for login/logout
        const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            setIsLoggedIn(!!session); // true/false
        }
        );

        return () => subscription.subscription.unsubscribe();
    }, []);

  return isLogin
}

export default UseIsLogin
