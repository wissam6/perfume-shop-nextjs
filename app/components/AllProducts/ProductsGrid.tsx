"use client";

import * as React from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import { MyCommandCell } from "./MyCommandCell";
import { insertItem, updateItem, deleteItem } from "./services";
import { Product } from "./interfaces";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { process } from "@progress/kendo-data-query";
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
    console.log("add 2");
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
    console.log("add 1");
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
          src={
            props.dataItem.image ||
            "https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest?cb=20200526171842"
          }
          alt="Eau de Cologne"
          width={100}
          height={100}
        />
      </td>
    );
  };

  const _export = React.useRef<ExcelExport | null>(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const [sort, setSort] = React.useState();
  const handleSortChange = (event) => {
    setSort(event.sort);
  };

  return (
    <ExcelExport data={data} ref={_export}>
      <div style={{ height: "100%" }}>
        <Grid
          style={{ height: "100%" }}
          data={process(data, { sort: sort })}
          onItemChange={itemChange}
          editField={editField}
          sort={sort}
          sortable={true}
          onSortChange={handleSortChange}
        >
          <GridToolbar>
            <Button title="Add new" themeColor="primary" onClick={addNew}>
              Add new
            </Button>
            <Button
              title="Export Excel"
              themeColor="primary"
              onClick={excelExport}
            >
              Export to Excel
            </Button>
          </GridToolbar>
          <Column
            field="image"
            title=" "
            cells={{ data: ImageCell }}
            width={100}
            editor="text"
          />
          <Column field="brand" title="Brand" editor="text" />
          <Column field="name" title="Name" editor="text" />
          <Column field="type" title="Type" editor="text" />
          <Column field="stock" title="Stock" editor="numeric" />
          <Column field="country" title="Country" editor="text" />
          <Column field="size" title="Size" editor="numeric" />
          <Column field="sex" title="Sex" editor="text" />
          <Column field="rating" title="Rating" editor="numeric" />
          <Column field="sale" title="Sale" editor="numeric" />
          <Column field="price" title="Price" editor="numeric" />
          <Column cell={CommandCell} width="200px" />
        </Grid>
      </div>
    </ExcelExport>
  );
};
