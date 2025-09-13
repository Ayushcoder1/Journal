import { useAtomValue, useSetAtom } from "jotai"
import { blogAtom, commentsAtom, fetchBlogAtom, fetchCommentsAtom } from "../store/atoms"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentBox from "./CommentBox";
import CommentPage from "./CommentPage";

export default function BlogPage() {
    const blog = useAtomValue(blogAtom);
    const fetchBlog = useSetAtom(fetchBlogAtom);
    const fetchComments = useSetAtom(fetchCommentsAtom);
    const comments = useAtomValue(commentsAtom);
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        fetchBlog(id);
        fetchComments(id || "");
    }, [id]);

    return <div className="mx-24 my-16">
        <div className="grid grid-cols-4 gap-16">
            <div className="col-span-3">
                <div>
                    <h1 className="text-4xl font-bold font-mono">{blog.title}</h1>
                    <p className="text-zinc-400 font-mono">Posted on : {blog.created_at?.substring(0, 10)}</p>
                    <p className="text-gray-500 text-xl mt-4 font-mono">{blog.content}</p>
                </div>
                <div>
                    <CommentBox />
                    <div className="mt-6">
                        {comments.map((comment) => <CommentPage key={comment.id} comment={comment} />)}
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <h1 className="font-semibold font-mono text-xl mb-2">Author</h1>
                <div className="grid grid-cols-4">
                    <p className="w-8 h-8 rounded-full bg-gray-300 col-span-1 mt-4"></p>
                    <div className="col-span-3 text-zinc-400 font-semibold">
                        <p className="text-black text-lg font-bold">{blog.name}</p>
                        <p>Hello Fellas, happy reading.</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}