import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Categorys from "./components/Categorys";
import Operations from "./components/Operations";
import Transactions from "./components/Transactions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      balance: 0,
    };
  }

  getBalance = () => {
    let currentBalance = 0;
    this.state.transactions.forEach((t) => {
      currentBalance += t.amount;
    });
    this.setState({
      balance: currentBalance,
    });
  };

  async getTransactions() {
    return axios.get("http://localhost:3001/transactions");
  }

  async componentDidMount() {
    const response = await this.getTransactions();
    this.setState({ transactions: response.data });
    this.getBalance();
  }

  addTransaction = async (transaction) => {
    let transactions = await axios.post(
      "http://localhost:3001/transaction",
      transaction
    );
    await this.setState({
      transactions: transactions.data,
    });
    this.getBalance();
  };

  deletTransaction = async (id) => {
    let transactions = await axios.delete(
      `http://localhost:3001/transaction/${id}`
    );
    await this.setState({
      transactions: transactions.data,
    });
    this.getBalance();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="link">
            <Link to="/transactions" className="real-link">
              Home
            </Link>
            <Link to="/" className="real-link">
              Add Transaction
            </Link>
            <Link to="/categorys" className="real-link">
              Categorys
            </Link>
          </div>
          <Route
            path="/"
            exact
            render={() => <Operations addTransaction={this.addTransaction} />}
          />
          <Route
            path="/transactions"
            exact
            render={() => (
              <Transactions
                transactions={this.state.transactions}
                deletTransaction={this.deletTransaction}
                balance={this.state.balance}
              />
            )}
          />
          <Route path="/categorys" exact render={() => <Categorys />} />
        </div>
      </Router>
    );
  }
}

export default App;
