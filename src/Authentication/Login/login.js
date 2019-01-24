import  React, {Component} from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBInput} from 'mdbreact';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }
    loginEmail = (e) => {
        this.setState({email: e.target.value})
    }
    loginPass = (e) => {
        this.setState({pass: e.target.value})
    }
    render(){
        const {loginSubmit} = this.props
        const {email, pass} = this.state
        return (
            <div style={{}}>
                 <MDBCard className="align-middle" style={{ width: "22rem", margin: "0 auto", marginTop: "20px" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>Login</MDBCardTitle>
          <form onSubmit={(e) => {
              e.preventDefault()
              loginSubmit(email,pass)
          }}>
            
          <MDBInput label="Enter your email" onChange={(e) => this.loginEmail(e)} type="email"/>
          <MDBInput label="Enter your Password" onChange={(e) => this.loginPass(e)} type="password"/>
          <MDBBtn type="submit">MDBBtn</MDBBtn>
          </form>
          
        </MDBCardBody>
      </MDBCard>
            </div>
        )
    }
}