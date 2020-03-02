// var itemCanvas = wx.createCanvas();
// var itemCtx = itemCanvas.getContext('2d');
// var avatarImg = wx.createImage();
// avatarImg.src = res.data[i].avatarUrl;
// avatarImg.onload = (function (cvs, avatarImage, i) {
//   return function () { cvs.drawImage(avatarImage, data.data.gameAspect[0] * 0.11, data.data.gameAspect[0] * 0.1 + (i + 1) * 50, 35, 35); }
// })(itemCtx, avatarImg, i);  //头像
// itemCtx.fillStyle = "rgb(250, 250, 250)";
// itemCtx.font = "16px Arial";
// itemCtx.textAlign = "left";
// itemCtx.textBaseline = "top";
// itemCtx.fillText(i + 1, data.data.gameAspect[0] * 0.8, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 名次
// itemCtx.fillText(res.data[i].nickname, data.data.gameAspect[0] * 0.23, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 昵称
// itemCtx.fillText(res.data[i].KVDataList[0].value, data.data.gameAspect[0] * 0.6, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 分数

// var sharedCanvas = wx.getSharedCanvas();
// var context = sharedCanvas.getContext('2d');
// context.drawImage(itemCanvas, 0, y, 750 - 80 * 2, res.windowHeight * 0.5, 0,
//   res.windowHeight * 0.35, 750 - 80 * 2, res.windowHeight * 0.5);

var itemCanvas, itemCtx;
wx.onMessage((data) => {  
  switch (data.action) {
    case 'save':
      wx.setUserCloudStorage({
        KVDataList: [{ key: 'data', value: JSON.stringify(data.data) }, { key: 'data', value: JSON.stringify(data.data)}],
        success: function () {
          console.log('“Save OK …”');
        }
      });
      break;
    case 'get':
      getUserData(data);
      break;
    case 'getGrp':
      getGrpData(data);
      break;
    case 'close':
      clearShareCanvas(data);
      break;
  }
})
function loadRes(data, rankTitle) {
  Init();
  itemCanvas = wx.createCanvas();
  itemCtx = itemCanvas.getContext('2d');
   //itemCanvas.width = data.data.gameAspect[0]-2*data.data.gameAspect[0] * 0.1;
  //itemCanvas.height = data.data.gameAspect[1] -2*data.data.gameAspect[0] * 0.6+100;
  var sharedCanvas = wx.getSharedCanvas();
  var ctx = sharedCanvas.getContext('2d');
  const bg = wx.createImage();
  // bg.src = "images/bg.png";
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, data.data.gameAspect[0], data.data.gameAspect[1]);   //绘制主域的背景
    // const backBtn = wx.createImage();
    // backBtn.src = 'images/menu_07.png';
    // backBtn.onload = () => {
    //   ctx.drawImage(backBtn, 5, 10, 40, 40);   //返回按钮
    // }
    // const rankBg = wx.createImage();
    // rankBg.src = 'images/menu_07.png';
    // rankBg.onload = () => {
    //   ctx.drawImage(rankBg, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.9) / 2, (data.data.gameAspect[1] - data.data.gameAspect[1] * 0.6) / 2, data.data.gameAspect[0] * 0.9, data.data.gameAspect[1] * 0.7);
    //   console.log('wid=' + (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.9) / 2);
    //   console.log('height=' + (data.data.gameAspect[1] - data.data.gameAspect[1] * 0.6) / 2);
    //   ctx.fillStyle = "rgba(0, 250, 0,0)";
    //   ctx.globalAlpha=0;
    //   ctx.font = "22px Arial";
    //   ctx.textAlign = "left";
    //   ctx.fillText(rankTitle, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.8) / 2, (data.data.gameAspect[1] - data.data.gameAspect[1] * 0.46) / 2);

    //   ctx.font = "15px Arial";
    //   ctx.fillStyle = "rgb(250, 250, 0)";
    //   ctx.fillText("头像", data.data.gameAspect[0] * 0.11, data.data.gameAspect[1] * 0.315);

    //   ctx.fillText("用户名", data.data.gameAspect[0] * 0.25, data.data.gameAspect[1] * 0.315);

    //   ctx.fillText("分数", data.data.gameAspect[0] * 0.59, data.data.gameAspect[1] * 0.315);

    //   ctx.fillText("排名", data.data.gameAspect[0] * 0.79, data.data.gameAspect[1] * 0.315);

    //   const qunPaiHang = wx.createImage();
    //   qunPaiHang.src = "images/ready.png";
    //   qunPaiHang.onload = (function (ctx, img) {
    //     return function () {
    //       ctx.drawImage(img, data.data.gameAspect[0] * 0.1, data.data.gameAspect[1] - data.data.gameAspect[1] * 0.1);
    //     }
    //   })(ctx, qunPaiHang);

    // }

  }
}

