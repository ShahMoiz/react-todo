import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBContainer, MDBInput, MDBBtn } from "mdbreact";

import './addTodo.css'

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalToggle: false,
            disabledAddButton: true,
            todoValue: '',
            additionalTodoValue: '',
            addTaskValue: ''
        }
    }
    addTodoChild = (e) => {
        console.log("INput Word Before Set State Call", e.target.value);
        this.setState({todoValue: e.target.value, addTaskValue:e.target.value});
        console.log("INput Word after Set State Call", this.state.addTaskValue);

        (!e.target.value) ? this.setState({ disabledAddButton: true }) : this.setState({ disabledAddButton: false });
        // this.props.addTodo(e);
    }

    // addTaskChild = (e) => {
    //     this.setState({todoValue: e.target.value});
    //     console.log("Todo Value", this.state.todoValue);
        
    // }
    showInfoTextArea = () => {
        const bool = !this.state.additionalToggle
        this.setState({ additionalToggle: bool })
    }

    addInfo = (e) => {
        this.setState({additionalTodoValue: e.target.value})
    }
    render() {
        const { value, editTaskAA,submitTodo } = this.props;
        const {todoValue,additionalTodoValue} = this.state;
        return (

            <div>
                <MDBContainer>
                    <MDBCard className="card-body align-middle" style={{ width: "500px", margin: "0 auto", marginTop: '10px', marginBottom: '10px' }}>
                        <MDBCardTitle>Add Todo</MDBCardTitle>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submitTodo(todoValue,additionalTodoValue)
                        }}>
                        <MDBInput label="Add Your Todo" onChange={(e) => this.addTodoChild(e)} />

                        {/* Show or Hide Additional Info */}
                        {
                            (this.state.additionalToggle) ?
                            <button type="button" className="link-button" onClick={() => this.showInfoTextArea()}>Hide Additional Info</button> :
                            <button type="button" className="link-button" onClick={() => this.showInfoTextArea()}>Show Additional Info</button>
                        }

                        {/* Additional Info Text Area */}
                        {
                            // If toggle is true then Show Additional info Text box
                            (this.state.additionalToggle) &&
                            <MDBInput onChange={(e) => this.addInfo(e)} type="textarea" label="Add Additional Info" rows="2" />
                        }
 
                        {
                            // if Todo is Edit then show "Edit Todo" button else show "Add Todo" button
                            (editTaskAA.editButton) ? <MDBBtn disabled={this.state.disabledAddButton} color="cyan">Edit Todo</MDBBtn> :
                                <MDBBtn disabled={this.state.disabledAddButton} type="submit" color="success">Add Task</MDBBtn>
                        }
                        </form>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}