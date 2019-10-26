import React, { Component } from 'react'
import Start from './start'
import Table from './table'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table: null,
      view: 'start'
    }
    this.createTable = this.createTable.bind(this)
    this.updateName = this.updateName.bind(this)
    this.splitEvenly = this.splitEvenly.bind(this)
    this.addItems = this.addItems.bind(this)
    this.goBack = this.goBack.bind(this)
    this.applyTax = this.applyTax.bind(this)
  }

  goBack() {
    this.setState({ view: 'start' })
  }

  updateName(selectedSeat) {
    this.state.table.seats.map(seat => {
      if (seat.id === selectedSeat.id) {
        seat.name = selectedSeat.name
      }
      return seat
    })
  }

  addItems(seatItems) {
    const { table } = this.state
    const itemsList = []
    itemsList.push(seatItems.orderedItem)
    const seats = table.seats.map(seat => {
      if (seat.id === seatItems.id) {
        seat.orderedList = seat.orderedList.concat(itemsList)
        let amount =
          parseInt(seatItems.orderedItem.quantity) *
          parseFloat(seatItems.orderedItem.price)
        let seatAmount = parseFloat(seat.amount)
        seatAmount += amount
        seat.amount = seatAmount
        let qty = parseInt(seat.quantity)
        qty += parseInt(seatItems.orderedItem.quantity)
        seat.quantity = qty
      }
      return seat
    })
    const subTotal = (
      parseFloat(table.subTotal) -
      parseInt(seatItems.orderedItem.quantity) *
        parseFloat(seatItems.orderedItem.price)
    ).toFixed(2)

    const quantity = parseInt(table.quantity) - seatItems.orderedItem.quantity

    this.setState({
      table: Object.assign({}, table, { seats, subTotal, quantity })
    })
  }

  splitEvenly() {
    const { table } = this.state
    let splitAmount =
      parseFloat(this.state.table.subTotal) / this.state.table.seats.length
    const seats = table.seats.map(seat => {
      let seatAmount = parseFloat(seat.amount) + parseFloat(splitAmount)
      seat.shared = splitAmount.toFixed(2)
      seat.amount = seatAmount.toFixed(2)
      return seat
    })
    const subTotal = 0
    this.setState({ table: Object.assign({}, table, { seats, subTotal }) })
  }

  createTable(table) {
    this.setState({ table, view: 'table' })
  }

  applyTax() {
    const { table } = this.state
    const seats = table.seats.map(seat => {
      const taxRate = parseFloat(table.taxRate)
      let seatAmount = parseFloat(seat.amount)
      let taxAmount = (seatAmount * taxRate) / 100
      seat.tax = taxAmount.toFixed(2)
      seat.amount = parseFloat(seatAmount + taxAmount).toFixed(2)
      return seat
    })
    const taxRate = 0
    this.setState({ table: Object.assign({}, table, { seats, taxRate }) })
  }

  renderView() {
    if (this.state.view === 'start') {
      return <Start onSubmit={this.createTable} />
    }
    if (this.state.view === 'table') {
      return (
        this.state.table && (
          <Table
            table={this.state.table}
            onSubmit={this.updateName}
            splitEqually={this.splitEvenly}
            addItems={this.addItems}
            back={this.goBack}
            applyTaxes={this.applyTax}
          />
        )
      )
    }
  }

  render() {
    return this.renderView()
  }
}
