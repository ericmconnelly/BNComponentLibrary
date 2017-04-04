import React, { PropTypes, PureComponent } from 'react'

const { object } = PropTypes

export default class BnTooltip extends PureComponent {
  static propTypes = {
    target: object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { right, top, width } = this.props.target.getBoundingClientRect()
    const style = {
      left: right - (width / 2) - (this.container.offsetWidth / 2) + window.scrollX,
      top: top - this.container.offsetHeight + window.scrollY,
    }

    this.setState({ style })
  }

  getStyle = () => {
    const { style } = this.state
    if (style) return style
    
    const { left, top } = this.props.target.getBoundingClientRect()
    return { left, top }
  }


  render() {
    const style = this.getStyle()

    return <div className="mac-tooltip top visible" ref={ref => this.container = ref} style={style}>{this.props.text}</div>
  }
}
