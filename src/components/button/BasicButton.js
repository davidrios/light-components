import React from 'react'
import { callNotNull, propOrState } from '../../utils/misc'

export default class BasicButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isActive: props.isActive
    }
  }

  handleMouseDown (ev) {
    if (this.props.isDisabled) return

    this.setState({
      isActive: true,
      isHovered: false
    })

    callNotNull(this.props.onPress)
  }

  handleMouseOut (ev) {
    if (this.props.isDisabled) return

    if (this.state.isHovered) {
      this.setState({ isHovered: false })
    }
  }

  handleMouseOver (ev) {
    if (this.props.isDisabled) return

    if (!this.state.isHovered && !propOrState(this, 'isActive')) {
      this.setState({ isHovered: true })
    }
  }

  handleMouseUp (ev) {
    if (this.props.isDisabled) return

    this.setState({ isActive: false })

    if (this.props.isActive == null) {
      this.setState({ isHovered: true })
    }

    callNotNull(this.props.onRelease)
  }

  render () {
    let children = React.cloneElement(this.props.children, { ref: component => { this.childrenRef = component } })
    let className = [
      this.props.className,
      propOrState(this, 'isActive') ? 'active' : null,
      this.props.isDisabled ? 'disabled' : null,
      this.state.isHovered ? 'hover' : null
    ]
      .filter(item => item != null)
      .join(' ')
    let style = this.props.style
    if (this.props.reactCSS != null) {
      style = this.props.reactCSS(style, this.props, this.state).button
    }

    return (
      <a
        className={className}
        onMouseDown={ev => { this.handleMouseDown(ev) }}
        onMouseOut={ev => { this.handleMouseOut(ev) }}
        onMouseOver={ev => { this.handleMouseOver(ev) }}
        onMouseUp={ev => { this.handleMouseUp(ev) }}
        ref={el => { this.componentRef = el }}
        style={style}
      >
        {children}
      </a>
    )
  }
}

BasicButton.propTypes = {
  children: React.PropTypes.element.isRequired,
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  onRelease: React.PropTypes.func,
  reactCSS: React.PropTypes.func,
  style: React.PropTypes.object
}
