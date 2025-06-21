import { useSetAtom } from 'jotai';
import {Link, useNavigate} from 'react-router-dom'
import { sessionAtom } from '../store/atoms';
import { useRef } from 'react';

function Signin({isSignin} : {isSignin : number}){
    const warning = null;
    const navigate = useNavigate();
    const ses = useSetAtom(sessionAtom);
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const session = async () => {
        const email = emailRef.current ? emailRef.current.value : null;
        const password = passwordRef.current ? passwordRef.current.value : null;
        const name = nameRef.current ? nameRef.current.value : null;
        await ses({isSignin, email, password, name});
        navigate('/');
    }
    
    return (
        <div className='bg-white shadow-xl rounded-lg px-10 py-8'>
            <h1 className='font-bold text-3xl text-center mb-2'>{isSignin ? "Log in" : "Sign up"}</h1>
            <p className='text-zinc-400 text-center text-lg mb-4'>{isSignin? "Enter your information to access your account" : 
            "Enter your information to create an account"}</p>

            {
                warning &&
                <p className='text-red-600 text-center text-sm'>{warning}</p>
            }

            {
                !isSignin && 
                <div>
                    <p className='text-lg font-semibold text-black mb-2'>Name</p>
                    <input ref={nameRef} type="text" placeholder='Hello there' className='border-black border-2 w-80 rounded-sm p-2 mb-2'/>
                </div>
            }
            <div>
                <p className='text-lg font-semibold text-black'>Email</p>
                <input ref={emailRef} type="text" placeholder='abc@gmail.com' className='border-black border-2 w-80 rounded-sm p-2 mb-2'/>
            </div>
            <div>
                <p className='text-lg font-semibold text-black'>Password</p>
                <input ref={passwordRef} type="text" placeholder='12345678' className='border-black border-2 w-80 rounded-sm p-2 mb-6'/>
            </div>
            <div>
                <button onClick={session} className='border-black border-2 w-80 rounded-full p-2 mb-2 text-white bg-green-500 text-lg font-bold'>{isSignin ? "Log in" : "Sign up"}</button>
            </div>
            <p className='text-center text-zinc-400 italic font-semibold'>{isSignin ? "New user?  " : "Already have an account?  "} <Link className='text-blue-400 underline' to={isSignin ? "../user/signup" : "../user/login"}>{isSignin ? "Sign up" : "Log in"}</Link></p>
        </div>
    )
}

export default Signin