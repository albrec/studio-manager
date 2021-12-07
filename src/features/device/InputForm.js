import React from 'react'
import { v4 as uuidv4 } from 'uuid'


export function InputForm (props) {
    const { deviceData, setDeviceData } = props
    const inputs = deviceData.inputs || []

    const onChangeInput = (e, i) => {
        const newInputs = [...inputs]
        newInputs[i] = {
            ...inputs[i],
            [e.target.name]: e.target.value,
        }
        setDeviceData({
            ...deviceData,
            inputs: newInputs,
        })
    }

    const onChangeCheckbox = (e, i) => {
        const newInputs = [...inputs]
        newInputs[i] = {
            ...inputs[i],
            [e.target.name]: e.target.checked,
        }
        setDeviceData({
            ...deviceData,
            inputs: newInputs,
        })
    }

    const onNewInput = (e) => {
        e.preventDefault()
        setDeviceData({
            ...deviceData,
            inputs: (inputs || []).concat({ id: uuidv4() }),
        })
    }

    const onDelete = (e, i) => {
        e.preventDefault()
        inputs.splice(i, 1)
        setDeviceData({
            ...deviceData,
            inputs,
        })
    }

    return (
        <fieldset>
            <legend>Inputs</legend>
            { inputs.length < 1 ? (
                <div>No inputs defined</div>
            ) : (
                <ol>
                    { inputs.map((input, i) => (
                        <li key={ `${deviceData.id}-input-${i}` }>
                            <input name="name" value={ input.name } placeholder="Input name" onChange={ (e) => onChangeInput(e, i) } required={ true } />
                            <label>Stereo <input name="stereo" checked={ !!input.stereo } type="checkbox" onChange={ (e) => onChangeCheckbox(e, i) } /></label>
                            <label>Balanced <input name="balanced" checked={ !!input.balanced } type="checkbox" onChange={ (e) => onChangeCheckbox(e, i) } /></label>
                            <button onClick={ (e) => onDelete(e, i) }>Delete</button>
                        </li>
                    ))}
                </ol>
            ) }
            
            <button onClick={ onNewInput }>Add Input</button>
        </fieldset>
    )
}