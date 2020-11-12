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
    //STORE
    const todos = useStoreState((state) => state.todos);
    const aToken = useStoreState((state) => state.aToken);

    const getTodos = useStoreActions((actions) => actions.getTodos);
    const setTodos = useStoreActions((actions) => actions.setTodos);
    const updateTodo = useStoreActions((actions) => actions.updateTodo);
    const deleteTodo = useStoreActions((actions) => actions.deleteTodo);

    //LOCAL
    const [selectedId, setSelectedId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [origData, setOrigData] = useState(null); // this is the starting todo data from database
    const [editData, setEditData] = useState(null); // this is data modified by the client
    //When a Todo is selected, It will will use editData, which will equal data from the database
    // After if a Todo is edited, editData will not equal origData and therefore must update the database
    
    useEffect(()=>{
        refreshList();
    }, [])
    function selectTodo(todo){
        console.log(todo._id);
        if(todo._id != selectedId){
            setSelectedId(todo._id);
            setOrigData(todo); //copy of original
            setEditData(todo); // copy that can be modified by client
            setEditOpen(true);
            console.log("id change to " + todo._id);
        }
    }
    function refreshList(){
        getTodos(aToken)
            .then((res)=>{
               setTodos(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    function closeEdit(){
        setEditOpen(false);
        setSelectedId(null);
        if(JSON.stringify(origData) != JSON.stringify(editData)){
            handleChange(editData);
        }
    }
    function handleChange(data){
        updateTodo({
            token: aToken,
            data:{
                name: data.name,
                completed: data.completed,
                _id: data._id,
            } 
        })
        .then((res)=>{
            console.log(res);
            refreshList();
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    function completeTodo(data){
        handleChange({...data, completed:!data.completed});
    }
    function handleDelete(id){
        //close Edit Drawer
        setEditOpen(false);
        setSelectedId(null);

        //Delete from database
        deleteTodo({
            token: aToken,
            data:{
                _id: id
            }
        })
        .then((res)=>{
            console.log(res);
            refreshList();
        })
        .catch((err)=>{
            console.error(err);
        })
    }
   
    return (
        <div>
            <EditTodoDrawer 
                data={editData} 
                setData={setEditData} 
                anchor="right" 
                open={editOpen} 
                onClose={closeEdit}
                onDelete={handleDelete}
            />
            <AddTodo></AddTodo>
            <div>{
                todos.map((todo, index) => {
                    //check whether this todo is slected or not
                    const isSelected = (selectedId === todo._id);
                    if(isSelected){
                        return (  
                            <Todo completeTodo={completeTodo} key={todo._id} selectTodo={()=>selectTodo(todo)} isSelected={isSelected} data={editData}></Todo>
                        )
                    }else{
                        return (  
                            <Todo completeTodo={completeTodo} key={todo._id} selectTodo={()=>selectTodo(todo)} isSelected={isSelected} data={todo}></Todo>
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

