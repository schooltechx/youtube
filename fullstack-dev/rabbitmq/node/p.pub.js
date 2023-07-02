const [,,exchange,exchange_type] = process.argv
if( process.argv.length!=4 ||
    !['fanout','direct','topic','headers'].includes(exchange_type)){
        help()
}
function help(){ //exchange_type: 'fanout','direct','topic'
    console.log("Usage: node p.pub.js [exchange_name] [exchange_type] [routingKey] [message] ")
    console.log("Example: node p.pub.js pub-sub fanout")
    console.log("Example: node p.pub.js pub-sub-headers headers")
    process.exit()
}
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { connect } from "amqplib";
const rl = readline.createInterface({ input, output })
const connection =  await connect("amqp://oom:Password@localhost")
const channel = await connection.createChannel();
await channel.assertExchange(exchange, exchange_type, {durable: false})
console.log("Message format 'routingKey+message' or type q to quit)");

rl.on('line', async (line) => { 
    if(line==='q'){
        await channel.close();
        await connection.close()
        process.exit()
    }
    const [routingKey,msg] = line.split('+')
    const message = msg
    if(exchange_type==='headers'){
        let opts={headers: JSON.parse(routingKey)}
        channel.publish(exchange, '' , Buffer.from(message),opts);
    }else{
        channel.publish(exchange, routingKey, Buffer.from(message));
    }
});
// { "asd": "request", "efg": "test" } | Hello
// { 'headers': { 'asd': 'request', 'efg': 'test' }} | Hello