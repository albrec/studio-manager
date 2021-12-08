import { useSelector, useDispatch } from "react-redux"
import { selectDevices } from "../device/devicesSlice"
import { toggleLink, isLinked, isInputLinked, isOutputLinked, hasConflict, isThroughPatchbay } from "./linkSlice"
import classNames from "classnames"

import './Matrix.scss'

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
        <section className='Matrix'>
            <h2>IO Matrix</h2>
            <table>
                <tbody>

                    <tr>
                        <th></th>
                        { inputs.map(input => (
                            <th>
                                { input.device.label || input.device.name }&nbsp;
                                { input.name }&nbsp;
                                { input.balanced && <abbr title="Balanced">B</abbr> }&nbsp;
                                { input.balanced && <abbr title="Stereo">St</abbr> }
                            </th>
                        ))}
                    </tr>

                    { outputs.map(output => (
                        <tr>
                            <th>
                                { output.device.label || output.device.name }&nbsp;
                                { output.name }&nbsp;
                                { output.balanced && <abbr title="Balanced">B</abbr> }&nbsp;
                                { output.balanced && <abbr title="Stereo">St</abbr> }
                            </th>
                            { inputs.map(input => <LinkNode input={ input } output={ output } />)}
                        </tr>
                    ))}


                </tbody>
            </table>

            <fieldset>
                <legend>Matrix Legend</legend>
                <p>An input or output can only support a single connection at a time. Other connection points for an input or output are disabled if a connection is made for that input or output to avoid conflicts.</p>

                <div className="checkboxes">
                    <label><input type="checkbox" readOnly={ true } checked={ false } /> No Connection</label>
                    <label><input type="checkbox" readOnly={ true } checked={ true } /> Direct Connection</label>
                    <label><input type="checkbox" readOnly={ true } checked={ true } className="patchbay" /> Through Patchbay</label>
                    <label><input type="checkbox" readOnly={ true } checked={ false } disabled={ true } /> Disabled</label>
                    <label><input type="checkbox" readOnly={ true } checked={ false } className="stereoIncompatible" /> Stereo Incompatiblity</label>
                    <label><input type="checkbox" readOnly={ true } checked={ false } className="balancedIncompatible" /> Balanced Incompatiblity</label>
                    <label><input type="checkbox" readOnly={ true } checked={ true } className="conflicting" /> Conflicting Connection</label>
                </div>
            </fieldset>
            
        </section>
    )
}

function LinkNode (props) {
    const { input, output } = props
    const linked = useSelector(isLinked({ input, output }))
    const patchbay = useSelector(isThroughPatchbay({ input, output }))
    const inputLinked = useSelector(isInputLinked(input))
    const outputLinked = useSelector(isOutputLinked(output))
    const conflicting = useSelector(hasConflict({ input, output }))

    const balancedIncompatible =  input.balanced !== output.balanced
    const stereoIncompatible = input.stereo !== output.stereo

    const dispatch = useDispatch()

    return (
        <td>
            <input
                type="checkbox"
                checked={ linked }
                disabled={ !linked && (inputLinked || outputLinked) }
                className={ classNames({ conflicting, patchbay, balancedIncompatible, stereoIncompatible }) }
                onChange={ (e) => dispatch(toggleLink({ input, output }))}
            />
        </td>
    )
}
