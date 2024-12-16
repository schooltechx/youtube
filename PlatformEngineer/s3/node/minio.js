import { createInterface } from "node:readline/promises";
import { text } from "node:stream/consumers";
import * as Minio from "minio";
const region = "th-middle-rack-1"; //any value or Configuration -> Region
const accessKey = "trainee";
const secretKey = "P@ssw0rd";
const endPoint = "localhost";
const port = 9000;
const useSSL = false;
const firstObj = "testfolder/my-first-object.txt";
const secondObj = "my-second-object.txt";
export async function main() {
  const minioClient = new Minio.Client({
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
  console.log("Created client");
  const bucketName = `test-minio-bucket-${Date.now()}`;
  await minioClient.makeBucket(bucketName, region);
  const exists = await minioClient.bucketExists(bucketName);
  console.log(`makeBucket: ${bucketName} is ${exists}`);

  console.log("putObject");
  await minioClient.putObject(
    bucketName,
    firstObj,
    "Hello Minio JavaScript SDK!"
  );
  await minioClient.putObject(
    bucketName,
    secondObj,
    "Hello Minio JavaScript SDK! 2"
  );
  const signedUrl = await minioClient.presignedUrl(
    "GET",
    bucketName,
    firstObj,
    24 * 60 * 60
  );
  console.log("presignedUrl:" + signedUrl);
  const dataStream = await minioClient.getObject(bucketName, firstObj);
  console.log("getObject:" + (await text(dataStream)));

  console.log("List folder in " + bucketName, "testfolder");
  const objlist = minioClient.listObjectsV2(bucketName, "testfolder/", false);
  for await (const o of objlist) {
    console.log(o);
  }

  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const result = await prompt.question("Empty and delete bucket? (y/n) ");
  prompt.close();

  if (result === "y") {
    // Create an async iterator over lists of objects in a bucket.
    const objlist = minioClient.listObjects(bucketName, "", true);
    for await (const o of objlist) {
      console.log("removeObject:"+o.name);
      await minioClient.removeObject(bucketName, o.name);
    }
    await minioClient.removeBucket(bucketName);
  }
}
main();
