import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            success
            result
            email
            password
        }
    }
`;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return(

            <Mutation mutation={LOGIN} onCompleted={(e) => {
                const {success, result, email, password} = e.login;
                if(success=== "false") {
                    this.setState({
                        error: result
                    })
                    return;
                }
                else {
                    this.props.history.push(`/list`)
                }
            }}>
            {(login, { loading, error }) => (
            <>
                <h1>Log In</h1>
                <form onSubmit = { e => {
                    e.preventDefault();
                    login({ variables: { email: this.state.email, password: this.state.password} });
                }}>
                    <div className="auth-form1">
                        <input className="form-input1" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                        <input className="form-input1" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        
                        <div><span style={{ color: "red" }}>{this.state.error || ""}</span></div>
        
                        <input className="form-submit1" style={{marginRight: 30}} type="submit" value="Login" />
                        Aren't you a member? <a href="/signup">Sign up</a>
                    </div>    
                </form>
            </>
            )}
            </Mutation>
        )
    }

}

export default Login;