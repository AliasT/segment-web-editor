import React, { Component } from 'react'

/**
 * 文件直接拖动
 */ 
export default class FileDnD extends Component {
  onDragEnter = () => {
    
  }

  onDragOver = () => {

  }

  onDrop = () => {
    
  }

  render() {
    return (
      <div
        {...this.props}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}>
      </div>
    )
  }
}