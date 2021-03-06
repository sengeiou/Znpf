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
    var name = options.name;
    var title = options.title;
    var id=options.id;
    this.Base.setMyData({ name, title,id });
    var api = new PremisesApi;
    api.label({}, (label1) => {
      if (getCurrentPages().length != 0) {
        //刷新当前页面的数据
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      this.Base.setMyData({
        label1
      });
      }
    })
    
    var instapi = new InstApi;
    instapi.zonjia({}, (zonjia) => { 
      for(var i=0;i<zonjia.length;i++){
        zonjia[i].checked=false;
      }
      this.Base.setMyData({
        pricearraylist:zonjia,selectpricearraylist:zonjia
      }); 
    })

    this.Base.setMyData({
      orderby:"",
      city_id: 0,
      street_id: 0,
      district_id: 0,
      city: null,
      street: null,
      district: null,
      selectcity_id: 0,
      selectstreet_id: 0,
      selectdistrict_id: 0,
      selectcity: null,
      selectstreet: null,
      selectdistrict: null,
      selectdiquname:"区域",
      minprice:"",maxprice:"",
     
      selectminprice: "", selectmaxprice: "",
      
      selectprice: "价格",
    });



    var instApi = new InstApi();

    instApi.allsearchlabels({type:'A,C'},(labeltypelist)=>{
      this.Base.setMyData({
        labeltypelist: labeltypelist,
        selectlabeltypelist: labeltypelist,
        selectlabels:"筛选"
      });
    });



    instApi.cityall({}, (citylist) => {
      this.Base.setMyData({
        citylist
      });

      this.Base.getAddress((address) => {
        console.log("address", address);
        for(var i=0;i<citylist.length;i++){
          if(citylist[i].code==address.ad_info.adcode.substr(0,4)+"00"){
            AppBase.CITYID = citylist[i].code;
            console.log("setCITYID", AppBase.CITYID );
          }
        }
        this.getloupan();
      }, () => {
        this.getloupan();
      });


    });

    


  }

  onMyShow() {
    var that = this;
    

  }




  getloupan() {
    var api = new PremisesApi();
    var json={};
    var data=this.Base.getMyData();
    if(data.selectcity_id>0){
      json.city_id=data.selectcity_id;
    }else{
      json.city_id = AppBase.CITYID;
    }
    if(data.selectdistrict_id>0){
      json.district_id=data.selectdistrict_id;
    }
    if (data.street_id > 0) {
      json.street_id = data.selectstreet_id;
    }

    if(data.minprice!=''||data.maxprice!=''){
      if(data.minprice!=''){
        json.minprice=data.selectminprice;
      } 
      if (data.maxprice != '') {
        json.maxprice = data.selectmaxprice;
      } 
    }else{
      var pricerange=[];
      for (var i = 0; i < data.selectpricearraylist.length;i++){
        if (data.selectpricearraylist[i].checked==true){
          pricerange.push(data.selectpricearraylist[i].min + "-" + data.selectpricearraylist[i].max);
        }
      }
      if(pricerange.length>0){
        json.pricerange = pricerange.join(",");
      }
    }
    var labels=[];
    var labeltypelist = data.selectlabeltypelist;
    for (var i = 0; i < labeltypelist.length; i++) {
      for (var j = 0; j < labeltypelist[i].labels.length; j++) {
        if (labeltypelist[i].labels[j].checked == true) {
          labels.push(labeltypelist[i].labels[j].id);
        }
      }
    }
    if(labels){
      json.searchlabel=labels.join(",");
    }
    if(data.orderby==""){
      json.orderby="r_main.seq";
    }else{
      json.orderby = "loupanprice " + data.orderby;
    }
    console.log("data.orderby", data.orderby, json.orderby);


   

    api.list(json,(list)=>{
      this.Base.setMyData({list});
    });    

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
  btnShaixuan(e) {
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

  selectcity(e) {
    console.log(e);
    var city_id = e.currentTarget.dataset.city_id;

    if (this.Base.getMyData().city_id == city_id) {
      return;
    }
    var citylist = this.Base.getMyData().citylist;
    for (var i = 0; i < citylist.length; i++) {
      if (citylist[i]["id"] == city_id) {
        this.Base.setMyData({
          city_id,
          city: citylist[i],
          district_id: 0,
          district: null
        });
        return;
      }
    }

    this.Base.setMyData({
      city_id: 0,
      city: null,
      district_id: 0,
      district: null,
      street_id: 0,
      street: null
    })
  }


  selectdistrict(e) {
    console.log(e);
    var district_id = e.currentTarget.dataset.district_id;

    if (this.Base.getMyData().district_id == district_id) {
      return;
    }
    var city_id = this.Base.getMyData().city_id;
    var citylist = this.Base.getMyData().citylist;
    for (var i = 0; i < citylist.length; i++) {
      if (citylist[i]["id"] == city_id) {
        for (var j = 0; j < citylist[i].districtlist.length; j++) {
          console.log(citylist[i].districtlist[j]["id"], district_id);
          if (citylist[i].districtlist[j]["id"] == district_id) {

            this.Base.setMyData({
              city_id,
              city: citylist[i],
              district_id: district_id,
              district: citylist[i].districtlist[j],
              street_id: 0,
              street: null
            });
            return;
          }
        }
      }
    }
    this.Base.setMyData({
      district_id: 0,
      district: null,
      street_id: 0,
      street: null
    });
  }





  selectstreet(e) {
    console.log(e);
    var street_id = e.currentTarget.dataset.street_id;

    if (this.Base.getMyData().street_id == street_id) {
      return;
    }
    var city_id = this.Base.getMyData().city_id;
    var district_id = this.Base.getMyData().district_id;
    var citylist = this.Base.getMyData().citylist;
    for (var i = 0; i < citylist.length; i++) {
      if (citylist[i]["id"] == city_id) {
        for (var j = 0; j < citylist[i].districtlist.length; j++) {
          console.log(citylist[i].districtlist[j]["id"], district_id);
          if (citylist[i].districtlist[j]["id"] == district_id) {
            for (var k = 0; k < citylist[i].districtlist[j].streetlist.length; k++) {
              console.log(citylist[i].districtlist[j]["id"], district_id);
              if (citylist[i].districtlist[j].streetlist[k].id == street_id) {
                this.Base.setMyData({
                  city_id,
                  city: citylist[i],
                  district_id: district_id,
                  district: citylist[i].districtlist[j],
                  street_id: street_id,
                  street: citylist[i].districtlist[j].streetlist[k]
                });
                return;
              }

            }
          }
        }
      }
    }
    this.Base.setMyData({
      street_id: 0,
      street: null
    });
  }
  setcity(){
    var data=this.Base.getMyData();
    var name="区域";
    if(data.city!=null){
      name = data.city.name;
    }
    if (data.district != null) {
      name = data.district.name;
    }
    if (data.street != null) {
      name = data.street.name;
    }
    this.Base.setMyData({
      selectdiquname:name,
      selectcity_id: data.city_id,
      selectdistrict_id: data.district_id,
      selectstreet_id: data.street_id,
      selectcity: data.city,
      selectdistrict: data.district,
      selectstreet: data.street,
      cityselect:false,
      priceselect: false,
      labelselect: false,
    });

    this.getloupan();
  }

  showCitySelect(){

    var data = this.Base.getMyData();
    this.Base.setMyData({cityselect:true,
      priceselect: false,
      labelselect: false,
      city_id: data.selectcity_id,
      district_id: data.selectdistrict_id,
      street_id: data.selectstreet_id,
      city: data.selectcity,
      district: data.selectdistrict,
      street: data.selectstreet
    });

  }
  closecityselect(){
    this.Base.setMyData({
      cityselect:false,
      priceselect: false,
      labelselect: false,
    });
  }
  checkPricearrange(e){
    var idx=e.currentTarget.id;
    var pricearraylist = this.Base.getMyData().pricearraylist;
    pricearraylist[idx].checked = pricearraylist[idx].checked==true?false:true;
    this.Base.setMyData({ pricearraylist,minprice:"",maxprice:""});
  }

  setminprice(e) {
    var pricearraylist = this.Base.getMyData().pricearraylist;
    for (var i = 0; i < pricearraylist.length;i++){
      pricearraylist[i].checked=false;
    }
    this.Base.setMyData({ minprice: e.detail.value, pricearraylist});
  }
  setmaxprice(e) {
    var pricearraylist = this.Base.getMyData().pricearraylist;
    for (var i = 0; i < pricearraylist.length; i++) {
      pricearraylist[i].checked = false;
    }
    this.Base.setMyData({ maxprice: e.detail.value, pricearraylist });
  }
  showPriceSelect(){
    var data = this.Base.getMyData();
    this.Base.setMyData({
      priceselect: true,
      cityselect:false,
      labelselect: false,
      minprice: data.selectminprice,
      maxprice: data.selectmaxprice,
      pricearraylist: data.selectpricearraylist
    });
  }
  closepriceselect() {
    this.Base.setMyData({
      cityselect:false,
      priceselect: false,
      labelselect: false,
    });
  }
  setPriceOption(){
    var data = this.Base.getMyData();
    var selectprice="价格";
    if (data.minprice != '' && data.maxprice != '') {
      selectprice = data.minprice + "-" + data.maxprice+"万";
    }else if (data.minprice != '') {
      selectprice = data.minprice + "万起";
    } else if (data.maxprice != '') {
      selectprice = data.maxprice + "万内";
    } else {
      for (var i = 0; i < data.pricearraylist.length; i++) {
        if (data.pricearraylist[i].checked == true) {
          selectprice = data.pricearraylist[i].name;
          break;
        }
      }
    }


    this.Base.setMyData({
      selectprice,
      cityselect:false,
      priceselect: false,
      labelselect: false,
      selectminprice: data.minprice,
      selectmaxprice: data.maxprice,
      selectpricearraylist: data.pricearraylist
    });

    this.getloupan();
  }

  showlabels() {
    var data = this.Base.getMyData();
    this.Base.setMyData({
      cityselect:false,
      priceselect: false,
      labelselect: true,
      labeltypelist: data.selectlabeltypelist
    });
  }
  closelabels() {
    this.Base.setMyData({
      cityselect:false,
      priceselect: false,
      labelselect: false
    });
  }
  selectlabel(e){
    var id=e.currentTarget.id.split("_");
    var x=id[0];
    var y = id[1];
    var data = this.Base.getMyData();
    data.labeltypelist[x].labels[y].checked = data.labeltypelist[x].labels[y].checked==true?false:true;
    this.Base.setMyData({ labeltypelist: data.labeltypelist });
  }

  setLabels(e){
    var k=[];
    var selectlabels="筛选";
    var data = this.Base.getMyData();
    var labeltypelist=data.labeltypelist;
    for(var i=0;i<labeltypelist.length;i++){
      for (var j = 0; j < labeltypelist[i].labels.length; j++) {
        if (labeltypelist[i].labels[j].checked==true){
          k.push(labeltypelist[i].labels[j].name);
        }
      }
    }
    if(k.length>0){
      selectlabels=k.join(",");
    }
    this.Base.setMyData({
      cityselect:false,
      priceselect: false,
      labelselect: false,
      selectlabels,
      selectlabeltypelist: labeltypelist
    });
    this.getloupan();
  }

  changeorderby(e){
    var orderby = e.currentTarget.dataset.orderby;
    this.Base.setMyData({ orderby,
      cityselect:false,
      priceselect: false,
      labelselect: false})
    this.getloupan();
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
body.btnShaixuan = content.btnShaixuan;
body.guanbi = content.guanbi;
body.xuanzequyu = content.xuanzequyu;
body.getcanshu = content.getcanshu;
body.danshuan = content.danshuan;
body.xuanzedanjia = content.xuanzedanjia;
body.xuanzezonjia = content.xuanzezonjia;
body.selectcity = content.selectcity;
body.selectdistrict = content.selectdistrict;
body.selectstreet = content.selectstreet; 
body.setcity = content.setcity; 
body.showCitySelect = content.showCitySelect; 
body.closecityselect = content.closecityselect;
body.checkPricearrange = content.checkPricearrange;
body.showPriceSelect = content.showPriceSelect;
body.closepriceselect = content.closepriceselect; 
body.setminprice = content.setminprice; 
body.setmaxprice = content.setmaxprice;
body.setPriceOption = content.setPriceOption;
body.showlabels = content.showlabels; 
body.closelabels = content.closelabels; 
body.selectlabel = content.selectlabel; 
body.setLabels = content.setLabels;
body.changeorderby = content.changeorderby;
Page(body)