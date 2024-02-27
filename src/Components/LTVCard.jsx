import { Box } from '@mui/material'
import React from 'react'
import { lightSecondaryColor, primaryColor, secondaryColor } from '../Theme'

const LTVCard = ({ emi, interest, principal, allPropValue }) => {
    // console.log(emi)
    return (
        <Box sx={{ width: "730px", height: "auto" }}>
            <Box sx={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                    t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius:5
            }}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} color={"#FFFFFF"} paddingX={'40px'} paddingY={'10px'} gap={'15px'}>
                    <Box sx={{ fontSize: "22px", fontWeight: 600, borderBottom: "2px solid #d3d3d3", width: "100%", textAlign: "center" }}>
                        Your EMI is ₹ <span style={{ fontSize: "48px", fontWeight: 700 }}>{emi}</span>
                    </Box>
                    <Box sx={{ fontSize: "22px", fontWeight: 600 }}>
                        Your eligible loan amount is ₹ {principal}
                    </Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div>Total Interest</div>
                            <div>₹ <span style={{ fontSize: "32px"}}>{interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div >Total Amount</div>
                            <div >₹ <span style={{ fontSize: "32px"}}>{principal + interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div >Total Properties Value</div>
                            <div >₹ <span style={{ fontSize: "32px"}}>{allPropValue}</span></div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LTVCard