import React, { Component } from "react";

class Categorys extends Component {
  render() {
    let categorys = this.props.categorys;
    return (
      <div className="categorysBalance">
        <div>Balance : {this.props.balance}</div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total amount</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((c,index) => (
              <tr key={index}>
                <td>{c._id}</td>
                <td>{c.totalSum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Categorys;
