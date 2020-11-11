import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles( {
    drawerPaper: {
      width: 'inherit'
    }
});
export default function EditTodoDrawer(props) {
    const classes = useStyles();
    if(props.data ===null){
        return <div>No Data</div>
    }
    const name = props.data.name;
    const open = props.open;
    const onClose = props.onClose;
    
    function handleNameChange(e){
        props.setData({...props.data, name: e.target.value});
    }
    
    
    return (
        <Drawer classes={{paper: classes.drawerPaper}}style={{ width: '40%'}} anchor="right" open={open} onClose={onClose}>
               <h1>name</h1>
               <TextField value={name} onChange= {handleNameChange} id="standard-basic" label="New Todo" />
        </Drawer>
    )
}
