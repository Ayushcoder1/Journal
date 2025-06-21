import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./components/ProfileDropdown";

export default function Navbar(){
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const author = sessionStorage.getItem('Author') || "Author";

    return <div>
        <div className="flex justify-between bg-white p-4 border-b-2 border-zinc-200">
            <div className="flex gap-2">
                <button onClick={() => navigate('/')} className="text-4xl font-bold font-mono mx-2 hover:cursor-pointer">Journal</button>
                <div className="relative">
                    <input type="text" placeholder="Search" className="rounded-full px-4 py-2 pl-10 border-2 border-zinc-400 w-80"/>
                    <svg className="w-8 h-8 text-zinc-500 absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" viewBox="0 0 24 24">
                        <path d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"></path>
                    </svg>
                </div>
            </div>

            <div className="flex gap-8 hover:cursor-pointer">
                <div className="flex gap-2 pt-2" onClick={() => navigate('/account/create')}>
                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write">
                        <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
                        <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path>
                    </svg>
                    <p className="text-2xl text-zinc-400 font-mono">Write</p>
                </div>

                <div className="pt-2">
                    <svg
                        className="w-8 h-8 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Notifications"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 18.5a3 3 0 1 1-6 0"
                        />
                        <path
                        fill="black"
                        d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 
                            1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75
                            a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 
                            5.35 0 0 0 5.5 10.532Z"
                        />
                    </svg>
                </div>

                <div className="pt-1 relative">
                    <button onClick={() => setToggle(!toggle)} className="rounded-full p-2 bg-green-500 w-10 text-center hover:cursor-pointer">{author[0]}</button>
                </div>
            </div>
            
        </div>
        {
            toggle && 
            <div className="absolute right-0 mr-2">
                <ProfileDropdown />
            </div>
        }
    </div>
}