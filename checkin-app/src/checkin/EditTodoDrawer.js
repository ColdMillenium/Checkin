import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


const useStyles = makeStyles( {
    drawerPaper: {
      width: 'inherit'
    }
});
export default function EditTodoDrawer(props) {
    const classes = useStyles();
    if(props.data ===null){
        return <div></div>
    }
    const data = props.data;
    const id = props.data._id;
    const name = props.data.name;
    const open = props.open;
    const onClose = props.onClose;
    const onDelete = props.onDelete;
    
    function handleNameChange(e){
        props.setData({...data, name: e.target.value});
    }

    function onSave(){
        onClose();
    }
    
    
    return (
        <Drawer classes={{paper: classes.drawerPaper}}style={{ width: '40%'}} anchor="right" open={open} onClose={onClose}>
               <TextField value={name} onChange= {handleNameChange} id="standard-basic" label="Edit Todo" />
               <Button variant="contained" onClick={onSave} color="primary">Save Todo</Button>
               <Button variant="contained" onClick={()=>onDelete(id)} color="secondary">Delete Todo</Button>
        </Drawer>
    )
}
