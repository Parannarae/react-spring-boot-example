import React from 'react';
import '../css/App.css';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import PixelComponent, { pixelEvent } from '../FBPixel'

class Home extends PixelComponent {
    
    componentDidMount() {
        this.initPixel();
        pixelEvent.pageView();
    }
    
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;
