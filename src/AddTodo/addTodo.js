import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBContainer, MDBInput, MDBBtn  } from "mdbreact";

import './addTodo.css'

export default class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            additionalToggle :false,
            disabledAddButton: true,
        }
    }
    addTodoChild = (e) => {
        const addTaskValue = e.target.value;
        this.props.addTodo(e);
        (!addTaskValue) ? this.setState({disabledAddButton: true}) : this.setState({disabledAddButton: false})
    }

    addTaskChild = () => {
        console.log("Add Task Child Run")
        this.props.addTask()
    }
    showInfoTextArea = () => {
        const bool = !this.state.additionalToggle
        this.setState({additionalToggle: bool})
    }

    render() {
        const { value, editTaskAA, infoValue } = this.props;
        return (

            <div>
                <MDBContainer>
                    <MDBCard className="card-body align-middle" style={{ width: "500px", margin: "0 auto", marginTop: '10px', marginBottom: '10px' }}>
                        <MDBCardTitle>Add Todo</MDBCardTitle>
                        {/* <MDBCardText > */}
                            <MDBInput label="Add Your Todo" value={value} onChange={this.addTodoChild}/>
                            {(this.state.additionalToggle) ?
                             <button type="button" className="link-button" onClick={() => this.showInfoTextArea()}>Hide Additional Info</button> :
                             <button type="button" className="link-button"  onClick={() => this.showInfoTextArea()}>Show Additional Info</button>}
                            { (this.state.additionalToggle) && <MDBInput value={infoValue} onChange={(e) => this.props.addInfo(e)} type="textarea"
                                                                 label="Add Additional Info" rows="2" />}
                        {/* </MDBCardText> */}
                            {
                                (editTaskAA.editButton) ? <MDBBtn disabled={this.state.disabledAddButton} onClick={() => this.props.editTask()} color="cyan">Edit Todo</MDBBtn> :
                                                         <MDBBtn disabled={this.state.disabledAddButton} onClick={() => this.addTaskChild()} color="success">Add Task</MDBBtn>
                            }
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}