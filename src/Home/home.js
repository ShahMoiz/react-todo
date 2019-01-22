// import React, { Component } from 'react';
// // import './App.css';
// import {Route, Link } from "react-router-dom";
// import AddTodo from '../AddTodo/addTodo.js'
// import Table from '../Table/table.js';
// import Nav from '../header/navbar/nav'

// // const todos = [{ taskName: 'Do Homework', id: 0, isCompleted: false}]
// // function makeid() {
// //   var text = "";
// //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// //   for (var i = 0; i < 5; i++)
// //     text += possible.charAt(Math.floor(Math.random() * possible.length));
// //   return text;
// // }
// class Home extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       todos,
// //       todoAddInputValue: '',
// //       editTaskAfterAdded: { editButton: false, id: null },
      
// //     }
// //     // this.addTaskFunc = this.addTaskFunc.bind(this)
// //   }

// //                                                   //Change Input Value have
// //   addTodo = (e) => {
// //     this.setState({ todoAddInputValue: e.target.value})
// //   }

// //                                                   // Add Todo in todos List
// //   addTaskFunc = () => {
// //     const todoObject = { taskName: this.state.todoAddInputValue, id: makeid() };
// //     this.state.todos.push(todoObject);
// //     this.setState({todos, todoAddInputValue: ''});
// //   }

// //                               //this function works to maniplute data in Input Fiels this func is in Table Component
// //   editTaskTable = (id) => {
// //     const getTask = this.state.todos.filter((todos) => todos.id === id);
// //     const editTaskAfterAdded = { editButton: true, id: id }

// //     this.setState({editTaskAfterAdded, todoAddInputValue: getTask[0].taskName });
// //   }

// //                                     // this func is successefully complete edit this func is in AddTodo component  
// //   editTask = () => {
// //     const editTaskAfterAdded = { editButton: false, id: null };
// //     const fetchID = this.state.editTaskAfterAdded.id;
// //     const findReqTodo = this.state.todos.filter((todos) => todos.id === fetchID);

// //     findReqTodo.map(todo => todo.taskName = this.state.todoAddInputValue)
    
// //     this.setState({ todos, editTaskAfterAdded, todoAddInputValue: '' });
// //   }
// //   dltTodo = (id) => {
// //     const modiTodo = this.state.todos.filter((todo) => todo.id !== id);
// //     console.log("Delete Current Id,", modiTodo);
// //     // dltCurrentTodo.map((todo) => todo.)
// //     this.setState({todos: modiTodo})
// //   }
// //   // Checkbox functioanlity this is in Table Component
// //   isComplete = (isChecked, id) => {
// //     const isCheckedVar = isChecked == false;
// //     const getTodo = this.state.todos.filter((todo) => todo.id === id);

// //     getTodo.map((todo) => todo.isCompleted = isCheckedVar);

// //     this.setState({todos});
// //   }

// //   isCompleteRouteTodo = ()=> {
// //     return function (todo){
// //       return ((todo.isComplete) && todo)
// //     }
// //   }
//   render() {
//       const {addTodo,addTask,value,editTaskAA,editTask } = this.props
//         // const todo = ({match}) => {
//         //   return (this.state.todos.filter((todo) =>{ if(match.params.id == 'completeTodo' && todo.isCompleted){
//         //     return todo
//         //   }
//         //   else if(match.params.id == 'incompleteTodo' && !todo.isCompleted){
//         //     return todo
//         //   }
//         //   }).map((todo) => 
//         //   <Table
//         //   todos={todo}
//         //   editTaskTable={this.editTaskTable}
//         //   dltTodo={this.dltTodo}
//         //   isComplete={this.isComplete} />
//         //   )
//         //   )
//         // }

//         // const todos1 = ({match}) => (
//         //   <div>
//         //     <Link to={`${match.url}/completeTodo`}>Show Complete Todo</Link>
//         //     <Link to={`${match.url}/incompleteTodo`}>Show Incomplete Todo</Link>

//         //     <Route path={`${match.path}/:id`} component={todo}/>
//         //   </div>
// // )
//     return (
//       <div className="App text-center">
//       {/* <Nav></Nav> */}

//         {/* <Link to="/todos">Todos</Link> */}
//         {/* <Route path="/todos" component={todos1}></Route> */}
//         <AddTodo
//           addTodo={addTodo}
//           addTask={addTask}
//           value={value}
//           editTaskAA={editTaskAA}
//           editTask={editTask}
//         />
//         <h1>Todos are Here</h1>
        
//         {
//         //   this.state.todos.map((todos) =>
//         //     <Table
//         //       todos={todos}
//         //       editTaskTable={this.editTaskTable}
//         //       dltTodo={this.dltTodo}
//         //       isComplete={this.isComplete} />)
//         }
//         {
//         }
//         {
//         //   this.state.todoAddInputValue
//         }
//       </div>
//     );
//   }
// }

// export default Home;
