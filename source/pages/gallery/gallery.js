// pages/gallery/gallery.js
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
    //options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      nowidx: "A"
    })
  }

  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi();

    premisesapi.info({
      id: this.Base.options.id
    }, (info) => {




      var list = info.gallery;
      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;
      for (var i = 0; i < list.length; i++) {

        if (list[i].type == "A") {
          a++
        } else if (list[i].type == "B") {
          b++
        } else if (list[i].type == "C") {
          c++
        } else {
          d++
        }

      }

      this.Base.setMyData({
        info,
        a,
        b,
        c,
        d
      });
    })

    premisesapi.shoucanglist({premises_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

    premisesapi.huxinfenlei({
      premises_id: this.Base.options.id
    }, (fllist) => {
      var hxnum=0;
      for(var i=0;i<fllist.length;i++){
        
        var tuku=fllist[i].tuku;
        for(var j=0;j<tuku.length;j++){
          hxnum++
        }

      }
    this.Base.setMyData({fllist,hxnum})
    })



  }

  bindorder(e) {
    var nowidx = e.currentTarget.id;
    this.Base.setMyData({
      nowidx
    })
  }

  dianji(e) {
    var img = e.currentTarget.id;
  console.log(e);
    wx.previewImage({
      urls: [img],
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.dianji=content.dianji;
Page(body)