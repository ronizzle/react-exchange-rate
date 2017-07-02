import React, { Component } from 'react'
import Header from './components/header/Header'
import ExchangeRate from './components/exchange-rate/ExchangeRate'
import './App.css'

let baseUrl  = 'https://api.fixer.io/'
let baseCurrency  = 'USD'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <ExchangeRate baseUrl={baseUrl} baseCurrency={baseCurrency} />
            </div>
        );
    }
}

export default App 