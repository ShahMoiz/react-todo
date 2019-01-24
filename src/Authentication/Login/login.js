import  React, {Component} from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBInput} from 'mdbreact';

export default class Login extends Component {
    render(){
        return (
            <div style={{}}>
                 <MDBCard className="align-middle" style={{ width: "22rem", margin: "0 auto", marginTop: "20px" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>Login</MDBCardTitle>
          <form>
            
          <MDBInput label="Enter your email" type="email"/>
          <MDBInput label="Enter your Password" type="password"/>
          <MDBBtn href="#">MDBBtn</MDBBtn>
          </form>
          
        </MDBCardBody>
      </MDBCard>
            </div>
        )
    }
}