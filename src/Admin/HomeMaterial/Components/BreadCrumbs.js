import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";

const BreadCrumbs = (props) => {
  const redirectToUser = () => {
    props.setoption("user");
  };
  const breadcrumbs = [
    <Link
      underline="hover"
      fontSize={15}
      sx={{ ":hover": { color: "bisque", cursor: "pointer" } }}
      onClick={redirectToUser}
      key="1"
      color="white"
    >
      Users
    </Link>,
    <Typography key="3" fontSize={15} color="white">
      {props.component}
    </Typography>,
  ];
  return (
    <div>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          backgroundColor: "#0000b3",
          color: "white",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon sx={{ color: "white" }} fontSize="large" />
          }
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </div>
  );
};

export default BreadCrumbs;
