"use client";

import * as React from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "./MyCommandCell";
import { insertItem, updateItem, deleteItem } from "./services";
import { Product } from "./interfaces";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const editField: string = "inEdit";

export const AllProducts = () => {
  const [initialData, setInitialData] = React.useState<Product[]>([]);
  const [data, setData] = React.useState<Product[]>([]);

  const fetchData = async () => {
    let products: any = [];
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      products = [...products, docData];
    });
    setInitialData(products);
    setData(products);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // modify the data in the store, db etc
  const remove = (dataItem: Product) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
  };

  const add = (dataItem: Product) => {
    dataItem.inEdit = true;

    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = (dataItem: Product) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem: Product) => {
    const originalItem = initialData.find((p) => p.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item
    );

    setData(newData);
  };

  const enterEdit = (dataItem: Product) => {
    setData(
      data.map((item) =>
        item.id === dataItem.id ? { ...item, inEdit: true } : item
      )
    );
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );

    setData(newData);
  };

  const addNew = () => {
    const newDataItem = { inEdit: true, Discontinued: false };

    setData([newDataItem, ...data]);
  };

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const ImageCell = (props) => {
    return (
      <td>
        <Image
          src={props.dataItem.image}
          alt="Eau de Cologne"
          width={100}
          height={100}
        />
      </td>
    );
  };

  return (
    <Grid
      style={{ height: "420px" }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="image" title=" " cell={ImageCell} width={100} />
      <Column field="brand" title="Brand" />
      <Column field="type" title="Type" />
      <Column field="stock" title="Stock" />
      <Column field="country" title="Country" />
      <Column field="size" title="Size" />
      <Column field="sex" title="Sex" />
      <Column field="rating" title="Rating" />
      <Column field="sale" title="Sale" />
      <Column field="price" title="Price" />
      <Column cell={CommandCell} width="200px" />
    </Grid>
  );
};
