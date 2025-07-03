import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"
import { bookmarksAtom, getBookmarksAtom, type Blog } from "../store/atoms"
import SetBlog from './Blog'

export default function Home() {

    const getBookmarks = useSetAtom(getBookmarksAtom);
    const bookmarks = useAtomValue(bookmarksAtom) || [];

    useEffect(() => {
        getBookmarks();
    }, [])
    return <div>
        <h1 className="text-3xl m-4 font-bold font-mono">Reading List</h1>
        {
            bookmarks.map((blog : Blog) => {
                return (
                    <div key={blog.id}>
                        <SetBlog blog={blog} />
                    </div>
                )
            })
        }
    </div>
}