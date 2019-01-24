import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import {BrowserRouter as Router, Route, Link } from "react-router-dom";


// import * as firebase from 'firebaseui'
// var firebaseui = require('firebaseui');
// or for ES6 imports.
// import * as firebaseui from 'firebaseui'
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";
import AddTodo from './AddTodo/addTodo.js'
import Table from './Table/table.js';
import Nav from './header/navbar/nav';
import SignUp from './Authentication/Signup/signup.js'
import Login from './Authentication/Login/login.js'
const baseUrl = process.env.PUBLIC_URL;
var todosCompORIncomp = '';

var options = {};
function optionsFunc(msg, type){
  return options = {
    place: 'br',
    message: (
        <div>
          <h4>{msg}</h4>
        </div>
    ),
    type: type,
    // icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}
}

// Dummy Text for Todo Additional Info
const addInfoTextDummy = 'Add Additional Info for Remembreing Task';
const todos = [{ todoName: 'Do Homework', id: 0, isCompleted: false, todoAddInfo: addInfoTextDummy }];

//Route /todos functionaliy
var todosComponent = '';

//Create Unique ID
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
var firebase = require('firebaseui');
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
      todoAddInputValue: '',
      editTaskAfterAdded: { editButton: false, id: null },
      searchTodoValue: '',
      todoAddInfoValue: '',
      getIsCompleteID: ''

    }
  }

  //Change Input Value have
  addTodo = (e) => {
    this.setState({ todoAddInputValue: e.target.value })
  }

  // Add Todo in todos List
  addTaskFunc = () => {
    const todoObject = { todoName: this.state.todoAddInputValue, id: makeid(), isCompleted: false,
                     todoAddInfo: (this.state.todoAddInfoValue === '') ? addInfoTextDummy: this.state.todoAddInfoValue };
    this.state.todos.push(todoObject);
    this.refs.notify.notificationAlert(optionsFunc("Added Successefully", 'success'));
    this.setState({ todos, todoAddInputValue: '' });
  }

  editTaskTable = (id) => {
    const getTask = this.state.todos.filter((todos) => todos.id === id);
    const editTaskAfterAdded = { editButton: true, id: id }
    this.refs.notify.notificationAlert(optionsFunc("Edit Enable", 'info'));
    this.setState({ editTaskAfterAdded, todoAddInputValue: getTask[0].todoName });
    
  }

  // this func is successefully complete edit this func is in AddTodo component  
  editTask = () => {
    const editTaskAfterAdded = { editButton: false, id: null };
    const fetchID = this.state.editTaskAfterAdded.id;
    const findReqTodo = this.state.todos.filter((todos) => todos.id === fetchID);
    
    this.refs.notify.notificationAlert(optionsFunc("Edit Successfully", 'success'));
    findReqTodo.map(todo => { todo.todoName = this.state.todoAddInputValue; todo.todoAddInfo = this.state.todoAddInfoValue})

    this.setState({ todos, editTaskAfterAdded, todoAddInputValue: ''});
  }
  dltTodo = (id) => {
    const modiTodo = this.state.todos.filter((todo) => todo.id !== id);
    console.log("Delete Current Id,", modiTodo);
    // dltCurrentTodo.map((todo) => todo.)
    this.refs.notify.notificationAlert(optionsFunc("Delete Successfully", 'danger'));
    this.setState({ todos: modiTodo })
    
  }
  // Checkbox functioanlity this is in Table Component
  isComplete = (isChecked) => {
    const id = this.state.getIsCompleteID;
    console.log("Check isCHecked", isChecked)
    const getTodo = this.state.todos.filter((todo) => todo.id === id);
    console.log("IS Complete Get Todo", getTodo)
    getTodo.map((todo) => todo.isCompleted = !todo.isCompleted);

    this.setState({ todos });
    console.log("get Todos", this.state.todos)
  }

  isCompleteRouteTodo = () => {
    return function (todo) {
      return ((todo.isComplete) && todo)
    }
  }
  searchTodo = (e) => {
    this.setState({searchTodoValue: e.target.value})
    // console.log(this.state.searchTodoValue);
  }
  filterTodo(searchTodo){
    return function(todo){
      return todo.todoName.toLowerCase().includes(searchTodo.toLowerCase())
    }
  }
  additionalInfo = (e) => {
    this.setState({todoAddInfoValue: e.target.value});
    console.log(this.state.todoAddInfoValue )
  }
  getID = (id) => {
    console.log("Get ID ", id)
    this.setState({getIsCompleteID: id})
  }
  signupSubmit = (email, pass, rePass) => {
    console.log("email", email );
    console.log("pass", pass );
    console.log("rePass", rePass );
    (pass === rePass) ? firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }) : console.log("Error Error");
  }
  render() {
    return (
      <Router>
      <div className="App text-center">
        <Nav
          searchTodo={this.searchTodo}
        />
        <NotificationAlert ref="notify" />
        <Route path="/" exact render={() =>
          <div>
            <AddTodo
              addTodo={this.addTodo}
              addTask={this.addTaskFunc}
              value={this.state.todoAddInputValue}
              editTaskAA={this.state.editTaskAfterAdded}
              editTask={this.editTask}
              addInfo={this.additionalInfo}
              infoValue={this.todoAddInfoValue}
            />
            <h1>Todos are Here</h1>

            {
              this.state.todos.filter(this.filterTodo(this.state.searchTodoValue)).map((todos) =>
                <Table
                  key={todos.id}
                  todos={todos}
                  editTaskTable={this.editTaskTable}
                  dltTodo={this.dltTodo}
                  isComplete={this.isComplete}
                  getID={this.getID}
                   />)
            }
          </div>
        }
        />
        
        {
          todosComponent = ({match}) =>
          <div>
            {
              console.log(match.url)
            }
            <Link style={{ color: 'white' }} to={`${match.url}/completeTodo`}><MDBBtn color="dark-green">Show Complete Todo</MDBBtn></Link>
            <Link style={{ color: 'white' }} to={`${match.url}/incompleteTodo`}><MDBBtn color="purple">Show Incomplete Todo</MDBBtn></Link>

            {
              this.state.todos.filter(this.filterTodo(this.state.searchTodoValue)).map((todo) =>
                <Table
                  todos={todo}
                  editTaskTable={this.editTaskTable}
                  dltTodo={this.dltTodo}
                  isComplete={this.isComplete}
                  getID={this.getID}
                   />
              )
            }
          </div>
        } 
        <Route path="/todos" exact component={todosComponent}/>
        
        {
          todosCompORIncomp = ({match}) => {
              return (
                <div>
                  <h6><Link to="/todos">Back to Todos</Link></h6>
                {this.state.todos.filter((todo) =>{ if(match.params.id === 'completeTodo' && todo.isCompleted){
                return todo
              }
              else if(match.params.id === 'incompleteTodo' && !todo.isCompleted){
                return todo
              }
              }).filter(this.filterTodo(this.state.searchTodoValue)).map((todo) => 
              <Table
              todos={todo}
              editTaskTable={this.editTaskTable}
              dltTodo={this.dltTodo}
              isComplete={this.isComplete}
               />
              )
            }
              </div>
              )
            }
        }
        <Route path={`/todos/:id`} component={todosCompORIncomp}></Route>
        
        {
          this.state.todoAddInputValue
        }
        <Route path="/auth" render={() =>
          <SignUp
          signupSubmit={this.signupSubmit}
          />
        }></Route>
        <Route path="/login" component={Login}></Route>
      </div>

      
      {/* <Signup></Signup> */}
      </Router>

        
    );
  }
}

export default App;
