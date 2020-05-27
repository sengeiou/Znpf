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
  }

  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi;
    premisesapi.guwendetail({ id: this.Base.options.id }, (guwendetail)=>{
      this.Base.setMyData({ guwendetail})
    })

    premisesapi.guwenlist({guwen_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

  }
  shoucangguwen(e){
    var premisesapi=new PremisesApi();
    var id=e.currentTarget.id;
    
    premisesapi.shoucangguwen({guwen_id:id},ret=>{
      console.log(ret);
      if(ret.code==0){
        this.Base.toast('收藏成功');
      }else if(ret.code==1){
        this.Base.toast('取消收藏');
      }else{
        this.Base.toast('操作失败');
      }
      
      this.onMyShow();
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
body.zixun = content.zixun;
body.call = content.call;

body.shoucangguwen = content.shoucangguwen;
Page(body)