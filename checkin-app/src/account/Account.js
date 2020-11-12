import React, {useState, useCallback} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import { motion } from "framer-motion"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
     // backgroundColor: theme.palette.grey[800],
      //color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));
const arriveLeft = {
    hidden: { x: "-10vw", opacity: 0},
    visible: { x: "0vw", opacity:1, transition: { ease: "easeOut", duration: 0.5 } }
  };
  const arriveRight = {
    hidden: { x: "10vw", opacity: 0},
    visible: { x: "0vw", opacity:1, transition: { ease: "easeOut", duration: 0.5 } }
  };
export default function Account() {
    const history = useHistory();
    const classes = useStyles();
    return (
            <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography variant="h2">
                            Welcome to Checkin!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Route exact path="/Account">
                            <Redirect from="/" to="Account/SignIn"></Redirect>
                        </Route>
                        <Route path="/Account/SignIn">
                            {Appear(SignIn, arriveLeft)} 
                        </Route>
                        <Route path="/Account/SignUp">
                                {Appear(SignUp, arriveRight)}
                        </Route>
                    </Grid>
                </Grid>
                
                
            </Paper>
           
     
    )
    function Appear(Comp, variants){
        return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <Comp></Comp>
        </motion.div>
        )
    }  
}








