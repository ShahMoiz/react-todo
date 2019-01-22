import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBInput, MDBBtn  } from "mdbreact";

export default class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            additionalToggle :false,
        }
    }
    addTodoChild = (e) => {
        // console.log("Add to Child Run",)
        this.props.addTodo(e);
    }

    addTaskChild = () => {
        console.log("Add Task Child Run")
        this.props.addTask()
    }

    // editTaskChild = (e) => {
    //     console.log("check editTask Child Value", e.target.value)
    // this.props.editTask(e);
    // }
    showInfoTextArea = () => {
        const bool = !this.state.additionalToggle
        this.setState({additionalToggle: bool})
    }
    render() {
        const { value, editTaskAA, infoValue } = this.props;
        return (

            <div key={1}>
                <MDBContainer>
                    <MDBCard className="card-body align-middle" style={{ width: "500px", margin: "0 auto", marginTop: '10px', marginBottom: '10px;' }}>
                        <MDBCardTitle>Add Todo</MDBCardTitle>
                        <MDBCardText >
                            <MDBInput label="Add Your Todo" value={value} onChange={this.addTodoChild}/>
                            {(this.state.additionalToggle) ? <a href="javascript:void(0)" onClick={() => this.showInfoTextArea()}>Hide Additional Info</a> :
                                                            <a href="javascript:void(0)" onClick={() => this.showInfoTextArea()}>Show Additional Info</a>}
                            { (this.state.additionalToggle) && <MDBInput value={infoValue} onChange={(e) => this.props.addInfo(e)} type="textarea"
                                                                 label="Add Additional Info" rows="2" />}
                        </MDBCardText>
                            {
                                (editTaskAA.editButton) ? <MDBBtn  onClick={() => this.props.editTask()} color="cyan">Edit Todo</MDBBtn> :
                                                         <MDBBtn onClick={() => this.addTaskChild()} color="success">Add Task</MDBBtn>
                            }
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}