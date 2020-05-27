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
    if (this.Base.getMyData().memberinfo.nickName==''){
      this.Base.toast('请授权');
      return
    }
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
  fuwu(){
    if (this.Base.getMyData().memberinfo.nickName == '') {
      this.Base.toast('请授权登录');
      return
    }
    wx.navigateTo({
      url: '/pages/fuwuhao/fuwuhao',
    })
  }
  aboutus(){
    if (this.Base.getMyData().memberinfo.nickName == '') {
      this.Base.toast('请授权');
      return
    }
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  }
  bangdin(){
    if (this.Base.getMyData().memberinfo.nickName == '') {
      this.Base.toast('请授权');
      return
    }
    wx.navigateTo({
      url: '/pages/bangdin/bangdin',
    })
  }
  todetail(e){
    if (this.Base.getMyData().memberinfo.nickName == '') {
      this.Base.toast('请授权');
      return
    }
    var id=e.currentTarget.id;
    wx.showToast({
      title: '暂未开放！',
      icon:'none'
    })
  }
  wodeguanzhu(){
    wx.navigateTo({
      url: '/pages/wodeguanzhu/wodeguanzhu',
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
body.wodeguanzhu=content.wodeguanzhu;
Page(body)