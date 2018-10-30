import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  Card,
  CardTitle
} from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      name: ' ',
      action: 'Add',
      selectedSeat: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({ modal: false })
  }

  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat,
      name: seat.name,
      action: !seat.name ? 'Add' : 'Edit'
    })
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { name, selectedSeat } = this.state
    this.props.onSubmit({ name: name, id: selectedSeat.id })
    this.setState({ modal: false, action: 'Add', name: '', selectedSeat: null })
  }

  render() {
    return (
      <div className="container">
        <div className="table">
          <div className="text-muted"><h6>Date: {this.props.table.date} Event:{this.props.table.event}</h6></div>

          {this.props.table.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className="circle"
                type="button"
                onClick={() => this.selectSeat(seat)}
              >
                <p>{seat.name}</p>
              </button>
            )
          })}
          <Modal isOpen={this.state.modal} className={this.props.className}>
            <ModalHeader>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                  <InputGroup><input id="name-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}>
                  </input><Button>{this.state.action} Name</Button>
                  </InputGroup>
                </FormGroup>
              </Form>
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div id="card">
          <Card body inverse className="text-center">
            <CardTitle>Quantity: {this.props.table.quantity}</CardTitle>
            <CardTitle>Bill Total:</CardTitle>
            <CardTitle>${(parseFloat(this.props.table.subTotal) + (parseFloat(this.props.table.tax)))}</CardTitle>
          </Card></div>
      </div>
    )
  }
}
