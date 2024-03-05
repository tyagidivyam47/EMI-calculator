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
import { extraLSecondaryColor } from "../Theme";
import { useSelector } from "react-redux";
import { IRootState } from "../store";


function Row({ row, index, year }: any) {
  const currency = useSelector((state:IRootState)=> state.currency.currency);
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
        <TableCell align="right">
          {currency} {parseFloat(row.annInterest).toFixed(2)}
        </TableCell>
        <TableCell align="right">
        {currency} {parseFloat(row.annPrincipal).toFixed(2)}
        </TableCell>
        <TableCell align="right">
        {currency} {parseFloat(row.annPayment).toFixed(2)}
        </TableCell>
        <TableCell align="right">
        {currency} {parseFloat(row.annUnpaid).toFixed(2)}
        </TableCell>
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
                    <TableCell sx={{ fontWeight: "bold" }}>Month</TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }}>Interest</TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth:"0px" }}>Principal</TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
                      Payment
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
                      Unpaid
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.monthWise.map((monRow: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{currency} {monRow.interest.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{currency} {monRow.principal.toLocaleString("en-IN")}</TableCell>
                      <TableCell align="right">{currency} {monRow.payment.toLocaleString("en-IN")}</TableCell>
                      <TableCell align="right">{currency} {monRow.unpaid.toLocaleString("en-IN")}</TableCell>
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

const AmortizationTable = ({ data }: any) => {

  const [ammData, setAmmData] = React.useState([]);

  React.useEffect(() => {
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
          interest: data[i]?.interest || 0,
          payment: data[i]?.payment || 0,
          principal: data[i]?.principal || 0,
          unpaid: data[i]?.unpaid > 0 ? data[i].unpaid : 0,
        };
        tempMonArr.push(tempObj);
        annInterest += +tempObj.interest;
        annPayment += +tempObj.payment;
        annPrincipal += +tempObj.principal;
        if (i % 12 === 0) {
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
        monthWise: tempMonArr,
      };
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
            <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
            <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
              Interest
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
              Principal
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
              Payment
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", minWidth:"120px" }} align="right">
              Unpaid
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ammData &&
            ammData?.map((row, index) => (
              <Row key={index} year={index + 1} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AmortizationTable;
