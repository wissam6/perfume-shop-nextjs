import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
let data = [];

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

fetchData();

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const insertItem = (item) => {
  item.id = generateId(data);
  item.inEdit = false;
  data.unshift(item);
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
