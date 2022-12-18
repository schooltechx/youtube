let users =[
    {id:1,name:"aaaa",email:"a@xxx.com"},
    {id:2,name:"bbbb",email:"b@xxx.com"},
    {id:3,name:"cccc",email:"c@xxx.com"},
    {id:4,name:"dddd",email:"d@xxx.com"},
    {id:5,name:"eeed",email:"e@xxx.com"},

]
function getUsers(){
    return users
}
/**
 * @param {number} id
 */
function getUser(id){
    return users.find(u=>u.id === id)
}
/**
 * @param {{name:string,email:string}} user
 */
function isValidUser(user){
    if((typeof user.name==='string')&& 
    typeof user.email==='string' &&
    (user.name.length>3) &&
    (user.email.includes('@'))
    ){
        return true
    }
    return false
}
/**
 * @param {{name:string,email:string}} user
 */
function createUser(user){
    if(isValidUser(user))
        return {id:11,...user}
    return undefined
}
/**
 * @param {{name:string,email:string}} user
 * @param {number} id
 */
function updateUser(user,id){
    if(isValidUser(user))
        return {id,...user}
    return undefined
}
/**
 * @param {number} id
 */
function deleteUser(id){
    return getUser(id)
}

export {getUsers,getUser,isValidUser,createUser,updateUser,deleteUser}