import React,{useState} from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";



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

const AdvanceSearch = (props) => {
    const classes = useStyles();
    const [sales_org,set_sales_org] = useState("");
    const [cust_ord_id,set_cust_ord_id] = useState("");
    const [cust_num,set_cust_num] = useState("");

    const [open, setOpen] = useState(false);

    const handleSearch = () =>{
      const advSearch_arr = [];
      advSearch_arr.push(sales_org);
      advSearch_arr.push(cust_ord_id);
      advSearch_arr.push(cust_num);
      console.log(advSearch_arr);
      props.adv_Search(advSearch_arr);
      setOpen(false);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
      <Button
        variant="outlined"
        style={{ color: "white", paddingLeft: "0.9rem", paddingRight: "0.9rem" }}
        onClick={handleClickOpen}
        size="medium"
      >
        Advance Search
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.DialogPaper }}
        aria-labelledby="form-Dialog-title"
      >
        <DialogTitle>Advance Search</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  name="sales_org"
                  variant="outlined"
                  label="Sales organization"
                  onChange={(e) => set_sales_org(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="cust_ord_id"
                  variant="outlined"
                  label="Customer Order ID"
                  onChange={(e) => set_cust_ord_id(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="cust_num"
                  variant="outlined"
                  label="Customer Number"
                  onChange={(e) => set_cust_num(e.target.value)}
                  className={classes.txtBox}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSearch}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            SEARCH
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

 }

 export default AdvanceSearch