import { Box } from '@mui/material'
import React, { useState } from 'react'
import InputCalculator from '../../../Components/InputCalculator'
import PaymentList from '../../../Components/PaymentList'
import LTVInputCalculator from '../../../Components/LTVInputCalculator'
import LTVCard from '../../../Components/LTVCard'
import { mainSubHeading } from '../../../Theme'

const LAP = () => {
    const [emiOp, setEmiOp] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [principalAmount, setPrincipalAmount] = useState(0);

    const getData = (emi, interest, principal) => {
        // console.log(emi, " : ", interest, " : ", principal);
        setEmiOp(+emi);
        setTotalInterest(+interest);
        setPrincipalAmount(+principal);
    };
    return (
        <Box>
            <Box
                sx={{
                    background: "",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "30px",
                }}
                style={{
                    // maxWidth: "500px",
                    // border: `2px solid ${secondaryColor}`,
                    padding: "20px",
                    borderRadius: 20,
                }}
            >
                <div style={{font: "600 26px Raleway, serif"}}>
                    LTV Calculator
                </div>
                <div
                    style={{
                        height: "auto",
                        width: "auto",
                        padding: "30px 30px",
                        background: "#FFFFFF",
                        borderRadius: 6,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #d3d3d3",
                    }}
                >
                    <LTVInputCalculator sendData={getData} />
                </div>
                <div>
                    <LTVCard emi={emiOp} interest={totalInterest} principal={principalAmount} />
                </div>
            </Box>
        </Box>
    )
}

export default LAP