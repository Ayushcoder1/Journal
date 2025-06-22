import { useAtomValue } from "jotai";
import { storiesAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export default function Published() {
    const stories = useAtomValue(storiesAtom);
    const navigate = useNavigate();
    
    return <div>
        {stories.map((blog) => {
            if (blog.published) {
                return <div className="my-6" key={blog.id}>
                    <button onClick={() => navigate('/account/page/' + blog.id)} className="hover:cursor-pointer text-xl font-mono font-semibold">{blog.title}</button>
                </div>
                
            }
            else{
                return null;
            }
        })}
    </div>
}