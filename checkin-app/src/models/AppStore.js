import {action, thunk, actionOn} from 'easy-peasy'
const AppServer = "http://localhost:8000"
const AuthServer = "http://localhost:4000";
export default {
//-------------------------------------V------------- App DATA -----------V----------------------------------------------
    
    username: null,
    email: null,
    todos: [],
    page: 'AUTH',
    authenticated: false,
    aToken: "",
    rToken: "",

//-------------------------------------V----------Thunk API Calls--------V-----------------------------------------------
    createTodo: thunk( (actions, payload)=> {
        return new Promise((resolve, reject)=>{
            console.log(payload);
            return fetch(`${AppServer}/createTodo`, { 
                // Adding method type 
                method: "POST", 
                mode: "cors",
                dataType: 'jsonp',
                
                body: JSON.stringify({
                    name: payload.name,
                    completed: false
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': 'Bearer ' + payload.token
                } 
            }).then((res)=>{
                console.log(res);
                resolve(res.json());
            }).catch((err)=>{
                console.log(err);
            })
        })
    }),

    getTodos: thunk( (actions, payload)=> {
        return new Promise((resolve, reject)=>{
            console.log(payload);
            return fetch(`${AppServer}/myTodos`, { 
                // Adding method type 
                method: "GET", 
                mode: "cors",
                headers: { 
                    'Authorization': 'Bearer ' + payload
                }, 
            }).then((res)=>{
                console.log(res);
                resolve(res.json());
            })
        })
    }),
    updateTodo: thunk( (actions, payload)=> {
        return new Promise((resolve, reject)=>{
            console.log("about to update Todo");
            console.log(payload);
            return fetch(`${AppServer}/updateTodo`, { 
                // Adding method type 
                method: "POST", 
                mode: "cors",
                body: JSON.stringify(payload.data), 
                
                // Adding headers to the request 
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    'Authorization': 'Bearer ' + payload.token
                }  
            }).then((res)=>{
                console.log(res);
                console.log("finished updating todo");
                resolve(res.json());
            })
        })
    }),

    registerUser: thunk( (actions, payload)=> {
        return new Promise((resolve, reject)=>{
            console.log(payload);
            return fetch(`${AuthServer}/register`, { 
                // Adding method type 
                method: "POST", 
                mode: "cors",
                dataType: 'jsonp',
                
                body: JSON.stringify(payload), 
                
                // Adding headers to the request 
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                } 
            }).then((res)=>{
                console.log(res);
                resolve(res.json());
            })
        })
    }),

    loginUser: thunk( (actions, payload)=> {
        return new Promise((resolve, reject)=>{
            console.log(payload);
            return fetch(`${AuthServer}/login`, { 
                // Adding method type 
                method: "POST", 
                mode: "cors",
                dataType: 'jsonp',
                
                body: JSON.stringify(payload), 
                
                // Adding headers to the request 
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                } 
            }).then((res)=>{
                return resolve(res.json());
            }).then((res)=>{
                actions.setTodos(res.data);
            }).catch((err)=>{
                console.log(err);
            })
        })
    }),

//----------------------------------------V------ Actions --------V-----------------------------------------
    addTodo: action((state, payload) => {
        state.todos.push(payload)
    }),

    setPage: action((state, payload) => {
        state.page = payload;
    }),

    setCredentials: action((state, payload) =>{
        console.log(payload);
        state.username = payload.username;
        state.aToken = payload.accessToken;
        state.rToken = payload.refreshToken;
        state.authenticated = true;
        console.log("user successfully authenticated");
    }),
    setTodos: action((state, todos)=>{
        console.log("Todos fetched");
        console.log(todos);
        state.todos = todos;
    })
};