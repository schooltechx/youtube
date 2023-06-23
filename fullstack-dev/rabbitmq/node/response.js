import { connect } from "amqplib"
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel()
await channel.assertQueue("request-queue")
channel.consume("request-queue",async (msg)=>{
    let id = msg.properties.correlationId
    let queue = msg.properties.replyTo
    let message = msg.content.toString()
    console.log(`Received[${id}]: ${message} `)
    let answer  = message
    channel.sendToQueue(queue,Buffer.from(message.toUpperCase()),{correlationId:id})
},{noAck:true}) //auto ack