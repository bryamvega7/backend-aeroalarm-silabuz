import { createContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const UserContext = createContext(0);

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;