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
    //options.id=5
    this.Base.setMyData({
      show: "fy",
    })
  }
  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi;
    premisesapi.shoucanglist({
      
    }, (shoucanglist) => {
      // 此段勿删
      // var arr2 = []
      // var arr = []
      // for (var i = 0; i < ret.length; i++) {
      //   if (ret[i].premises_premisestype_id == 2) {
      //     arr.push(ret[i]);
      //   }
      //   if (ret[i].premises_premisestype_id != 2) {
      //     arr2.push(ret[i]);
      //   }
      // }
      // this.Base.setMyData({
      //   list2: arr
      // })
      // this.Base.setMyData({
      //   list: arr2
      // })
      this.Base.setMyData({shoucanglist})

    })

    premisesapi.guwenlist({  
      
    }, (ret) => {
      this.Base.setMyData({
        list3: ret
      })
    })

  }
  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    if (type == "fy") {
      this.Base.setMyData({
        show: "fy"
      })
    }
    if (type == "esf") {
      this.Base.setMyData({
        show: "esf"
      })
    }
    if (type == "gw") {
      this.Base.setMyData({
        show: "gw"
      })
    }

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
body.bindshow = content.bindshow;
body.zixun = content.zixun;
body.call = content.call;
Page(body)