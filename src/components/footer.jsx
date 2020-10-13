import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer" style={{marginTop: "50px"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <a href="https://www.hs-pforzheim.de/kontakt/impressum">Impressum</a>
                </div>
            </footer>
        );
    }
}

export default Footer;