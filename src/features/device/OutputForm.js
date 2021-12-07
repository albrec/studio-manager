import React from 'react'

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
            outputs: (outputs || []).concat({}),
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

    return (
        <fieldset>
            <legend>Outputs</legend>
            { outputs < 1 ? (
                <div>No outputs defined</div>
            ) : (
                <ol>
                    { outputs.map((output, i) => (
                        <li key={ `${deviceData.id}-input-${i}` }>
                            <input name="name" value={ output.name } placeholder="Output name" onChange={ (e) => onChange(e, i) } required={ true } />
                            <label>Stereo <input name="stereo" checked={ !!output.stereo } type="checkbox" onChange={ (e) => onChangeCheckbox(e, i) } /></label>
                            <label>Balanced <input name="balanced" checked={ !!output.balanced } type="checkbox" onChange={ (e) => onChangeCheckbox(e, i) } /></label>
                            <button onClick={ (e) => onDelete(e, i) }>Delete</button>
                        </li>
                    ))}
                </ol>
            )}

            <button onClick={ onNewOutput }>Add Output</button>
        </fieldset>
    )
}