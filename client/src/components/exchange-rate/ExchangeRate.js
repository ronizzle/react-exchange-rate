import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import 'whatwg-fetch'
import querystring from 'querystring'
import SelectionForm from './SelectionForm'

class ExchangeRate extends Component {
    constructor(props) {
        super(props)

        this.state = {
          currencyBase: props.baseCurrency,
          currencyExchange: '',
          availableCurrencies: []
        }

        this.handleChangeCurrencyBase = this.handleChangeCurrencyBase.bind(this)
        this.handleChangeCurrencyExchange = this.handleChangeCurrencyExchange.bind(this)
        this.getExchangeRate = this.getExchangeRate.bind(this)
    }

    _constructUrl(path, options) {
        var url = this.props.baseUrl
        url += path + '?' + querystring.stringify(options)
        return url
    }

    handleChangeCurrencyBase(event) {
        this.setState({currencyBase: event.target.value});

    }

    handleChangeCurrencyExchange(event) {
        this.setState({currencyExchange: event.target.value});

    }

    getExchangeRate() {

    }

    getCurrencies() {
        let self = this
        let url = this._constructUrl('latest', {base: self.props.baseCurrency})
        
        fetch(url)
            .then(response => {
                return response.json()
            
            }).then(json => {
                json.rates[this.state.currencyBase] = 1
                this.setState({
                    availableCurrencies: Object.keys(json.rates)
                })

            }).catch(err => {
            
                console.log(err)
            
            })
    }

    componentWillMount() {

        this.getCurrencies()
    }


    render() {
        return (
            <Container className="file-path-input">
                <Row>
                    <Col>
                      <SelectionForm
                          currencyBase={this.state.currencyBase}
                          currencyExchange={this.state.currencyExchange}
                          availableCurrencies={this.state.availableCurrencies}
                          handleChangeCurrencyBase={() => this.handleChangeCurrencyBase}
                          handleChangeCurrencyExchange={() => this.handleChangeCurrencyExchange}
                          getExchangeRate={() => this.getExchangeRate}
                      />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ExchangeRate