function getGrpData(data) {
  console.log("getGrp is Execute");
  loadRes(data, '群排行');
  var sharedCanvas = wx.getSharedCanvas();
  var ctx = sharedCanvas.getContext('2d');
  var avatarURl;
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    lang: 'zh_CN',
    success: function (res) {
      avatarURl = res.data[0].avatarUrl;
      const avatarImg = wx.createImage();
      avatarImg.src = avatarURl;
      avatarImg.onload = () => {    //绘制头像
        ctx.drawImage(avatarImg, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.2) / 2 + 15, 40, 50, 50);
        ctx.fillStyle = "rgba(250, 250, 250,0)";
        ctx.font = "22px Arial";
        ctx.textAlign = "left";
        ctx.fillText(res.data[0].nickName, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.2) / 2, 120);
        //绘制用户名
      };
      wx.getGroupCloudStorage({
        shareTicket: data.data.shareTicket,
        keyList: ['data'],
        success: function (res) {
          res.data.sort(sorter); // 先排个序
          for (let i = 0; i < res.data.length; i++) {
            var avatarImg = wx.createImage();
            avatarImg.src = res.data[i].avatarUrl;
            avatarImg.onload = (function (cvs, avatarImage, i) {
              return function () { cvs.drawImage(avatarImage, data.data.gameAspect[0] * 0.11, data.data.gameAspect[0] * 0.1 + (i + 1) * 50, 35, 35); }
            })(itemCtx, avatarImg, i);  //头像

            itemCtx.fillStyle = "rgb(250, 250, 250)";
            itemCtx.font = "16px Arial";
            itemCtx.textAlign = "left";
            itemCtx.textBaseline = "top";
            itemCtx.fillText(i + 1, data.data.gameAspect[0] * 0.8, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 名次
            itemCtx.fillText(res.data[i].nickname, data.data.gameAspect[0] * 0.23, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 昵称
            itemCtx.fillText(res.data[i].KVDataList[0].value, data.data.gameAspect[0] * 0.6, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 分数
            reDrawItem(76);
          }

        },
        fail: function (err) {
          if (err) {
            console.log(err);
          }
        }
      });
    }
  })
}
function getUserData(data) {
  loadRes(data, '好友排行');
  var sharedCanvas = wx.getSharedCanvas();
  var ctx = sharedCanvas.getContext('2d');
  var avatarURl;
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    lang: 'zh_CN',
    success: function (res) {
      console.log('success', res.data)
      avatarURl = res.data[0].avatarUrl;
      // const avatarImg = wx.createImage();
      // avatarImg.src = avatarURl;
      // avatarImg.onload = () => {    //绘制头像
      //   ctx.drawImage(avatarImg, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.2) / 2 + 15, 40, 50, 50);
      //   ctx.fillStyle = "rgb(250, 250, 250)";
      //   ctx.font = "22px Arial";
      //   ctx.textAlign = "left";
      //   ctx.fillText(res.data[0].nickName, (data.data.gameAspect[0] - data.data.gameAspect[0] * 0.2) / 2, 120);
      //   //绘制用户名
      // };
      wx.getUserCloudStorage({
        keyList: ['data'],
        success: function (getData) {
          var dataValue = getData.KVDataList[0].value;
          console.log('getData', getData)
          dataValue = JSON.parse(dataValue);
          console.log('score', data)
          if (data.data.score > dataValue.score) {       //如果打破历史纪录,将新纪录保存
            wx.setUserCloudStorage({
              KVDataList: [{ key: 'data', value: JSON.stringify(data.data) }],
              success: function () {
                console.log('“打破记录,新数据已保存”');
              }
            });
          } else {
            wx.getFriendCloudStorage({
              keyList: ['data'],
              success: function (res) {
                console.log('res',res);
                //  var shareCanvas = wx.getSharedCanvas();
                // var ctx = shareCanvas.getContext('2d');
                console.log('拍讯', sorter)
                res.data.sort(sorter); // 先排个序
                for (let i = 0; i < res.data.length; i++) {
                  var avatarImg = wx.createImage();
                  avatarImg.src = res.data[i].avatarUrl;
                  avatarImg.onload = (function (cvs, avatarImage, i) {
                    console.log('avatar', res.data[i].avatarUrl)
                    return function () { cvs.drawImage(avatarImage, data.data.gameAspect[0] * 0.11, data.data.gameAspect[0] * 0.1 + (i + 1) * 50, 35, 35); }
                  })(itemCtx, avatarImg, i);  //头像
                  itemCtx.fillStyle = "rgb(250, 250, 250)";
                  itemCtx.font = "16px Arial";
                  itemCtx.textAlign = "left";
                  itemCtx.textBaseline = "top";
                  itemCtx.fillText(i + 1, data.data.gameAspect[0] * 0.8, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 名次
                  itemCtx.fillText(res.data[i].nickname, data.data.gameAspect[0] * 0.23, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 昵称
                  itemCtx.fillText(JSON.parse(res.data[i].KVDataList[0].value).score, data.data.gameAspect[0] * 0.6, data.data.gameAspect[0] * 0.1 + 6 + (i + 1) * 50); // 分数
                  
                  reDrawItem(76);
                }
              }
            });
          }
          
        }
      });
    },
    fail: (res) => {
      reject(res)
    }
  })
}
function clearShareCanvas(data) {
  var sharedCanvas = wx.getSharedCanvas();
  var ctx = sharedCanvas.getContext('2d');
  ctx.clearRect(0, 0, data.data.gameAspect[0], data.data.gameAspect[1]);
  var itemCtx = itemCanvas.getContext('2d');
  itemCtx.clearRect(0, 0, data.data.gameAspect[0], data.data.gameAspect[1]);
  wx.offTouchMove();
  wx.offTouchEnd();
}
// 排序函数（降序）
var sorter = function (data1, data2) {

  var num1 = parseInt(JSON.parse(data1.KVDataList[0].value).score);
  var num2 = parseInt(JSON.parse(data2.KVDataList[0].value).score);
  if (num1 > num2) {
    return -1;
  } else if (num1 < num2) {
    return 1;    //返回值大于0则交换两数的位置  
  } else {
    return 0;
  }
}
function Init() {
  let startY = undefined, moveY = 0;
  // 触摸移动事件
  wx.onTouchMove(e => {
    let touch = e.touches[0];
    // 触摸移动第一次触发的位置
    if (startY === undefined) {
      startY = touch.clientY + moveY;
    }
    moveY = startY - touch.clientY;
    reDrawItem(moveY);
  });
  wx.onTouchEnd(e => {
    startY = undefined;
    if (moveY < 0) { // 到顶
      moveY = 0;
    } else if (moveY > itemCanvas.height * 0.65) { // 到底
      moveY = itemCanvas.height * 0.65;
    }
    reDrawItem(moveY);
  });
}

// 因为头像绘制异步的问题，需要重新绘制
function reDrawItem(y) {
  console.log("vv" + y);
  var sharedCanvas = wx.getSharedCanvas();
  var context = sharedCanvas.getContext('2d');
  wx.getSystemInfo({
    success: function (res) {
      context.clearRect(res.windowWidth * 0.1, 140, res.windowWidth * 0.8, res.windowHeight * 0.5);
      context.fillStyle = 'rgba(255,255,255,0)';
      context.fillRect(res.windowWidth * 0.1, 140, res.windowWidth * 0.8, res.windowHeight * 0.5);
      context.drawImage(itemCanvas, 0, y, 750 - 80 * 2, res.windowHeight * 0.5, 10, 140, 750 - 80 * 2, res.windowHeight * 0.5);
      //drawImage(画布，距离左，距离上，宽度缩放，高度缩放,渲染起始点X，渲染起始点Y,横向缩放显示，纵向缩放);
  
    },
  })

}
