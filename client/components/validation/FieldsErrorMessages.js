import React from 'react'

const FieldsErrorMessages = function (props) {

    if(!props.messages || props.messages.length<1) return null

    return (
        <p style={{fontSize: '12px', paddingTop: '4px'}} className="text-left">
            {
                props.messages.map((msg,key)=>(
                    <span className="text-danger" key={key}>{ msg }<br/></span>
                ))
            }
        </p>
    )
}

export default FieldsErrorMessages