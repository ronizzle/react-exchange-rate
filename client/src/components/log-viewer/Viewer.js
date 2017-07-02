import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import 'whatwg-fetch'
import querystring from 'querystring'
import Display from './Display'
import FilePathForm from './FilePathForm'
import Pagination from './Pagination'

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 1,
            lastPageOffset: 1,
            limit: 10,
            lines: [],
            hasError: false,
            errorMessage: '',
            filePath: './storage/file-03.log'
        };
        this.resetSearch = this.resetSearch.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.handleFilePathChange = this.handleFilePathChange.bind(this);
    }

    _constructOptions() {
        var options = {}
        var self = this
        options.body = {
            filePath: self.state.filePath,
            offset: self.state.offset,
            limit: self.state.limit
        }

        return options
    }

    _constructUrl(options) {
        var url = this.props.baseUrl
        url += 'logs/?' + querystring.stringify(options.body)
        return url
    }


    resetSearch() {

        this.setState({
            lines: [],
            offset: 1
        }, function () {
            this.loadItems()
        })


    }

    lastPage() {

        this.setState({
            lines: [],
            offset: this.state.lastPageOffset
        }, function () {
            this.loadItems()
        })


    }

    nextPage() {
        if (this.state.lines.length < this.state.limit) {
            return
        }

        this.setState({
            lines: [],
            offset: this.state.offset + this.state.limit
        }, function () {
            this.loadItems()
        })

    }

    prevPage() {
        this.setState({
            offset: this.state.offset - this.state.limit
        }, function () {
            if (this.state.offset >= 1) {
                this.loadItems()
            } else {
                this.setState({
                    offset: 1
                })
            }
        })
    }

    loadItems() {
        let options = this._constructOptions()
        let url = this._constructUrl(options)
        fetch(url)
            .then(response => {
                return response.json()
            }).then(json => {
                if (json.status == "success") {
                    this.setState({
                        lines: json.lines,
                        lastPageOffset: json.lastPageOffset,
                        hasError: false

                    })
                } else {

                    this.setState({
                        lines: [],
                        lastPageOffset: 1,
                        errorMessage: json.message,
                        hasError: true

                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    handleFilePathChange(event) {
        this.setState({filePath: event.target.value});
    }


    render() {
        return (
            <Container className="file-path-input">

                <Row>
                    <Col>
                        <FilePathForm
                            resetSearch={() => this.resetSearch}
                            handleFilePathChange={() => this.handleFilePathChange}
                            filePath={this.state.filePath}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Display lines={this.state.lines}/>
                    </Col>
                </Row>
                {this.state.lines.length > 0 &&
                <Row>
                    <Col>
                        <Pagination
                            resetSearch={() => this.resetSearch}
                            prevPage={() => this.prevPage}
                            nextPage={() => this.nextPage}
                            lastPage={() => this.lastPage}
                            />
                    </Col>
                </Row>
                }

                {this.state.hasError &&
                <Alert color="danger">
                    <strong>Error encountered</strong> {this.state.errorMessage}

                </Alert>
                }
            </Container>
        );
    }
}

export default Viewer