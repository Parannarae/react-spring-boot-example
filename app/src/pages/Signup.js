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
                    userName: userName,
                    password: password
                })
            }).then(result => {
                if (result.status === 200) {
                    this.context.setAuthTokens(result.data);
                    this.setState({ isLoggedIn: true });
                } else {
                    this.setState({ isError: true });
                }
            }).catch(e => {
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
            return <Redirect to='/' />
        }

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
