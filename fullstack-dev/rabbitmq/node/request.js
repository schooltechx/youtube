import { connect } from "amqplib"
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel()
await channel.assertQueue("request-queue")
const q = await channel.assertQueue("",{exclusive: true})
channel.consume(q.queue,async (msg)=>{
    let id = msg.properties.correlationId
    const message = msg.content.toString()
    console.log(`Get Response[${id}] :${message}`)
},{noAck:true}) //auto ack
for(let i=0;i<4;i++){
    const message = "Hello "+i
    console.log("Send :"+message)
    channel.sendToQueue("request-queue",Buffer.from(message),
    {
        replyTo:q.queue,
        correlationId:i.toString()
    })
}
