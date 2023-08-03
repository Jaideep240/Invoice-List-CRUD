import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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

const EditDialog = (props) => {
  const classes = useStyles();

  console.log(props.currentRow);
  console.log(props.select);

  const [ord_curr, set_ord_curr] = useState("");
  const [dist_chan, set_dist_chan] = useState("");
  const [comp_code, set_comp_code] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleUpdate = (e) => {
    if (props.select.length > 1) {
      alert("Multiple Row Selected");
    } else {
      e.preventDefault();
      let cust_id = props.rowCustomerOrderId;
      const url = `http://localhost:8080/api/data/${cust_id}`;
      // http://localhost:8080/TestServlet/UpdateServlet?Sl_no=${props.select[0]}&Order_Currency=${ord_curr}&Company_Code=${comp_code}&Distribution_Channel=${dist_chan}

      try {
        axios
          .put(url, { ord_curr, comp_code, dist_chan })
          .then((res) => console.log(res.data));
      } catch (err) {
        console.log(err);
      }
    }
    setOpen(false);
  };

  const handleClose = (e) => {
    e.preventDefault();

    console.log(ord_curr, dist_chan);
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
        size="medium"
        disabled={props.select.length === 1 ? false : true}
        onClick={handleClick}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.DialogPaper }}
        aria-labelledby="form-Dialog-title"
      >
        <DialogTitle>EDIT</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  name="ord_curr"
                  variant="outlined"
                  label="Order Currency"
                  onChange={(e) => set_ord_curr(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="comp_code"
                  variant="outlined"
                  label="Company Code"
                  onChange={(e) => set_comp_code(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="dist_chan"
                  variant="outlined"
                  label="Distribution Channel"
                  onChange={(e) => set_dist_chan(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdate}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            EDIT
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;
