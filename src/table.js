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
  InputGroup,
  Card,
  CardTitle,
  InputGroupAddon,
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
      shared: 0,
      amount: 0,
      quantity: 0,
      orderedItem: {},
      tax: 0
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
    this.setState({ popoverOpen: false, modal: false })
  }

  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat,
      name: seat.name,
      bill: seat.orderedList,
      shared: seat.shared,
      action: !seat.name ? 'Add' : 'Edit',
      amount: seat.amount,
      quantity: seat.quantity,
      tax: seat.tax
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
    const { modal, name, action, quantity, popoverOpen, amount, shared, bill } = this.state
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
                {seat.name}<br />
                ${parseFloat(seat.amount).toFixed(2)}
              </button>
            )
          })}

          <div id="card" className="fixed-bottom mb-1 mx-auto">
            <Card body inverse className="text-center" >
              {table.quantity ? <CardTitle>Shared Items: {table.quantity}</CardTitle> : <CardTitle>No Shared Items</CardTitle>}
              <CardText>Tax: {table.taxRate.toFixed(2)}%</CardText>
              <CardText></CardText>
              <Button size="lg" block onClick={splitEqually}>Split ${(parseFloat(table.subTotal))} Equally</Button>
              {table.taxRate && !table.subTotal ? <Button size="lg" block
                onClick={applyTaxes}
              >Apply Taxes</Button> : <Button size="lg" block onClick={back}> {!table.taxRate && !table.subTotal ? 'Finish' : 'Back'} </Button>
              }

            </Card>
          </div>

          <div>
            <Modal isOpen={modal} >
              <ModalHeader className="text-center">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup>
                      <Input className="bg-dark" id="name-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleChange}>
                      </Input>
                      <InputGroupAddon addonType="append"><Button color="primary"
                      >{action} Name</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </ModalHeader>

              <ModalBody>
                {bill.length > 0 || shared ? <table className="table table-sm table-dark">
                  {this.state.bill.length > 0 ? <thead>
                    <tr>
                      <th>Item</th>
                      <th>QTY</th>
                      <th>Price</th>
                    </tr>
                  </thead> : <p>No Oreders for this Seat</p>}
                  <tbody>
                    {this.state.bill.map((row, i) => (
                      <tr key={i}>{Object.values(row).map((rowValue, i) => <td key={i}>{rowValue}</td>)}</tr>
                    ))}
                    <tr>
                      <td>Shared Items</td>
                      <td>{table.quantity}</td>
                      <td>${!table.quantity ? table.subTotal : shared}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    {this.state.tax ? <tr className="tax">
                      <td>Tax:</td>
                      <td></td>
                      <td>${this.state.tax}</td>
                    </tr> : null}</tfoot>
                </table>
                  : <p>No Bill Items
                  </p>}

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
                <h6 className="mx-3">Amount: ${parseFloat(amount).toFixed(2)} &nbsp;&nbsp;&nbsp;&nbsp; QTY: {parseInt(quantity)}</h6>

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
