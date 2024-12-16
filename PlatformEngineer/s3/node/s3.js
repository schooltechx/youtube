import { createInterface } from "node:readline/promises";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const region = "th-middle-rack-1"//any value or Configuration -> Region
const accessKeyId = "trainee"
const secretAccessKey = "P@ssw0rd"
const endpoint = "http://localhost:9000"
const firstObj="testfolder/my-first-object.txt"
const secondObj="my-second-object.txt"
export async function main() {
  
  const s3Client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
    sslEnabled:false,
    forcePathStyle:true,
    endpoint
    
  });
  console.log("Created client")
  const bucketName = `test-bucket-${Date.now()}`;
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    })
  );
  console.log("CreateBucketCommand:"+bucketName)
  const listBucketsResult = await s3Client.send(new ListBucketsCommand({}));
  console.log("ListBucketsResult: ", listBucketsResult.Buckets);

  console.log("PutObjectCommand")
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: firstObj,
      Body: "Hello JavaScript SDK!",
    })
  );
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: secondObj,
      Body: "Hello JavaScript SDK! 2",
    })
  );

  const objCmd = new GetObjectCommand({
    Bucket: bucketName,
    Key: firstObj,
  })
  //You can get signed URL for other S3 operations too, like PutObjectCommand
  //expiresIn default at 900
  const signedUrl = await getSignedUrl(s3Client, objCmd,{ expiresIn: 3600 });
  console.log("getSignedUrl:"+signedUrl)
  const { Body } = await s3Client.send(objCmd);
  console.log("GetObjectCommand:"+await Body.transformToString());

  console.log(`List folder in ${{bucketName}}:testfolder`)

  const response = await s3Client.send(new ListObjectsV2Command({
    Bucket: bucketName,
    Delimiter:'/',
    Prefix:'testfolder/'
  }))
  console.log(response.Contents)

  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const result = await prompt.question("Empty and delete bucket? (y/n) ");
  prompt.close();

  if (result === "y") {
    // Create an async iterator over lists of objects in a bucket.
    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: bucketName }
    );
    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        // For every object in each page, delete it.
        for (const object of objects) {
          console.log("DeleteObjectCommand:"+object.Key)
          await s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
          );
        }
      }
    }
    // Once all the objects are gone, the bucket can be deleted.
    await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
  }
}

// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
import { fileURLToPath } from "node:url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}