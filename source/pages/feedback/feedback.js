// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '反馈问题',
    })
  }
  bindinput(e) {
    this.Base.setMyData({
      content: e.detail.value
    })
  }
  bindlianxi(e) {
    this.Base.setMyData({
      lianxi: e.detail.value
    })
  }
  tijiao() {
    var that = this;
    var content = this.Base.getMyData().content;
    var lianxi = this.Base.getMyData().lianxi;
    console.log(content, lianxi);
    var api = new MemberApi;
    if (content != "") {
      api.addfeedback({
        lianxi: lianxi,
        idea: content,
        member_id: that.Base.getMyData().memberinfo.id
      }, (ret) => {
        console.log(ret)
        if (ret) {
          wx.showToast({
            title: '意见提交成功',
            icon: 'none'
          })
          setTimeout(() => {
           wx.navigateBack({
             
           })
          }, 2000)

        }
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindinput = content.bindinput;
body.tijiao = content.tijiao;
body.bindlianxi = content.bindlianxi;
Page(body)