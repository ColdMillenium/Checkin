import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckBox from "@material-ui/core/Checkbox"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ReactComponent as DeleteIcon} from '../icons/delete.svg'
import {motion} from 'framer-motion';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      minWidth: 250,
      marginTop: 10,
      marginBottom:10,
    },
    rootSelected: {
        maxWidth: 500,
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
    const completeTodo = props.completeTodo;
    function style(){
        if(selected){
            return classes.rootSelected;
        }else{
            return classes.root;
        }
    }

    return(
        // <motion.div
        //     drag
        //     dragConstraints={{left:0, top:0, right:0, bottom:0}}
        // >
            <Card  className={style()}>
                <CardContent className={classes.text}>
                <Grid container spacing= {2} justify="space-between" alignItems="center">
                    <Grid item>
                        <CheckBox 
                            checked={data.completed}
                            onChange={()=>{completeTodo(data)}}
                        />
                    </Grid>
                    <Grid onClick={selectTodo} item>
                        <p>{data.name}</p>
                    </Grid>
                    <Grid item>
                        <DeleteIcon/>
                    </Grid>
                </Grid>   
                </CardContent>
            </Card>  
        // </motion.div>
         
    )
    
}


