import React from 'react'
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap'

const SelectionForm = ({
    currencyBase, 
    currencyExchange,
    handleChangeCurrencyBase, 
    handleChangeCurrencyExchange, 
    availableCurrencies, 
    getExchangeRate
  }) => {
  
console.log(availableCurrencies)

    let options = availableCurrencies.map((availableCurrency) => {
            return (
                <option key={availableCurrency}  value={availableCurrency}>
                	{availableCurrency}
                </option>
            )
        }
    )

  return (
      <div>
          <InputGroup>
            <select onChange={handleChangeCurrencyBase()} value={currencyBase}>{options}</select>
            <select onChange={handleChangeCurrencyExchange()} value={currencyExchange}>{options}</select>
            <InputGroupButton>
              <Button onClick={getExchangeRate()}>
                View
              </Button>
            </InputGroupButton>
          </InputGroup>
      </div>
  )
}

export default SelectionForm
