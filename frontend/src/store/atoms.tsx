import { atom } from "jotai";

export type Blog = {
    id? : string,
    name? : string,
    title : string,
    content : string,
    created_at? : string,
    reads? : number,
    published? : boolean,
    bookmark? : boolean
};

export type Session = {
    isSignin : number,
    email : string | null,
    password : string | null,
    name : string | null
}

export const warningAtom = atom(null);

export const tokenAtom = atom(sessionStorage.getItem('token') || null);

export const blogsAtom = atom<Blog[]>([]);

export const storiesAtom = atom<Blog[]>([]);

export const draftAtom = atom<Blog>();

export const filteredBlogsAtom = atom<Blog[]>([]);

export const bookmarksAtom = atom<Blog[]>([]);

export const blogAtom = atom<Blog>({
    title : "",
    content : "",
    name : "",
});

const dns = "http://localhost:3001";
// const dns = "http://ec2-13-235-78-242.ap-south-1.compute.amazonaws.com/journal";

export const sessionAtom = atom(null,
    async (_get, set, content : Session) => {
        let {isSignin, email, password, name} = content;
        const path = !isSignin ? 'signup' : 'login';
        if(name == null) name = "";
        set(warningAtom, null);
        // console.log('here', { username, password, name });
        const res = await fetch(`${dns}/user/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (res.status === 200) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('Author', data.name);
            set(tokenAtom, data.token);
            set(setFeedAtom);
        } else {
            set(warningAtom, data.msg);
        }
  }
);

export const setFeedAtom = atom(null,
    async(get, set) => {
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/feed`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
            set(blogsAtom, data);
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const fetchBlogAtom = atom(null, 
    async (get, set, id) => {
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/blog/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
            set(blogAtom, data[0]);
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const publishAtom = atom(null, 
    async(get, set, blog : Blog) => {
        const {title, content, published} = blog;
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/blog`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({title, content, published})
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
            // set(blogAtom, data[0]);
            // sessionStorage.setItem('id', data.id);
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const getStoriesAtom = atom(null, 
    async(get, set) => {
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/stories`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
            set(storiesAtom, data);
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const editBlogAtom = atom(null, 
    async (get, set, blog : Blog) => {
        const {title, content, published, id} = blog;
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/blog/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({title, content, published})
        });
        if (res.status === 200) {
            // console.log(data);
            // set(blogAtom, data[0]);
            // sessionStorage.setItem('id', data.id);
        } else {
            const data = await res.json();
            set(warningAtom, data.msg);
        }
    }
)

export const initializeBlogAtom = atom(null, 
    async (get, set) => {
        const token = get(tokenAtom);
        const title = "" 
        const content = ""
        const published = false;
        const res = await fetch(`${dns}/account/blog`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({title, content, published})
        });
        const data = await res.json();
        if (res.status === 201) {
            return data.id;
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const searchQueryAtom = atom(null, 
    async (get, set, filter : string) => {
        const token = get(tokenAtom);
        if(!filter) filter = "_";
        const res = await fetch(`${dns}/account/blog/filter/${filter}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await res.json();
        if(res.status === 200){
            set(filteredBlogsAtom, data);
        }
        else{
            set(warningAtom, data.msg);
        }
    }
)

export const bookmarkAtom = atom(null, 
    async (get, set, {post_id} : {post_id : string}) => {
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/bookmark`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({post_id})
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
        } else {
            set(warningAtom, data.msg);
        }
    }
)

export const getBookmarksAtom = atom(null,
    async(get, set) => {
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/bookmarks`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            set(bookmarksAtom, data);
        } else {
            set(warningAtom, data.msg);
        }
    }
)