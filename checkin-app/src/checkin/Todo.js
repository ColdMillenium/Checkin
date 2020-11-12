import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckBox from "@material-ui/core/Checkbox"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ReactComponent as DeleteIcon} from '../icons/delete.svg'
import {motion} from 'framer-motion';


const useStyles = makeStyles({
    root: {
      maxWidth: 275,
      minWidth: 250,
      marginTop: 10,
      marginBottom:10,
    },
    rootSelected: {
        maxWidth: 275,
        minWidth: 250,
        marginTop: 10,
        marginBottom:10,
        backgroundColor: "#cee6ea"
    },
    text:{
        alignConent: "center"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default function Todo(props) {
    const classes = useStyles();
    const data = props.data;
    const selected = props.isSelected;
    const selectTodo = props.selectTodo;
    function style(){
        if(selected){
            return classes.rootSelected;
        }else{
            return classes.root;
        }
    }
    function Content(){
        if(selected){
            return (
                <div>
                    <p>{data.name}</p>
                    <DeleteIcon/>
                  
                   
                </div>
                )
        }else{
            return <div>{data.name}</div>
        }
    }

    return(
        // <motion.div
        //     drag
        //     dragConstraints={{left:0, top:0, right:0, bottom:0}}
        // >
            <Card  className={style()}>
                <CardContent className={classes.text}>
                    {Content()}
                </CardContent>
                <Button onClick={selectTodo}>Edit</Button>
                <CheckBox></CheckBox>
            </Card>  
        // </motion.div>
         
    )
    
}


