import React, { Component } from "react"

import Tile from './components/Tile'

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
      loading: false,
      descriptions: [],
      pokemons: []
    }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  async componentDidMount() {
    this.setState({loading: true})
    let offset = Math.floor(85*Math.random())
    let limit = Math.floor(1+(7*Math.random()))

    await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        Promise.all(data.results.map(
          async function(item) {
            const response = await fetch(item.url)
              .catch((error) => console.log("Request failed: " + error))
            return await response.json()
          }
        ))
        .then(value => {
          Promise.all(value.map(
            async function(item) {
              if (item.id < 30) {
                const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${item.id}/`)
                  .catch((error) => console.log("Request failed: " + error))
                return await response.json()
              }
            }
          ))
          .then(item => {
            if (typeof item !== "undefined" && item.length > 0) {
              item.map(desc => {
                this.setState(prevState => {
                  return {
                    descriptions: prevState.descriptions.concat(
                      function(desc) {
                        if (typeof desc !== "undefined") {
                          return desc.descriptions.filter(
                            item => item.language.name === "en"
                          )
                        }
                        else return undefined 
                      }(desc)
                    )
                  }
                })
              return desc
              })
            }
          })

          this.setState({
            pokemons: value
          })
        })
      })
      .catch((error) => console.log("Request failed: " + error))

      this.setState({loading: false})
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong :(</h2>
        </>
      )
    }

    let content, style
    if (this.state.loading) {
      style = {
        flexDirection: 'column',
        gap: '0'
      }
      content = (
        <>
          <Tile empty />
          <span className="loading-caption">
            Loading...
          </span>
        </>
      )
    }
    else {
      content = this.state.pokemons.map((item, index) => {
        if (this.state.descriptions[index]) {
          return (
            <Tile 
              key={item.id} 
              name={item.name} 
              image={item.sprites.front_default} 
              imageAlt={item.sprites.front_shiny} 
              description={this.state.descriptions[index].description} 
            />
          )
        }
        return (
          <Tile 
            key={item.id} 
            name={item.name} 
            image={item.sprites.front_default} 
            imageAlt={item.sprites.front_shiny} 
          />
        )
      })
    }

    return (
      <div style={style} className="container">
        {content}
      </div>
    )
  }
}

export default App
