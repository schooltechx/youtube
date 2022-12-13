import { fail } from '@sveltejs/kit';
let email=""
let password=""
export async function load(){
    return {email,password}
}
/** @type {import('./$types').Action} */
const login = async ({  request }) => {
    const data = await request.formData();
    email = data.get('email')?.toString()??"";
    password = data.get('password')?.toString()??"";

    if (email!=="oom@xxx.com") {
        return fail(400, { success: false,msg:"User Not found" });
    }

    if (password !== "1234") {
        return fail(400, { success: false,msg:"Incorrect Password" });
    }
    return { success: true,msg:"Login success" };
}
/** @type {import('./$types').Action} */
const register = async ({  request }) => {
    const data = await request.formData();
    email = data.get('email')?.toString()??"";
    password = data.get('password')?.toString()??"";

    if (email=="oom@xxx.com") {
        return fail(400, { success: false,msg:"User exist" });
    }

    if (password.length <8) {
        return fail(400, { success: false,msg:"Password must longer than 6 character" });
    }
    return { success: true,msg:"Register success" };

}
/** @type {import('./$types').Actions} */
export const actions = { login, register }