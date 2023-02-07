import { useEffect, useContext } from 'react'
import { supabase } from '../utils/supabaseClient'
import router from 'next/router'
import UserContext from '../context/UserContext'

export const SignOut = async () => {
  await supabase.auth.signOut()
}

export const RequireAuth = () => {
  const { user } = useUser()

  useEffect(() => {
    if (user === null) {
      router.push('/')
    }
  }, [user])
}

export const RequireRecoveryType = () => {
    useEffect(() => {
        const path = router.asPath
        if (!path.includes('type=recovery')) {
            router.push('/')
        }
    }, [router])
}

export const AuthRedirect = () => {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserContextProvider.`)
    }

    return context
}
