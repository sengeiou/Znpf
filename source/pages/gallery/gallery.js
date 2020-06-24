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
      nowidx: 0,
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
    })
  }

  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi();
    premisesapi.gallerytype({}, (gallerytype)=>{
      gallerytype.unshift({
       id:0,
       name:'户型',
      })
      for(var i=0;i<gallerytype.length;i++){
        gallerytype[i].num = 0;
        gallerytype[i].list = [];
        
      }
      // this.Base.setMyData({ gallerytype});
      premisesapi.info({
        id: this.Base.options.id
      }, (info) => {




        var list = info.gallery;
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        for (var i = 0; i < list.length; i++) {
          for(var j=0;j<gallerytype.length;j++){
            // gallerytype[j].num=0;
            if(gallerytype[j].id==list[i].type_id){
              gallerytype[j].num++;
              gallerytype[j].list.push(list[i])
            }
          }
          // if (list[i].type_name == "效果图") {
          //   a++
          // } else if (list[i].type_name == "样板间") {
          //   b++
          // } else if (list[i].type_name == "区位") {
          //   c++
          // } else {
          //   d++
          // }

        }

        this.Base.setMyData({
          info,
          a,
          b,
          c,
          d,
          // gallerytype
        });
        premisesapi.huxinfenlei({
          premises_id: this.Base.options.id
        }, (fllist) => {
          var hxnum = 0;
          for (var i = 0; i < fllist.length; i++) {

            var tuku = fllist[i].tuku;
            for (var j = 0; j < tuku.length; j++) {
              hxnum++
            }

          }
          gallerytype[0].num = hxnum;
          gallerytype[0].list = fllist;
          this.Base.setMyData({ fllist, hxnum, gallerytype })
        })
      })
      
    })
    

    premisesapi.shoucanglist({premises_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

   



  }

  bindorder(e) {
    var nowidx = e.currentTarget.id;
    this.Base.setMyData({
      nowidx
    })
    var query = wx.createSelectorQuery().in(this);
    var that = this;
    console.log(query);
    query.select("#c" + nowidx).boundingClientRect();
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        if (res[i] != null) {
          if ('c'+nowidx == res[i].id) {
            wx.pageScrollTo({
              scrollTop: res[i].top-150,
              duration: 300,
            })
          }
        }

      }

    }); 
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