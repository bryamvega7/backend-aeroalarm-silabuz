import { useState } from 'react';
import { supabase } from './../utils/supabaseClient'

const SIGN_UP_VIEW = 'sin-up-view'
const SIGN_IN_VIEW = 'sign-in-view'
const REQUEST_RESET_PASSWORD_VIEW = 'request-reset-password-view'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState(SIGN_IN_VIEW)
    const [mailSent, setMailSent] = useState(false)

    const handleSignUp = async () => {
        try {
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            alert('Check your email to confirm sign up.')
        } catch(e) {
            alert(e.message)
        }
    }

    const handleSignIn = async () => {
        try {
            const { user, session, error } = await supabase.auth.signIn({
                email,
                password,
            })

            if (error) throw error

            alert('User logged.')
        } catch(e) {
            alert(e.message)
        }
    }

    const sendEmail = () => {
        try {
            const { data, error } = supabase.auth.api.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/reset-password'
            })

            if (error) throw error

            setMailSent(true)
        } catch(e) {
            alert(e.message)
        }
    }

    const signInView = () => {
        return <div className="max-w-sm">
            <h1 className="text-center">Sign In</h1>
            <div className="m-auto border border-gray-500 rounded p-4 mt-4">
                <div className="field">
                    <label htmlFor="" className="text-gray-800 w-full block text-sm">Email</label>
                    <input type="text" name="" className="p-1 border border-gray-500 w-full rounded" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="field mt-3">
                    <label htmlFor="" className="text-gray-800 w-full block text-sm">Password</label>
                    <input type="password" name="" id="" className="p-1 border border-gray-500 w-full rounded"  onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={handleSignIn}>Sign In</button>
                <div className="text-center">
                    <button onClick={() => setView(SIGN_UP_VIEW)} className="w-full text-center block text-blue-700 hover:text-blue-900">You are new? Sign Up</button>
                    <button className="w-full text-blue-800 hover:text-blue-900" onClick={() => setView(REQUEST_RESET_PASSWORD_VIEW)}>Forgot your password?</button>
                </div>
            </div>
        </div>
    }

    const signUpView = () => {
        return <div className="max-w-sm">
            <h1 className="text-center">Sign Up</h1>
            <div className="m-auto border border-gray-500 rounded p-4 mt-4">
                <div className="field">
                    <label htmlFor="" className="text-gray-800 w-full block text-sm">Email</label>
                    <input type="text" name="" className="p-1 border border-gray-500 w-full rounded" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="field mt-3">
                    <label htmlFor="" className="text-gray-800 w-full block text-sm">Password</label>
                    <input type="password" name="" id="" className="p-1 border border-gray-500 w-full rounded"  onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={handleSignUp}>Sign Up</button>
                <div className="text-center">
                    <button onClick={() => setView(SIGN_IN_VIEW)} className="text-center block text-blue-700 hover:text-blue-900">Do you already have an account? Sign In</button>
                </div>
            </div>
        </div>
    }

    const requestResetPasswordView = () => {
        if (mailSent) {
            return <h1 className="text-xl font-bold text-center">We sent a link! Please check your imbox!</h1>
        }

        return <div className="max-w-sm">
                <h1 className="text-xl font-bold text-center">Request reset password</h1>
                <div className="max-w-sm m-auto border border-gray-500 rounded p-4 mt-4">
                <div className="field">
                    <label className="text-gray-800 w-full block text-sm">Email</label>
                    <input type="text" className="p-1 border border-gray-500 w-full rounded" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="field">
                    <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={sendEmail}>Send email</button>
                </div>
            </div>
        </div>
    }

    const getView = () => {
        if (view == SIGN_IN_VIEW) return signInView()
        if (view == SIGN_UP_VIEW) return signUpView()
        if (view == REQUEST_RESET_PASSWORD_VIEW) return requestResetPasswordView()
    }

    return getView()
}