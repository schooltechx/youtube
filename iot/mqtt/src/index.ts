import MQTT from 'async-mqtt'
import {Client} from 'reduct-js'

MQTT.connectAsync("tcp://localhost:1883")
  .then(async (mqttClient) => {
    await mqttClient.subscribe("#");

    const reductClient = new Client("http://localhost:8383");
    const bucket = await reductClient.getOrCreateBucket("mqtt");

    mqttClient.on("message", async (topic, msg) => {
        try{
            const record = await bucket.beginWrite(topic);
            await record.write(msg);
            console.log(
              'Received message "%s" from topic "%s" is written',
              msg,
              topic,
            );
      
        }catch(error){
            console.error(error)
        }
    });
  })
  .catch((error) => console.error(error));