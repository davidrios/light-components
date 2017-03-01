import React from 'react'
import reactCSS from 'reactcss'
import { storiesOf, action } from '@kadira/storybook'

import BasicButton from '../src/components/button/BasicButton'

const styles = {
  'default': {
    button: {
      border: '1px solid black',
      cursor: 'pointer',
      padding: '3px'
    }
  },
  'isActive': {
    button: {
      'background': '#ccc'
    }
  },
  'isHovered': {
    button: {
      'background': '#eee'
    }
  },
  'isDisabled': {
    button: {
      border: '1px solid #ccc',
      color: '#ccc'
    }
  }
}

storiesOf('BasicButton', module)
  .add('basic, using reactcss', () => (
    <BasicButton
      className='test1 test2'
      onPress={action('press')}
      onRelease={action('release')}
      reactCSS={reactCSS}
      style={styles}
    >
      <span>test<i>icon</i></span>
    </BasicButton>
  ))
  .add('basic isActive', () => (
    <BasicButton
      isActive
      reactCSS={reactCSS}
      style={styles}
    >
      <span>test<i>icon</i></span>
    </BasicButton>
  ))
  .add('disabled, no reactcss', () => (
    <BasicButton
      isDisabled
      onPress={action('press')}
      onRelease={action('release')}
      style={Object.assign({}, styles.default.button, styles.isDisabled.button)}
    >
      <span>test<i>icon</i></span>
    </BasicButton>
  ))
