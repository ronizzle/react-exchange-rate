import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';


const Pagination = ({resetSearch, prevPage, nextPage, lastPage}) => {
    return (
        <div className="Pagination-container">
            <ButtonGroup>
                <Button size="lg" onClick={resetSearch()}>&#xab;</Button>
                <Button size="lg" onClick={prevPage()}>&#x2039;</Button>
                <Button size="lg" onClick={nextPage()}>&#x203A;</Button>
                <Button size="lg" onClick={lastPage()}>&#xbb;</Button>
            </ButtonGroup>
        </div>
    )
}

export default Pagination