import React, { Component } from 'react'

/**
 * 文件直接拖动
 */ 
export default class FileDnD extends Component {
  state = {
    dragClassName: ''
  }

  set dragClassName(value) {
    this.setState({
      dragClassName: value
    })
  }

  onDragEnter = (event) => {
    event.preventDefault()
    this.dragClassName = 'drag-enter'
  }

  onDragOver = (event) => {
    event.preventDefault()
  }

  onDragLeave = (event) => {
    event.preventDefault()
  }

  onDrop = (event) => {
    event.preventDefault()
    this.dragClassName = ''
    this.props.onDrop(event.dataTransfer.files)
  }

  render() {
    return (
      <div
        {...this.props}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}>
        <div className={this.state.dragClassName}>{this.props.children}</div>
      </div>
    )
  }
}