export default function Blog({ title, content, author, date } : {title : string, content : string, author : string, date : number}) {
    return <div>
        <div className="flex justify-start gap-2">
            <p>{author}</p>
            <p> • </p>
            <p>{new Date(date).toLocaleDateString('en-CA')}</p>
        </div>
        <div className="font-bold">{title}</div>
        <div className="mt-2">{content.substring(0, 50)}</div>
    </div>
}