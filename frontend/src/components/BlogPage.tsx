import { useAtomValue } from "jotai"
import { blogAtom } from "../store/atoms"

export default function BlogPage() {
    const blog = useAtomValue(blogAtom);
    return <div className="grid grid-cols-4">
        <div className="col-span-3">
            <h1>{blog.title}</h1>
            <p>Posted on : {new Date(blog.date).toLocaleDateString('en-CA')}</p>
            <p>{blog.content}</p>
        </div>
        <div>
            <h1>Author</h1>
            <p>{blog.author}</p>
        </div>
    </div>
}