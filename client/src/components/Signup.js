import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNUP = gql`
    mutation register( $email: String!, $password: String!) {
        register(email: $email, password: $password) {
            _id
        }
    }
`;

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <Mutation mutation={SIGNUP} onCompleted={() => this.props.history.push(`/`)}>
                {(register, { loading, error }) => (
                    <>
                        <h1>Sign Up</h1>
                        <form onSubmit = {e => {
                            e.preventDefault();
                            register({ variables: { email: this.state.email, password: this.state.password} });
                        }}>
                            <div className="auth-form1">
                                <input className="form-input1" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                <input className="form-input1" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                
                                <div><span style={{ color: "red" }}>{this.error || ""}</span></div>
                
                                No account? <a href="/">Login</a>
                                <input className="form-submit1" style={{marginLeft: 30}} type="submit" value="Register" />
                            </div>    
                        </form>
                    </>
                )}
            </Mutation>
        )
    }

}

export default Signup;