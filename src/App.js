import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
// import './App.css';
import { Route, Link } from "react-router-dom";
import AddTodo from './AddTodo/addTodo.js'
import Table from './Table/table.js';
import Nav from './header/navbar/nav';
// import Home from './Home/home.js';
//Route Todos/:id functionaliy
var todosCompORIncomp = '';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
      todoAddInputValue: '',
      editTaskAfterAdded: { editButton: false, id: null },
      searchTodoValue: '',
      todoAddInfoValue: ''

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
    this.setState({ todos, todoAddInputValue: '' });
  }

  editTaskTable = (id) => {
    const getTask = this.state.todos.filter((todos) => todos.id === id);
    const editTaskAfterAdded = { editButton: true, id: id }

    this.setState({ editTaskAfterAdded, todoAddInputValue: getTask[0].todoName });
  }

  // this func is successefully complete edit this func is in AddTodo component  
  editTask = () => {
    const editTaskAfterAdded = { editButton: false, id: null };
    const fetchID = this.state.editTaskAfterAdded.id;
    const findReqTodo = this.state.todos.filter((todos) => todos.id === fetchID);

    findReqTodo.map(todo => { todo.todoName = this.state.todoAddInputValue; todo.todoAddInfo = this.state.todoAddInfoValue})

    this.setState({ todos, editTaskAfterAdded, todoAddInputValue: ''});
  }
  dltTodo = (id) => {
    const modiTodo = this.state.todos.filter((todo) => todo.id !== id);
    console.log("Delete Current Id,", modiTodo);
    // dltCurrentTodo.map((todo) => todo.)
    this.setState({ todos: modiTodo })
  }
  // Checkbox functioanlity this is in Table Component
  isComplete = (isChecked, id) => {
    const isCheckedVar = isChecked === false;
    const getTodo = this.state.todos.filter((todo) => todo.id === id);

    getTodo.map((todo) => todo.isCompleted = isCheckedVar);

    this.setState({ todos });
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
  render() {
    return (
      <div className="App text-center">
        <Nav
          searchTodo={this.searchTodo}
        />
        
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
      </div>
    );
  }
}

export default App;
