"use client";

import * as React from "react";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import Link from "next/link";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import { DataResult, process, State } from "@progress/kendo-data-query";
import Image from "next/image";

export const AllProducts = (props: any) => {
  const data = props.data;
  const [dataState, setDataState] = React.useState<State>({});
  const [dataResult, setDataResult] = React.useState<DataResult>(
    process(data, dataState)
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
        <Grid
          id="allproducts"
          style={{ height: data.length !== 0 ? "100%" : "700px" }}
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
            filterable={false}
          />
          <Column field="brand" title="Brand" filter="text" />
          <Column field="name" title="Name" filter="text" />
          <Column field="type" title="Type" filter="text" />
          <Column field="stock" title="Stock" filter="numeric" />
          <Column field="country" title="Country" filter="text" />
          <Column field="size" title="Size" filter="numeric" />
          <Column field="sex" title="Sex" filter="text" />
          <Column field="rating" title="Rating" filter="numeric" />
          <Column field="sale" title="Sale" filter="numeric" />
          <Column field="price" title="Price" filter="numeric" />
          {/* replace filter with custom cells */}
        </Grid>
      </div>
    </ExcelExport>
  );
};
