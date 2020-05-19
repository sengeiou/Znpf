// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { ApiUtil } from "../../apis/apiutil";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      mobile: ""
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
  }
  fankui(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
  fuwu(){
    wx.navigateTo({
      url: '/pages/fuwuhao/fuwuhao',
    })
  }
  aboutus(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  }
  bangdin(){
    wx.navigateTo({
      url: '/pages/bangdin/bangdin',
    })
  }
  todetail(e){
    var id=e.currentTarget.id;
    wx.showToast({
      title: '暂未开放！',
      icon:'none'
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fankui = content.fankui;
body.fuwu = content.fuwu;
body.aboutus = content.aboutus;
body.bangdin = content.bangdin;
body.todetail = content.todetail;
Page(body)