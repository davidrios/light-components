import React from 'react'
import { callNotNull, propOrState } from '../../utils/misc'

export default class BasicButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isActive: props.isActive,
      isHovered: props.isHovered
    }
  }

  componentDidMount () {
    this.handleDocumentMouseMove = ev => {
      if (this.props.isDisabled) return

      if (ev.currentTarget === this.componentRef) {
        ev.stopPropagation()
        if (!this.state.isHovered && !propOrState(this, 'isActive')) {
          this.setState({ isHovered: true })
        }
        return
      }

      if (this.state.isHovered) {
        this.setState({ isHovered: false })
      }
    }

    this.handleDocumentMouseUp = ev => {
      if (this.props.isDisabled) return

      this.setState({ isActive: false })

      if (ev.currentTarget === this.componentRef) {
        ev.stopPropagation()
        if (!propOrState(this, 'isActive')) {
          this.setState({ isHovered: true })
        }
        callNotNull(this.props.onRelease)
      }
    }

    this.componentRef.addEventListener('mousemove', this.handleDocumentMouseMove)
    document.addEventListener('mousemove', this.handleDocumentMouseMove)
    this.componentRef.addEventListener('mouseup', this.handleDocumentMouseUp)
    document.addEventListener('mouseup', this.handleDocumentMouseUp)
  }

  componentWillUnmount () {
    this.componentRef.removeEventListener('mousemove', this.handleDocumentMouseMove)
    document.removeEventListener('mousemove', this.handleDocumentMouseMove)
    this.componentRef.removeEventListener('mouseup', this.handleDocumentMouseUp)
    document.removeEventListener('mouseup', this.handleDocumentMouseUp)
  }

  handleMouseDown (ev) {
    if (this.props.isDisabled) return

    callNotNull(this.props.onPress)
    this.setState({
      isActive: true,
      isHovered: false
    })
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
  isHovered: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  onRelease: React.PropTypes.func,
  reactCSS: React.PropTypes.func,
  style: React.PropTypes.object
}
