import React from "react";
import AddDialog from "./addDialog";
import DeleteDialog from "./deleteDialog";
import EditDialog from "./editDialog";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@material-ui/core";
import AdvanceSearch from "./advanceSearch";
import TextField from "@mui/material/TextField";
import "./style.css";

const BodyHeader = (props) => {
  console.log(props.currentRow);
  
  return (
    <div className="parentBodyHeader">
      <ButtonGroup className="btnGrp">
        <AddDialog length={props.length} />
      </ButtonGroup>
      <div>
        <Button
          variant="outlined"
          onClick={() => window.location.reload(false)}
          className="refreshBtn"
        >
          Refresh
        </Button>
        <ButtonGroup>
          <EditDialog currentRow={props.currentRow} select={props.select} rowCustomerOrderId={props.rowCustomerOrderId} />
          <DeleteDialog currentRow={props.currentRow} select={props.select} rowCustomerOrderId={props.rowCustomerOrderId} />
        </ButtonGroup>
      </div>

      <div className="search">
        <TextField
          type="search"
          variant="outlined"
          label="Search Customer Id"
          onChange={(e) => props.searchItems(e.target.value)}
          className="searchBox"
          size="small"
        />

        {/* <Button
          variant="outlined"
          onClick={AdvanceSearch}
          className="advanceSearchBtn"
        >
          Advance Search
        </Button> */}
      </div>
    </div>
  );
};

export default BodyHeader;
