import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectDevicesSorted,
    removeDevice,
    shiftUp,
    shiftDown,
} from './devicesSlice';

import { DeviceForm } from './DeviceForm';

import './Devices.scss'

export function Devices() {
    const dispatch = useDispatch()

    const devices = useSelector(selectDevicesSorted);
    const deviceCount = devices.length

    const [addingDevice, setAddingDevice] = useState(false)
    const [editingDevice, setEditingDevice] = useState(false)

    const openForm = (id) => {
        closeForm()
        if (id) {
            setEditingDevice(id)
        } else {
            setAddingDevice(true)
        }
    }

    const closeForm = () => {
        setAddingDevice(false)
        setEditingDevice(false)
    }

    return (
        <section className="Devices">
            <h2>Devices ({deviceCount})</h2>
            {deviceCount === 0 ? (
                <div>No devices defined</div>
            ) : (
                <ul>
                    {devices.map(device => (
                        <li key={device.id}>
                            <div><strong>{device.name}</strong> | Inputs: {device.inputs?.length || 0} | Outputs: {device.outputs?.length || 0}</div>
                            <button onClick={(e) => openForm(device.id)} className="btn-link">Edit</button>
                            <button onClick={(e) => dispatch(removeDevice(device))} className="btn-link">Delete</button>
                            <div className="arrows">
                                <button className="btn-link" onClick={(e) => dispatch(shiftUp(device))}>˄</button>
                                <button className="btn-link" onClick={(e) => dispatch(shiftDown(device))}>˅</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {addingDevice && (
                <DeviceForm done={closeForm} />
            )}
            {editingDevice && (
                <DeviceForm id={editingDevice} done={closeForm} />
            )}

            {(!addingDevice && !editingDevice) && <button onClick={(e) => openForm()}>New Device</button>}
        </section>
    )
}