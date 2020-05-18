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
  onMyShow() {
    var that = this;
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '入驻知鸟',
    })
  }
  todetail(e){
    var id=e.currentTarget.id;
    if(id=='A'){
      wx.navigateTo({
        url: '/pages/guwenruzhu/guwenruzhu',
      })
    }else {
      wx.navigateTo({
        url: '/pages/jingjirenruzhu/jingjirenruzhu',
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetail = content.todetail;
Page(body)