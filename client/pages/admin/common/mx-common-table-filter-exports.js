/**
 * Created by Administrator on 4/7/2019.
 */
import React from "react";
import SelectFilter from "../../../components/react-table/select-filter";
import MXTextFilterInput from "./mx-text-filter-input";
import DateInput from "../../../components/form-elements/date-input";

export const SimpleSelectFilter = props => {
  return (
    <SelectFilter
      {...props}
      isClearable={false}
      options={[
        { value: "YES", label: "yes" },
        { value: "NO", label: "no" },
        { value: "ALL", label: "all" }
      ]}
    />
  );
};

export const SimpleTextInput = props => {
  return (
    <MXTextFilterInput
      onChange={props.onChange}
      value={props.filter ? props.filter.value : null}
      timeout={10}
    />
  );
};

export const SimpleNumberInput = props => {
  return (
    <MXTextFilterInput
      onChange={props.onChange}
      value={props.filter ? props.filter.value : null}
      type="number"
      timeout={10}
    />
  );
};

export const SimpleStartDateInput = props => {
  return (
    <DateInput
      value={props.filter ? props.filter.startDate : null}
      onChange={date => {
          console.log(date);
          props.onChange(props.filter.startDate, date)
      }}
    />
  );
};

export const SimpleEndDateInput = props => {
    return (
        <DateInput
            value={props.filter ? props.filter.value : null}
            onChange={props.onChange}
        />
    );
};