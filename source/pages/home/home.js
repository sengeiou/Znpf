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
    this.Base.setMyData({ showSkeleton:true});
    var api=new InstApi;
    api.homenum({},(homenum)=>{

      this.Base.setMyData({homenum});

    })
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
  onReady(){
    console.log("??????????????????");
  }
  fanyuanlist(){

    
    wx.navigateTo({
      url: '/pages/loupanlist/loupanlist'
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fanyuanlist=content.fanyuanlist;
Page(body)