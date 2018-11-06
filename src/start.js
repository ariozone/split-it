import React from 'react'
import CurrencyInput from 'react-currency-input'
export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seats: 2,
      subTotal: 0,
      tax: 0,
      quantity: '',
      event: '',
      date: '',
      taxRate: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setTaxRate = this.setTaxRate.bind(this)
  }
  handleChange(e) {
    switch (e.target.id) {
      case 'seats':
        this.setState({
          seats: e.target.value
        })
        break
      case 'eventName':
        this.setState({
          event: e.target.value
        })
        break
      case 'date-input':
        this.setState({
          date: e.target.value
        })
        break
      case 'subtotal':
        this.setState({
          subTotal: e.target.value
        })
        break
      case 'quantity':
        this.setState({
          quantity: e.target.value
        })
        break
      case 'tax-input':
        this.setState({
          tax: e.target.value
        })
        break

    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { seats, event, date, tax, subTotal, quantity, taxRate } = this.state
    this.props.onSubmit({ seats: createSeats(seats), event, date, tax, quantity, subTotal, taxRate })
  }

  setTaxRate() {
    this.setState({
      taxRate: (this.state.subTotal ? (100 * (parseFloat(this.state.tax)) / (parseFloat(this.state.subTotal)).toFixed(2))
        : 0)
    })
  }

  render() {
    return (
      <div className="container pt-3 text-center">
        <h1 className="text-center mx-auto my-2">Create Table</h1>
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="form-group mx-5">
            <label htmlFor="seats">Number of Seats</label>
            <select className="form-control" id="seats" onChange={this.handleChange}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select></div>

          <div className="form-group mx-5">
            <label
              htmlFor="subtotal">Bill Subtotal (Before Tax):</label>
            <div className="input-group">
              <CurrencyInput precision="2"
                className="form-control"
                aria-label="Amount"
                id="subtotal"
                value={this.state.subTotal}
                onChangeEvent={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group mx-5">
            <label
              htmlFor="tax-input">Bill Tax:</label>
            <div className="input-group">
              <CurrencyInput precision="2"
                className="form-control"
                aria-label="Amount"
                id="tax-input"
                value={this.state.tax}
                onChangeEvent={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group mx-5">
            <label
              htmlFor="quantity">Quantity of Ordered Items:</label>
            <div className="input-group">
              <input type="number" className="form-control"
                id="quantity" value={this.state.quantity}
                onChange={this.handleChange} /></div>
          </div>

          <div className="form-group mx-5">
            <label
              htmlFor="eventName">Name of Restaurant or Event:</label>
            <input
              type="text"
              className="form-control" id="eventName" value={this.state.event}
              onChange={this.handleChange} />
          </div>

          <div className="form-group mx-5">
            <label
              htmlFor="date-input"
              className="form-label">Date</label>
            <input
              className="form-control"
              type="date"
              onChange={this.handleChange}
              value={this.state.date} id="date-input"
              placeholder={(new Date())} />

            <button type="submit" className="btn btn-primary btn-lg btn-block mt-5" onClick={this.setTaxRate}>Next</button>

          </div>
        </form>
      </div>
    )
  }
}

function createSeats(number) {
  const array = []
  for (let i = 1; i <= number; i++) {
    array.push({ name: '', amount: 0, orderedList: [], quantity: 0, id: i - 1 })
  }
  return array
}
