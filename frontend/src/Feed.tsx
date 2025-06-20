import { useAtomValue } from "jotai"
import { blogsAtom } from "./store/atoms"
import Blog from "./components/Blog";
import { Link } from "react-router-dom";

export default function Feed() {
    const blogs = useAtomValue(blogsAtom);
    return <div>
        <div className="flex justify-start gap-2">
            <p><Link to='/account/create'>+</Link></p>
            <p>For you</p>
        </div>
        <div>
            {blogs.map((blog) => {
                return Blog(blog);
            })}
        </div>
    </div>
}