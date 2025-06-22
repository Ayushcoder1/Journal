import BlogPage from "./components/BlogPage";
import Navbar from "./Navbar";

export default function Page(){
    return <div className="whitespace-pre-wrap">
        <Navbar />
        {<BlogPage />}
    </div>
}