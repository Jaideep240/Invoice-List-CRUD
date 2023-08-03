import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  DialogPaper: {
    backgroundColor: "#2A3E4C !important",
    color: "#FFFFFF !important",
  },
  txtBox: {
    backgroundColor: "#FFFFFF !important",
    borderRadius: "0.3rem !important",
  },
}));

const DeleteDialog = (props) => {
  const classes = useStyles();
  console.log(props.select);
  console.log(props.select.length);

  // const [cust_id, set_cust_id] = useState('');
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    //`http://localhost:8080/TestServlet/DeleteServlet?sl_no=${props.select}`

    let cust_id = props.rowCustomerOrderId;
    let sl_no = props.select;
    console.log(props.select);
    const url = `http://localhost:8080/api/data/${cust_id}/${sl_no}`;
    console.log(cust_id);
    console.log(sl_no);

    try {
      axios.delete(url, {cust_id,sl_no} ).then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        style={{
          color: "white",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          marginLeft: "1rem",
        }}
        onClick={handleClick}
        disabled={props.select.length === 1 ? false : true}
        size="medium"
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.DialogPaper }}
        aria-labelledby="alert-Dialog-title"
        aria-describedby="alert-Dialog-description"
      >
        <DialogTitle id="alert-Dialog-title">{"Delete Records ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-Dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to delete these record[s] ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
