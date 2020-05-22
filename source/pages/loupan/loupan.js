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
    var api = new PremisesApi;
    api.label({}, (label1) => {

      this.Base.setMyData({
        label1
      });

    })
    this.Base.setMyData({
      scrollTop: 0
    });
    this.getcanshu();
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

    api.qu({
      city_id: AppBase.CITYID
    }, (qu) => {
      qu.unshift({
        id: "0",
        name: "不限"
      })
      this.Base.setMyData({
        qu,

      });

    })

    this.getloupan();

    this.Base.setMyData({
      quid: 0,
      danshuan: 0,
      danjiaid: 0,
      zonjiaid: 0,
    })




  }




  getloupan() {
    var api = new PremisesApi;
    var city_id = AppBase.CITYID;
    var quid = this.Base.getMyData().quid;
    var danjiaid = this.Base.getMyData().danjiaid;
    var zonjiaid = this.Base.getMyData().zonjiaid;
    var danjiaqujian = this.Base.getMyData().danjiaqujian;
    var zonjiaqujian = this.Base.getMyData().zonjiaqujian;
    var json = {};
    json.city_id = city_id;

    if (quid > 0) {
      json.cityqu_id = quid;
    }
    console.log(danjiaid);
    console.log("hhaha");
    if (danjiaid > 0) {
      json.danjia = danjiaqujian;
    }

    if (zonjiaid > 0) {
      json.zonjia = zonjiaqujian;
    }


    api.list(json, (list) => {
      var list1 = [];
      for (var i = 0; i < 10; i++) {
        list1.push(list[0]);
      }
      this.Base.setMyData({
        list,
        list1
      });


    })

  }
  loupanxianqin() {
    wx.navigateTo({
      url: '/pages/premises-details/premises-details',
    })
  }
  xuanzechenshi() {

    wx.navigateTo({
      url: '/pages/xuanzechenshi/xuanzechenshi',
    })

  }
  onPageScroll(e) {
    console.log(e.scrollTop);
    this.setData({
      scrollTop: e.scrollTop
    })


  }
  shaixuan(e) {
    var id = e.currentTarget.dataset.id;
    var shaixuan = this.Base.getMyData().shaixuan;
    var shaixuanid = this.Base.getMyData().shaixuanid;
    if (shaixuan == true && shaixuanid == id) {
      this.guanbi();
      return
    }
    this.Base.setMyData({
      shaixuan: true,
      shaixuanid: id
    });
    this.scroll();

  }
  scroll() {

    wx.pageScrollTo({
      scrollTop: 183,
      duration: 0
    })
  }
  guanbi() {
    this.Base.setMyData({
      shaixuan: false,
      shaixuanid: 0
    });
  }
  xuanzequyu(e) {

    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    this.Base.setMyData({
      quid: id,
      quname: name
    })
    this.getloupan();
    this.guanbi();
  }
  xuanzedanjia(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var qujian = e.currentTarget.dataset.qujian;
    this.Base.setMyData({
      danjiaid: id,
      jiagename: name,
      danjiaqujian: qujian,
    })
    this.getloupan();
    this.guanbi();
  }
  xuanzezonjia(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var qujian = e.currentTarget.dataset.qujian;
    this.Base.setMyData({
      zonjiaid: id,
      jiagename: name,
      zonjiaqujian: qujian,
    })
    this.getloupan();
    this.guanbi();
  }
  getcanshu() {
    var api = new InstApi;
    api.danjia({}, (danjia) => {

      danjia.unshift({
        id: "0",
        name: "不限"
      })
      this.Base.setMyData({
        danjia
      })
    })
    api.zonjia({}, (zonjia) => {

      zonjia.unshift({
        id: "0",
        name: "不限"
      })
      this.Base.setMyData({
        zonjia
      })
    })
  }
  danshuan(e) {
    var id = e.currentTarget.dataset.id;

    this.Base.setMyData({
      danshuan: id,
      danjiaid: 0,
      zonjiaid: 0,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.loupanxianqin = content.loupanxianqin;
body.xuanzechenshi = content.xuanzechenshi;
body.getloupan = content.getloupan;
body.onPageScroll = content.onPageScroll;
body.scroll = content.scroll;
body.shaixuan = content.shaixuan;
body.guanbi = content.guanbi;
body.xuanzequyu = content.xuanzequyu;
body.getcanshu = content.getcanshu;
body.danshuan = content.danshuan;
body.xuanzedanjia = content.xuanzedanjia;
body.xuanzezonjia = content.xuanzezonjia;
Page(body)