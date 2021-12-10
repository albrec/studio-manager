import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectDevicesSorted } from "../device/devicesSlice"
import { toggleLink, isLinked, isInputLinked, isOutputLinked, hasConflict, isThroughPatchbay } from "./linkSlice"
import classNames from "classnames"

import './Matrix.scss'

export function Matrix () {

    const [hoverNode, setHoverNode] = useState({})

    const devices = useSelector(selectDevicesSorted)
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
                <thead>
                    <tr>
                        <th></th>
                        { inputs.map(input => (
                            <th className={ classNames({ hovered: hoverNode.input?.id === input.id }) }>
                                <InputLabel input={ input } />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { outputs.map(output => (
                        <tr>
                            <th className={ classNames({ hovered: hoverNode.output?.id === output.id }) }>
                                <OutputLabel output={ output } />
                            </th>
                            { inputs.map(input => <LinkNode input={ input } output={ output } onMouseEnter={ setHoverNode } />)}
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
                    <label><input type="checkbox" readOnly={ true } checked={ false } className="balancedIncompatible" /> Balanced Incompatiblity</label>
                    <label><input type="checkbox" readOnly={ true } checked={ true } className="conflicting" /> Conflicting Connection</label>
                </div>
            </fieldset>
            
        </section>
    )
}

function InputLabel (props) {
    const input = props.input
    const linked = useSelector(isInputLinked(input))

    return (
        <div className={ classNames({ linked }) }>
            { input.device.label || input.device.name }&nbsp;
            { input.name }&nbsp;
            {/* { input.balanced && <abbr title="Balanced">B</abbr> }&nbsp; */}
        </div>
    )
}

function OutputLabel (props) {
    const output = props.output
    const linked = useSelector(isOutputLinked(output))

    return (
        <div className={ classNames({ linked }) }>
            { output.device.label || output.device.name }&nbsp;
            { output.name }&nbsp;
            {/* { output.balanced && <abbr title="Balanced">B</abbr> }&nbsp; */}
        </div>
    )
}

function LinkNode (props) {
    const { input, output, onMouseEnter } = props
    const linked = useSelector(isLinked({ input, output }))
    const patchbay = useSelector(isThroughPatchbay({ input, output }))
    const inputLinked = useSelector(isInputLinked(input))
    const outputLinked = useSelector(isOutputLinked(output))
    const conflicting = useSelector(hasConflict({ input, output }))

    const balancedIncompatible =  input.balanced !== output.balanced

    const dispatch = useDispatch()

    return (
        <td onMouseEnter={ (e) => { onMouseEnter({ input, output }); console.log('mouse event', input, output) } }>
            <input
                type="checkbox"
                checked={ linked }
                disabled={ !linked && (inputLinked || outputLinked) }
                className={ classNames({ conflicting, patchbay, balancedIncompatible }) }
                onChange={ (e) => dispatch(toggleLink({ input, output }))}
            />
        </td>
    )
}
