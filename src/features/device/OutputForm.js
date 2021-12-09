import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { arrayMoveImmutable } from 'array-move'

export function OutputForm (props) {
    const { deviceData, setDeviceData } = props
    const outputs = deviceData.outputs || []

    const onChange = (e, i) => {
        const newOutputs = [...outputs]
        newOutputs[i] = {
            ...outputs[i],
            [e.target.name]: e.target.value,
        }
        setDeviceData({
            ...deviceData,
            outputs: newOutputs,
        })
    }

    const onChangeCheckbox = (e, i) => {
        const newOutputs = [...outputs]
        newOutputs[i] = {
            ...outputs[i],
            [e.target.name]: e.target.checked,
        }
        setDeviceData({
            ...deviceData,
            outputs: newOutputs,
        })
    }

    const onNewOutput = (e) => {
        e.preventDefault()
        setDeviceData({
            ...deviceData,
            outputs: (outputs || []).concat({ id: uuidv4() }),
        })
    }

    const onDelete = (e, i) => {
        e.preventDefault()
        outputs.splice(i, 1)
        setDeviceData({
            ...deviceData,
            outputs,
        })
    }

    const onShiftUp = (e, i) => {
        e.preventDefault()
        setDeviceData({
            ...deviceData,
            outputs: arrayMoveImmutable(outputs, i, i - 1)
        })
    }

    const onShiftDown = (e, i) => {
        e.preventDefault()
        setDeviceData({
            ...deviceData,
            outputs: arrayMoveImmutable(outputs, i, i + 1)
        })
    }

    return (
        <fieldset>
            <legend>Outputs</legend>
            { outputs < 1 ? (
                <div>No outputs defined</div>
            ) : (
                <ol>
                    { outputs.map((output, i) => (
                        <li key={ `${deviceData.id}-input-${i}` }>
                            <input name="name" value={ output.name || "Output" } placeholder="Output name" onChange={ (e) => onChange(e, i) } required={ true } />
                            <label>Balanced <input name="balanced" checked={ !!output.balanced } type="checkbox" onChange={ (e) => onChangeCheckbox(e, i) } /></label>
                            <button onClick={ (e) => onDelete(e, i) } className="btn-link">Delete</button>
                            <div className="arrows">
                                <button className="btn-link" onClick={(e) => onShiftUp(e, i) }>˄</button>
                                <button className="btn-link" onClick={(e) => onShiftDown(e, i) }>˅</button>
                            </div>
                        </li>
                    ))}
                </ol>
            )}

            <button onClick={ onNewOutput }>Add Output</button>
        </fieldset>
    )
}