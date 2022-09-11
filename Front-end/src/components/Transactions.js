import React, { Component } from "react";
import Transaction from "./Transaction";
import "../styles/transaction.css";

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      color: false,
    };
  }
  changheDeposit = () => {
        this.setState({
      color: !this.state.color,
    });
  };
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
          <thead>
            <tr>
              <th>Amount</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((m, index) => (
              <Transaction
                dataTransaction={m}
                deletTransaction={this.props.deletTransaction}
                key={index}
                color={this.state.color}
                changheDeposit={this.changheDeposit}
              />
            ))}
          </tbody>
        </table>
        <button onClick={this.changheDeposit}>change color</button>
      </div>
    );
  }
}

export default Transactions;
