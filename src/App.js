import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
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


//Redirect Route Example 
// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       }
//     />
//   );
// }



// var firebase = require('firebaseui');
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todosIsEmpty: true,
      // todoAddInputValue: '',
      editTaskAfterAdded: { editButton: false, id: null },
      searchTodoValue: '',
      // todoAddInfoValue: '',
      getIsCompleteID: ''

    }
  }
  componentDidMount() {
    setTimeout(() => {
      var user = firebase.auth().currentUser;
      
    console.log( "user Not Login", user);
    if(user){
      var getData = db.doc(`users/${user.email}`);
      getData.get().then((doc) => {
        (doc.exists) && this.setState({todos: doc.data().todos, todosIsEmpty: false})
      })
    }
    else {
      console.log( "user Not Login");
    }
    }, 1600);
      
      // window.addEventListener('load', this.handleLoad);
   }
   handleLoad = () => {
    // firebase user Status
    var user = firebase.auth().currentUser;
    if(user){
      var getData = db.doc(`users/${user.email}`);
      getData.get().then((doc) => {
        (doc.exists) && this.setState({todos: doc.data().todos, todosIsEmpty: false})
      })
    }
    else {
      console.log( "user Not Login");
    }
}
  //Change Input Value have
  // addTodo = (e) => {
  //   this.setState({ todoAddInputValue: e.target.value })
  // }

  // Add Todo Button Functionality





  submitTodo = (todoValue, additionalInfo) => {
    //Value Added in single variable
    const todoObject = {
      todoName: todoValue, id: makeid(), isCompleted: false,
      todoAddInfo: (!additionalInfo) ? addInfoTextDummy : additionalInfo
    };
    this.state.todos.push(todoObject);

    // firebase user Status
    var user = firebase.auth().currentUser;
    if (user) {
      var getData = db.doc(`users/${user.email}`)
      getData.set({
        todos: this.state.todos,
      }).then(() => {
        //Notification
        this.refs.notify.notificationAlert(optionsFunc("Added Successefully in your Database", 'success'));
        getData.get().then((doc) => {
          (doc.exists) && this.setState({ todos: doc.data().todos, todosIsEmpty: false });
        }).catch((error) => {
          console.log("Getting Data Error", error)
        })
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      })

    } else {

      this.refs.notify.notificationAlert(optionsFunc(<div><h6>Added Successefully</h6><p>But Your todo is not Save please<Link to="/login">Login</Link> Here</p></div>, 'info', 6));
      this.setState({ todos: this.state.todos, todosIsEmpty: false });

    }


  }



  // Add Todo in todos List
  // addTaskFunc = () => {
    
  //   const todoObject = {
  //     todoName: this.state.todoAddInputValue, id: makeid(), isCompleted: false,
  //     todoAddInfo: (this.state.todoAddInfoValue === '') ? addInfoTextDummy : this.state.todoAddInfoValue
  //   };
  //   this.state.todos.push(todoObject);
  //   this.refs.notify.notificationAlert(optionsFunc("Added Successefully", 'success'));
  //   this.setState({ todos, todoAddInputValue: '' });
  //   if (user) {
  //     // var userName = user.email.split("@");
  //     // console.log(userName[0])

  //     var a = db.doc(`users/${user.email}`)
  //     a.set({
  //       todos,
  //     }).then(() => {
  //       console.log("Saved Your Name");
  //     }).catch((error) => {
  //       console.log(error.code);
  //       console.log(error.message);
  //     })
  //    } else {
      
  //   console.log("User not signin");
  //     // No user is signed in.
  //   }
    
    
    
  // }

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
    findReqTodo.map(todo => { todo.todoName = this.state.todoAddInputValue; todo.todoAddInfo = this.state.todoAddInfoValue })

    this.setState({ todos: this.state.todos, editTaskAfterAdded, todoAddInputValue: '' });
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
    // const docRef = db.doc('users/a@h.com');
    // docRef.get().then((doc)=> {
    //   if (doc.exists) {
    //     this.setState({todos: doc.data().todos})
    //   return function (todo) {
    //     return todo.todoName.toLowerCase().includes(searchTodo.toLowerCase())
    //   }
    //   }
    //   else {
    //     return function (todo) {
    //       return todo.todoName.toLowerCase().includes(searchTodo.toLowerCase())
    //     }
    //   }
    // })
    
  }
  // additionalInfo = (e) => {
  //   this.setState({ todoAddInfoValue: e.target.value });
  //   console.log(this.state.todoAddInfoValue)
  // }
  getID = (id) => {
    console.log("Get ID ", id)
    this.setState({ getIsCompleteID: id })
  }
  routeChange = () => {
    console.log("Rouet Works");

    // console.log(window.location.href)
    // this.history.pushState(null, 'login');
    // let path = `/login`;
    // this.props.history.push(path);
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
      this.refs.notify.notificationAlert(optionsFunc(`Login Successufully`, 'success'))
      const docRef = db.doc(`users/${email}`)
      docRef.get().then((doc) =>{
        (doc.exists) ? this.setState({todos: doc.data().todos}) : this.setState({todos: this.state.todos})
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

  // check = () => {
  //   const a = db.doc("users/a@h.com");
  //   a.get().then((doc) => {
  //     if (doc.exists) {
  //       // console.log("Document data:", doc.data().todos);
  //       this.setState({todos: doc.data().todos})
  //   } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //   }})
  // }
  // signOut = () => {
  //   firebase.auth().signOut().then(() => {
  //     console.log("Successefully Sign Out");
  //   }).catch((error) => {
  //     console.log(error);
      
  //   })
  // }
  render() {
    // var getTodos = db.collection('users').doc('a')
    return (
      <Router>
        <div className="App text-center">
          <button onClick={()=> this.signOut()}> signOut </button>
          <button onClick={() => this.check()}>check</button>
          {/* <PrivateRoute path="/protected" component={Protected} /> */}
          <Nav
            searchTodo={this.searchTodo}
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
                this.state.todos.filter(this.filterTodo(this.state.searchTodoValue)).map((todos) =>
                  <Table
                    key={todos.id}
                    todos={todos}
                    editTaskTable={this.editTaskTable}
                    dltTodo={this.dltTodo}
                    isComplete={this.isComplete}
                    getID={this.getID}
                  />) : "wait while Fetching your data in Server or Either Todos Empty"
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
          <Route path="/todos" exact component={todosComponent} />

          {
            todosCompORIncomp = ({ match }) => {
              return (
                <div>
                  <h6><Link to="/todos">Back to Todos</Link></h6>
                  {this.state.todos.filter((todo) => {
                    if (match.params.id === 'completeTodo' && todo.isCompleted) {
                      return todo
                    }
                    else if (match.params.id === 'incompleteTodo' && !todo.isCompleted) {
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
          <Route path="/login" render={() => <Login loginSubmit={this.loginSubmit} />}></Route>
        </div>


        {/* <Signup></Signup> */}
      </Router>


    );
  }
}

export default App;
