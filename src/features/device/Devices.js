import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectDevices,
} from './devicesSlice';

import { DeviceForm } from './DeviceForm';

export function Devices () {
    const devices = useSelector(selectDevices);
    const deviceCount = devices.length

    const [addingDevice, setAddingDevice] = useState(false)
    const [editingDevice, setEditingDevice] = useState(false)

    return (
        <section>
            <h2>Devices ({ deviceCount })</h2>
            { deviceCount === 0 ? (
                <div>No devices defined</div>
            ) : (
                <ul>
                    { devices.map(device => (
                        <li key={ device.id }>{ device.name } | <button onClick={ (e) => setEditingDevice(device.id) }>Edit</button></li>
                    )) }
                </ul>
            )}
            <button onClick={ (e) => setAddingDevice(true) }>New Device</button>
            { addingDevice && (
                <DeviceForm done={ () => setAddingDevice(false) } />
            ) }
            { editingDevice && (
                <DeviceForm id={ editingDevice } done={ () => setEditingDevice(false) } />
            ) }
        </section>
    )
}