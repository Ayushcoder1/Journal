import { useAtomValue, useSetAtom } from "jotai"
import { blogsAtom, setFeedAtom } from "./store/atoms"
import Blog from "./components/Blog";
import Navbar from "./Navbar";
import { useEffect } from "react";

export default function Feed() {
    const blogs = useAtomValue(blogsAtom);
    const setFeed = useSetAtom(setFeedAtom);

    useEffect(() => {
        setFeed();
    }, []);

    return <div>
        <Navbar />
        <div className="ml-50 mr-90 border-r-2 border-zinc-300 p-4">
            <div className="flex justify-start gap-4 text-zinc-500 border-b-2 border-zinc-200">
                <p className="text-3xl">+</p>
                <p className="text-xl font-mono pt-2">For you</p>
            </div>
            <div>
                {blogs.map((blog) => {
                    return <div key={blog.id} className="my-4 border-b-2 border-zinc-200">
                        <Blog blog={blog} />
                    </div>
                })}
            </div>
        </div>
    </div>
}