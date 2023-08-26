import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
let data: any = [];

const fetchData = async () => {
  let products: any = [];
  const querySnapshot = await getDocs(collection(db, "perfumes"));
  querySnapshot.forEach((doc) => {
    let docData = doc.data();
    docData.id = doc.id;
    products = [...products, docData];
  });
  data = products;
};

const insertToDatabase = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "perfumes"), {
      id: item.id,
      brand: item.brand || "",
      country: item.country || "",
      image: item.image || "",
      name: item.name || "",
      price: item.price || 0,
      rating: item.rating || 0,
      sale: item.sale || 0,
      sex: item.sex || "",
      size: item.size || 0,
      stock: item.stock || 1,
      type: item.type || "",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/* const deleteFromDataBase = async () => {
  await deleteDoc(doc(db, "perfumes", "0"));
}; */

fetchData();

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const insertItem = (item) => {
  item.id = generateId(data);
  item.inEdit = false;
  data.unshift(item);
  insertToDatabase(item);
  return data;
};

export const getItems = () => {
  return data;
};

export const updateItem = (item) => {
  let index = data.findIndex((record) => record.id === item.id);
  data[index] = item;
  return data;
};

export const deleteItem = (item) => {
  let index = data.findIndex((record) => record.id === item.id);
  data.splice(index, 1);
  return data;
};
