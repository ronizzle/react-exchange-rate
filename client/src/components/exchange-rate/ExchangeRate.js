import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import 'whatwg-fetch'
import querystring from 'querystring'
import SelectionForm from './SelectionForm'

class ExchangeRate extends Component {
    constructor(props) {
        super(props)

        this.state = {
          currencyBase: '',
          currencyExchange: '',
          availableCurrencies: [],
          exchangeRateData: {
            hasData: false
          }
        }

        this.handleChangeCurrencyBase = this.handleChangeCurrencyBase.bind(this)
        this.handleChangeCurrencyExchange = this.handleChangeCurrencyExchange.bind(this)
        this.getExchangeRate = this.getExchangeRate.bind(this)
        this.getHistory = this.getHistory.bind(this)
    }

    _constructUrl(path, options) {
        var url = this.props.baseUrl
        url += path + '?' + querystring.stringify(options)
        return url
    }

    handleChangeCurrencyBase(event) {
        this.setState({currencyBase: event.target.value, exchangeRateData: {hasData: false}});
    }

    handleChangeCurrencyExchange(event) {
        this.setState({currencyExchange: event.target.value, exchangeRateData: {hasData: false}});

    }

    getCurrencies() {
        let self = this
        let url = this._constructUrl('latest', {base: self.props.baseCurrency})
        
        fetch(url)
            .then(response => {
                return response.json()
            
            }).then(json => {
                json.rates[this.props.baseCurrency] = 1
                this.setState({
                    availableCurrencies: Object.keys(json.rates).sort()
                })

            }).catch(err => {
            
                console.log(err)
            
            })
    }

    getHistory() {

        this.setState({exchangeRateData: {hasData: false}},
            function() {


            });

    }

    getExchangeRate() {
        let self = this
        let url = this._constructUrl('latest', 
            {base: self.state.currencyBase, 
                symbols: self.state.currencyExchange})
        
        fetch(url)
            .then(response => {
                return response.json()
            
            }).then(json => {
                let self = this
                let exchangeRateData = {
                    hasData: true,
                    conversionRate: json.rates[self.state.currencyExchange]
                }
            
                this.setState({
                    exchangeRateData: exchangeRateData
                })

                console.log(json)

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
                          getHistory={() => this.getHistory}
                      />
                    </Col>
                </Row>
                {this.state.exchangeRateData.hasData &&
                    <Alert color="success">
                        1 <strong>{this.state.currencyBase}</strong> has a value of  
                        <strong> {this.state.exchangeRateData.conversionRate} {this.state.currencyExchange}</strong>
                    </Alert>
                }
            </Container>
        );
    }
}

export default ExchangeRate
