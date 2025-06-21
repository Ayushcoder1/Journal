import { useAtomValue } from "jotai"
import { storiesAtom, type Blog } from "../store/atoms"
import { useNavigate } from "react-router-dom";


export default function Drafts() {
    const stories = useAtomValue(storiesAtom);
    const navigate = useNavigate();

    const continueDraft = (blog : Blog) => {
        sessionStorage.setItem('draft', JSON.stringify(blog));
        navigate('/account/create');
    }

    return <div>
        {stories.map((blog) => {
            if (blog.published) {
                return <></>
            }
            else{
                return <div className="my-6">
                    <button onClick={() => continueDraft(blog)} className="hover:cursor-pointer text-xl font-mono font-semibold">{blog.title}</button>
                </div>
            }
        })}
    </div>
}