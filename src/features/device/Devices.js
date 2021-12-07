import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDevices,
  removeDevice,
} from './devicesSlice';

import { DeviceForm } from './DeviceForm';

export function Devices () {
    const dispatch = useDispatch()

    const devices = useSelector(selectDevices);
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
        <section>
            <h2>Devices ({ deviceCount })</h2>
            { deviceCount === 0 ? (
                <div>No devices defined</div>
            ) : (
                <ul>
                    { devices.map(device => (
                        <li key={ device.id }>
                            { device.name }
                            <button onClick={ (e) => openForm(device.id) }>Edit</button>
                            <button onClick={ (e) => dispatch(removeDevice(device)) }>Delete</button>
                        </li>
                    )) }
                </ul>
            )}
            <button onClick={ (e) => openForm() }>New Device</button>
            { addingDevice && (
                <DeviceForm done={ closeForm } />
            ) }
            { editingDevice && (
                <DeviceForm id={ editingDevice } done={ closeForm } />
            ) }
        </section>
    )
}