import {
  AppBar,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerNav from "./DrawerNav";
import { useNavigate } from "react-router-dom";
import { AutoAwesome } from "@mui/icons-material";

const Navbar = (props) => {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [DrawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const handleClose=()=>{

  setDrawerOpen(false);
}
  const obj = true;

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          height: 95,
          bgcolor: "#0000b3",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "right",
          }}
        >

          <Hidden mdDown>
            <Box sx={{ display: "flex", float: "right" }}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{width:60, height:60}}
                  alt="Remy Sharp"
                  src="https://www.pngarts.com/files/11/Avatar-PNG-Picture.png"
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"Edit Profile"}>
                  <Typography sx={{fontSize:10}} textAlign="center">{"Edit Profile"}</Typography>
                </MenuItem>
                <MenuItem
                  key={"logout"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Typography sx={{fontSize:10}} textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Hidden>

          <Hidden mdUp>
            <Box sx={{ display: "flex", float: "right" }} onClick={()=>{ setDrawerOpen(!DrawerOpen)}}>
              <IconButton
                onClick={() => {
                  setDrawerOpen(!DrawerOpen);
                }}
              >
                <MenuIcon sx={{ color: "white", fontSize: 30 }} />
              </IconButton>
              <DrawerNav
                setoption={props.setoption}
                option={props.option}
                variant={""}
                anchor={"right"}
                open={DrawerOpen}
              />
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
