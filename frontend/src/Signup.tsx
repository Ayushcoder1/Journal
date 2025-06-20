import Signin from "./components/Signin";

function Signup(){
    return <div className='flex flex-col items-center'>
        <div className='mt-10 w-100'>
            <Signin isSignin={0}/>
        </div>
    </div>
}

export default Signup;