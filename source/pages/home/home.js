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
    this.Base.setMyData({ showSkeleton:true});
    var api=new InstApi;
    api.homenum({},(homenum)=>{

      this.Base.setMyData({homenum});

    })
    api.zuixinpince({},(zuixinpince)=>{

      this.Base.setMyData({zuixinpince});
    })
    api.huxinfenxi({},(huxinfenxi)=>{

      this.Base.setMyData({huxinfenxi});
    })
    api.wenzhan({},(wenzhan)=>{

      this.Base.setMyData({wenzhan});
    })
    api.hanpai({},(hanpai)=>{

      this.Base.setMyData({hanpai});
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
      },()=>{
        this.Base.setMyData({showSkeleton:false})
      });
    });

    var premisesapi=new PremisesApi;
    premisesapi.list({hpd1:"Y"},(list)=>{
       
      this.Base.setMyData({list});

    })

  }
  
  onReady(){
    console.log("??????????????????");
  }
  fanyuanlist(e){
   
   var name=e.currentTarget.dataset.name;
   var title=e.currentTarget.dataset.title;
    
    wx.navigateTo({
      url: '/pages/loupanlist/loupanlist?name='+name+"&title="+title,
    })
  }
  gotoloupan(){

     wx.switchTab({
       url: '/pages/loupan/loupan',
     })

  }
  pincelist(){
 
    wx.navigateTo({
      url: '/pages/pincelist/pincelist',
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fanyuanlist=content.fanyuanlist;
body.gotoloupan=content.gotoloupan;
body.pincelist=content.pincelist;
Page(body)