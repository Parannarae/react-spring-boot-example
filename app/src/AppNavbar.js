import React, { Component } from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/auth';

export default class AppNavbar extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
        this.logInOutButton = this.logInOutButton.bind(this);
    }
    
    logInOutButton() {
        const { authTokens } = this.context;
        if (authTokens) {
            return <Button onClick={() => this.context.unSetAuthTokens()}>Log out</Button>
        } else {
            return <Button tag={Link} to="/login">Log In</Button>
        }
    }
            
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {this.logInOutButton()}
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Parannarae">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    }
}
