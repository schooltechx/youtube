
/*
  รูปแบบการใช้ fech ฝั่ง Frontend เพื่อเรียก REST API
*/
let users = [], name="",email="",id=0, msg=""
async function getUsers(){
        const res = await fetch('/api/users')
        users = await res.json()
}
async function getUser(){
    const res = await fetch('/api/users/'+id)
    const user = await res.json()
}
async function createUser(){
    const res = await fetch('/api/users', { method: 'POST',
        body: JSON.stringify({email,name})
    })
}
async function updateUser(){
    const res = await fetch('/api/users/' + id, { method: 'PUT',
        body: JSON.stringify({email,name})
    })
}
async function deleteUser(){
    const res = await fetch('/api/users/' + id, {method: 'DELETE'})
}
