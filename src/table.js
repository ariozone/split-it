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
  Input,
  Card,
  CardTitle,
  CardText
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
      amount: 0,
      quantity: 0,
      orderedItem: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closePopover = this.closePopover.bind(this)
    this.togglePopover = this.togglePopover.bind(this)
    this.addItems = this.addItems.bind(this)
  }

  closeModal() {
    this.setState({ modal: false })
  }

  closePopover() {
    this.setState({ popoverOpen: false })
  }

  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat,
      name: seat.name,
      action: !seat.name ? 'Add' : 'Edit',
      amount: seat.amount,
      quantity: seat.quantity
    })
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { name, selectedSeat } = this.state
    this.props.onSubmit({ name: name, id: selectedSeat.id })
    this.setState({ modal: false })
  }

  togglePopover() {
    this.setState({ popoverOpen: true })
  }

  addItems(item) {
    const { selectedSeat } = this.state
    this.props.addItems({ orderedItem: item, id: selectedSeat.id })
  }

  render() {
    return (
      <div className="container text-center">
        <div className="table">
          <div className="text-muted"><h6 className="d-flex justify-content-around"> {this.props.table.event} {this.props.table.date}</h6></div>

          {this.props.table.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className="circle"
                type="button"
                onClick={() => this.selectSeat(seat)}
              >
                <p>{seat.name}</p>
                <p>${parseFloat(seat.amount).toFixed(2)}</p>
              </button>
            )
          })}
          <Modal isOpen={this.state.modal} >

            <ModalHeader className="float-right p-1">

              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup className="w-90 mt-3 mx-1">
                  <Input id="name-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup><Button type="submit" className="">{this.state.action} Name</Button>
              </Form>
            </ModalHeader>

            <ModalBody>
              <Modal isOpen={this.state.popoverOpen} toggle={this.togglePopover}>

                <ModalHeader className="float-right p-1">
                  Add Ordered Items
                </ModalHeader>

                <ModalBody>
                  <AddItems addItems={this.addItems} closePopover={this.closePopover} />
                </ModalBody>

                <ModalFooter>
                </ModalFooter>
              </Modal>
            </ModalBody>

            <ModalFooter>
              <h6 className="mx-5">Amount: ${parseFloat(this.state.amount).toFixed(2)} QTY: {parseInt(this.state.quantity)}</h6>

              <Button color="primary" id="Popover1"
                onClick={this.togglePopover}>Add Items</Button>
              <Button color="secondary" onClick={this.closeModal}>Done</Button>
            </ModalFooter>
          </Modal>
          <div id="card">
            <Card body inverse className="text-center" >
              <CardTitle>Shared Items: {this.props.table.quantity}</CardTitle>
              <CardText>Tax: {this.props.table.taxRate}%</CardText>
              <CardText></CardText>
              <Button size="lg" block onClick={this.props.splitEqually}>Split ${(parseFloat(this.props.table.subTotal))} Equally</Button>
              <Button size="lg" block onClick={this.props.back}>Back</Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
