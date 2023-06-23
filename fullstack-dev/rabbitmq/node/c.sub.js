const [,,exchange,exchange_type,bkeys] = process.argv
if( process.argv.length!=5 ||
    !['fanout','direct','topic','headers'].includes(exchange_type)){
        help()
}
function help(){
    console.log("Usage: node c.sub.js exchange exchange_type binding_keys")
    console.log("example: node c.pub.js pub-sub direct info+danger ")
    process.exit()
}
import { connect } from "amqplib";
const connection =  await connect("amqp://frappet:Password@localhost")
const channel = await connection.createChannel();
await channel.assertExchange(exchange, exchange_type, {durable: false})

const q = await channel.assertQueue("",{exclusive: true})
const queue = q.queue //get random name queue
bkeys.split('+').forEach(async (bindingKey) => {
    if(exchange_type==='headers'){
        let opts =JSON.parse(bindingKey)
        await channel.bindQueue(queue, exchange,'',opts);
    }else
        await channel.bindQueue(queue, exchange, bindingKey);    
});
channel.consume(queue,async (msg)=>{
    console.log(`Received: ${msg.content.toString()} `)
},{noAck:true}) //auto ack
// {\"asd\":\"request\",\"efg\":\"test\",\"x-match\":\"all\"}
