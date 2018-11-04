import React from 'react'
import CurrencyInput from 'react-currency-input'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class AddItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0,
      quantity: 0,
      itemName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    switch (e.target.id) {
      case 'price':
        this.setState({ price: e.target.value })
        break
      case 'quantity':
        this.setState({ quantity: e.target.value })
        break
      case 'item-input':
        this.setState({ itemName: e.target.value })
        break
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { price, quantity, itemName } = this.state
    this.props.addItems({ price: price, quantity: quantity, itemName: itemName })
    this.setState({ price: 0, quantity: 0, itemName: '' })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormGroup>
          <Label for="price" >Item Price</Label>
          <CurrencyInput className="form-control" precision="2" placeholder="$0.00" id="price" onChangeEvent={this.handleChange} value={this.state.price} />
        </FormGroup>

        <FormGroup>
          <Label for="quantity" >Number of Items</Label>
          <Input type="number" name="quantity" id="quantity" onChange={this.handleChange} value={this.state.quantity} />
        </FormGroup>

        <FormGroup>
          <Label for="item">Orderd Item</Label>
          <Input type="text" name="item" id="item-input" placeholder="Pizza" onChange={this.handleChange} value={this.state.itemName} />
        </FormGroup>

        <Button type="submit" color="primary">Add Item</Button>
        <Button color="secondary" onClick={this.props.closePopover}> Done</Button>
      </Form >
    )
  }
}
