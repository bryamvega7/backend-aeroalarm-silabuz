import { useEffect, useState } from 'react'
import UserLinks from './UserLinks'
import { supabase } from './../utils/supabaseClient'
import { SignOut, useUser } from '../hooks/authUser'

export default function UserArea() {
    const { user } = useUser()

    const handleLogout = async () => {
        try {
            SignOut()
        } catch(e) {
            alert(e.message)
        }
    }

    return (<div>
        {
            user && 
            <>
                <h1>User area</h1>
                <p>{user.email}</p>
                <button className="p-4 bg-black text-white rounded rounded-sm" onClick={handleLogout}>Logout</button>
                <h2 className="texty-lg mt-4">Links</h2>
                <UserLinks user_id={user.id} />
            </>
        }
    </div>)
}