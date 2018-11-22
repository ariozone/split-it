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
  Row,
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
      bill: [],
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
      bill: seat.orderedList,
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
    const { table, splitEqually, applyTaxes, back } = this.props
    const { modal, name, action, quantity, popoverOpen, amount } = this.state
    return (
      <div className="container text-center p-1">
        <div className="table">
          <div className="text-muted"><h5 className="d-flex justify-content-around"> {table.event}&nbsp;&nbsp; {table.date}</h5></div>

          {table.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className="circle shadow-lg m-1"
                type="button"
                onClick={() => this.selectSeat(seat)}
              >
                <p>{seat.name}</p>
                <p>${parseFloat(seat.amount).toFixed(2)}</p>
              </button>
            )
          })}

          <div id="card" className="fixed-bottom mb-1 mx-auto">
            <Card body inverse className="text-center" >
              {table.quantity ? <CardTitle>Shared Items: {table.quantity}</CardTitle> : <CardTitle>No Shared Items</CardTitle>}
              <CardText>Tax: {table.taxRate.toFixed(2)}%</CardText>
              <CardText></CardText>
              <Button size="lg" block onClick={splitEqually}>Split ${(parseFloat(table.subTotal))} Equally</Button>
              {table.taxRate && !table.subTotal ? <Button size="lg" block active
                onClick={applyTaxes}
              >Apply Taxes</Button> : <Button size="lg" block onClick={back}>Back</Button>}
            </Card>
          </div>

          <div>
            <Modal isOpen={modal} >
              <ModalHeader className="p-1 w-100">
                <Form inline onSubmit={this.handleSubmit}>
                  <FormGroup inline row className="w-100 my-2 mx-auto">
                    <Row><Col sm={10}>
                      <Input className="w-100" id="name-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleChange}>
                      </Input></Col><Col sm={2}><Button color="primary" type="submit" className="fixed-right mr-0">{action} Name</Button></Col></Row>
                  </FormGroup>
                </Form>
              </ModalHeader>

              <ModalBody>
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>QTY</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.bill.map((row, i) => (
                      <tr key={i}>{Object.values(row).map((rowValue, i) => <td key={i}>{rowValue}</td>)}</tr>
                    ))}

                  </tbody>
                </table>

              </ModalBody>

              <ModalFooter>
                <Modal isOpen={popoverOpen} toggle={this.togglePopover}>

                  <ModalHeader className="w-100">
                    Add Ordered Items<Button close className="close" onClick={this.closePopover} />
                  </ModalHeader>
                  <ModalBody>
                    <AddItems addItems={this.addItems} closePopover={this.closePopover} />
                  </ModalBody>

                  <ModalFooter>
                  </ModalFooter>
                </Modal>
                <h6 className="mx-3">Amount: ${parseFloat(amount).toFixed(2)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; QTY: {parseInt(quantity)}</h6>

                <Button color="primary" id="Popover1"
                  onClick={this.togglePopover}>Add Items</Button>
                <Button color="secondary" onClick={this.closeModal}>Done</Button>
              </ModalFooter>
            </Modal></div>
        </div>
      </div>
    )
  }
}
