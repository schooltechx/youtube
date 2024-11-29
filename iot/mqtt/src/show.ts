import {Client} from 'reduct-js'

const client = new Client("http://localhost:8383");

client
  .getBucket("mqtt")
  .then(async (bucket) => {
    for (const entry of await bucket.getEntryList()) {
      for await (const record of bucket.query(entry.name)) {
        const data = await record.read();
        console.log('"%s" : "%s" : "%d"',entry.name, data, record.time);
      }
    }
  })
  .catch((error) => console.error(error));