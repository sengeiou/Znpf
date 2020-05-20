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
    var api=new InstApi();

     api.xuanfanlist({},(xuanfanlist)=>{

       this.Base.setMyData({xuanfanlist})
     })
  }
  onMyShow() {
    var that = this;
  }
  fanyuanlist(e){

    var id=e.currentTarget.dataset.id;
   var title=e.currentTarget.dataset.title;
    
    wx.navigateTo({
      url: '/pages/loupanlist/loupanlist?id='+id+"&title="+title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.fanyuanlist=content.fanyuanlist;
Page(body)