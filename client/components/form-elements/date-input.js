import React from "react";
import "rc-calendar/assets/index.css";
import Calendar from "rc-calendar";
import DatePicker from "rc-calendar/lib/Picker";

import moment from "moment";

const now = moment();

const style = {
  append: {
    display: "flex",
    padding: "10px",
    border: "1px solid #e3e3e3"
  }
};

export default class DateInput extends React.Component {
  getFormat(time) {
    return time ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
  }

  disabledDate(current) {
    if (!this.props.disableDate) return false;
    if (!current) {
      return false;
    }
    const date = moment(this.props.disableDate);
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }

  render() {
    const defaultCalendarValue = now.clone();

    const calendar = (
      <Calendar
        style={{ zIndex: 1000 }}
        dateInputPlaceholder={this.props.placeholder || ""}
        formatter={this.getFormat()}
        defaultValue={defaultCalendarValue}
        disabledDate={this.disabledDate.bind(this)}
      />
    );

    return (
      <div className="form-group mb-0">
        {this.props.label && <label>{this.props.label}</label>}

        <DatePicker
          animation="slide-up"
          disabled={this.props.disabled}
          calendar={calendar}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {({ value }) => (
            <div className="input-group">
              <input
                required={this.props.required}
                ref={e => (this.input = e)}
                disabled={this.props.disabled}
                tabIndex="-1"
                className="form-control"
                value={value ? value.format(this.getFormat()) : ""}
                onChange={e => e}
              />
              <div className="input-group-append" style={style.append}>
                <i className="fa fa-calendar" style={{ color: "#a5adb8" }} />
              </div>
            </div>
          )}
        </DatePicker>
      </div>
    );
  }
}
