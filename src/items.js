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
  render() {
    return (
      <Form >

        <FormGroup>
          <Label for="price" >Item Price</Label>
          <CurrencyInput precision="2" placeholder="$0.00" id="price" onChangeEvent={this.handleChange} value=" " />
        </FormGroup>

        <FormGroup>
          <Label for="quantity" >Number of Items</Label>
          <Input type="number" name="quantity" id="quantity" onChangeEvent={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="item">Orderd Item</Label>
          <Input type="text" name="item" id="item-input" placeholder="Pizza" onChangeEvent={this.handleChange} />
        </FormGroup>
        <Button color="primary">Add Item</Button>{' '}<Button color="secondary"> Cancel</Button>
      </Form >
    )
  }
}
