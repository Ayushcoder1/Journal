import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Profile() {
    const navigate = useNavigate();
    const Author = sessionStorage.getItem('Author');

    return <div>
        <Navbar />
        <div className="ml-50 mr-110 border-r-2 border-zinc-300 p-4 mt-10">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold font-mono text-black">{Author}</h1>
                <button onClick={async () => {
                }} className=" border-2 hover:cursor-pointer hover:bg-green-800 rounded-full font-mono bg-green-600 text-white px-6 py-2 font-semibold">...</button>
            </div>
            <div className="flex gap-8 border-b-2 border-zinc-300 mt-16 text-zinc-400 font-mono text-lg px-4">
                <button className="hover:cursor-pointer hover:text-zinc-600" onClick={() => navigate('/account/profile/home')}>Home</button>
                <button className="hover:cursor-pointer hover:text-zinc-600" onClick={() => navigate('/account/profile/about')}>About</button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    </div>
}