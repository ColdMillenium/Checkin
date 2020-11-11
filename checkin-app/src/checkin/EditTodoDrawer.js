import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState} from 'react'


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
export default function EditTodoDrawer(props) {
    if(props.data ===null){
        return <div>No Data</div>
    }
    const name = props.data.name;
    const open = props.open;
    const onClose = props.onClose;
    
    
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
               <p>{name}</p>
        </Drawer>
    )
}
