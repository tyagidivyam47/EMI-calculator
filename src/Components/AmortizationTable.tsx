import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row({ row, index, year}:any) {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {year}
        </TableCell>
        <TableCell align="right">{parseFloat(row.annInterest).toFixed(2)}</TableCell>
        <TableCell align="right">{parseFloat(row.annPrincipal).toFixed(2)}</TableCell>
        <TableCell align="right">{row.annPayment}</TableCell>
        <TableCell align="right">{row.annUnpaid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Monthly
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell align="right">Principal</TableCell>
                    <TableCell align="right">Payment</TableCell>
                    <TableCell align="right">Unpaid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.monthWise.map((monRow:any, index:any) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell>{monRow.interest}</TableCell>
                      <TableCell align="right">{monRow.principal}</TableCell>
                      <TableCell align="right">
                        {monRow.payment}
                      </TableCell>
                      <TableCell align="right">
                        {monRow.unpaid}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const AmortizationTable = ({ data }: any) => {
  const [ammData, setAmmData] = React.useState([]);

  React.useEffect(() => {
    // let tempArr = [{
    //   "interest":data[0].interest,
    //   "payment": data[0].payment,
    //   "principal":data[0].principal,
    //   "unpaid":data[0].unpaid
    // }]

    let tempArr = [];
    // let currYear
    for (let i = 1; i < data.length; i++) {
      let annInterest = 0;
      let annPayment = 0;
      let annPrincipal = 0;
      let annUnpaid = 0;
      let tempMonArr = [];

      while (true) {
        let tempObj = {
          interest: data[i].interest,
          payment: data[i].payment,
          principal: data[i].principal,
          unpaid: data[i].unpaid,
        };
        tempMonArr.push(tempObj);
        annInterest += +tempObj.interest;
        annPayment += +tempObj.payment;
        annPrincipal += +tempObj.principal;
        if(i%12 === 0){
          annUnpaid = tempObj.unpaid;
          break;
        }
        i++;
      }
      let tempAnnObj = {
        annInterest,
        annPayment,
        annPrincipal,
        annUnpaid,
        "monthWise":tempMonArr
      }
      tempArr.push(tempAnnObj);
    }
    setAmmData(tempArr);
    // console.log(tempArr)
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Year</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Principal</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Unpaid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ammData && ammData?.map((row, index) => (
            <Row key={index} year={index+1} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AmortizationTable;
