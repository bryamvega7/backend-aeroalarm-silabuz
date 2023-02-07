import UserArea from "../components/UserArea"
import { RequireAuth } from '../hooks/authUser'

export default function Home() {
    RequireAuth()

    return <div className="mt-40 w-80 m-auto">
        <h1 className="text-xl font-bold text-center">User area</h1>
        <UserArea />
    </div>
}
