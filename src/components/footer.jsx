import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer" style={{marginTop: "50px"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <a href="#">Impressum</a>
                </div>
            </footer>
        );
    }
}

export default Footer;