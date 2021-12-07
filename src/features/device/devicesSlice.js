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
    }
  },
})

export const { 
    addDevice,
    updateDevice,
    removeDevice,
 } = devicesSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDevices = (state) => Object.values(state.devices)
export const selectDevice = (id) => (state) => state.devices[id]

export default devicesSlice.reducer
