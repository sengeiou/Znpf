// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '关注服务号',
    })
    
  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.fuwuhao({}, (fuwuhao) => {
      // var img = ApiConfig.GetUploadPath() + 'inst/' + fuwuhao.img;
      // wx.previewImage({
      //   urls: [img],
      // })
      this.Base.setMyData({ fuwuhao })
    })
   
  }
  saveimg(e){
    var url = e.currentTarget.id;
    wx.downloadFile({
      url: url,
      success: function (res) {
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            setTimeout(()=>{
              wx.showToast({
                title: '已保存到相册',
              });
            },2000)
           
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.saveimg = content.saveimg;
Page(body)