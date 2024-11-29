import MQTT from 'async-mqtt'
MQTT.connectAsync("tcp://localhost:1883")
  .then(async (mqttClient) => {
    for(let i=0;i<10;i++){
      await mqttClient.publish("test"+i,"Hello "+i)
    }
    mqttClient.end()
    console.log("Done")
  })
  .catch((error) => console.error(error));