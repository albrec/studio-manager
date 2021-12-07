import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {}

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    toggleLink: (state, action) => {
        const link = action.payload
        const key = linkKey(link)
        if (state[key]) {
            delete state[key]
        } else {
            state[key] = link
        }
        
    }
  },
})

export const { 
    toggleLink,
 } = linksSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const isLinked = (link) => (state) => {
    return !!state.links[linkKey(link)]
}

export const isInputLinked = (input) => (state) => {
    return Object.values(state.links).some(link => link.input.id === input.id )
}

export const isOutputLinked = (output) => (state) => {
    return Object.values(state.links).some(link => link.output.id === output.id)
}

export const hasConflict = (link) => (state) => {
    const { input, output } = link
    const inputLinks = Object.values(state.links).filter(lnk => lnk.input.id === input.id)
    const outputLinks = Object.values(state.links).filter(lnk => lnk.output.id === output.id)
    return inputLinks.length > 1 || outputLinks.length > 1
}

export default linksSlice.reducer

function linkKey (link) {
    const { input, output } = link
    return `${input.id} => ${output.id}`
}
