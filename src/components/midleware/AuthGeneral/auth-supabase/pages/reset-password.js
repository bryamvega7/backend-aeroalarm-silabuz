import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { RequireRecoveryType } from '../hooks/authUser'
import { useRouter } from 'next/router'

export default function Reset() {
    RequireRecoveryType()
    const [firstPassword, setFirstPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const router = useRouter()

    const handleReset = async () => {
        try {
            const { user, error } = await supabase
            .auth
            .update({ password: secondPassword })

            if (error) throw error

            alert('Password Updated correctly.')
            router.push('/home')
        } catch(e) {
            alert(e.message)
        }
    }

    return <div className="max-w-sm m-auto">
        <h1 className="text-center">Reset your Password</h1>
        <div className="m-auto border border-gray-500 rounded p-4 mt-4">
            <div className="field">
                <label className="text-gray-800 w-full block text-sm">Password</label>
                <input type="password" className="p-1 border border-gray-500 w-full rounded" onChange={e => setFirstPassword(e.target.value)} value={firstPassword}/>
            </div>
            <div className="field mt-3">
                <label className="text-gray-800 w-full block text-sm">Repeat Password</label>
                <input type="password" className="p-1 border border-gray-500 w-full rounded"  onChange={e => setSecondPassword(e.target.value)} value={secondPassword} />
            </div>
            <ul>
                <li>At least 6 characters.</li>
            </ul>
            <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={handleReset}>Set new password</button>
            <a href="/home" className="block text-center border p-2 w-full mt-2 rounded bg-black text-white" >Cancel</a>
        </div>
    </div>
}
