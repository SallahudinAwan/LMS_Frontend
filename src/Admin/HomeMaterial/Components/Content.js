import React,{useState} from 'react'

import Datatable from '../UsersMaterial/usersDatatable'
//import AddEdit from '../../UsersMaterial/addEdit';
//import Adduser from "../../Users/Add";
//import Edituser from "../../Users/Edit";
import Add from '../UsersMaterial/Add';
import { Box,Typography } from '@mui/material';
const Content = (props) => {

    const [editId, setEditId] = useState("");
    const componentSelection = () => {
      if (props.option === "user" || props.option==="user") {
        return (<Datatable setid={setEditId} option={props.setoption} />) ;
      } else if (props.option === "adduser") {
        return <Add ID={editId} option={props.setoption} name={"Add"}/>;
      } else if (props.option === "edituser") {
        return <Add ID={editId} option={props.setoption} name={"Edit"}/>;
      }
    };

  return (
    <div>
      
      <Box
        sx={{
          boxShadow: 10,
          p: 2,
          mt: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          bgcolor:"white"
        }}
      >
    {componentSelection()}
    </Box>
    </div>
  )
}

export default Content