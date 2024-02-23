import { Box } from "@mui/material";
import React from "react";
import { mainHeading } from "../../Theme";

const Profile = () => {
  return (
    <Box>
      <Box
        sx={{
          font: mainHeading,
          textAlign: "center",
          marginLeft: "100px",
          marginTop: "20px",
        }}
      >
        Profile
      </Box>
    </Box>
  );
};

export default Profile;
