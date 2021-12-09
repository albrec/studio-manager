import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {}

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action) => {
        const device = {
            ...action.payload,
            id: uuidv4(),
        }
        state[device.id] = device
    },
    updateDevice: (state, action) => {
        state[action.payload.id] = action.payload
    },
    removeDevice: (state, action) => {
        delete state[action.payload.id]
    },
    setDevices: (state, action) => {
        const devices = action.payload
        const devicesSorted = Object.values(devices).sort((a,b) => a.idx || 0 - b.idx || 0)
        devicesSorted.forEach((device, i) => {
            devices[device.id].idx = i
        })
        return devices
    },
    shiftUp: (state, action) => {
        const currentIndex = state[action.payload.id].idx
        Object.keys(state).forEach((k) => {
            if (state[k].idx === currentIndex) {
                state[k].idx--
            } else if (state[k].idx === currentIndex - 1) {
                state[k].idx++
            }
        })
    },
    shiftDown: (state, action) => {
        const currentIndex = state[action.payload.id].idx
        Object.keys(state).forEach((k) => {
            if (state[k].idx === currentIndex) {
                state[k].idx++
            } else if (state[k].idx === currentIndex + 1) {
                state[k].idx--
            }
        })
    }
  },
})

export const { 
    addDevice,
    updateDevice,
    removeDevice,
    setDevices,
    shiftUp,
    shiftDown,
 } = devicesSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDevices = (state) => Object.values(state.devices)
export const selectDevice = (id) => (state) => state.devices[id]

export const selectDevicesSorted = (state) => Object.values(state.devices).sort((a,b) =>( a.idx || 0) - (b.idx || 0))

export default devicesSlice.reducer
