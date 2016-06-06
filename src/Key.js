import React, { Component } from 'react'

export default class Key extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let classes = ['key']

    classes.push(this.props.noteName.includes('s') ? 'higher' : 'lower')

    if(this.props.midiNote == 60)
      classes.push('c3')


    return (
      <li 
        className={ classes.join(' ', classes) } 
        value={ this.props.midiNote } 
      />
    )
  }
}
