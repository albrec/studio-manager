import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {
    selectDevice,
    addDevice,
    updateDevice,
} from './devicesSlice'

export function DeviceForm (props) {
    const { id, done = () => {} } = props;
    const newDevice = !id;
    const device = useSelector(selectDevice(id)) || {}

    const [deviceData, setDeviceData] = useState(device)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const newVal = e.target.value.trim()
        console.log('change', newVal, {
            ...deviceData,
            [e.target.name]: newVal
        })
        setDeviceData({
            ...deviceData,
            [e.target.name]: newVal
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!deviceData.id) {
            console.info('Add Device', deviceData)
            dispatch(addDevice(deviceData))
        } else {
            console.info('Update Device', deviceData)
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
                <input name="name" value={ deviceData.name } onChange={ handleChange } placeholder="Device name" />
                <input name="label" value={ deviceData.label } onChange={ handleChange } placeholder="Optional: Short label (i.e. Mixer)" />
                <button>Save</button>
                <button onClick={ handleCancel }>Cancel</button>
            </fieldset>
        </form>
    )
}
