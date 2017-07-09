import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../src/editor'


// 模仿文件上传，实现上传借口就好，用实际方案替换
function upload(file) {
  return new Promise(function (resolve, reject){
    setTimeout(() => { 
      resolve('http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&w=288&h=288') 
    }, 1000)
  })
}


ReactDOM.render(<Editor upload={upload}/>, document.querySelector('#demo'))