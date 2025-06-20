import { atom } from "jotai";

type Blog = {
    title : string,
    content : string,
    author : string,
    date : number
};

export const warningAtom = atom(null);

export const tokenAtom = atom(sessionStorage.getItem('token') || null);

export const blogsAtom = atom<Blog[]>([]);

export const blogAtom = atom<Blog>({
    title : "",
    content : "",
    author : "",
    date : 0
});

const dns = "localhost:3000";

export const sessionAtom = atom(null,
    async (get, set, {isSignin, username, password, name=null }) => {
        const path = !isSignin ? 'signup' : 'login';
        set(warningAtom, null);
        // console.log('here', { username, password, name });
        const res = await fetch(`${dns}/user/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, name }),
        });
        const data = await res.json();
        if (res.status === 200) {
            sessionStorage.setItem('token', data.token);
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
        const res = await fetch(`${dns}/account`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (res.status === 200) {
            set(blogsAtom, data);
        } else {
            set(warningAtom, data.msg);
        }
    }
)