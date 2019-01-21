import React, { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBInput, MDBBtn  } from "mdbreact";

export default class AddTodo extends Component {
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

    render() {
        const { value, editTaskAA, isCompleted } = this.props;
        return (

            <div key={1}>
                <MDBContainer>
                    <MDBCard className="card-body align-middle" style={{ width: "500px", margin: "0 auto", marginTop: '10px', marginBottom: '10px;' }}>
                        <MDBCardTitle>Add Todo</MDBCardTitle>
                        <MDBCardText >
                            <MDBInput label="Add Your Todo" value={value} onChange={this.addTodoChild}/>
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