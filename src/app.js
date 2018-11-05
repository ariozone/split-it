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

  splitEvenly() {
    const { table } = this.state
    let splitAmount = (parseFloat(this.state.table.subTotal) + (parseFloat(this.state.table.tax))) / this.state.table.seats.length
    const seats = table.seats.map(seat => {
      seat.amount = splitAmount.toFixed(2)
      splitAmount = 0
      return seat
    })
    this.setState({ table: Object.assign({}, table, { seats }) })
  }

  createTable(table) {
    this.setState({ table, view: 'table' })
  }

  addItems(seatItems) {
    const { table } = this.state
    const itemsList = []
    itemsList.push(seatItems.orderedItem)
    const seats = table.seats.map(seat => {
      if (seat.id === seatItems.id) {
        seat.orderedList = seat.orderedList.concat(itemsList)
        let amount = (parseInt(seatItems.orderedItem.quantity)) * (parseFloat(seatItems.orderedItem.price))
        let seatAmount = parseFloat(seat.amount)
        seatAmount += amount
        seat.amount = seatAmount
      }
      return seat
    })

    this.setState({ table: Object.assign({}, table, { seats }) })
  }

  renderView() {
    if (this.state.view === 'start') {
      return <Start onSubmit={this.createTable} />
    }
    if (this.state.view === 'table') {
      return this.state.table && <Table table={this.state.table} onSubmit={this.updateName} splitEqually={this.splitEvenly} addItems={this.addItems} back={this.goBack} />
    }
  }

  render() {
    return (
      this.renderView()
    )
  }
}
