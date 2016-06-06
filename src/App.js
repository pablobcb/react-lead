import React, { Component } from 'react'
import R from 'ramda'
import Keyboard from './Keyboard'

export default class App extends Component {
  render() {
    return (
      <div className='dashboard'>
          
          <div className='synth-panel'>
            
            <div className='master-volume'>
              <span>master level</span>
              <input type='range' min='0' max='100' step='1'/>
            </div>
            
            <div className='oscillators'>
              <div>
                <span>Oscillators Balance</span>
                <input type='range' min='0' max='100' step='1'/>
              </div>
              <div>
                <span>Oscillator 1 Detune</span>
                <input type='range' min='0' max='100' step='1'/>
              </div>
              <div>
                <span>Oscillator 2 Detune</span>
                <input type='range' min='0' max='100' step='1'/>
              </div>
            </div>
            <div>
              <span>Breno</span>
              <input type='range' min='0' max='100' step='1'/>
            </div>
          </div>

          <Keyboard/>

          <div className='information-bar'>
            <span className='information-bar__item'>Octave is C3 to C4</span>
            <span className='information-bar__item'>Velocity is 80</span>
          </div>
        </div>

    )
  }
}
