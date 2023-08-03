import React, { useState, useEffect } from "react";
import BodyHeader from "./bodyHeader";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "Sl_no", headerName: "Sl No", width: 70 },
  { field: "CUSTOMER_ORDER_ID", headerName: "Customer Order ID", width: 150 },
  { field: "SALES_ORG", headerName: "SalesOrg", type: "number", width: 130 },
  {
    field: "DISTRIBUTION_CHANNEL",
    headerName: "Distribution Channel",
    width: 290,
  },
  {
    field: "COMPANY_CODE",
    headerName: "Comapany Code",
    type: "number",
    width: 120,
  },
  {
    field: "ORDER_CREATION_DATE",
    headerName: "Order Creation Date",
    width: 160,
  },
  {
    field: "ORDER_AMOUNT",
    headerName: "Order Amount",
    type: "number",
    width: 160,
  },
  {
    field: "ORDER_CURRENCY",
    headerName: "Order Currency",

    width: 160,
  },
  {
    field: "CUSTOMER_NUMBER",
    headerName: "Customer Number",
    type: "number",
    width: 160,
  },
  {
    field: "AMOUNT_IN_USD",
    headerName: "Amount In USD",
    type: "number",
    width: 160,
  },
];

export const Body = (props) => {
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [currentRow, setCurrentRow] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [select, setSelection] = useState([]);
  const [length, setLength] = useState();
  const [rowCustomerOrderId,setRowCustomerOrderId] = useState([])
  // const [adv_arr, setAdv_arr] = useState([]);

  // const adv_Search = (advSearch_arr) => {
  //   console.log(advSearch_arr);

  //   if (advSearch_arr.length !== 0) {
  //     const filteredRows = tableData.filter((row) => {
  //       return (
  //         row.SALES_ORG
  //           .toLowerCase()
  //           .includes(advSearch_arr[3].toLowerCase()) &&
  //         row.CUSTOMER_NUMBERber
  //           .toString()
  //           .toLowerCase()
  //           .includes(advSearch_arr[2].toLowerCase()) &&
  //         row.CUSTOMER_ORDER_ID
  //           .toString()
  //           .toLowerCase()
  //           .includes(advSearch_arr[1].toLowerCase())
  //       );
  //     });
  //     setFilteredData(filteredRows);
  //     setAdv_arr(advSearch_arr);
  //   } else {
  //     setFilteredData(tableData);
  //   }
  // };

  const searchItems = (searchVal) => {
    setSearched(searchVal);
    if (searched !== "") {
      const filteredRows = tableData.filter((row) => {
        return (
          row.CUSTOMER_NUMBER.toString()
            .toLowerCase()
            .includes(searched.toLowerCase()) ||
          row.CUSTOMER_ORDER_ID.toString()
            .toLowerCase()
            .includes(searched.toLowerCase())
        );
      });
      setFilteredData(filteredRows);
    } else {
      setFilteredData(tableData);
    }
  };

  const handleRowSelection = (e) => {
    const value = e.map((Sl_no) => tableData.find((row)=>row.Sl_no==Sl_no));
    // setRowCustomerOrderId(value[0].CUSTOMER_ORDER_ID | "")
    if (value.length === 1  && value[0].CUSTOMER_ORDER_ID) {
      setRowCustomerOrderId(value[0].CUSTOMER_ORDER_ID);
      // console.log(value[0].CUSTOMER_ORDER_ID);
    }
      // console.log(value);
    setSelection(e);
    if (e.length === 1) setCurrentRow(true);
    else setCurrentRow(false);
    console.log(select);
    console.log(select.length);
  };

  useEffect(() => {
    console.log("useEffect");
    // http://localhost:8080/TestServlet/ReadServlet
    axios
      .get("http://localhost:8080/api/data/")
      .then((res) => {
        // console.log(res.data)
        setTableData(res.data);
        setLength(res.data.length);
        // console.log(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <BodyHeader
        currentRow={currentRow}
        searchItems={searchItems}
        select={select}
        length={length}
        rowCustomerOrderId={rowCustomerOrderId}
      />

      <div style={{ height: 400, width: "100%" }}>
        {searched.length > 1 ? (
          <DataGrid
            getRowId={(r) => r.Sl_no}
            sx={{
              ".MuiDataGrid-root": {
                backgroundColor: "#282c34",
              },
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              ".MuiTablePagination-root, .MuiSvgIcon-root": {
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.5rem",
                whiteSpace: "normal",
              },
              border: "none",
              color: "#FFFFFF",
              boxShadow: 5,
            }}
            rows={filteredData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelection}
            // selectionModel={select}
            disableSelectionOnClick={true}
          />
        ) : (
          <DataGrid
            getRowId={(r) => r.Sl_no}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              ".MuiTablePagination-root, .MuiSvgIcon-root": {
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.5rem",
                whiteSpace: "normal",
              },
              // ".MuiDataGrid-columnHeaders":{
              //   paddingBottom: "0.5rem",
              // },
              border: "none",
              color: "#FFFFFF", //font
              boxShadow: 5,
            }}
            rows={tableData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={handleRowSelection}
            selectionModel={select}
            disableColumnFilter={true}
          />
        )}
      </div>
    </div>
  );
};
