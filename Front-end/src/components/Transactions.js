import React, { Component } from "react";
import Transaction from "./Transaction";
import "../styles/transaction.css";

class Transactions extends Component {
  render() {
    let transactions = this.props.transactions;
    let balance = this.props.balance;
    return (
      <div className="mini">
        {balance < 500 ? (
          <div className="balanceRed">Balance : {balance}</div>
        ) : (
          <div className="balanceGreen">Balance : {balance}</div>
        )}
        <table>
          <tr>
            <th>Amount</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </table>
        {transactions.map((m) => (
          <Transaction
            dataTransaction={m}
            deletTransaction={this.props.deletTransaction}
          />
        ))}
      </div>
    );
  }
}

export default Transactions;
