import { useSelector, useDispatch } from "react-redux"
import { selectDevices } from "../device/devicesSlice"
import { toggleLink, isLinked, isInputLinked, isOutputLinked, hasConflict } from "./linkSlice"

export function Matrix () {

    const devices = useSelector(selectDevices)
    const inputs = devices.reduce((accum, device) => {
        if (device.inputs) {
            return accum.concat(device.inputs.map(input => Object.assign({}, input, { device }) ))
        } else {
            return accum
        }
    }, [])

    const outputs = devices.reduce((accum, device) => {
        if (device.outputs) {
            return accum.concat(device.outputs?.map(output => Object.assign({}, output, { device }) ))
        } else {
            return accum
        }
    }, [])

    return (
        <section>
            <h2>IO Matrix</h2>
            <table>
                <tbody>

                    <tr>
                        <th></th>
                        { inputs.map(input => (
                            <th>{ input.device.label || input.device.name } { input.name }</th>
                        ))}
                    </tr>

                    { outputs.map(output => (
                        <tr>
                            <th>{ output.device.label || output.device.name } { output.name }</th>
                            { inputs.map(input => <LinkNode input={ input } output={ output } />)}
                        </tr>
                    ))}


                </tbody>
            </table>
        </section>
    )
}

function LinkNode (props) {
    const { input, output } = props
    const linked = useSelector(isLinked({ input, output }))
    const inputLinked = useSelector(isInputLinked(input))
    const outputLinked = useSelector(isOutputLinked(output))
    const conflicting = useSelector(hasConflict({ input, output }))

    console.log('linked', linked, 'conflicting', conflicting)

    const dispatch = useDispatch()

    return (
        <td>
            <input type="checkbox" checked={ linked } disabled={ !linked && (inputLinked || outputLinked) } className={ conflicting && 'conflicting' } onChange={ (e) => dispatch(toggleLink({ input, output }))} />
        </td>
    )
}
