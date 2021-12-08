import { setDevices } from "../device/devicesSlice"
import { setLinks } from "../matrix/linkSlice"

export const exportFile = async (dispatch, getState) => {
    // create a new handle
    const newHandle = await window.showSaveFilePicker()

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable()

    // write our file
    await writableStream.write(serializeState(getState()))

    // close the file and write the contents to disk.
    await writableStream.close()
}

export const importFile = () => async (dispatch) => {
    const pickerOpts = {
        types: [
            {
                description: 'JSON',
                accept: {
                    'application/json': ['.json']
                }
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false
    }

    // open file picker
    let fileHandle
    [fileHandle] = await window.showOpenFilePicker(pickerOpts)

    // get file contents
    const file = await fileHandle.getFile()
    const json = await file.text()
    const fileData = JSON.parse(json)

    if (fileData.devices && fileData.links)     {
        dispatch(setDevices(fileData.devices))
        dispatch(setLinks(fileData.links))
    } else {
        alert('Invalid file')
    }
}

function serializeState({ devices, links }) {
    return JSON.stringify({
        devices,
        links,
    })
}
