import React, { Component } from 'react';
import { MDBBtn, MDBNavLink } from "mdbreact";
// import './App.css';
import { Route, Link } from "react-router-dom";
import AddTodo from './AddTodo/addTodo.js'
import Table from './Table/table.js';
import Nav from './header/navbar/nav';
import Home from './Home/home.js'
var todosCompORIncomp =''
const todos = [{ taskName: 'Do Homework', id: 0, isCompleted: false }]
var todosComponent = '';
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

    }
    // this.addTaskFunc = this.addTaskFunc.bind(this)
  }

  //Change Input Value have
  addTodo = (e) => {
    this.setState({ todoAddInputValue: e.target.value })
  }

  // Add Todo in todos List
  addTaskFunc = () => {
    const todoObject = { taskName: this.state.todoAddInputValue, id: makeid() };
    this.state.todos.push(todoObject);
    this.setState({ todos, todoAddInputValue: '' });
  }

  //this function works to maniplute data in Input Fiels this func is in Table Component
  editTaskTable = (id) => {
    const getTask = this.state.todos.filter((todos) => todos.id === id);
    const editTaskAfterAdded = { editButton: true, id: id }

    this.setState({ editTaskAfterAdded, todoAddInputValue: getTask[0].taskName });
  }

  // this func is successefully complete edit this func is in AddTodo component  
  editTask = () => {
    const editTaskAfterAdded = { editButton: false, id: null };
    const fetchID = this.state.editTaskAfterAdded.id;
    const findReqTodo = this.state.todos.filter((todos) => todos.id === fetchID);

    findReqTodo.map(todo => todo.taskName = this.state.todoAddInputValue)

    this.setState({ todos, editTaskAfterAdded, todoAddInputValue: '' });
  }
  dltTodo = (id) => {
    const modiTodo = this.state.todos.filter((todo) => todo.id !== id);
    console.log("Delete Current Id,", modiTodo);
    // dltCurrentTodo.map((todo) => todo.)
    this.setState({ todos: modiTodo })
  }
  // Checkbox functioanlity this is in Table Component
  isComplete = (isChecked, id) => {
    const isCheckedVar = isChecked == false;
    const getTodo = this.state.todos.filter((todo) => todo.id === id);

    getTodo.map((todo) => todo.isCompleted = isCheckedVar);

    this.setState({ todos });
  }

  isCompleteRouteTodo = () => {
    return function (todo) {
      return ((todo.isComplete) && todo)
    }
  }
  render() {
    return (
      <div className="App text-center">
        <Nav></Nav>
        
        <Route path="/" exact render={() =>
          <div>
            <AddTodo
              addTodo={this.addTodo}
              addTask={this.addTaskFunc}
              value={this.state.todoAddInputValue}
              editTaskAA={this.state.editTaskAfterAdded}
              editTask={this.editTask}
            />
            <h1>Todos are Here</h1>

            {
              this.state.todos.map((todos) =>
                <Table
                  todos={todos}
                  editTaskTable={this.editTaskTable}
                  dltTodo={this.dltTodo}
                  isComplete={this.isComplete} />)
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
              this.state.todos.filter().map((todo) =>
                <Table
                  todos={todo}
                  editTaskTable={this.editTaskTable}
                  dltTodo={this.dltTodo}
                  isComplete={this.isComplete} />
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
                {this.state.todos.filter((todo) =>{ if(match.params.id == 'completeTodo' && todo.isCompleted){
                return todo
              }
              else if(match.params.id == 'incompleteTodo' && !todo.isCompleted){
                return todo
              }
              }).map((todo) => 
              <Table
              todos={todo}
              editTaskTable={this.editTaskTable}
              dltTodo={this.dltTodo}
              isComplete={this.isComplete} />
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
