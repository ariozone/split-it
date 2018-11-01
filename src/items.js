import React from 'react'
import { Form, FormGroup, Col, Row, Label, InputGroupAddon, Input, Button } from 'reactstrap'

export default class AddItems extends React.Component {
  render() {
    return (
      <Form>
        <Row form>
          <Col md={9}>
            <FormGroup>
              <Label for="price" id="price">Item Price</Label>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input placeholder="Amount" type="number" step="1" />
              <InputGroupAddon addonType="append">.00</InputGroupAddon></FormGroup></Col>
          <Col md={3}>
            <FormGroup>
              <Input type="select" name="select" id="quantity" />
            </FormGroup>
          </Col></Row>
        <FormGroup>
          <Label for="item">Orderd Item</Label>
          <Input type="text" name="item" id="item-input" placeholder="Pizza" />
        </FormGroup>
        <Button>Add</Button><Button>Cancel</Button>
      </Form>
    )
  }
}
