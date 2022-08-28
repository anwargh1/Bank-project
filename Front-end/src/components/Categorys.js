import axios from "axios";
import React, { Component } from "react";

class Categorys extends Component {
  constructor() {
    super();
    this.state = {
      categorys: [],
    };
  }

  async getCategorys() {
    return axios.get("http://localhost:3001/categorys");
  }

  async componentDidMount() {
    const response = await this.getCategorys();
    console.log(response.data);
    this.setState({ categorys: response.data });
  }

  render() {
    let categorys = this.state.categorys;
    return (
      <div className="categorysBalance">
        {categorys.map((c) => (
          <div>
            <table>
              <tr>
                <th>{c._id}</th> <td>{c.totalSum}</td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default Categorys;
