/**
 * @typedef { import("./types").Product } Product
 * @typedef { import("./types").Products } Products
 * @typedef { import("./types").Data } Data
*/

import { initializeApp } from "firebase/app";
import {
    getFirestore, doc, collection,
    addDoc, deleteDoc, getDocs, setDoc,
    query, where //,startAt, endAt, orderBy
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC6iD5hFTM-lWoQhNnd6rlesWk5VHOziOo",
    authDomain: "schooltech-demo.firebaseapp.com",
    projectId: "schooltech-demo",
    storageBucket: "schooltech-demo.appspot.com",
    messagingSenderId: "488366757918",
    appId: "1:488366757918:web:f22d61cf075467106f360f",
    measurementId: "G-G8HRHELR7S"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const proColRef = collection(db, 'Product');

/**
* @param {Product} p
* @param {Data} data
*/
async function createProduct(p, data) {
    let snapShot = await addDoc(proColRef, p)
    data.message = `Created ${snapShot.id}`
}
/**
* @param {Product} p
* @param {Data} data
 */
async function updateProduct({ id, name, category, price, tags }, data) {
    const docRef = doc(db, 'Product', id ?? "")
    let p = { name, category, price, tags }
    await setDoc(docRef, p)
    data.message = `Update ${id}`
}

/**
 * @param {string} pro_id
 * @param {Data} data
 */
 async function deleteProduct(pro_id, data) {
    const docRef = doc(db, 'Product', pro_id)
    await deleteDoc(docRef)
    data.message = `Delete ${pro_id}`
}

/**
* @param {string} stext //search text
* @param {Data} data
*/
async function searchProduct(stext, data) {
    const q = (stext=="")?
        query(proColRef):
        query(proColRef, where("name","==",stext))
    const snapshot = await getDocs(q)
    data.products = []
    snapshot.forEach((p) => {
        data.products.push({ ...p.data(), id: p.id })
    })
    data.products = data.products
    data.message = "Search " + stext
}
export {
    proColRef, createProduct, updateProduct, deleteProduct, searchProduct
}
