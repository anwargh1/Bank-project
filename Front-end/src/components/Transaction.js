import React, { Component } from "react";
import "../styles/transactions.css";

class Transaction extends Component {
  deletTransaction = () => {
    this.props.deletTransaction(this.props.dataTransaction._id);
  };

  render() {
    let dataTransaction = this.props.dataTransaction;
    let changheDeposit = this.props.changheDeposit;
    return (
      
      <tr >
        <td
          className={dataTransaction.amount >= 0 ? "amountGreen" : "amountRed"}
        >
          {dataTransaction.amount}
        </td>
        <td>{dataTransaction.vendor}</td>
        <td>{dataTransaction.category}</td>
        <td>
          <button onClick={this.deletTransaction}>delete</button>
        </td>
      </tr>
    );
  }
}

export default Transaction;
