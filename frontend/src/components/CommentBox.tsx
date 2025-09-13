import { useSetAtom } from "jotai";
import {useEffect, useRef, useState} from "react";
import { commentAtom } from "../store/atoms";
import { useParams } from "react-router-dom";

export default function CommentBox() {
    const author = sessionStorage.getItem('Author') || "Author";
    const [focus, setFocus] = useState(false);
    const input =  useRef<HTMLTextAreaElement>(null);
    const respond = useSetAtom(commentAtom);
    const { id } = useParams<{ id: string }>();

    const respondFn = async (content : string) => {
        await respond({post_id : id || "", content});
    }

    useEffect(() => {
        if (focus && input.current) {
            input.current.focus();
            input.current.style.height = "100px";
        }
    }, [focus]);

    return <div className="mt-32">
        {
            !focus &&
            <div>
                <div className="flex gap-2 items-center mb-4">
                    <div className="pt-1 relative"><button className="rounded-full p-2 bg-green-500 w-10 text-center hover:cursor-pointer">{author[0]}</button></div>
                    <p className="text-xl font-mono">{author}</p>
                </div>
                <div className="bg-zinc-200 rounded-lg w-205">
                    <textarea onFocus={() => setFocus(true)} name="comment_input" id="123" className="bg-white m-2 rounded-lg w-200 font-mono text-xl p-2 h-13" placeholder="What are your thoughts?"></textarea>
                </div>
            </div>
        }
        {
            focus &&
            <div>
                <div className="flex gap-2 items-center mb-4">
                    <div className="pt-1 relative"><button className="rounded-full p-2 bg-green-500 w-10 text-center hover:cursor-pointer">{author[0]}</button></div>
                    <p className="text-xl font-mono">{author}</p>
                </div>
                <div className="grid gap-4 grid-rows-5 bg-zinc-200 rounded-lg w-205 ">
                    <div className="row-span-3">
                        <textarea ref={input} name="comment_input" id="123" className="bg-white m-2 rounded-lg w-200 font-mono text-xl p-2 h-13" placeholder="What your thoughts?"></textarea>
                    </div>
                    <div className="flex justify-between row-span-2 px-4 items-center">
                        <div className="flex gap-2 items-center">
                            <button
                                type="button"
                                aria-label="bold"
                                className="px-3 py-1 rounded-md border border-zinc-300 bg-white text-lg font-semibold hover:bg-zinc-100 transition"
                            >
                                B
                            </button>
                            <button
                                type="button"
                                aria-label="italic"
                                className="px-3 py-1 rounded-md border border-zinc-300 bg-white text-lg font-semibold hover:bg-zinc-100 transition"
                            >
                                I
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button
                                type="button"
                                onClick={() => {
                                    // clear and collapse
                                    if (input.current) input.current.value = "";
                                    setFocus(false);
                                }}
                                className="px-3 border-0 py-1 rounded-full text-lg font-medium text-zinc-700 hover:bg-zinc-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // respond action (hook to your API)
                                    const val = input.current ? input.current.value.trim() : "";
                                    if (!val) return;
                                    console.log('Respond:', val);
                                    respondFn(val);
                                    if (input.current) input.current.value = "";
                                    setFocus(false);
                                }}
                                className="px-4 py-1 rounded-full text-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
                            >
                                Respond
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}
