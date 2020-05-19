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
    var api = new InstApi;
    api.indexbanner({
      orderby: 'r_main.seq'
    }, (indexbanner) => {
      this.setData({
        indexbanner: indexbanner
      },()=>{

        this.Base.setMyData({showSkeleton:false})

      });
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)