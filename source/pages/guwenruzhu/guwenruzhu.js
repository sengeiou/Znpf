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
    this.Base.setMyData({
      city:'',
      mobile:'',
      name:'',
      weixinhao:'',
      tuijianphone:'',
      jiesao:''
    })
  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.citylist({}, (citylist)=>{
      this.Base.setMyData({ citylist})
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '入驻知鸟',
    })
  }
  bindPickerChange(e){
    console.log(e);
    var index = e.detail.value;
    var citylist = this.Base.getMyData().citylist;
    this.Base.setMyData({
      city: citylist[index].name
    })
  }
  why(){
    wx.navigateTo({
      url: '/pages/whyruzhu/whyruzhu',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindPickerChange = content.bindPickerChange;
body.why = content.why;
Page(body)