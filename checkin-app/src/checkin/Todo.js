import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ReactComponent as DeleteIcon} from '../icons/delete.svg'


const useStyles = makeStyles({
    root: {
      maxWidth: 275,
      minWidth: 250,
      marginTop: 10,
      marginBottom:10,
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
    const [selected, setSelected] = useState(false)

    function Content(){
        if(selected){
            return (
                <div>
                    <p>{data.name}</p>
                    <DeleteIcon/>
                  
                   
                </div>
                )
        }else{
            return <div>UNSELECTED: {data.name}</div>
        }
    }

    return(
        <Card onClick={()=>{setSelected(!selected)}}className={classes.root}>
            <CardContent className={classes.text}>
                {Content()}
            </CardContent>
        </Card>   
    )
    
}


