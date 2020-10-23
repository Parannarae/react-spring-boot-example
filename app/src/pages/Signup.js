import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logoImg from '../logo.svg';
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForms';
import { AuthContext } from '../context/auth';

class Signup extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isError: false,
            userName: '',
            password: '',
            confirmedPassword: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const key = target.name;
        const value = target.value;
        this.setState({ [key]: value });
    }

    async signUp() {
        const { userName, password, confirmedPassword } = this.state;
        if ( password === confirmedPassword ) {
            await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userName,
                    password: password
                })
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status;
                }
            }).then(
                data => {
                    this.context.setAuthTokens(data.token);
                    this.setState({ isLoggedIn: true });
                }
            ).catch(e => {
                this.setState({ isError: true });
            });
        } else {
            // TODO: different error message
            this.setState({ isError: true });
        }
    }

    render() {
        const { isLoggedIn, isError, userName, password, confirmedPassword } = this.state;
        if (isLoggedIn) {
            return <Redirect to='/groups' />
        }

        // TODO: use reactstrap
        // TODO: redirect to previous page when signed in
        return (
            <Card>
                <Logo src={logoImg} />
                <Form>
                    <Input type='email' name='userName' placeholder='email' value={userName} onChange={this.handleChange} />
                    <Input type='password' name='password' placeholder='password' value={password} onChange={this.handleChange} />
                    <Input type='password' name='confirmedPassword' placeholder='password again' value={confirmedPassword} onChange={this.handleChange} />
                    <Button onClick={this.signUp}>Sign Up</Button>
                </Form>
                { isError && <Error>The username or password provided were incorrect!</Error>}
                <Link to='/login'>Already have an account?</Link>
            </Card>
        );
    }
}

export default Signup;
