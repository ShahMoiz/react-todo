import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from 'firebase';
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";

// Custon Component
import AddTodo from './AddTodo/addTodo.js'
import Table from './Table/table.js';
import Nav from './header/navbar/nav';
import SignUp from './Authentication/Signup/signup.js';
import Login from './Authentication/Login/login.js';

//Firebase Config in App
const config = {
  apiKey: "AIzaSyDG2zM4_s8zyQbRWYg26LtQ81UGOa6DxzM",
  authDomain: "react-todo-moiz.firebaseapp.com",
  databaseURL: "https://react-todo-moiz.firebaseio.com",
  projectId: "react-todo-moiz",
  storageBucket: "react-todo-moiz.appspot.com",
  messagingSenderId: "82486736503"
};
firebase.initializeApp(config);

// firebase user Status
var user = firebase.auth().currentUser;

// firebase Database Firestore
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

// Dummy Text for Todo Additional Info
const addInfoTextDummy = 'Add Additional Info for Remembreing Task';

// initially add todo
// const todos = [{ todoName: 'Do Homework', id: 0, isCompleted: false, todoAddInfo: addInfoTextDummy }];

//declare Var for <Route path="/" component="todosComponent"> functionaliy
var todosComponent = '';

// declare Var for <Route path="/todos/:id" component="todosCompORIncomp"> functionaliy
var todosCompORIncomp = '';

//Notification Function
var options;
function optionsFunc(msg, type, dismiss) {
  return options = {
    place: 'br',
    message: (
      <div>
        {msg}
      </div>
    ),
    type: type,
    // icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3 | dismiss
  }
}

//Create Unique ID
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


