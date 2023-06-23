import { connect } from "amqplib";
const queue = "concurrent-queue"
const connection =  await connect("amqp://oom:Password@localhost")
const channel = await connection.createChannel();
await channel.assertQueue(queue,{durable:true})
channel.prefetch(1);
channel.consume(queue,async (msg)=>{
    let processingTime = Math.floor(Math.random() * 8)+1;//1-8 sec
    console.log(`Received: ${msg.content.toString()}`)
    await sleep(processingTime*1000);
    console.log(`done ${msg.content.toString()}`)
    channel.ack(msg)
},{noAck:false}) //manual ack
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}