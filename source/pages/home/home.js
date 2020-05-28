// pages/content/content.js
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
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      showSkeleton: true
    });
    var api = new InstApi;
    api.homenum({}, (homenum) => {

      this.Base.setMyData({
        homenum
      });

    })
    api.zuixinpince({}, (zuixinpince) => {

      this.Base.setMyData({
        zuixinpince
      });
    })
    api.huxinfenxi({}, (huxinfenxi) => {

      this.Base.setMyData({
        huxinfenxi
      });
    })
    api.wenzhan({}, (wenzhan) => {

      this.Base.setMyData({
        wenzhan
      });
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
      }, () => {
        this.Base.setMyData({
          showSkeleton: false
        })
      });
    });
    api.hanpai({}, (hanpai) => {

      for (var i = 0; i < hanpai.length; i++) { 
        hanpai[i].jinguan = new Number(hanpai[i].jinguan).toFixed(1); 
      }
 
      this.Base.setMyData({
        hanpai
      });
    })

    var premisesapi = new PremisesApi;
    premisesapi.list({
      hpd1: "Y"
    }, (list) => {

      for (var i = 0; i < list.length; i++) {
        list[i].pingji = new Number(list[i].pingji).toFixed(1);
        list[i].rizhao = new Number(list[i].rizhao).toFixed(1);
        list[i].jingguan = new Number(list[i].jingguan).toFixed(1);
      }


      this.Base.setMyData({
        list
      });
    })

  }

  onReady() {
    console.log("??????????????????");
  }
  fanyuanlist(e) {

    var name = e.currentTarget.dataset.name;
    var title = e.currentTarget.dataset.title;

    wx.navigateTo({
      url: '/pages/loupanlist/loupanlist?name=' + name + "&title=" + title,
    })
  }
  gotoloupan() {

    wx.switchTab({
      url: '/pages/loupan/loupan',
    })

  }
  pincelist() {

    wx.navigateTo({
      url: '/pages/pincelist/pincelist',
    })

  }

  gomap() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  }

  todetails(e) {
    var id = e.currentTarget.id;
    var premises_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/hangpai/hangpai?type=D&nowid=' + id + '&id=' + premises_id,
    })
  }
  tosunshine(e){
    var id = e.currentTarget.id;
    var premises_id = e.currentTarget.dataset.id;
   wx.navigateTo({
     url: '/pages/sunshine/sunshine?type=D&nowid=' + id + '&id=' + premises_id,
   })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fanyuanlist = content.fanyuanlist;
body.gotoloupan = content.gotoloupan;
body.pincelist = content.pincelist;
body.gomap = content.gomap;

body.todetails = content.todetails;
body.tosunshine = content.tosunshine;

Page(body)