
/** @param {MessageEvent<{a:number,b:number}>} d */
onmessage = ({data})=>{
    console.log("Get number",data)
    const answer = data.a+data.b
    postMessage({answer})
}
export {}