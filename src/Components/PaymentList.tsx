import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function createData(key: any, value: any) {
  return { key, value };
}

const PaymentList: React.FC<any> = ({ paymentList, currency }) => {
  const [rows, setRows] = useState<any>([]);
  // console.log(rows)
  useEffect(() => {
    const tempList = [...paymentList];
    let tempRows = [];

    for (let i = 0; i < tempList.length; i++) {
      tempRows.push(createData(paymentList[i].key, paymentList[i].value));
    }
    setRows(tempRows);
  }, [paymentList]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: {lg:300, md:350, xs:370} }} aria-label="simple table">
          <TableHead>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontWeight: index === rows.length - 1 ? "600" : "" }}
                  component="th"
                  scope="row"
                >
                  {row.key}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: index === rows.length - 1 ? "600" : "" }}
                  align="right"
                >
                  {currency}
                  {row.value.toFixed(2) || 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentList;
