import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState} from 'react'


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
    
    
    return (
        <Drawer classes={{paper: classes.drawerPaper}}style={{ width: '220px'}} anchor="right" open={open} onClose={onClose}>
               <div style={classes.root}>
                   {name}
                </div>
        </Drawer>
    )
}
