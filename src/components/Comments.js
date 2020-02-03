import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CommentList(props) {
  const [errorLoading, setErrorLoading] = useState(false);
  const [inputs, setInputs] = useState({ message: "" });
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      setInputs({ message: "" });
      props.handleAddComment(inputs.message);
    }
  };
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    console.log("in use effect with: ", props.comments);

    if (!props.comments || props.comments.length === 0) {
      setErrorLoading(true);
    } else {
      setErrorLoading(false);
    }
  }, [props.comments]);

  const mstyle = {
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "#f2f2f2",
    width: "300px"
  };

  return (
    <div className="CommentList">
      <ul className="list-group align-items-center">
        {!errorLoading ? (
          props.comments
            .slice(0)
            .reverse()
            .map(({ id, username, message }) => (
              <div
                className="list-group-item list-group-item-action flex-column align-items-start active py-2"
                key={id}
                style={{
                  margin: "10px",
                  borderRadius: "40px",
                  width: "500px"
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{message}</h5>
                </div>
                <small className="mb-1">
                  <span role="img" aria-label="user">
                    &#128100;
                  </span>{" "}
                  {username}
                </small>
              </div>
            ))
        ) : (
          <p style={{ color: "grey" }}>{"No Comments"}</p>
        )}
      </ul>
      <div className="commentForm">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h1>Add Comment</h1>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <form className="border" style={mstyle} onSubmit={handleSubmit}>
            <textarea
              type="textarea"
              name="message"
              style={{ width: "250px" }}
              onChange={handleInputChange}
              value={inputs.message}
              required
            />
            <div>
              <button
                className="btn btn-outline-secondary"
                style={{ margin: "10px" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
