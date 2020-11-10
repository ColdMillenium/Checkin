import React, { useEffect, useState} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Todo from './Todo'



export default function TodoList() {
    const todos = useStoreState((state) => state.todos);
    const aToken = useStoreState((state) => state.aToken);
    const state = useStoreState((state) => state);
    const getTodos = useStoreActions((actions) => actions.getTodos);
    const setTodos = useStoreActions((actions) => actions.setTodos)
    const selectedId = useState(null);
    console.log(state);
    useEffect(()=>{
        getTodos(aToken)
            .then((res)=>{
               setTodos(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])
    return (
        <div>
            {todos.map((todo, index) => {
                //check whether this todo is slected or not
                const isSelected = (selectedId === todo._id);
                return (
                    <div key={todo._id}>
                        <Todo isSelected={isSelected} data={todo}></Todo>
                    </div>
                )
            }
            )}
            <AddTodo></AddTodo>
        </div>
    )
}

function AddTodo(){
    const createTodo = useStoreActions((actions) => actions.createTodo);
    const setTodos = useStoreActions((actions) => actions.setTodos)
    const getTodos = useStoreActions((actions) => actions.getTodos);
    const aToken = useStoreState((state) => state.aToken);
    const [value, setValue] = React.useState('');
    useEffect(()=>{
        setValue('');
    }, [])
    function handleSubmit(e){
        createTodo({
            name: value,
            token: aToken
        }).then(()=>{
            getTodos(aToken)
            .then((res)=>{
               setTodos(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
            setValue("");
        })
       
        e.preventDefault();
    }
    function handleEnter(e){
        if(e.key === 'Enter'){
            handleSubmit(e);
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
         
            
    <TextField value={value} onChange= {(e) =>setValue(e.target.value)} id="standard-basic" label="New Todo" />
            <Button variant="contained" onClick={(e) => handleSubmit(e)} color="primary">Add Todo</Button>
        </form>
      );
}

