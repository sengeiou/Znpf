// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');
import { ApiUtil } from "../../apis/apiutil.js";
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
    this.getinfo();

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '关于我们',
    })
  }
  getinfo() {
    var api = new InstApi;
    var that = this;
    api.aboutus({ id: 1 }, (list) => {

      list.content = ApiUtil.HtmlDecode(list.content);
      WxParse.wxParse('content', 'html', list.content, that, 10);
      
      that.Base.setMyData({
        list: list
      })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;

Page(body)