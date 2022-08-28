import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/operations.css";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: "",
    };
  }

  updateAmountText = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };

  updateVendorText = (event) => {
    this.setState({
      vendor: event.target.value,
    });
  };

  updateCategoryText = (event) => {
    this.setState({
      category: event.target.value,
    });
  };
  withdraw = () => {
    let amount = this.state.amount.trim();
    let vendor = this.state.vendor.trim();
    let category = this.state.category.trim();

    if (amount !== "" && vendor !== "" && category !== "") {
      let transaction = {
        amount: -amount,
        vendor,
        category,
      };
      this.props.addTransaction(transaction);
    } else alert("You must fill all field ");
  };

  deposit = () => {
    let amount = this.state.amount.trim();
    let vendor = this.state.vendor.trim();
    let category = this.state.category.trim();

    if (amount !== "" && vendor !== "" && category !== "") {
      let transaction = {
        amount,
        vendor,
        category,
      };
      this.props.addTransaction(transaction);
    } else alert("You must fill all field ");
  };

  render() {
    return (
      <div id="home-container">
        <table>
          <tr>
            <th>Amount</th>
            <th>Vendor</th>
            <th>Category</th>
          </tr>
          <tr>
            <td>
              <input
                type="number"
                placeholder="Amount"
                id="amount-input"
                onChange={this.updateAmountText}
                value={this.state.amount}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Vendor"
                id="vendor-input"
                onChange={this.updateVendorText}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Category"
                id="category-input"
                onChange={this.updateCategoryText}
              />
            </td>
          </tr>

          <tr>
            <td>
              <Link to="/transactions">
                <button onClick={this.withdraw}>Withdraw</button>
              </Link>
            </td>
            <td>
              <Link to="/transactions">
                <button onClick={this.deposit}>Deposit</button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Operations;
