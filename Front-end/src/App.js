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
      categorys: [],
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
    const transactions = await axios.get("http://localhost:3001/transactions");
    const categorys = await this.getCategorys();
    this.setState({
      categorys: categorys.data,
      transactions: transactions.data,
    });
    this.getBalance();
  }

  componentDidMount() {
    this.getTransactions();
  }

  addTransaction = async (transaction) => {
    await axios.post("http://localhost:3001/transaction", transaction);
    this.getTransactions();
  };

  deletTransaction = async (id) => {
    await axios.delete(`http://localhost:3001/transaction/${id}`);
    this.getTransactions();
  };

  async getCategorys() {
    return axios.get("http://localhost:3001/categorys");
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="link">
            <Link to="/" className="real-link">
              Home
            </Link>
            <Link to="/transactions" className="real-link">
              Add Transaction
            </Link>
            <Link to="/categorys" className="real-link">
              Categorys
            </Link>
          </div>
          <Route
            path="/transactions"
            exact
            render={() => <Operations addTransaction={this.addTransaction} 
            balance={this.state.balance}
            />}
          />
          <Route
            path="/"
            exact
            render={() => (
              <Transactions
                transactions={this.state.transactions}
                deletTransaction={this.deletTransaction}
                balance={this.state.balance}
              />
            )}
          />
          <Route
            path="/categorys"
            exact
            render={() => (
              <Categorys
                categorys={this.state.categorys}
                balance={this.state.balance}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
