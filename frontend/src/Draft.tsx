import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { editBlogAtom, type Blog } from "./store/atoms";
import { useNavigate } from "react-router-dom";

export default function Draft() {
    const author = sessionStorage.getItem('Author') || "Author";
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const draftBlog : Blog = JSON.parse(sessionStorage.getItem('draft') || "{}");
    const draftTitle = draftBlog.title;
    const draftContent = draftBlog.content;
    const newId = draftBlog.id;
    const editBlog = useSetAtom(editBlogAtom);
    const saveTimer = useRef<number | null>(null)
    const [status, setStatus] = useState<''|'Saving . . .'|'Saved!'>('')

    useEffect(() => {
        titleRef.current!.value = draftTitle;
        contentRef.current!.value = draftContent;
    }, []);

    const publish = async () => {
        const title = titleRef.current ? titleRef.current.value : "";
        const content = contentRef.current ? contentRef.current.value : "";
        const published = true;

        await editBlog({title, content, published, id:newId});
        const id = newId;
        navigate('/account/page/' + id);
    }

    const addDraft = () => {
        const title = titleRef.current ? titleRef.current.value : "";
        const content = contentRef.current ? contentRef.current.value : "";
        const published = false;

        if(saveTimer.current !== null) clearTimeout(saveTimer.current);
        setStatus('Saving . . .');

        saveTimer.current = setTimeout(async () => {
            await editBlog({title, content, published, id : newId})
            setStatus('Saved!');
        }, 3000);
    }

    return <div className="mt-4">
        <div className="grid justify-center">
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <p className="p-2 font-mono">Draft in {author}</p>
                    <p className="p-2 font-mono text-zinc-400">{status}</p>
                </div>

                <div className="flex gap-4 font-mono hover:cursor-pointer">
                    <button onClick={publish} className="rounded-full p-2 px-4 text-white bg-green-600 hover:cursor-pointer">Publish</button>
                    <p className="text-2xl flex-col justify-center">...</p>
                    <p className="rounded-full p-2 bg-gray-500 w-10 text-center">{author[0]}</p>
                </div>
            </div>
            <textarea ref={titleRef} onChange={addDraft} placeholder="Title" className="text-5xl font-mono text-zinc-400  border-l-2 border-zinc-400 p-2 w-220 h-35"/>
            <textarea ref={contentRef} onChange={addDraft} placeholder="tell your story here ...." className="text-lg font-mono p-4 w-220 h-50 "/>
        </div>
    </div>
}