import { AppBar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";

const footer = () => {
  return (
    <div>
      <AppBar
        position="static"
        color="primary"
        sx={{
          top: "auto",
          mt: 2,
          p: 3,
          bottom: 0,
          height: 25,
          bgcolor: "#0000b3",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ color: "white", ":hover": { color: "aqua" } }}
            href="https://www.facebook.com/sallahudin.awan.7?mibextid=ZbWKwL"
          >
            <FacebookIcon color="white" />
          </Button>
          <Button
            sx={{ color: "white", ":hover": { color: "aqua" } }}
            href="https://www.linkedin.com/in/sallahudin-awan-15781623a"
          >
            <LinkedInIcon color="white" />
          </Button>
          <Button sx={{ color: "white", ":hover": { color: "aqua" } }} href="">
            <InstagramIcon color="white" />
          </Button>
        </Box>
        <Typography sx={{ fontSize: 10 }} textAlign="center">
          {"Copyright @2022 LMS System"}
        </Typography>
      </AppBar>
    </div>
  );
};

export default footer;
