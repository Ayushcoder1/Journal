import { useSetAtom } from "jotai";
import { blogAtom, type Blog } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export default function Blog({blog} : {blog : Blog}) {
    const blogSet = useSetAtom(blogAtom);
    const navigate = useNavigate();
    const renderPage = (blog : Blog) => {
        blogSet(blog);
        navigate(`/account/page/${blog.id}`);
    }
    const date = blog.created_at?.substring(0, 10);
    return <div className="p-4">
        <div className="flex justify-start gap-2 text-sm text-zinc-500">
            <p className="text-black font-semibold">{blog.name}</p>
            <p> • </p>
            <p>{date}</p>
        </div>
        <div className="font-bold text-3xl mb-2 hover:cursor-pointer" onClick={() => renderPage(blog)}>{blog.title}</div>
        <div className="text-xl text-zinc-500">{blog.content.substring(0, 50)} . . . </div>
    </div>
}