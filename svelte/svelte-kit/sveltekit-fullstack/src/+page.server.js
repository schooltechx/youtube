import {SOME_VALUE} from  '$env/static/private';
/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
    let who= url.searchParams.get("who") ?? 'guest'
    return {
        title: 'Hello ' + who,
        content: '<b>Welcome</b> to our blog.'+SOME_VALUE
    };
}
