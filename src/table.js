import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      name: '',
      selectedSeat: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat
    })
  }
  handleChange(e) {
    this.setState({name: e.targe.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    const {name, selectedSeat} = this.state
    this.props.onSubmit({name: name, id: selectedSeat.id})
    this.setState({modal: false, name: '', selectedSeat: null})
  }
  render() {
    return (
      <div className="container">
        <div className="table">
          {
            this.props.seats.map(seat => {
              return <button key={seat.id} className="circle" type="button" onClick={() => this.selectSeat(seat)} ><p>{seat.name}</p></button>
            })
          }
          <Modal isOpen={this.state.modal} className={this.props.className}>
            <ModalHeader>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name-input">Name:</Label>
                  <Input type="text" name="name" id="name-input" placeholder="Name" onChange={this.handleChange}/>
                </FormGroup>
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
