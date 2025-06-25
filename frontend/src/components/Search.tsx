import { useAtomValue } from "jotai"
import { filteredBlogsAtom } from "../store/atoms"
import { useNavigate } from "react-router-dom";
import { FixedSizeList, type ListChildComponentProps } from 'react-window';

export default function Search() {
    const blogs = useAtomValue(filteredBlogsAtom);

    const MAX_HEIGHT = 400;
    const ITEM_LENGTH = 80;

    const Row = ({ index }: ListChildComponentProps) => (
        <div key={blogs[index].id} className="relative font-bold p-4 bg-white w-180">
            <button onClick={() => navigate('/account/page/' + blogs[index].id)} className="pl-10 text-xl text-black font-mono font-semibold hover:cursor-pointer">{blogs[index].title}</button>
        </div>
    )
    const navigate = useNavigate();
    return(
        <div>
            <FixedSizeList
            height={MAX_HEIGHT}
            width="100%"
            itemCount={blogs.length}
            itemSize={ITEM_LENGTH}
            className="rounded-md"
            >
            {Row}
            </FixedSizeList>
        </div>
    )
}