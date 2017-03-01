import React from 'react'
import { render } from 'react-dom'

import BasicButton from 'light-components/components/button/BasicButton'

class App extends React.Component {
  render () {
    let buttons = []
    for (let i = 0; i < 5000; i++) {
      let isDisabled = Math.random() <= 0.1
      let isActive = Math.random() <= 0.2
      if (isActive || isDisabled) {
        buttons.push(<BasicButton className='btn' isActive={isActive && !isDisabled} isDisabled={isDisabled} key={i}><span>{i}</span></BasicButton>)
      } else {
        buttons.push(<BasicButton className='btn' key={i}><span>{i}</span></BasicButton>)
      }
    }

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('app-container'))
