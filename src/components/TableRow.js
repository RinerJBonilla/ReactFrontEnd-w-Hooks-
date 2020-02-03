import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Confirm from "./Confirm";
import "@reach/dialog/styles.css";
import Cookie from "js-cookie";

class TableRow extends Component {
  constructor(props) {
    super(props);
    //this.delete = this.delete.bind(this);
  }

  delete = () => {
    let head = {
      headers: {
        authtoken: Cookie.get("token")
      }
    };
    console.log("delete", this.props.obj.id);
    Axios.delete("http://10.102.1.119:4001/posts/" + this.props.obj.id, head)
      .then(this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.description}</td>
        <td>
          <Link to={"/show/" + this.props.obj.id} className="btn btn-primary">
            View
          </Link>
        </td>
        <td>
          <Link
            to={"/edit/" + this.props.obj.id}
            className="btn btn-outline-secondary"
          >
            Edit
          </Link>
        </td>
        <td>
          <Confirm title="Confirm" description="Are you sure?">
            {confirm => (
              <form onSubmit={confirm(this.delete)}>
                <p>
                  <button className="btn btn-danger">Delete</button>
                </p>
              </form>
            )}
          </Confirm>
        </td>
      </tr>
    );
  }
}

export default TableRow;