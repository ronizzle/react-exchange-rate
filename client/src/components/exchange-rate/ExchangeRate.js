import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import 'whatwg-fetch'
import querystring from 'querystring'
import SelectionForm from './SelectionForm'

class ExchangeRate extends Component {
    constructor(props) {
        super(props)

        this.state = {
          historyDate: '',
          currencyBase: '',
          currencyExchange: '',
          availableCurrencies: [],
          exchangeRateData: {
            hasData: false,
            hasError: false
          },
          currencyHistoryData: {
            hasData: false,
            hasError: false
          }
        }

        this.handleChangeHistoryDate = this.handleChangeHistoryDate.bind(this)
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

    handleChangeHistoryDate(event) {
        this.setState({
            historyDate: event.target.value, 
            exchangeRateData: {hasData: false, hasError: false}, 
            currencyHistoryData: {hasData: false, hasError: false}
        })
    }

    handleChangeCurrencyBase(event) {
        this.setState({
            currencyBase: event.target.value,
            exchangeRateData: {hasData: false, hasError: false}, 
            currencyHistoryData: {hasData: false, hasError: false}
        })
    }

    handleChangeCurrencyExchange(event) {
        this.setState({
            currencyExchange: event.target.value,
            exchangeRateData: {hasData: false, hasError: false}, 
            currencyHistoryData: {hasData: false, hasError: false}
        })

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

        let self = this
        let url = this._constructUrl(self.state.historyDate, {base: self.state.currencyBase})
        
        fetch(url)
            .then(response => {
                return response.json()
            
            }).then(json => {
                console.log(json)

            }).catch(err => {
            
                console.log(err)
            
            })

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


            }).catch(err => {
            
                this.setState({
                    exchangeRateData: {hasData: false, hasError: true}, 
                    currencyHistoryData: {hasData: false, hasError: false}
                })
            
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
                          historyDate={this.state.historyDate}
                          currencyBase={this.state.currencyBase}
                          currencyExchange={this.state.currencyExchange}
                          availableCurrencies={this.state.availableCurrencies}
                          handleChangeCurrencyBase={() => this.handleChangeCurrencyBase}
                          handleChangeCurrencyExchange={() => this.handleChangeCurrencyExchange}
                          handleChangeHistoryDate={() => this.handleChangeHistoryDate}
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
                {this.state.exchangeRateData.hasError &&
                    <Alert color="danger">
                        <strong>There was an error loading the exchange rate.</strong> Please try again.
                    </Alert>
                }
            </Container>
        );
    }
}

export default ExchangeRate
