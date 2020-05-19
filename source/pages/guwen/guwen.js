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
      title: '',
    })
  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.fuwuhao({}, (fuwuhao) => {
      this.Base.setMyData({ fuwuhao })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)