(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1025:function(e,t,r){"use strict";r.r(t);var a=r(114),n=r(115),c=r(118),i=r(116),o=r(117),l=r(131),u=r(1),y=r.n(u),s=r(152),h=r(929),p=r.n(h),d=r(952),f=r(949),v=r(151),m=r.n(v),P=r(119),g=Object(P.a)();var b={getPrivacyPolicy:function(e,t){return function(e){var t;Object(P.c)()?t="/api/v1/privacyPolicy":(t="/api/v1/globalPrivacyPolicy",g={}),e({type:"FETCH_PRIVACY_POLICY"}),m.a.get("".concat(t,"?_format=json"),g).then(function(t){e({type:"FETCH_PRIVACY_POLICY_SUCCESS",payload:t.data})}).catch(function(t){e({type:"FETCH_PRIVACY_POLICY_FAILURE",payload:t.response}),e({type:"ADD_ERROR",payload:t})})}}},E=r(960),w=r(961),k=r(969),O=(r(989),function(e){function t(e){var r;return Object(a.a)(this,t),(r=Object(c.a)(this,Object(i.a)(t).call(this,e))).state={data:e.data,preview:0,nid:0,market:""},r.createMarkup=r.createMarkup.bind(Object(l.a)(Object(l.a)(r))),r.getRenderPrivacyPolicy=r.getRenderPrivacyPolicy.bind(Object(l.a)(Object(l.a)(r))),r}return Object(o.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=p.a.parse(this.props.location.search),t=e.preview,r=e.nid,a=e.market;this.setState({market:a}),t&&this.setState({preview:t,data:this.props.policy,nid:r,market:a}),this.props.getPrivacyPolicy()}},{key:"createMarkup",value:function(e){return{__html:e}}},{key:"getRenderPrivacyPolicy",value:function(){var e=this.props,t=e.policy,r=e.fetchingPolicy;if(e.fetchedPolicy){var a=this.state.market;if(t&&0!==t.length){var n="";if(void 0!==a){var c=t.filter(function(e){return Number(e.mid)===Number(a)});if(n=c[0],0===c.length)return Object(E.a)()}else n=t[0];return y.a.createElement(y.a.Fragment,null,y.a.createElement("h1",{className:"page-title",dangerouslySetInnerHTML:this.createMarkup(n.title)}),y.a.createElement(d.a,{tag:"h3",className:"brand-title text-center"},n.market),y.a.createElement(f.a,{className:"description",dangerouslySetInnerHTML:this.createMarkup(n.body)}))}if(0===t.length)return Object(E.a)()}else if(r)return y.a.createElement(y.a.Fragment,null,y.a.createElement(w.a,null),y.a.createElement(k.a,null))}},{key:"render",value:function(){return y.a.createElement("div",{className:"privacy-policy-wrapper static-content"},this.getRenderPrivacyPolicy())}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=t;return r&&e.fetchedPolicy&&null!==e.policy?{tnc:e.policy}:r}}]),t}(u.Component));var C=Object(s.b)(function(e){var t=e.privacyPolicy;return{policy:t.policy,policyError:t.policyError,fetchingPolicy:t.fetchingPolicy,fetchedPolicy:t.fetchedPolicy}},function(e){return{getPrivacyPolicy:function(t,r){return e(b.getPrivacyPolicy(t,r))}}})(O);t.default=C},960:function(e,t,r){"use strict";r.d(t,"a",function(){return c});var a=r(1),n=r.n(a);function c(e){return n.a.createElement("h1",{className:"no-data text-center"},e||"No Content Found")}},961:function(e,t,r){"use strict";var a=r(1),n=r.n(a),c=r(928),i=function(e){return n.a.createElement(c.a,{height:22,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},n.a.createElement("rect",{x:"110",y:"7",rx:"0",ry:"0",width:"180",height:"7"}))};i.defaultProps={height:0,width:0},t.a=i},969:function(e,t,r){"use strict";var a=r(1),n=r.n(a),c=r(928),i=function(e){return n.a.createElement(c.a,{height:200,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},n.a.createElement("rect",{x:"170",y:"20",rx:"0",ry:"0",width:"70",height:"8"}),n.a.createElement("rect",{x:"0",y:"70",rx:"2",ry:"2",width:"300",height:"3"}),n.a.createElement("rect",{x:"0",y:"50",rx:"2",ry:"2",width:"250",height:"3"}),n.a.createElement("rect",{x:"0",y:"90",rx:"2",ry:"2",width:"200",height:"3"}))};i.defaultProps={height:0,width:0},t.a=i},989:function(e,t,r){}}]);