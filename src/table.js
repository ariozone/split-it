import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      seats: {
        name: '',
        id: ''
      }
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    return (
      <div className="container">
        <div className="table">
          {
            createSeats(this.props.seats).map(number => {
              return <button key={number} className="circle" type="button" onClick={this.toggle} ><p>{name}</p></button>
            })
          }
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>
              Name goes here!</ModalHeader>
            <ModalBody>
              ordered item goes here!
            </ModalBody>
            <ModalFooter>
              total amount goes here: $
              <Button color="primary" onClick={this.toggle}>Add</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

function createSeats(number) {
  const array = []
  for (let i = 1; i <= number; i++) {
    array.push(i)
  }
  return array
}
