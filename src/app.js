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
  }

  updateName(selectedSeat) {
    this.state.table.seats.map(seat => {
      if (seat.id === selectedSeat.id) {
        seat.name = selectedSeat.name
      }
      return seat
    })
  }
  createTable(table) {
    this.setState({ table, view: 'table' })
  }
  renderView() {
    if (this.state.view === 'start') {
      return <Start onSubmit={this.createTable} />
    }
    if (this.state.view === 'table') {
      return this.state.table && <Table seats={this.state.table.seats}
        onSubmit={this.updateName}
      />
    }
  }

  render() {
    return (
      this.renderView()
    )
  }
}
