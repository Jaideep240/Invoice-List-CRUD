import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  DialogPaper: {
    maxWidth: "60rem !important",
    backgroundColor: "#2A3E4C !important",
    color: "#FFFFFF !important",
  },
  txtBox: {
    backgroundColor: "#FFFFFF !important",
    borderRadius: "0.3rem !important",
    width: "100% !important",
  },
}));

const AddDialog = (props) => {
  const classes = useStyles();

  const [comp_code, set_comp_code] = useState("");
  const [cust_num, set_cust_num] = useState("");
  const [sales_org, set_sales_org] = useState();
  const [dist_chann, set_dist_chann] = useState("");
  const [cust_id, set_cust_id] = useState("");
  const [ord_curr, set_ord_curr] = useState();
  const [amount_in_usd, set_amount_in_usd] = useState();
  let [ord_creat_date, set_ord_creat_date] = useState(new Date());
  const [open, setOpen] = useState(false);
  const length = props.length;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleClear = () => {
  //   setFormData({ name: "", email: "" });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sl_no = length + 1;
    // http://localhost:8080/TestServlet/AddServlet?COMPANY_CODE=${comp_code}&CUSTOMER_NUMBER=${cust_num}&SALES_ORGANIZATION=${sales_org}&DISTRIBUTION_CHANNEL=${dist_chann}&CUSTOMER_ID=${cust_id}&ORDER_CURRENCY=${ord_curr}&AMOUNT_IN_USD=${amount_in_usd}&ORDER_CREATION_DATE=${ord_creat_date}
    const url = `http://localhost:8080/api/data/`;
    ord_creat_date = moment(ord_creat_date).format("DD-MM-YYYY");
    try {
      axios
        .post(url, {
          sl_no,
          comp_code,
          cust_num,
          sales_org,
          dist_chann,
          cust_id,
          ord_curr,
          amount_in_usd,
          ord_creat_date,
        })
        .then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        style={{ color: "white", paddingLeft: "2rem", paddingRight: "2rem" }}
        onClick={handleClickOpen}
        size="medium"
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.DialogPaper }}
        aria-labelledby="form-Dialog-title"
      >
        <DialogTitle>Add</DialogTitle>
        <DialogContent style={{ marginTop: "20px" }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  name="cust_id"
                  variant="outlined"
                  label="Customer Order ID"
                  size="small"
                  onChange={(e) => set_cust_id(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="sales_org"
                  variant="outlined"
                  label="Sales Organization"
                  size="small"
                  onChange={(e) => set_sales_org(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="dist_chann"
                  variant="outlined"
                  label="Distribution Channel"
                  size="small"
                  onChange={(e) => set_dist_chann(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="cust_num"
                  variant="outlined"
                  label="Customer Number"
                  size="small"
                  onChange={(e) => set_cust_num(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="comp_code"
                  variant="outlined"
                  label="Company Code"
                  size="small"
                  onChange={(e) => set_comp_code(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  name="ord_curr"
                  variant="outlined"
                  label="Order Currency"
                  size="small"
                  onChange={(e) => set_ord_curr(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  name="amount_in_usd"
                  variant="outlined"
                  label="Amount In USD"
                  size="small"
                  onChange={(e) => set_amount_in_usd(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  name="ord_creat_date"
                  variant="outlined"
                  label="Order Creation Date"
                  size="small"
                  type="date"
                  defaultValue="2017-05-24"
                  onChange={(e) => set_ord_creat_date(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            Add
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
