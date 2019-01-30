import  React, {Component} from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBInput} from 'mdbreact';

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
                email: '',
                pass: '',
                rePass: '',
        }
    }

    signupEmail = (e) => {
        this.setState({email: e.target.value});
    }
    signupPass = (e) => {
        this.setState({pass: e.target.value});
    }
    signupRePass = (e) => {
        this.setState({rePass: e.target.value});
    }
    render(){
        const {signupSubmit} = this.props;
        const {email, pass, rePass} = this.state
        return (
            <div style={{}}>
                 <MDBCard className="align-middle" style={{ width: "22rem", margin: "0 auto", marginTop: "20px" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>SignUp</MDBCardTitle>
          <form onSubmit={(e) => {
              e.preventDefault()
              signupSubmit(email, pass, rePass)}
          }>
          <MDBInput label="Enter your email" onChange={(e) => this.signupEmail(e)} type="text"/>
          <MDBInput label="Enter your Password" onChange={(e) => this.signupPass(e)} type="password"/>
          <MDBInput label="Retype your Password" onChange={(e) => this.signupRePass(e)} type="password"/>
          <MDBBtn type="submit">MDBBtn</MDBBtn>
          </form>
          
        </MDBCardBody>
      </MDBCard>
            </div>
        )
    }
}
// import React, { Component } from "react";
// // import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
// // MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
// import './signup.css'


// export default class SignUp extends Component {
//     render(){
//         return (
//             <div className="main">
//                 <section className="signup">
//                     <div className="container">
//                         <div className="signup-content">
//                             <div className="signup-form">
//                             <form method="POST" className="register-form" id="register-form">
//                             <div className="form-group">
//                                 <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
//                                 <input type="text" name="name" id="name" placeholder="Your Name"/>
//                             </div>
//                             <div className="form-group">
//                                 <label for="email"><i className="zmdi zmdi-email"></i></label>
//                                 <input type="email" name="email" id="email" placeholder="Your Email"/>
//                             </div>
//                             <div className="form-group">
//                                 <label for="pass"><i className="zmdi zmdi-lock"></i></label>
//                                 <input type="password" name="pass" id="pass" placeholder="Password"/>
//                             </div>
//                             <div className="form-group">
//                                 <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
//                                 <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
//                             </div>
//                             <div className="form-group">
//                                 <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
//                                 <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
//                             </div>
//                             <div className="form-group form-button">
//                                 <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
//                             </div>
//                         </form>
//                         <div className="signup-image">
//                          <figure><img src={require('./signup-image.jpg')} alt="sing up image" /></figure>
//                         <a href="#" className="signup-image-link">I am already member</a>
//                     </div>
//                     </div>
//                     </div>
//                     </div>
//                     </section>
//                     </div>
                    
//         // {/* <!-- Sign up form --> */}
//         // <section className="signup">
//         //     <div className="container">
//         //         <div className="signup-content">
//         //             <div className="signup-form">
//         //                 <h2 className="form-title">Sign up</h2>
//         //                 <form method="POST" className="register-form" id="register-form">
//         //                     <div className="form-group">
//         //                         <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
//         //                         <input type="text" name="name" id="name" placeholder="Your Name"/>
//         //                     </div>
//         //                     <div className="form-group">
//         //                         <label for="email"><i className="zmdi zmdi-email"></i></label>
//         //                         <input type="email" name="email" id="email" placeholder="Your Email"/>
//         //                     </div>
//         //                     <div className="form-group">
//         //                         <label for="pass"><i className="zmdi zmdi-lock"></i></label>
//         //                         <input type="password" name="pass" id="pass" placeholder="Password"/>
//         //                     </div>
//         //                     <div className="form-group">
//         //                         <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
//         //                         <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
//         //                     </div>
//         //                     <div className="form-group">
//         //                         <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
//         //                         <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
//         //                     </div>
//         //                     <div className="form-group form-button">
//         //                         <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
//         //                     </div>
//         //                 </form>
//         //             </div>
//         //             <div className="signup-image">
//         //                 <figure><img src="images/signup-image.jpg" alt="sing up image"></figure>
//         //                 <a href="#" className="signup-image-link">I am already member</a>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </section>
//         // </div>
//         )
//     }
// }