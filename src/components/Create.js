import React, { Component } from "react";
import Axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      content: "",
      editorState: EditorState.createEmpty(),
      error: false,
      message: ""
    };
  }

  onEditorStateChange = event => {
    const cont = draftToHtml(convertToRaw(event.getCurrentContent()));
    console.log(cont);
    this.setState({ editorState: event, content: cont });
  };

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    var userid = jwt.decode(Cookie.get("token"));

    const obj = {
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      userid: userid.id
    };
    let head = {
      headers: {
        authtoken: Cookie.get("token")
      }
    };

    try {
      const response = await Axios.post(
        "http://10.102.1.119:4001/posts",
        obj,
        head
      );
      console.log(response.data);
      this.setState({
        title: "",
        description: "",
        content: "",
        editorState: EditorState.createEmpty()
      });
      this.props.history.push("/list");
    } catch (error) {
      return this.setState({
        error: error ? 1 : 0,
        message: error.response.data.message
          ? error.response.data.message
          : error.response.data.error
      });
    }
  }

  render() {
    const { editorState, error } = this.state;
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Post</h3>
        <form error={error ? 1 : 0}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <div className="form-group">
            <button
              onClick={this.onSubmit}
              className="btn btn-outline-secondary"
              type="button"
            >
              Create
            </button>
          </div>
        </form>
        <div className="container mb-3">
          <div className="d-flex justify-content-center mb-3">
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {this.state.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}