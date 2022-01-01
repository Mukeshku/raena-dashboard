import React from "react";
import classNames from "classnames";
import {
    InputGroup,
    DatePicker,
    InputGroupAddon,
    InputGroupText
} from "shards-react";

import "../../assets/css/range-date-picker.css";
import {Col, Row,} from "reactstrap";

class RangeDatePicker extends React.Component {
    DATE_FORMAT = 'dd-MM-yyyy';

    constructor(props) {
        super(props);

        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
            onDateChange: props.onDateChange
        };


        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    sendCallback(startDate, endDate) {
        if (this.state.onDateChange) {
            this.state.onDateChange(startDate, endDate);
        }
    }

    handleStartDateChange(value) {
        const startDate = new Date(value);
        const endDate = this.state.endDate;
        this.setState({
            ...this.state,
            ...{startDate}
        });

        //send callback if required.
        this.sendCallback({startDate, endDate});
    }

    handleEndDateChange(value) {
        const endDate = new Date(value);
        const startDate = this.state.startDate;
        this.setState({
            ...this.state,
            ...{endDate}
        });

        //send callback if required.
        this.sendCallback({startDate, endDate});
    }

    render() {
        const {className} = this.props;
        const classes = classNames(className, "d-flex", "my-auto", "date-range");

        return (
            <Row>
                <Col md="3">
                    <span>Start Date &nbsp; </span>
                    <DatePicker
                        size="sm"
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        dropdownMode="select"
                        className="text-center"
                        dateFormat={this.DATE_FORMAT}
                        maxDate={new Date()}
                    />

                </Col>
                <Col md="3">
                    <span>End Date &nbsp; </span>
                    <DatePicker
                        size="sm"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        dropdownMode="select"
                        className="text-center"
                        dateFormat={this.DATE_FORMAT}
                        maxDate={new Date()}
                    />
                </Col>
            </Row>
        );
    }
}

export default RangeDatePicker;
