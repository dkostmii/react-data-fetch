import React, { Component } from "react"

class TilePicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.src,
      style: {
        display: 'block',
        opacity: 0
      }
    }
  }

  componentDidMount() {
    this.setState({
      style: {
        opacity: 1
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({
        style: {
          opacity: 0,
          transform: this.props.selected ? 'scale(1.65)' : 'none'
        }
      })
      this.delay = setTimeout(() => {
        this.setState({
          image: this.props.selected ? this.props.altSrc : this.props.src,
        })
      }, 50)
      this.delay = setTimeout(() => {
        this.setState({
          style: {
            opacity: 1,
            transform: this.props.selected ? 'scale(1.25)' : 'none'
          }
        })
      }, 300)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delay)
  }

  render() {
    return (
      <img
        alt={this.props.alt}
        className="tile-pic"
        src={this.state.image}
        style={this.state.style}
      />
    )
  }
}

export default TilePicture
