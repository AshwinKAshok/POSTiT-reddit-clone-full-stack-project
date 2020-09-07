import React from "react";
import {Link} from "react-router-dom";
import '../static/postRow.style.css'
import {findPersonById} from "../services/personService";
import {IsLoggedIn} from "../utility/SessionUtility";

class CommentRow extends React.Component {

    state = {
        comment: "",
        commentAuthor: "#",
        updateMode: false
    }

    componentDidMount() {

        findPersonById(this.props.commentPersonId)
            .then((response) => {
                this.setState({
                                  comment: this.props.comment,
                                  commentAuthor: response.username
                              })
            })
    }

    commentTextChangeHandler = (event) => {
        this.setState({
                          comment: event.target.value
                      })
    }

    toggleUpdateMode = () => {
        this.setState((prevState) => ({
            updateMode: !prevState.updateMode
        }))
    }

    render() {
        return (
            <div className="container list-group-item ">
                <div style={{"float": "left", "width" :"90%"}}>
                    {
                        !this.state.updateMode &&
                        <h4>{this.state.comment}</h4>
                    }

                    {
                        this.state.updateMode &&
                        <textarea style={{"width": "100"}}
                                  className={"form-control"}
                                  onChange={this.commentTextChangeHandler}
                                  value={this.state.comment}/>
                    }

                    <p>By:<Link
                        to={`/profile/${this.props.commentPersonId}`}>{this.state.commentAuthor}</Link>
                    </p>
                </div>

                {
                    IsLoggedIn() &&
                    (localStorage.getItem("uid") == this.props.commentPersonId) &&
                    <div style={{"float": "right"}}>
                        <button style={{"float": "right"}} className={"btn"} onClick={() => {
                            this.props.deleteComment(this.props.commentId);
                        }}><i className="fas fa-times"></i></button>
                    </div>

                }

                {
                    IsLoggedIn() &&
                    (localStorage.getItem("uid") == this.props.commentPersonId) &&
                    this.state.updateMode &&
                    <div style={{"float": "right"}}>
                        <button style={{"float": "right"}} className={"btn"} onClick={() => {
                            this.props.updateComment({"comment": this.state.comment},
                                                     this.props.commentId, this.props.index);
                            this.toggleUpdateMode();
                        }}><i className="fas fa-check"></i></button>
                    </div>
                }


                {
                    IsLoggedIn() &&
                    (localStorage.getItem("uid") == this.props.commentPersonId) &&
                    !this.state.updateMode &&
                    <div style={{"float": "right"}}>
                        <button style={{"float": "right"}} className={"btn"} onClick={() => {
                            this.toggleUpdateMode();
                        }}><i className="fas fa-pencil-alt"></i></button>
                    </div>
                }

            </div>
        );
    }
}

export default CommentRow;
