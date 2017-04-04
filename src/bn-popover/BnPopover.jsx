import React, { Component, PropTypes } from 'react'

const { func, object, string } = PropTypes

export default class BnPopover extends Component {
  static propTypes = {
    handleClickOutside: func,
    position: string,
    target: object.isRequired,
  }
  
  static defaultProps = {
    position: 'bottom-left',
  }

  constructor(props) {
    super(props)
    this.state = { style: {} }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.handleClickOutside)
    this.setStyle(this.calculateStyle(this.props.target))
  }

  componentDidUpdate() {
    const current = this.container.getBoundingClientRect()
    const target = this.calculateStyle(this.props.target)

    if (current.left !== target.left || current.top !== target.top) this.setStyle(target)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside)
  }
  
  calculateStyle = (element) => {
    const { bottom, left, right, top } = element.getBoundingClientRect()
    
    switch (this.props.position) {
      case 'bottom-left': return { left, top: bottom + 3 }
      case 'bottom-right': return { left: right - this.container.offsetWidth, top: bottom + 3 }
      case 'top-left': return { left, top: top - this.container.offsetHeight - 3 }
      case 'top-right': return { left: right - this.container.offsetWidth, top: top - this.container.offsetHeight - 3 }
      // no default
    }
  }

  handleClickOutside = ({target}) => {
    if (this.container && this.container.contains(target)) return
    this.props.handleClickOutside()
  }

  setStyle(style) {
    style.left += window.scrollX
    style.top += window.scrollY
    // style.width = this.container.offsetWidth
    // style.height = this.container.offsetHeight
    this.setState({ style })
  }

  render() {
    return (
      <div className="popover active" style={this.state.style} ref={ref => this.container = ref} >
        {this.props.children}
      </div>
    )
  }
}
