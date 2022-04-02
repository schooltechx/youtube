/** @type {import('@sveltejs/kit').RequestHandler} */
//GET api/users, api/users?search=xxx, apt/users/1
export async function get({ url,params }) {
    let body, status = 200, id = params.id
    let searchText = url.searchParams.get("search")
    return {status,body};
}
//POST api/user
export async function post({ request }) {
    let body, status = 201
    const data = await request.json()
    return {status,body};
}
//PUT api/user/1
export async function put({ request, params }) {
    let body, status = 204, id = params.id
    const data = await request.json()
    return {status,body}
}
//DELETE api/user/1
export async function del({ params }) {
    let body, status = 204, id = params.id
    return {status,body}
}
