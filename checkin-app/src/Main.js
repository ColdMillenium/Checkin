import React from 'react'
import { Button } from '@material-ui/core';
import {useStoreState, useStoreActions} from 'easy-peasy'


import Auth from './comps/Auth'
import TodoList from './comps/TodoList'

export default function Main() {
    const setPage = useStoreActions((actions) => actions.setPage);
    
    return (<div>
     
       <Show></Show>
    </div>);
}

function Show(props){
    const page = useStoreState((state) => state.page);
    const authenticated = useStoreState((state)=> state.authenticated);
    const setPage = useStoreActions((actions) => actions.setPage);
    
    //User needs to login or sign up if they're not authenticated.
    if(!authenticated && page != "AUTH"){
        setPage("AUTH");
    }

    if(page === "AUTH"){
        return <Auth></Auth>
    }else if(page === "TODOLIST"){
        return <TodoList></TodoList>
    }else{
        return <div>{page} page wasn't found</div>
    }
    
}
function PageChanger(props){
    const pages = ["LOGIN", "AUTH", "TODOLIST"];
    const setPage = useStoreActions((actions) => actions.setPage);
    const button_list = pages.map((page, index) =>
        <Button variant="contained" color="primary" key={page} onClick={(e) => setPage(page)}>{page}</Button>
    );
    return <div>{button_list}</div>
}
