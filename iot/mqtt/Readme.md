[MQTT + node.js + ReductStore](https://www.reduct.store/blog/tutorials/iot/how-to-keep-mqtt-data-node)

[src/index.ts](.src/index.ts) Subscribe to MQTT
[src/pub.ts](./src/pub.ts) Publish to MQTT
[src/show.ts](./src/show.ts) show data in db

```
$ npm init
$ npm install --save reduct-js async-mqtt
```

MQTT command line client
```
sudo apt-get install mosquitto-clients
mosquitto_pub -t topic-1 -m "Hello, topic-1!"
mosquitto_pub -t topic-1 -m "Hello, topic-2!"
mosquitto_pub -t topic-3 -m "Hello, topic-3!"
```



[อ่านเพิ่ม]
[The Ultimate Guide on How to Use MQTT with Node.js](https://www.hivemq.com/blog/ultimate-guide-on-how-to-use-mqtt-with-node-js/)


[MQTT-exporter](https://github.com/kpetremann/mqtt-exporter)

[sapcc/mosquitto-exporter](https://github.com/sapcc/mosquitto-exporter)


[How to Set Up Prometheus for Monitoring a Node.js Application: A Step-by-Step Guide](https://srivastavayushmaan1347.medium.com/how-to-set-up-prometheus-for-monitoring-a-node-js-application-a-step-by-step-guide-36742cfac1ef)
[Monitoring Node.js Apps with Prometheus](https://betterstack.com/community/guides/scaling-nodejs/nodejs-prometheus/)