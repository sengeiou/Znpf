// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { PremisesApi } from "../../apis/premises.api.js";

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
      jiesao:'',
      loupan:'',
      premises_id:'',
      city_id:'',
      erweima:'',
      minpai:''
    })
  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.citylist({}, (citylist)=>{
      this.Base.setMyData({ citylist})
    })
    var premisesapi = new PremisesApi;
    premisesapi.list({}, (list)=>{
      this.Base.setMyData({ list})
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '入驻知鸟',
    })
  }
  bindPickerChange(e){
    var index = e.detail.value;
    var citylist = this.Base.getMyData().citylist;
    this.Base.setMyData({
      city: citylist[index].name,
      city_id: citylist[index].id,
    })
  }
  bindPickerChange2(e){
    var index = e.detail.value;
    var list = this.Base.getMyData().list;
    this.Base.setMyData({
      loupan: list[index].name,
      premises_id:list[index].id
    })
  }
  why(){
    wx.navigateTo({
      url: '/pages/whyruzhu/whyruzhu',
    })
  }
  nameFn(e){
    this.Base.setMyData({
      name:e.detail.value
    })
  }
  weixinFn(e){
    this.Base.setMyData({
      weixinhao: e.detail.value
    })
  }
  tuiphoneFn(e){
    this.Base.setMyData({
      tuijianphone: e.detail.value
    })
  }
  jiesaoFn(e){
    this.Base.setMyData({
      jiesao: e.detail.value
    })
  }
  bindpic(e) {
   
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        erweima: ret,
      });

    }, undefined, ['album', 'camera']);

  } 
  bindpic2(e) {
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      that.Base.setMyData({
        minpai: ret,
      });

    }, undefined, ['album', 'camera']);

  } 
  tijiao(){
    var name = this.Base.getMyData().name;
    var city_id = this.Base.getMyData().city_id;
    var mobile = this.Base.getMyData().mobile;
    var weixinhao = this.Base.getMyData().weixinhao;
    var tuijianphone = this.Base.getMyData().tuijianphone;
    var jiesao = this.Base.getMyData().jiesao;
    var premises_id = this.Base.getMyData().premises_id;
    var erweima = this.Base.getMyData().erweima;
    var minpai = this.Base.getMyData().minpai;
    var api=new MemberApi;
    if (city_id.trim() == '') {
      this.toast('请选择城市');
      return
    }
    if(name.trim()==''){
      this.toast('请输入姓名');
      return
    }
    
    if (mobile.trim() == '') {
      this.toast('请输入获取手机号');
      return
    }
    if (weixinhao.trim() == '') {
      this.toast('请输入微信号');
      return
    }
    if (premises_id.trim() == '') {
      this.toast('请选择楼盘');
      return
    }
    api.addguwen({
      name,
      city_id,
      mobile,
      weixinhao,
      tuijianphone,
      jiesao,
      premises_id,
      erweima,
      minpai
    },(res)=>{
      console.log(res)
      if(res.code=='0'){
        wx.navigateBack({
          
        })
        wx.showToast({
          title: '提交成功！',
          icon:'none'
        })
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindPickerChange = content.bindPickerChange;
body.why = content.why;
body.nameFn = content.nameFn;
body.weixinFn = content.weixinFn;
body.tuiphoneFn = content.tuiphoneFn;
body.jiesaoFn = content.jiesaoFn;
body.bindPickerChange2 = content.bindPickerChange2;
body.bindpic = content.bindpic;
body.bindpic2 = content.bindpic2;
body.tijiao = content.tijiao;
Page(body)