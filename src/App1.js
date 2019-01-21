import React, { Component } from 'react';
import './App.css';

import AddTodo from './AddTodo/addTodo.js'
import Table from './Table/table.js';

const todos = [{ taskName: 'Do Homework', id: 0 }]
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
      addItem: '',
      addTodoValue: '',
      editTaskAfterAdded: { editButton: false, id: null },
    }
    this.addTaskFunc = this.addTaskFunc.bind(this)
  }


  //Change Input Value have
  addTodo = (e) => {
    this.setState({ addItem: e.target.value, addTodoValue: e.target.value })
  }
  addTaskFunc() {
    // console.log(makeid())
    const addValue = { taskName: this.state.addItem, id: makeid() };
    this.state.todos.push(addValue);
    this.setState({ todos, addTodoValue: '' });
  }
  editTaskTable = (id) => {
    const getTask = this.state.todos.filter((todos) => todos.id === id);
    const editTaskAfterAdded = { editButton: true, id: id }
    this.setState({ addTodoValue: getTask[0].taskName });
    this.setState({ editTaskAfterAdded })

  }
  editTask = () => {
    const id = this.state.editTaskAfterAdded.id
    console.log(`Edit Task Value ${this.state.addItem}`);
    const todos = this.state.todos.filter((todos) => todos.id === id);
    todos.map(todos => todos.taskName = this.state.addItem)
    console.log(todos)
    console.log("get After Add Id", this.state.editTaskAfterAdded.id)

    const editTaskAfterAdded = { editButton: false, id: null }
    this.setState({ todos, editTaskAfterAdded, addTodoValue: '' });

  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to React Todo App</h1>


        <AddTodo
          addTodo={this.addTodo}
          addTask={this.addTaskFunc}
          value={this.state.addTodoValue}
          editTaskAA={this.state.editTaskAfterAdded}
          editTask={this.editTask}
        />

        {
          this.state.todos.map((todos) =>
            <Table
              todos={todos}
              editTaskTable={this.editTaskTable} />)
        }
        {
          this.state.addItem
        }
      </div>
    );
  }
}

export default App;
