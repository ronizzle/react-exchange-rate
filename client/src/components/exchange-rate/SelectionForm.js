import React from 'react'
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap'

const SelectionForm = ({
    historyDate,
    currencyBase, 
    currencyExchange,
    handleChangeHistoryDate, 
    handleChangeCurrencyBase, 
    handleChangeCurrencyExchange, 
    availableCurrencies, 
    getExchangeRate,
    getHistory
  }) => {
  

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
            <select onChange={handleChangeCurrencyBase()} value={currencyBase} className="currency-picker">
              <option value="">--</option>
              {options}
            </select>

            <select onChange={handleChangeCurrencyExchange()} value={currencyExchange} className="currency-picker">
              <option value="">--</option>
              {options}
            </select>
            

            <InputGroupButton>
              <Button onClick={getExchangeRate()} color="primary">
                Latest
              </Button>
            </InputGroupButton>


            <input type="date" placeholder="YYYY-mm-dd" value={historyDate} onChange={handleChangeHistoryDate()}/>

            <InputGroupButton>
              <Button onClick={getHistory()} color="info">
                View History
              </Button>
            </InputGroupButton>
            
          </InputGroup>
      </div>
  )
}

export default SelectionForm
