import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      seats: {
        name: '',
        id: ''
      }
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    return (
      <div className="container">
        <div className="table">
          <button className="circle" type="button" onClick={this.toggle} ><p>You</p></button>
          {
            createSeats(this.props.seats).map(number => {
              return <button key={number} className="circle" type="button" onClick={this.toggle} ><p>{this.state.seats.name}</p></button>
            })
          }
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name-input">Name:</Label>
                  <Input type="text" name="name" id="name-input" placeholder="Name" />
                </FormGroup>
                {/* {' '} */}
                <Button>Add</Button>
              </Form>
            </ModalHeader>
            <ModalBody>
              ordered item goes here!
            </ModalBody>
            <ModalFooter>
              total amount goes here: $
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

function createSeats(number) {
  const array = []
  for (let i = 2; i <= number; i++) {
    array.push(i)
  }
  return array
}
