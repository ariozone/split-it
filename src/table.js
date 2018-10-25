import React from 'react'

export default class Table extends React.Component {
  render() {
    return (
      <div className="container text-center">
        <div className="table">
          {
            createSeats(this.props.seats).map(number => {
              return <div key={number} className="circle"></div>
            })
          }
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
