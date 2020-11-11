import React, { useEffect, useState} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Todo from './Todo'
import EditTodoDrawer from './EditTodoDrawer';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export default function TodoList() {
    const todos = useStoreState((state) => state.todos);
    const aToken = useStoreState((state) => state.aToken);
    const state = useStoreState((state) => state);
    const getTodos = useStoreActions((actions) => actions.getTodos);
    const setTodos = useStoreActions((actions) => actions.setTodos)
    const [selectedId, setSelectedId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(()=>{
        getTodos(aToken)
            .then((res)=>{
               setTodos(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])
    function selectTodo(todo){
        console.log(todo._id);
        if(todo._id != selectedId){
            setSelectedId(todo._id);
            setEditData(todo);
            setEditOpen(true);
            console.log("id change to " + todo._id);
        }
    }
    function closeEdit(){
        setEditOpen(false);
        setSelectedId(null);
    }
    return (
        <div>
            <EditTodoDrawer data={editData} setData={setEditData} anchor="right" open={editOpen} onClose={closeEdit}></EditTodoDrawer>
            <AddTodo></AddTodo>
            <div>{
                todos.map((todo, index) => {
                    //check whether this todo is slected or not
                    const isSelected = (selectedId === todo._id);
                    if(isSelected){
                        return (  
                            <Todo key={todo._id} selectTodo={()=>selectTodo(todo)} isSelected={isSelected} data={editData}></Todo>
                        )
                    }else{
                        return (  
                            <Todo key={todo._id} selectTodo={()=>selectTodo(todo)} isSelected={isSelected} data={todo}></Todo>
                        )
                    }
                    
                })
            }</div>
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

