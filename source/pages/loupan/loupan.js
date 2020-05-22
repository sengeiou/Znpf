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
    var api=new PremisesApi;
    api.label({},(label1)=>{

       this.Base.setMyData({label1});

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
  
    var api=new PremisesApi;
     api.list({},(list)=>{
        
       this.Base.setMyData({list});

     })




  }

 loupanxianqin(){
   wx.navigateTo({
     url: '/pages/premises-details/premises-details',
   })
 }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.loupanxianqin=content.loupanxianqin;
Page(body)