// var firebase = require('firebaseui');
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todosIsEmpty: true,
      todoAddInputValue: '',
      editTaskAfterAdded: { editButton: false, id: null },
      searchTodoValue: '',
      todoAddInfoValue: '',
      getIsCompleteID: '',
      valueBoo: false,
      editableTodoValue: '',
      username: ''

    }
  }
   getUsername = (user) => {
    const usernameArray = user.slice("@");
    const username = usernameArray[0];
    return username
   }
  componentDidMount() {
    setTimeout(() => {
      const user = firebase.auth().currentUser;

      // console.log("user Not Login", this.getUsername(user.email));
      if (user) {
        const username = this.getUsername(user.email)
        this.setState({username})
        var getData = db.doc(`users/${user.email}`);
        getData.get().then((doc) => {
          (doc.exists) && this.setState({ todos: doc.data().todos, todosIsEmpty: false })
        })
        console.log("username", this.state.username)
      }
      console.log("Route Component k ander edit sahi tareeqe se kaam nahi kr raha");
      console.log("Kabhi kabhi edit button dabate hain to text likha gaib ho jata hai save krne k baad");
      
    }, 2000);
  }

  submitTodo = (todoValue, additionalInfo) => {
    //Value Added in single variable
    const todoObject = {
      todoName: todoValue, id: makeid(), isCompleted: false,
      todoAddInfo: (!additionalInfo) ? addInfoTextDummy : additionalInfo
    };
    this.state.todos.push(todoObject);

    // firebase user Status
    const user = firebase.auth().currentUser;
    if (user) {
      var getData = db.doc(`users/${user.email}`);
      getData.set({
        todos: this.state.todos,
      }).then(() => {
        //Notification
        this.refs.notify.notificationAlert(optionsFunc("Added Successefully in your Database", 'success'));
        getData.get().then((doc) => {
          (doc.exists) && this.setState({ todos: doc.data().todos, todosIsEmpty: false });
        }).catch((error) => {
          this.refs.notify.notificationAlert(optionsFunc(error.message, 'danger'));
        })
      }).catch((error) => {
        this.refs.notify.notificationAlert(optionsFunc(error.message, 'danger'));
      })

    } else {

      this.refs.notify.notificationAlert(optionsFunc(<div><h6>Added Successefully</h6><p>But Your todo is not Save please<Link to="/login">Login</Link> Here</p></div>, 'info', 6));
      this.setState({ todos: this.state.todos, todosIsEmpty: false });

    }

    this.setState({ valueBoo: true });
  }



  dltTodo = (id) => {
    const modiTodo = this.state.todos.filter((todo) => todo.id !== id);
    console.log("Delete Current Id,", modiTodo);
    // dltCurrentTodo.map((todo) => todo.)
    this.refs.notify.notificationAlert(optionsFunc("Delete Successfully", 'danger'));

    // firebase user Status
    const user = firebase.auth().currentUser;
    if (user) {
      var getData = db.doc(`users/${user.email}`);
      getData.get().then((doc) => {
        if (doc.exists) {
          const dbgetTodo = doc.data().todos.filter((todo) => todo.id !== id);
          console.log("Paki", dbgetTodo);
          this.setState({ todos: dbgetTodo });
          getData.set({
            todos: dbgetTodo
          })
        }
      }).catch((error) => this.refs.notify.notificationAlert(optionsFunc(error.message, 'danger'))
      )

    } else {

      this.setState({ todos: modiTodo })

    }

  }
  editTaskTable = (id) => {
    const getTask = this.state.todos.filter((todos) => todos.id === id);
    const editTaskAfterAdded = { editButton: true, id: id }
    this.refs.notify.notificationAlert(optionsFunc("Edit Enable", 'info'));
    this.setState({ editTaskAfterAdded, todoAddInputValue: getTask[0].todoName });

  }

  // this func is successefully complete edit this func is in AddTodo component  
  editTask = (id) => {


    const user = firebase.auth().currentUser
    if (user) {
      const findReqTodo = this.state.todos.filter((todos) => todos.id === id);

      findReqTodo.map(todo => { todo.todoName = this.state.editableTodoValue; todo.todoAddInfo = this.state.todoAddInfoValue })

      // this.setState({ todos: this.state.todos, editTaskAfterAdded, todoAddInputValue: '' });
      this.setState({ todos: this.state.todos });
      const userRef = db.doc(`users/${user.email}`)

      userRef.set({
        todos: this.state.todos
      }).then(() => {

        this.refs.notify.notificationAlert(optionsFunc(<div><h5>Edit Successefully</h5><p>Updated Value Stored in Database</p></div>, 'success'));
      }).catch((error) => this.refs.notify.notificationAlert(optionsFunc(error.message, 'danger'))
      )

    } else {
    }


  }
  // Checkbox functioanlity this is in Table Component
  isComplete = (id) => {
    
    
    const getTodo = this.state.todos.filter((todo) => todo.id === id);
    // console.log("IS Complete Get Todo", getTodo)
    getTodo.map((todo) => todo.isCompleted = !todo.isCompleted);

    const user = firebase.auth().currentUser
    if (user) {
      const userRef = db.doc(`users/${user.email}`)
      getTodo.map((todo, index) => userRef.set({
        todos: this.state.todos
      }).then(() => {

        this.refs.notify.notificationAlert(optionsFunc(<div><p>Updated Value Stored in Database</p></div>, 'success'));
      }).catch((error) => this.refs.notify.notificationAlert(optionsFunc(error.message, 'danger'))
      ));
      

    } else {
    }

    console.log("Check ID", id);
    this.setState({ todos: this.state.todos });
    console.log("get Todos", this.state.todos)
  }

  isCompleteRouteTodo = () => {
    return function (todo) {
      return ((todo.isComplete) && todo)
    }
  }
  searchTodo = (e) => {
    this.setState({ searchTodoValue: e.target.value })
    // console.log(this.state.searchTodoValue);
  }
  filterTodo(searchTodo) {
    return function (todo) {
      return todo.todoName.toLowerCase().includes(searchTodo.toLowerCase())
    }
  }
  signupSubmit = (email, pass, rePass) => {
    console.log("email", email);
    console.log("pass", pass);
    console.log("rePass", rePass);
    (pass === rePass) ? firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
      this.refs.notify.notificationAlert(optionsFunc(`Created Your Account`, 'success'));
      // this.setState({uniqueId: this.getID})
      setTimeout(() => {
        window.location.pathname = '/login'
      }, 1000);
    }
    ).catch((error) => {
      // Handle Errors here.
      this.refs.notify.notificationAlert(optionsFunc(`${error.message}`, 'danger'))
      // this.refs.notify.notificationAlert(optionsFunc(`Created Your Account`, 'success'))
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error Code", errorCode);
      console.log("Eoor Message", errorMessage);

      // ...
    }) : this.refs.notify.notificationAlert(optionsFunc(`Password Does not match`, 'danger'))
  }
  loginSubmit = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      var todoRef = db.doc(`users/${email}`);
      this.state.todos.map((todo) =>
        todoRef.update({
          todos: firebase.firestore.FieldValue.arrayUnion(todo)
        })
      )

      this.refs.notify.notificationAlert(optionsFunc(`Login Successufully`, 'success'))
      const docRef = db.doc(`users/${email}`);
      docRef.get().then((doc) => {
        this.setState({usernName: this.getUsername(user.email)});
        (doc.exists) ? this.setState({ todos: doc.data().todos,  }) : this.setState({ todos: this.state.todos })
      }
      )

      setTimeout(() => {
        window.location.pathname = '/'
      }, 1000)
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log("Error Code", errorCode);
      console.log("Error Message", errorMessage);

    })

  }
  tableTemplate = () => {
    return (
      this.state.todos.filter(this.filterTodo(this.state.searchTodoValue)).map((todos) =>
        <Table
          key={todos.id}
          todos={todos}
          editTaskTable={this.editTaskTable}
          dltTodo={this.dltTodo}
          isComplete={this.isComplete}
          getID={this.getID}
          editTodo={this.editTodo}
          addInfo={this.addInfo}
          editTask={this.editTask}
        />)
    )
  }
  editTodo = (e) => {
    this.setState({ editableTodoValue: e.target.value });
  }
  addInfo = (e) => {
    this.setState({ todoAddInfoValue: e.target.value });
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log("Successefully Sign Out");
      this.setState({username: ''});
    }).catch((error) => {
      console.log(error);

    })
  }
  render() {
    return (
      <Router>
        <div className="App text-center">
          <Nav
            searchTodo={this.searchTodo}
            username={this.state.username}
            signOut={this.signOut}
          />
          {


          }
          <NotificationAlert ref="notify" />
          <Route path="/" exact render={() =>
            <div>
              <AddTodo
                editTaskAA={this.state.editTaskAfterAdded}
                editTask={this.editTask}
                submitTodo={this.submitTodo}
              />
              {/* { this.check() } */}
              <h1>Todos are Here</h1>

              {
                (!this.state.todosIsEmpty) ?
                  this.tableTemplate() : "wait while Fetching your data in Server or Either Todos Empty"
              }
            </div>
          }
          />

          {
            todosComponent = ({ match }) =>
              <div>
                {
                  console.log(match.url)
                }
                <Link style={{ color: 'white' }} to={`${match.url}/completeTodo`}><MDBBtn color="dark-green">Show Complete Todo</MDBBtn></Link>
                <Link style={{ color: 'white' }} to={`${match.url}/incompleteTodo`}><MDBBtn color="purple">Show Incomplete Todo</MDBBtn></Link>
                {
                  this.tableTemplate()
                }
              </div>
          }
          <Route path="/todos" exact component={todosComponent} />
          <Route path="/todos1" exact render={({match}) =>

<div>
{
  console.log(match.url)
}
<Link style={{ color: 'white' }} to={`${match.url}/completeTodo`}><MDBBtn color="dark-green">Show Complete Todo</MDBBtn></Link>
<Link style={{ color: 'white' }} to={`${match.url}/incompleteTodo`}><MDBBtn color="purple">Show Incomplete Todo</MDBBtn></Link>
{
  this.tableTemplate()
}
</div>
            
          } />
          {
            todosCompORIncomp = ({ match }) => {
              return (
                <div>
                  <h6><Link to="/todos">Back to Todos</Link></h6>
                  {
                    this.state.todos.filter((todo) => {
                      if (match.params.id === 'completeTodo' && todo.isCompleted) {
                        return todo
                      }
                      else if (match.params.id === 'incompleteTodo' && !todo.isCompleted) {
                        return todo
                      }
                    }).filter(this.filterTodo(this.state.searchTodoValue)).map((todos) =>
                                <Table
                      key={todos.id}
                      todos={todos}
                      editTaskTable={this.editTaskTable}
                      dltTodo={this.dltTodo}
                      isComplete={this.isComplete}
                      getID={this.getID}
                      editTodo={this.editTodo}
                      addInfo={this.addInfo}
                      editTask={this.editTask}
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
          <Route path="/login" render={() => <Login loginSubmit={this.loginSubmit} />}></Route>
        </div>


        {/* <Signup></Signup> */}
      </Router>


    );
  }
}

export default App;
