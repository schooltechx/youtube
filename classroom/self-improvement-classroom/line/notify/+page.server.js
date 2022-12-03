const notify_token = "5k4QxxxxxxxxxxxxxxxxxxxxxxxxxxaeYK"
/** @type {import('./$types').Action} */
async function notify({ request, fetch }) {
    const data = await request.formData();
    let message = data.get('message')?.toString() ?? "Hello";
    const res = await fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + notify_token,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            'message': message,
        }),
    })
    if (!res.ok) {
        console.log("Notify fail " + res.status)
        return { success: false }
    }
    return { success: true }
}
/** @type {import('./$types').Actions} */
export const actions = { notify };