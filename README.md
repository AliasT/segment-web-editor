# 网页中常见的分段文本编辑

```shell
yarn dev

open localhost:8080/example

```

```javascript
// 模仿文件上传，实现上传借口就好，用实际方案替换
function upload(file) {
  return new Promise(function (resolve, reject){
    setTimeout(() => { 
      resolve('http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&w=288&h=288') 
    }, 1000)
  })
}

<Editor upload={upload} />
```

## todo 


### 视频

### 批量移除

### 图片多选

### 拖动更改顺序

### 拖动添加
