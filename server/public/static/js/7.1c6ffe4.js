webpackJsonp([7],{Amy6:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,"",""])},"n//m":function(e,t,n){var i=n("Amy6");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("52bf8616",i,!0,{})},vaq1:function(e,t,n){"use strict";function i(e){n("n//m")}Object.defineProperty(t,"__esModule",{value:!0});var s=n("BUx0"),a=n("Wby1"),o={data:function(){return{activeIndex:"buyCard"}},components:{menuView:a.a,userTop:s.a},watch:{$route:function(e,t){this.setMenuActive()}},mounted:function(){this.setMenuActive()},methods:{setMenuActive:function(){if(this.activeIndex=this.$route.name,"cardDetail"==this.activeIndex){var e=this.$route.query.type;this.activeIndex="buy"==e?"buyCard":"sellCard"}},updateUserinfo:function(){this.$refs.userTop.getUserInfo()},handleSelect:function(e,t){this.$router.push({name:e})}}},r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"common_body"},[n("userTop",{ref:"userTop"}),e._v(" "),n("h5",{staticClass:"common_title type_shop"},[e._v("星星卡牌交易市场")]),e._v(" "),n("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"horizontal"},on:{select:e.handleSelect}},[n("el-menu-item",{attrs:{index:"buyCard"}},[e._v("买卡")]),e._v(" "),n("el-menu-item",{attrs:{index:"sellCard"}},[e._v("卖卡")])],1),e._v(" "),n("div",[n("router-view",{on:{updateUserinfo:e.updateUserinfo}})],1),e._v(" "),n("menuView")],1)},u=[],c={render:r,staticRenderFns:u},d=c,l=n("VU/8"),v=i,f=l(o,d,!1,v,"data-v-9029d552",null);t.default=f.exports}});