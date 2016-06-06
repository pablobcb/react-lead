import React, { Component } from 'react'
import R from 'ramda'
import Key from './Key'


export default class Keyboard extends Component {
  constructor(props) {
      super(props)

      this.pianoKeysOnKeyboard = ['a', 'w', 's', 'e',
        'd','f', 't', 'g', 'y', 'h','u', 'j', 'k', 'o', 'l', 'p']

      this.allowedKeyboardKeys = R.concat(
        this.pianoKeysOnKeyboard, 
        ['z', 'c', 'x', 'v']
      )

      this.unusedKeysOnLastOctave = ['h','u', 'j', 'k', 'o', 'l', 'p']

      this.state = {
        velocity         : 100,
        octave           : 3,
        pressedKeys      : [],
        mousePressedNote : null,
        isMouseCliked    : false
      }

      document.addEventListener('keydown', this.handleKeyDown, false)
      document.addEventListener('keyup', this.handleKeyUp, false)
  }
  
  handleKeyDown = event => {
    const symbol = String.fromCharCode(event.keyCode).toLowerCase()


    const isAllowedInput = R.contains(symbol, this.allowedKeyboardKeys)
    const isLastOctave   = this.state.octave == 8
    const isUnusedKey    = isLastOctave 
      && R.contains(symbol, this.unusedKeysOnLastOctave)

    if((! isAllowedInput) || isUnusedKey || R.contains(symbol, this.state.pressedKeys))
      return

    this.addPressedKey(symbol)

    switch(symbol) {
      case 'z':
        this.octaveDown()
        break

      case 'x':
        this.octaveUp()
        break

      default:
      
    }
  }

  handleKeyUp = event => {
    const symbol = String.fromCharCode(event.keyCode).toLowerCase()

    this.setState({
      pressedKeys : R.filter( s => (s != symbol) , this.state.pressedKeys)
    })

    if(! R.contains(symbol, this.pianoKeysOnKeyboard))
      return

    //keyOff
  }

  addPressedKey = symbol => {

    this.setState({ pressedKeys : R.append(symbol, this.state.pressedKeys) })
  }


  octaveDown = () => {
    this.setState({ octave : Math.max(-2, this.state.octave - 1 ) })
  }


  octaveUp = () => {
    this.setState({ octave : Math.min(8, this.state.octave + 1 ) })
  }


  render = () => {
    const octaveKeys = [ 'c', 'cs', 'd', 'ds', 
      'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b' ]

    const onScreenKeys = R.flatten(R.concat(
      R.repeat(octaveKeys, 10),
      R.take(octaveKeys, 8)
    ))

 
    return (
      <div>
        <ul className='keyboard'> {
          onScreenKeys.map( (noteName, midiNote) => {
            return <Key
                     noteName={noteName}
                     midiNote={midiNote}
                     key={midiNote}
                   />
          })
        }
        </ul>
      </div>
    )
  }

}
