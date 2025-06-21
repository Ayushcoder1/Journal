import { useNavigate } from "react-router-dom"

export default function ProfileDropdown() {
    const navigate = useNavigate()

    return <div className="bg-white rounded-md">
        <div className="relative border-b-2 border-zinc-200 p-4 w-55 m-2">
            <button className="pl-10 text-xl text-zinc-400 font-mono font-semibold">Profile</button>
            <svg className="w-8 h-8 text-zinc-500 absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Profile"><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
                <path stroke="currentColor" strokeLinecap="round" d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path>
            </svg>
        </div>
        <div className="relative border-b-2 border-zinc-200 p-4 w-55 m-2">
            <button onClick={() => navigate('/account/stories')} className="pl-10 text-xl text-zinc-400 font-mono font-semibold">Stories</button>
            <svg className="w-8 h-8 absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Stories">
                <path fill="currentColor" fill-rule="evenodd" d="M4 2.75A.75.75 0 0 1 4.75 2h14.5a.75.75 0 0 1 .75.75v18.5a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1-.75-.75zM7 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M7 12a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 7 12" clip-rule="evenodd"></path>
            </svg>
        </div>
        <div className="relative border-b-2 border-zinc-200 p-4 w-55 m-2">
            <button onClick={() => navigate('/user/login')} className="pl-10 text-xl text-zinc-400 font-mono font-semibold">Logout</button>
            <p></p>
        </div>
    </div>
}