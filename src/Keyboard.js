import React, { Component } from 'react'
import Key from './Key'
import Immutable from 'immutable'


export default class Keyboard extends Component {
  constructor(props) {
      super(props)

      this.pianoKeysOnKeyboard = Immutable.Set.of('a', 'w', 's', 'e',
        'd','f', 't', 'g', 'y', 'h','u', 'j', 'k', 'o', 'l', 'p')

      this.allowedKeyboardKeys = 
        this.pianoKeysOnKeyboard.union(Immutable.Set.of('z', 'c', 'x', 'v'))

      this.unusedKeysOnLastOctave = Immutable.Set.of('h','u', 'j', 'k', 'o', 'l', 'p')

      this.state = {
        velocity         : 100,
        octave           : 3,
        pressedKeys      : Immutable.Set(),
        mousePressedNote : null,
        isMouseCliked    : false
      }

      document.addEventListener('keydown', this.handleKeyDown, false)
      document.addEventListener('keyup', this.handleKeyUp, false)
  }
  
  handleKeyDown = event => {
    const symbol = String.fromCharCode(event.keyCode).toLowerCase()


    const isAllowedInput = this.allowedKeyboardKeys.contains(symbol)
    const isLastOctave   = this.state.octave == 8
    const isUnusedKey    = isLastOctave 
      && this.unusedKeysOnLastOctave.contains(symbol)

    if((! isAllowedInput) || isUnusedKey || this.state.pressedKeys.contains(symbol))
      return

    this.addPressedKey(symbol)

    switch(symbol) {
      case 'z':
        this.octaveDown()
        break

      case 'x':
        this.octaveUp()
        break

      //default:
      
    }
  }

  handleKeyUp = event => {
    const symbol = String.fromCharCode(event.keyCode).toLowerCase()

    this.setState({
      pressedKeys : this.state.pressedKeys.filter( s => s !== symbol )
    })

    if(! this.pianoKeysOnKeyboard.contains(symbol))
      return

    //keyOff
  }

  addPressedKey = symbol => {
    this.setState({ pressedKeys : this.state.pressedKeys.add(symbol) })
  }


  octaveDown = () => {
    this.setState({ octave : Math.max(-2, this.state.octave - 1 ) })
  }


  octaveUp = () => {
    this.setState({ octave : Math.min(8, this.state.octave + 1 ) })
  }


  render = () => {
    const octaveKeys = Immutable.List.of('c', 'cs', 'd', 'ds',
      'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b')

    const onScreenKeys =
      Immutable.Repeat(octaveKeys, 10).flatten().concat(octaveKeys.take(8))

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
