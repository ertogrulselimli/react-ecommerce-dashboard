/**
 * Created by Artoghrul Salimli on 4/17/2019.
 */

import React from 'react'
import {injectIntl} from 'react-intl'
import {Field,} from 'formik'
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";


//////..............................................Number input .............................................................../////////////////
export function TgNumberInput(props) {
    let {
        divClassName,
        labelClassName,
        intlMessageId,
        intlDefaultMessage,
        fieldClassName,
        fieldName,
        fieldErrorMessage,
        ...others
    }=props;

    return (
        <div className={divClassName||'form-group'}>
        <label className={labelClassName||'control-label'}>
            {props.intl.formatMessage({
                id:intlMessageId,
                defaultMessage:intlDefaultMessage
            })}
        </label>
        <Field
            {...others}
            type="number"
            className={fieldClassName||'form-control'}
            name={fieldName}
        />
            <FieldsErrorMessages messages={fieldErrorMessage}/>
    </div>
    );
}



//....................................................Text input ..........................................................................
export function TgTextInput (props) {
    let {divClassName,
        labelClassName,
        intlMessageId,
        intlDefaultMessage,
        fieldClassName,
        fieldName,
        fieldErrorMessage,
        ...others
          } =props;

    return (
        <div className={divClassName||'form-group'}>
            <label className={labelClassName||'control-label'}>
                {props.intl.formatMessage({
                    id:intlMessageId,
                    defaultMessage:intlDefaultMessage
            })}
            </label>
            <Field
                {...others}
                type="text"
                className={fieldClassName||'form-control'}
                name={fieldName}
            />
               <FieldsErrorMessages messages={fieldErrorMessage}/>
        </div>
    );
}

///.......................................................Checkbox input.......................................................................
export function TgCheckboxInput(props) {

    let {
        divClassName,
        fieldClassName,
        labelClassName,
        intlMessageId,
        intlDefaultMessage,
        fieldName,
        id,
        checked,
        fieldErrorMessage,
        ...others
         }=props;

    return (
        <div className={divClassName||'form-check'}>
            <Field
                {...others}
                type="checkbox"
                className={fieldClassName||'form-check-input'}
                name={fieldName}
                id={id}
                checked={checked}

            />
            <label className={labelClassName||'form-check-label'} htmlFor={id}>
                {props.intl.formatMessage({
                    id:intlMessageId,
                    defaultMessage:intlDefaultMessage
                })}
            </label>
            <FieldsErrorMessages messages={fieldErrorMessage}/>
        </div>
    )
}


export function TgStaticSelect(props) {

    let {
        divClassName,
        fieldClassName,
        labelClassName,
        intlMessageId,
        intlDefaultMessage,
        fieldName,
        fieldErrorMessage,
        ...others
    }=props;

    return (
    <div className={divClassName||"form-group"}>
        <label className={labelClassName||"control-label"}>
            {props.intl.formatMessage({
                id:intlMessageId,
                defaultMessage:intlDefaultMessage
            })}
        </label>
        <Field component="select" name={fieldName} className={fieldClassName||"form-control"} {...others}>
            {
                props.options.map((o) => {
                  return <option key={o.value} value={o.value}>{o.label}</option>
                })
            }
        </Field>
            <FieldsErrorMessages messages={fieldErrorMessage}/>
        </div>
    )
}

export const MXTextInput=injectIntl(TgTextInput);
export const MXCheckboxInput=injectIntl(TgCheckboxInput);
export const MXNumberInput =injectIntl(TgNumberInput);
export const MXStaticSelectInput=injectIntl(TgStaticSelect);
