// pages/huxingfenxi/huxingfenxi.js
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
  PremisesApi
} from "../../apis/premises.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
     
    })
  }

  onMyShow() {
    var that = this;
      
    var premisesapi = new PremisesApi;
    premisesapi.housinglist({}, (huxinfenxi) => { 
      this.Base.setMyData({
        huxinfenxi
      });
    })
  }

  binddetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/huxing/huxing',
    })
     
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddetails = content.binddetails;
Page(body)