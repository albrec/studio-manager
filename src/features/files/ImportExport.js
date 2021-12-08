import { useDispatch } from "react-redux"
import { importFile, exportFile } from "./importExportSlice"

export function ImportExport (props) {
    const dispatch = useDispatch()

    return (
        <div className="ImportExport">
            <button onClick={ (e) => dispatch(importFile()) }>Import</button>
            <button onClick={ (e) => dispatch(exportFile) }>Export</button>
        </div>
    )
}