/** @type {import('./$types').PageLoad} */
export function load({ params,url,routeId }) {
    let slug = params.slug
    let pathname = url.pathname
    let route_id = routeId??""
    return {
        slug:slug,
        pathname:pathname,
        routeId:route_id
    }
}