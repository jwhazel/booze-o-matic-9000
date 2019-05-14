import React from 'react';
import './header.css';

class Header extends React.Component{
    render(){
        return(
            <section className="header gradient">
                <h1>🍷 Bar-o-matic 9000 🍺</h1>
                <h2>The random bar generator for Louisville, KY</h2>
            </section>
        )
    }
}


export default Header;