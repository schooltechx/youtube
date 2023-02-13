
# Cryptography for developer

# random number


# Base64

# Hash
Password


# Share Secret

# Digital signature

# Symetric Key
Public/Private Key


``` bash
mkdir jwt-test
cd jwt-test
npm init
npm i jsonwebtoken
# สร้าง public/private key 
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pem
code sign-test.js
```

``` js
/*

# สร้างโปรแกรมสำหรับ sign และ verify
code sign-test.js
node sign-test.js

*/
import jwt from 'jsonwebtoken'
import fs from 'fs'
var signOptions = {
    issuer:  "Oom corp",
    subject:  "test@xx.com",
    audience:  "http://localhost",
    expiresIn:  "12h",
    algorithm:  "RS256"
   }
try {
  const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');
  const publicKey = fs.readFileSync('./jwtRS256.key.pem', 'utf8');
  console.log(privateKey, publicKey)
  const token = jwt.sign({id:"oom",name:"Sorawit",role:['admin','dev']},privateKey,signOptions)
  console.log("[token]\n",token,"\n")
  const decoded = jwt.verify(token,publicKey)
  console.log("[Decoded]\n",decoded,"\n")
  
} catch (err) {
  console.error(err);
}

```

``` bash
$ ssh-keygen -P '' -t rsa -b 4096 -m PEM -f jwtRS256.key
Generating public/private rsa key pair.
Your identification has been saved in jwtRS256.key
Your public key has been saved in jwtRS256.key.pub
The key fingerprint is:
SHA256:JEGXjsTn2kzvUsVNNhI3RKCOKyOPHpxLwX0fcilxtz8 oom@Sorawit-Dell
The key's randomart image is:
+---[RSA 4096]----+
|     oo ..  o==  |
|      ooo  ...+. |
|     ..=o o..= . |
|   . ..o+= oo..  |
|    o .=S.=..    |
|   . o..o*o. .   |
|    * o .o.   E  |
|   . * o. .    . |
|   .+ .  .       |
+----[SHA256]-----+
echo "Hello my data" > content.txt
$ ssh-keygen -Y sign -f jwtRS256.key -n file content.txt
Signing file content.txt
Write signature to content.txt.sig
$ cat content.txt | ssh-keygen -Y check-novalidate -f jwtRS256.key.pub -n file -s content.txt.sig
Good "file" signature with RSA key SHA256:JEGXjsTn2kzvUsVNNhI3RKCOKyOPHpxLwX0fcilxtz8
$ echo "Hello my data modified" > content.txt
$ cat content.txt | ssh-keygen -Y check-novalidate -f jwtRS256.key.pub -n file -s content.txt.sig
Signature verification failed: incorrect signature
Could not verify signature.
```
สามารถใช้ วิธีนี้สร้าง .sig ได้เหมือนกันนะ
``` bash
cat content.txt | ssh-keygen -Y sign -n file -f jwtRS256.key > content.txt.sig

```



Read more
- https://superuser.com/questions/308126/is-it-possible-to-sign-a-file-using-an-ssh-key
