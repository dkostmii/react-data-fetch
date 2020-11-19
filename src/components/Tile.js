import React, { Component } from "react"

import './Tile.css'

import TilePicture from './TilePicture'

class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      selected: false,
      description: false //description hidden
    } 

    this.handleClick = this.handleClick.bind(this)
  }
  
  componentDidMount() {
    this.delay = setTimeout(() => {
      this.setState({visible: true})
    }, this.props.empty ? 50 : 400)
  }

  componentWillUnmount() {
    clearTimeout(this.delay)
  }

  handleClick() {
    if (!this.props.empty) {
      this.setState(prevState => { 
        return {
          selected: !prevState.selected
        }
      })
      this.delay = setTimeout(() => {
        this.setState(prevState => {
          return {
            description: this.props.description ? !prevState.description : false
          }
        })
      }, 125)
    }
  }

  render() {
    let tileStyle, titleStyle
    if (this.state.visible) {
      if (this.state.selected) {
        tileStyle = {
          marginBottom: '-24px',
          zIndex: '1',
          transition: '0.2s ease-out',
          opacity: '1',
          height: '180px',
          minHeight: '180px',
        }
        titleStyle = {
          height: 68,
          top: 180 - 68,
          justifyContent: this.props.description ? 'flex-start' : 'center',
          gap: '-2px'
        }

      }
      else {
         tileStyle = {
          transition: '0.2s ease-out',
          opacity: '1',
          transform: 'none'
        }
      }
    }
    else {
      tileStyle = {
        transform: 'scale(0.25)',
        transition: '0.5s ease-in-out',
        transitionDelay: '0.5s',
        opacity: '0'
      }
    }


    let content
    if (this.props.empty) {
      content = (
        <div className="tile tile-empty" style={tileStyle}>
          <div className="tile-title-container">
            <div className="tile-caption-placeholder"></div>
          </div>
        </div>
      )
    }
    else {
      let classNames = this.state.selected ? "tile tile-selected" : "tile"
      content = (
        <div className={classNames} 
             style={tileStyle}
             onClick={this.handleClick}>
          <TilePicture 
            alt={this.props.name}
            src={this.props.image}
            altSrc={this.props.imageAlt}
            selected={this.state.selected}
          />
        <div className="tile-title-container"
            style={titleStyle}>
            <h2 className="tile-caption">{this.props.name}</h2>
            { (this.props.description && this.state.selected) &&
              <span
                style={{opacity: this.state.description ? 1 : 0}} 
                className="tile-description">
                {this.props.description}
              </span>
            }
          </div>
        </div>
      )
    }

    return <>{content}</>
  }
}

export default Tile
