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

    this.Base.getAddress((res)=>{
      console.log("res",res);
      var mylat = res.location.lat;
      var mylng = res.location.lng;
      
      this.loaddata(mylat,mylng);

    },(failres)=>{
      console.log("failres", failres);
    });

  }
  loaddata(mylat,mylng){
    this.Base.setMyData({ mylat, mylng });

    var circlelist = [];
    for (var i = 5000; i <= 15000; i = i + 5000) {
      var circle = {
        latitude: mylat,
        longitude: mylng,
        fillColor: "#583A8033",
        radius: i
      };
      circlelist.push(circle)
    }
    this.Base.setMyData({circlelist});

    var premisesapi = new PremisesApi();
    premisesapi.list({ mylat, mylng, orderby:"distance" }, (list) => {
      var markers=[];
      for(var i=0;i<list.length;i++){
        if (1==1||list[i].distance<15000){

          markers.push({
            id: list[i].id,
            latitude: list[i].lat,
            longitude: list[i].lng,
            iconPath: "/images/icons/a.png",
            width: 1,
            height: 1,
            title:list[i].name,
            callout:{
              content: list[i].name + "\n" + "¥" + list[i].avg_price,
              color:"#161616",
              fontSize:11,
              borderRadius:4,
              bgColor:"#FCE4D1",
              padding:2,
              display:"ALWAYS",
              textAlign:"center"
            }
          });
        }
      }

      this.Base.setMyData({ markers });

    })
  }
  callouttap(e){
    console.log(e);
    var markerId=e.detail.markerId;
    var markerlist=this.Base.getMyData().markers;

    for(var i=0;i<markerlist.length;i++){
      if(markerlist[i].id==markerId){
        wx.showModal({
          content: '是否现在查看' + markerlist[i].title+"?",
          success:function(e){
            if(e.confirm){
              wx.navigateTo({
                url: '/pages/premises-details/premises-details?id=' + markerId,
              })
            }
          }
        })
        return;
      }
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.loaddata = content.loaddata;
body.callouttap = content.callouttap;
Page(body)