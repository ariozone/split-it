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
      name: '',
      nameInput: false,
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
    !seat.name
      ? this.setState({
        nameInput: true,
        selectedSeat: seat,
        name: ''
      })
      : this.setState({
        modal: true,
        selectedSeat: seat,
        name: seat.name,
        bill: seat.orderedList,
        shared: seat.shared,
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
    this.setState({ nameInput: false })
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
    const {
      modal,
      name,
      quantity,
      popoverOpen,
      amount,
      shared,
      bill
    } = this.state
    return (
      <div className='container text-center p-1'>
        <div className='table'>
          <div className='text-muted'>
            <h4 className='d-flex justify-content-around'>
              {' '}
              {table.event}&nbsp;&nbsp; {table.date}
            </h4>
          </div>

          {table.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className='circle shadow-lg m-1'
                type='button'
                onClick={() => this.selectSeat(seat)}
              >
                {seat.name}
                <br />${parseFloat(seat.amount).toFixed(2)}
              </button>
            )
          })}

          <div id='card' className='fixed-bottom mb-1 mx-auto'>
            <Card body inverse className='text-center'>
              {table.quantity ? (
                <CardTitle>Shared Items: {table.quantity}</CardTitle>
              ) : (
                <CardTitle>No Shared Items</CardTitle>
              )}
              <CardText>Tax: {table.taxRate.toFixed(2)}%</CardText>
              <CardText></CardText>
              <Button size='lg' block onClick={splitEqually}>
                Split ${parseFloat(table.subTotal)} Equally
              </Button>
              {table.taxRate && !table.subTotal ? (
                <Button size='lg' block onClick={applyTaxes}>
                  Apply Taxes
                </Button>
              ) : (
                <Button size='lg' block onClick={back}>
                  {' '}
                  {!table.taxRate && !table.subTotal
                    ? 'Finish'
                    : 'Start Over'}{' '}
                </Button>
              )}
            </Card>
          </div>
          <div>
            <Modal isOpen={this.state.nameInput}>
              <Form onSubmit={this.handleSubmit} className='p-2'>
                <FormGroup>
                  <Input
                    className='bg-dark my-2'
                    id='name-input'
                    maxLength='6'
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={this.handleChange}
                  ></Input>
                  <Button color='primary' size='lg' block>
                    Add Name
                  </Button>
                </FormGroup>
              </Form>
            </Modal>
          </div>

          <div>
            <Modal isOpen={modal}>
              <h2 className=' p-1 mt-1 text-center align-middle'>{name}</h2>
              <ModalBody>
                {bill.length > 0 || shared ? (
                  <table className='table table-sm table-dark'>
                    {this.state.bill.length > 0 ? (
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>QTY</th>
                          <th>Total $</th>
                        </tr>
                      </thead>
                    ) : (
                      <thead>
                        <tr>
                          <th></th>
                          <th>No Oreders for this Seat</th>
                          <th></th>
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {this.state.bill.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((rowValue, i) => (
                            <td key={i}>{rowValue}</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td>Shared Items</td>
                        <td>{table.quantity ? table.quantity : null}</td>
                        <td>{!table.quantity ? table.subTotal : shared}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      {this.state.tax ? (
                        <tr className='tax'>
                          <td>Tax:</td>
                          <td></td>
                          <td>${this.state.tax}</td>
                        </tr>
                      ) : null}
                    </tfoot>
                  </table>
                ) : (
                  <h5 className='text-center'>No Bill Items</h5>
                )}
              </ModalBody>

              <ModalFooter>
                <Modal isOpen={popoverOpen} toggle={this.togglePopover}>
                  <ModalHeader className='w-100'>
                    Add Ordered Items
                    <Button
                      close
                      className='close'
                      onClick={this.closePopover}
                    />
                  </ModalHeader>
                  <ModalBody>
                    <AddItems
                      addItems={this.addItems}
                      closePopover={this.closePopover}
                    />
                  </ModalBody>

                  <ModalFooter></ModalFooter>
                </Modal>
                <h6 className='mx-3'>
                  Amount: ${parseFloat(amount).toFixed(2)}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp; QTY:{' '}
                  {quantity ? parseInt(quantity) : null}
                </h6>

                {table.subTotal > 0 ? (
                  <Button
                    color='primary'
                    id='Popover1'
                    onClick={this.togglePopover}
                  >
                    Add Items
                  </Button>
                ) : null}
                <Button color='secondary' onClick={this.closeModal}>
                  Done
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}
