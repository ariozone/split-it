import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      name: ' ',
      action: 'Add',
      selectedSeat: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({ modal: false })
  }

  selectSeat(seat) {
    this.setState({
      modal: true,
      selectedSeat: seat,
      name: seat.name,
      action: !seat.name ? 'Add' : 'Edit'
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
          {this.props.seats.map(seat => {
            return (
              <button
                key={seat.id}
                className="circle"
                type="button"
                onClick={() => this.selectSeat(seat)}
              >
                <p>{seat.name}</p>
              </button>
            )
          })}
          <Modal isOpen={this.state.modal} className={this.props.className}>
            <ModalHeader>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup className="mb-0 mr-sm-2 mb-sm-0">
                  <Input
                    type="text"
                    name="name"
                    id="name-input"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                {' '}
                <Button>{this.state.action} Name</Button>
              </Form>
            </ModalHeader>
            <ModalBody>ordered item goes here!</ModalBody>
            <ModalFooter>total amount goes here: $
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}
