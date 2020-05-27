// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { PremisesApi } from "../../apis/premises.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    if(this.Base.options.id==undefined||this.Base.options.id==""){
      this.Base.setMyData({show:'A'})
    }else{
      this.Base.setMyData({show:'B'})
    }
  }

  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.guwen({ premise_id: this.Base.options.id }, (guwen)=>{
      if(guwen.length>0){
        var titlename = guwen[0].premises_name;
        this.Base.setMyData({ guwen, titlename })
      } 
    })
  }
  todetail(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/guwen/guwen?id='+id,
    })
  }
  zixun(e){
    var id = e.currentTarget.id;
    wx.showActionSheet({
      itemList: [id, "一键复制"],
      success(e) {
        if (e.tapIndex == 0) {

        } else {
          wx.setClipboardData({
            data: id,
          })
        }
      }
    })

  }
  call(e){
    var mobile = e.currentTarget.id;
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: mobile
          })
        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetail = content.todetail;
body.zixun = content.zixun;
body.call = content.call;
Page(body)