
import { useEffect, useState } from 'react'
import { supabase } from './../utils/supabaseClient'


export default function UserLinks({ user_id }) {
    const [links, setLinks] = useState([]);
    const [link, setLink] = useState('')

    useEffect(async () => {
        await loadList()
        subscribeToInserts()
    }, [])

    const loadList = async () => {
        let { data, error } = await supabase
        .from('links')
        .select('*')

        setLinks(data)
    }

    const subscribeToInserts = () => {
        supabase
        .from('links')
        .on('INSERT', loadList)
        .subscribe()
    }

    const addLink = async () => {
        try {
            const { data, error } = await supabase
            .from('links')
            .insert([
                { name: link, user_id },
            ])

            if (error) throw error

            alert(JSON.stringify(data))
        } catch(e) {
            alert(e.message)
        }
    }

    return <div>
        <input className="border p-2 mr-2" type="text" onChange={(e) => setLink(e.target.value)} value={link}></input>
        <button className="p-2 rounded bg-black text-white" onClick={addLink}>Add</button>
        <ul className="list-disc">
             {links && links.map(item => <li key={item.id}>{item.name}</li>)}

        </ul>
    </div>
}