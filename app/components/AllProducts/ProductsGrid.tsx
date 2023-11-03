"use client";

import * as React from "react";
import {
  //Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import Link from "next/link";
import dynamic from "next/dynamic";

const MyGrid: any = dynamic(
  () =>
    import("@progress/kendo-react-grid").then(
      (module) => module.Grid
    ) as any /* ,
  {
    ssr: false,
  } */
);

import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import { MyCommandCell } from "./MyCommandCell";
import { insertItem, updateItem, deleteItem } from "./services";
import { Product } from "./interfaces";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { DataResult, process, State } from "@progress/kendo-data-query";
import Image from "next/image";

const editField: string = "inEdit";

export const AllProducts = () => {
  const [initialData, setInitialData] = React.useState<Product[]>([]);
  const [data, setData] = React.useState<Product[]>([]);
  const [dataState, setDataState] = React.useState<State>({});
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
    setDataResult(process(products, dataState));
  };

  const [dataResult, setDataResult] = React.useState<DataResult>();

  React.useEffect(() => {
    fetchData();
  }, []);

  // modify the data in the store, db etc
  const remove = (dataItem: Product) => {
    const newData = [...deleteItem(dataItem)];
    setDataResult(process(newData, dataState));
  };

  const add = (dataItem: Product) => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setDataResult(process(newData, dataState));
  };

  const update = (dataItem: Product) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setDataResult(process(newData, dataState));
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setDataResult(process(newData, dataState));
  };

  const cancel = (dataItem: Product) => {
    const originalItem = initialData.find((p) => p.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item
    );

    setDataResult(process(newData, dataState));
  };

  const enterEdit = (dataItem: Product) => {
    setDataResult(
      process(
        dataResult.data.map((item) =>
          item.id === dataItem.id ? { ...item, inEdit: true } : item
        ),
        dataState
      )
    );
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = dataResult.data.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );

    setDataResult(process(newData, dataState));
  };

  const addNew = () => {
    const newDataItem = { inEdit: true, Discontinued: false };
    setDataResult(process([newDataItem, ...data], dataState));
  };

  const loadingPanel = (
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image"></div>
      <div className="k-loading-color"></div>
    </div>
  );

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

  const ImageCell = (props: any) => {
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

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    setDataResult(process(data, event.dataState));
    setDataState(event.dataState);
  };

  return (
    <ExcelExport data={data} ref={_export}>
      <div style={{ height: "100%" }}>
        {data.length === 0 && loadingPanel}
        <MyGrid
          id="allproducts"
          style={{ height: data.length !== 0 ? "100%" : "700px" }}
          onItemChange={itemChange}
          editField={editField}
          sortable={true}
          filterable={true}
          groupable={true}
          reorderable={true}
          pageable={{ buttonCount: 4, pageSizes: true }}
          data={dataResult}
          {...dataState}
          onDataStateChange={dataStateChange}
        >
          <GridToolbar>
            <Button themeColor="primary">
              <Link href="./home">Back to Home</Link>
            </Button>
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
            filterable={false}
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
          <Column cell={CommandCell} width="200px" filterable={false} />
        </MyGrid>
      </div>
    </ExcelExport>
  );
};
