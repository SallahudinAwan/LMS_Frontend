import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
const DrawerNav = (props) => {

  const navigate = useNavigate();
  
const takeAction=(text)=>{  
  if(text==="Users"){
    props.setoption("user")
  }
  else if(text==="Logout"){
    navigate("/login");
  }
}
  return (
    <div>
     
    <Drawer
        variant={props.variant}
        anchor={props.anchor}
        open={props.open}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240,bgcolor:"#0000b3",
           boxSizing: 'border-box' },
        }}
      >
      <Button variant="outlined" onClick={()=>{ navigate("/home")}} href="/home" >
      <img
      src="https://lms.nust.edu.pk/lms/images/logo02.png"
      alt="logo"
      style={{
        maxWidth: 235,
        maxHeight:80,
        backgroundColor: "white",
        borderTopRightRadius: 10,
      }}
    />
    </Button>
        
        <Box sx={{ overflow: 'auto' }}>
          <List>
         
          <ListItem onClick={()=>{takeAction("Users")}}  key={"Users"} sx={{mt:3,p:1,color:"white"}} >
                <ListItemButton sx={{bgcolor:"#0010d9", borderEndEndRadius:20
              ,":hover": {
                bgcolor:"#0010d9"
              }
              }}>
                  <ListItemIcon>
                     <PeopleIcon sx={{color:"white",fontSize:'small'}}/>
                  </ListItemIcon>
                  <ListItemText primary={"Users"} primaryTypographyProps={{fontSize:'small'}} />
                </ListItemButton>
              </ListItem>
          
          
          <ListItem onClick={()=>{takeAction("Logout")}}  key={"Logout"} sx={{mt:3,p:1,color:"white",}} >
                <ListItemButton>
                  <ListItemIcon>
                     <PeopleIcon sx={{color:"white",fontSize:'small'}}/>
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} primaryTypographyProps={{fontSize:'small'}} />
                </ListItemButton>
              </ListItem>
          </List>

        </Box>
      </Drawer>
    </div>
  )
}

export default DrawerNav