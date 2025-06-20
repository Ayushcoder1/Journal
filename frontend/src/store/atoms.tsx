import { atom } from "jotai";

export type Blog = {
    id? : string,
    name? : string,
    title : string,
    content : string,
    created_at? : string,
    reads? : number,
    published? : boolean
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

export const blogAtom = atom<Blog>({
    title : "",
    content : "",
    name : "",
});

const dns = "http://localhost:3000";

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
        const {title, content} = blog;
        const token = get(tokenAtom);
        const res = await fetch(`${dns}/account/blog`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : JSON.stringify({title, content})
        });
        const data = await res.json();
        if (res.status === 200) {
            // console.log(data);
            // set(blogAtom, data[0]);
            sessionStorage.setItem('id', data.id);
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

export const exitAtom = atom(null, 
    (_get, set) => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('draft');
        sessionStorage.removeItem('Author');
        set(tokenAtom, null);
        set(blogsAtom, []);

    }
)