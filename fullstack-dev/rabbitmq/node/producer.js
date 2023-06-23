import { connect } from "amqplib"
const queue = "concurrent-queue"
const connection =  await connect("amqp://oom:Password@localhost")
const channel = await connection.createChannel()
await channel.assertQueue(queue,{durable:true})
for(let i=0;i<10;i++){
    const message="Hello "+i
    channel.sendToQueue(queue,Buffer.from(message),{persistent: false})    
}
await channel.close()
await connection.close()