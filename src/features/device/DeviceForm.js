import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { InputForm } from './InputForm'
import { OutputForm } from './OutputForm'

import {
    selectDevice,
    addDevice,
    updateDevice,
} from './devicesSlice'

export function DeviceForm (props) {
    const { id, done = () => {} } = props;
    const newDevice = !id;
    // eslint-disable-next-line
    const device = useSelector(selectDevice(id)) || {}
    const [deviceData, setDeviceData] = useState(device)
    const dispatch = useDispatch()

    useEffect(() => {
        if (device.id !== deviceData.id) {
            setDeviceData(device)
        }
    }, [device, deviceData.id])

    const handleChange = (e) => {
        const newVal = e.target.value
        setDeviceData({
            ...deviceData,
            [e.target.name]: newVal
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!deviceData.id) {
            dispatch(addDevice(deviceData))
        } else {
            dispatch(updateDevice(deviceData))
        }
        done()
    }

    const handleCancel = (e) => {
        e.preventDefault()
        done()
    }

    return (
        <form onSubmit={ handleSubmit }>
            <fieldset>
                <legend>{ newDevice ? "New Device" : device.name }</legend>
                <div className="device-fields">
                    <label>Name <input name="name" value={ deviceData.name } onChange={ handleChange } placeholder="Device name" required={ true } /></label>
                    <label>Label <input name="label" value={ deviceData.label } onChange={ handleChange } placeholder="Optional: Short label (i.e. Mixer)" /></label>
                </div>
                <InputForm deviceData={ deviceData } setDeviceData={ setDeviceData } />
                <OutputForm deviceData={ deviceData } setDeviceData={ setDeviceData } />
                <input type="submit" value="Save" />
                <button onClick={ handleCancel }>Cancel</button>
            </fieldset>
        </form>
    )
}
