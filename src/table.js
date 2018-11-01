import React from 'react'
import AddItems from './items'
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
  CardTitle,
  CardText,
  Popover,
  PopoverBody,
  PopoverHeader
} from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      popoverOpen: false,
      name: ' ',
      action: 'Add',
      selectedSeat: null,
      amount: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.addItems = this.addItems.bind(this)
  }

  closeModal() {
    this.setState({ modal: false })
  }

  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat,
      name: seat.name,
      action: !seat.name ? 'Add' : 'Edit',
      amount: seat.amount
    })
  }

  addItems() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
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
          <div className="text-muted"><h6>Date: {this.props.table.date} Event: {this.props.table.event}</h6></div>

          {this.props.table.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className="circle"
                type="button"
                onClick={() => this.selectSeat(seat)}
              >
                <p>{seat.name}</p>
                <p>${seat.amount}</p>
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
            <ModalBody>
            </ModalBody>

            <ModalFooter>
              <h6 className="mx-5">Amount: ${this.state.amount} </h6>

              <Popover className="w-10" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.addItems}>
                <PopoverHeader>Add Ordered Items</PopoverHeader>
                <PopoverBody><AddItems /></PopoverBody>
              </Popover>
              <Button color="primary" id="Popover1"
                onClick={this.addItems}>Add Items</Button> <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div id="card">
          <Card body inverse className="text-center">
            <CardTitle>Quantity: {this.props.table.quantity}</CardTitle>
            <CardText>Tax: {this.props.table.subTotal ? 100 * (parseFloat(this.props.table.tax)) / (parseFloat(this.props.table.subTotal)).toFixed(2)
              : 0}%</CardText>
            <CardText></CardText>
            <Button size="lg" block onClick={this.props.splitEqually}>Split ${(parseFloat(this.props.table.subTotal))} Equally</Button>
          </Card></div>
      </div>
    )
  }
}
