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
  Col,
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
          <div className="text-muted"><h5 className="d-flex justify-content-around"> {this.props.table.event}&nbsp;&nbsp; {this.props.table.date}</h5></div>

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
          <div>
            <Modal isOpen={this.state.modal} >
              <ModalHeader className="float-right p-1">

                <Form inline onSubmit={this.handleSubmit}>
                  <FormGroup inline row className="w-100 my-2 mx-auto">
                    <Col sm={10}>
                      <Input className="w-100" id="name-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}>
                      </Input></Col><Col sm={2}><Button color="primary" type="submit" className="mr-0">{this.state.action} Name</Button></Col>
                  </FormGroup>
                </Form>
              </ModalHeader>

              <ModalBody>
                <Modal isOpen={this.state.popoverOpen} toggle={this.togglePopover}>

                  <ModalHeader className="w-100">
                    Add Ordered Items<Button close className="close" onClick={this.closePopover} />
                  </ModalHeader>

                  <ModalBody>
                    <AddItems addItems={this.addItems} closePopover={this.closePopover} />
                  </ModalBody>

                  <ModalFooter>
                  </ModalFooter>
                </Modal>
              </ModalBody>

              <ModalFooter>
                <h6 className="mx-3">Amount: ${parseFloat(this.state.amount).toFixed(2)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; QTY: {parseInt(this.state.quantity)}</h6>

                <Button color="primary" id="Popover1"
                  onClick={this.togglePopover}>Add Items</Button>
                <Button color="secondary" onClick={this.closeModal}>Done</Button>
              </ModalFooter>
            </Modal></div>
          <div id="card">
            <Card body inverse className="text-center" >
              <CardTitle>Shared Items: {this.props.table.quantity}</CardTitle>
              <CardText>Tax: {this.props.table.taxRate}%</CardText>
              <CardText></CardText>
              <Button size="lg" block onClick={this.props.splitEqually}>Split ${(parseFloat(this.props.table.subTotal))} Equally</Button>
              {this.props.table.taxRate && !this.props.table.subTotal ? <Button size="lg" block active
                onClick={this.props.applyTaxes}
              >Apply Taxes</Button> : <Button size="lg" block onClick={this.props.back}>Back</Button>}
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
