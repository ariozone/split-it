import React from 'react'
export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seats: 0,
      restaurant: '',
      date: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    if (e.target.id === 'seats') {
      this.setState({
        seats: e.target.value
      })
    }
    if (e.target.id === 'restaurantName') {
      this.setState({
        restaurant: e.target.value
      })
    }
    if (e.target.id === 'date-input') {
      this.setState({
        date: e.target.value
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const {seats, restaurant, date} = this.state
    this.props.onSubmit({seats, restaurant, date})

  }
  render() {
    return (
      <div className="container-fluid pt-5">
        <h1 className="text-center mx-auto mt-5">How many people?</h1>
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="form-group col-8">
            <select className="form-control m-5" id="seats" onChange={this.handleChange}>
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
          <div className="form-group">
            <label
              htmlFor="restaurantName">Restaurant Name:</label>
            <input
              type="text"
              className="form-control" id="restaurantName" value={this.state.restaurant}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group row">
            <label
              htmlFor="date-input"
              className="col-2 col-form-label">Date</label>
            <div className="col-10">
              <input
                className="form-control"
                type="date"
                onChange={this.handleChange}
                value={this.state.date} id="date-input"/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Next</button>
        </form>
      </div>
    )
  }
}
