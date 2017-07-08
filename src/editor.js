import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import "./editor.scss"


const TRANSLATE_Y_DOWN = "transform: translateY(100%); transition: transform .5s;"
const TRANSLATE_Y_UP = "transform: translateY(-100%);   transition: transform .5s;"
const BLANK = ""


export default class Editor extends Component {
  static defaultProps = {
    // 通常会将服务器传回来的数据作为props传进来，以作为编辑功能
    rows: []
  }

  uuid = 0  // 这个字段使用TransitionGroup可能不需要，待研究TG api
  constructor(props) {
    super(props)
    // 初始化每行的id，作为key使用值便于动画
    this.setUpRows()
  }


  setUpRows() {
    // 默认显示一个空行
    if(!this.props.rows.length) {
      this.props.rows.unshift({ text: '', image: '' })
    }
    const rows = this.props.rows.map((row) => {
      row.uuid = this.uuid++
      return row
    })
    this.state = { rows }
  }

  /**
   * @param {row} row 每一行的数据结构
   * @param {number} atIndex 插入位置
   */
  insertRow(row, atIndex) {
    const rows = this.state.rows
    rows.splice(atIndex, 0, row)
    this.setState({ rows })
  }

  chooseNewImage(id, index) {
    this.insertRow({
      image: id,
      text: 'hello world',
      uuid: this.uuid++
    }, index)
  }

  /** 删除一行
   * @param {number} atIndex 删除位置
   */
  deleteRow(atIndex) {
    const rows = this.state.rows
    rows.splice(atIndex, 1)
    this.setState({ rows })
  }

  //  将i位置上移
  moveUp(i) {
    const targetEle = ReactDOM.findDOMNode(this['row_' + i])
    const  prevEle  = ReactDOM.findDOMNode(this['row_' + (i-1)])

    targetEle.style = TRANSLATE_Y_UP
    prevEle.style   = TRANSLATE_Y_DOWN

    const rows     = this.state.rows
    const previous = rows[i-1];

    rows[i-1] = rows[i]
    rows[i]   = previous

    setTimeout(() => {
      targetEle.style = BLANK;
      prevEle.style = BLANK
      this.setState({ rows }, () => {
        // ...
      })
    }, 501)
  }

  // i位置下移
  moveDown(i) {
    this.moveUp(i+1)
  }

  updateText = (index, newTextValue) => {
    const rows = this.state.rows
    rows[index].text = newTextValue
    this.setState({ rows })
  }

  updateMedia = (evt) => {

  }

  render() {
    const rows  = this.state.rows
    const total = rows.length

    return (
      <div className="editor-container">
        {/* mark to use transition */}
        {
          rows.map((row, i) => (
            // const styles = { order: i + 1 }
            <div key={row.uuid} className="editor-row" ref={ r=>this['row_' + i]=r}>
              <Row
                total={total} 
                index={i}
                image={row.image}
                updateRowText={this.updateText}
                updateMedia={this.updateMedia}
                text={row.text} 
                remove={()=>this.deleteRow(i)} 
                moveUp={()=>this.moveUp(i)} 
                moveDown={()=>this.moveDown(i)} />
              <Plus onChooseImageSuccess={id=>this.chooseNewImage(id, i+1)} />
            </div>
          ))
        }
      </div>
    )
  }
}


export class Row extends Component {
  static defaultProps = {
    image: '',
    text: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      image: props.image,
      text: props.text,
      index: props.index,
      total: props.total
    }
  }

  componentWillReceiveProps(nextProps) {
    let { text='', image, index, total } = nextProps
    this.setState({ text, image, index, total })
  }

  remove() {
    this.props.remove()
  }

  moveUp() {
    this.props.moveUp()
  }

  moveDown() {
    this.props.moveDown()
  }

  onChange = (index) => (evt) => {
    this.props.updateRowText(index, evt.target.value)
  }

  render() {
    const { image, text, total, index } = this.state
    return (
      <div className="editor-row-wrapper">
        <div className="remove-row" ><span onClick={e=>this.remove()}></span></div>
        <div className="row-content">
          <div className="row-image">
            {/* 可以考虑加视频 */}
            <img src={image} />
          </div>
          <div className="row-text">
            <textarea onChange={this.onChange(index)} value={text}></textarea>
          </div>
        </div>
        <div className="move-action">
          { index > 0 ? <span onClick={e=>this.moveUp(e)} className="move-up"></span> : null }
          { index < total-1 ? <span onClick={e=>this.moveDown(e)} className="move-down"></span> : null }
        </div>
      </div>
    )
  }
}


/* 添加新行 */
export class Plus extends Component {
  chooseImage() {
    // 测试demo方法，待移除
    this.props.onChooseImageSuccess('https://pro.modao.cc/uploads2/images/636/6368597/raw_1480055555.png') // test
  }

  render() {
    return (
      <div className="add-new"><span onClick={ e=>this.chooseImage(e) }></span></div>
    )
  }
}