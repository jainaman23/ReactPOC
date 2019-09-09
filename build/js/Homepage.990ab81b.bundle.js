(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1009:function(e,t,a){"use strict";a.r(t);var n=a(114),r=a(115),i=a(118),s=a(116),l=a(117),c=a(1),o=a.n(c),u=a(2),d=a(131),m=a(152),p=a(945),h=a(949),g=a(151),f=a.n(g),v=a(119),E=Object(v.a)();var b={getTrending:function(){return function(e){e({type:"FETCH_HOMEPAGE_TRENDING"}),f.a.get("/api/v1/storiesTrendingSection?_format=json",E).then(function(t){e({type:"FETCH_HOMEPAGE_TRENDING_SUCCESS",payload:t.data})}).catch(function(t){e({type:"FETCH_HOMEPAGE_TRENDING_FAILURE",payload:t.response}),e({type:"ADD_ERROR",payload:t})})}}},y=a(964),O=a(264),j=a(980),T=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).state={items:[]},e.renderTrending=e.renderTrending.bind(Object(d.a)(Object(d.a)(e))),e}return Object(l.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e){return!!e.fetchedTrending}},{key:"componentDidMount",value:function(){this.props.getTrending()}},{key:"renderTrending",value:function(){var e=this.props,t=e.fetchingTrending,a=e.fetchedTrending,n=e.results;return a?n&&0!==n.length?o.a.createElement("section",{className:"trending-listing listing text-center"},o.a.createElement("h2",{className:"page-title section-title"},this.props.sectionHeading),o.a.createElement(y.a,{items:n,md:6,type:"news"}),o.a.createElement(p.a,{className:"show-more"},o.a.createElement(h.a,{className:"more-link"},o.a.createElement("a",{href:"/news",className:"btn"},this.props.seeMoreLabel)))):void 0:t?o.a.createElement(j.a,{type:"news",sectionClass:"trending-listing listing text-center",itemClass:"list-item"}):void 0}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,this.renderTrending())}}]),t}(c.Component);T.defaultProps={sectionHeading:O.s,seeMoreLabel:O.lb};var L=Object(m.b)(function(e){var t=e.homepageTrending;return{fetchingTrending:t.fetchingTrending,fetchedTrending:t.fetchedTrending,trending:t.trending,homepageTrendingError:t.homepageTrendingError}},function(e){return{getTrending:function(){return e(b.getTrending())}}},function(e,t,a){return Object(u.a)({},e,t,a,{results:e.trending.results,sections:!0,countEnable:!0})})(T),w=a(962),S=a(961),k=Object(v.a)();var N={getLevelsList:function(){return function(e){e({type:"FETCH_HOMEPAGE_LEVELS"}),f.a.get("/api/v1/exploreLearningLevels?_format=json",k).then(function(t){e({type:"FETCH_HOMEPAGE_LEVELS_SUCCESS",payload:t.data})}).catch(function(t){e({type:"FETCH_HOMEPAGE_LEVELS_FAILURE",payload:t.response}),e({type:"ADD_ERROR",payload:t})})}}},C=a(8),_=a.n(C),I=a(950),D=a(951),M=a(953),H=a(952),x=a(266),R=a(82),P=a(959),F=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).createMarkup=a.createMarkup.bind(Object(d.a)(Object(d.a)(a))),a.getRenderResults=a.getRenderResults.bind(Object(d.a)(Object(d.a)(a))),a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"createMarkup",value:function(e){return{__html:e}}},{key:"getRenderResults",value:function(){var e=this,t=this.props,a=t.items,n=t.type,r=t.showBrandTitle,i="/";if("undefined"!==typeof n)switch(n){case"courses":i="/course/";break;case"module":i="/module/";break;default:i="/"}if(a&&0!==a.length)return a.map(function(t,a){return o.a.createElement(h.a,{key:a,xs:12,lg:6,className:"list-item"},o.a.createElement(I.a,{className:"listing-block"},o.a.createElement(D.a,{href:"".concat(i).concat(t.categoryId||t.nid),className:_()({completed:t.status})},o.a.createElement(P.a,{defaultImage:R.a,src:t.imageSmall?t.imageSmall:R.a,imageLarge:t.imageLarge?t.imageLarge:R.a,imageMedium:t.imageMedium?t.imageMedium:R.a})),t.displayTitle&&o.a.createElement(M.a,{tag:"h2"},o.a.createElement(D.a,{href:"".concat(i).concat(t.categoryId||t.nid),dangerouslySetInnerHTML:e.createMarkup(t.displayTitle)})),r&&0!==t.brand&&o.a.createElement(H.a,{tag:"h3",className:"brand-title"},e.context[t.brand]),t.subTitle&&e.props.showSubTitle&&o.a.createElement(H.a,{className:"sub-title"},o.a.createElement(D.a,{href:"".concat(i).concat(t.categoryId||t.nid),dangerouslySetInnerHTML:e.createMarkup(t.subTitle)}))))})}},{key:"render",value:function(){var e=this;return o.a.createElement(x.b,null,function(){return o.a.createElement("div",{className:"section-content col-12"},o.a.createElement(p.a,{className:"tiles-structure"},e.getRenderResults()))})}}]),t}(c.Component);F.contextType=x.a,F.defaultProps={showBrandTitle:!0};var A=F,V=a(265),G=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).state={items:[]},e.renderLevels=e.renderLevels.bind(Object(d.a)(Object(d.a)(e))),e}return Object(l.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e){return!!e.fetchedLevelsList}},{key:"componentDidMount",value:function(){this.props.getLevelsList()}},{key:"renderLevels",value:function(){var e=this.props,t=e.fetchingLevelsList,a=e.fetchedLevelsList,n=e.explorelevels;if(a){var r=Object(V.a)(n.results,n.userActivity);if(r&&0!==r.length)return o.a.createElement("section",{className:"level-listing listing text-center row"},o.a.createElement("h2",{className:"page-title section-title"},this.props.sectionHeading),o.a.createElement(A,{items:r,type:"courses",showSubTitle:!1}))}else if(t)return o.a.createElement("section",{className:"level-listing listing text-center"},o.a.createElement(S.a,null),o.a.createElement(w.a,{height:1920,width:1080}),o.a.createElement(S.a,null))}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,this.renderLevels())}}]),t}(c.Component);G.contextType=x.a,G.defaultProps={sectionHeading:O.q,seeMoreLabel:O.lb};var U=Object(m.b)(function(e){var t=e.homepageLevels;return{fetchingLevelsList:t.fetchingLevelsList,fetchedLevelsList:t.fetchedLevelsList,explorelevels:t.explorelevels,homeLevelsError:t.homeLevelsError}},function(e){return{getLevelsList:function(){return e(N.getLevelsList())}}})(G),z=Object(v.a)();var B={getSpotlight:function(){return function(e){e({type:"FETCH_HOMEPAGE_SPOTLIGHT"}),f.a.get("/api/v1/spotlightSection?_format=json",z).then(function(t){e({type:"FETCH_HOMEPAGE_SPOTLIGHT_SUCCESS",payload:t.data})}).catch(function(t){e({type:"FETCH_HOMEPAGE_SPOTLIGHT_FAILURE",payload:t.response})})}}},W=a(934),J=a.n(W),q=(a(935),a(981)),Y=a.n(q),K=(a(976),function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).componentDidMount=function(){void 0!==e.props.responsive&&e.setState({responsive:e.props.responsive}),e.setState({data:e.carouselData()})},e.state={showImage:!1,showTitle:!1,showSubtitle:!1,responsive:{0:{items:1},600:{items:2},1024:{items:3}},data:[]},e.carouselData=e.carouselData.bind(Object(d.a)(Object(d.a)(e))),e}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){this.setState({showImage:void 0!==this.props.showImage&&this.props.showImage,showTitle:void 0!==this.props.showTitle&&this.props.showTitle,showSubtitle:void 0!==this.props.showSubtitle&&this.props.showSubtitle})}},{key:"carouselData",value:function(){var e=this;return this.props.data.map(function(t){var a="tools"===t.type?"video-wrapper":"";return o.a.createElement("div",{onClick:function(){return e.handleClick(t)},key:t.nid},e.state.showImage?o.a.createElement("div",{className:a},o.a.createElement(P.a,{defaultImage:R.a,src:t.imageSmall?t.imageSmall:R.a,imageLarge:t.imageLarge?t.imageLarge:R.a,imageMedium:t.imageMedium?t.imageMedium:R.a,type:"banner"}),"tools"===t.type?o.a.createElement("div",{className:"video-icon","data-id":t.nid},o.a.createElement("div",{className:"icon"},o.a.createElement("img",{src:Y.a,alt:t.title}))):null):null,e.state.showTitle?o.a.createElement("h2",null,t.title):null,e.state.showSubtitle?o.a.createElement("h4",null,t.subTitle):null)})}},{key:"handleClick",value:function(e){"tools"!==e.type?window.location.href=e.link:this.props.handleClick(e)}},{key:"render",value:function(){return 0===this.state.data.length?null:o.a.createElement(o.a.Fragment,null,o.a.createElement(J.a,{mouseDragEnablede:!0,responsive:this.state.responsive,mouseDragEnabled:!0,buttonsDisabled:!0,items:this.state.data,autoPlay:!0,autoPlayInterval:5e3,fadeOutAnimation:!1,infinite:!1}))}}]),t}(c.Component)),Q=a(982),X=a(977),Z=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).handleVideo=function(t){e.props.fetchingVideoDetails||(e.props.getVideoDetails(t.nid),e.toggle())},e.toggle=function(){e.setState({modal:!e.state.modal})},e.state={items:[],video:{},modal:!1},e.renderSpotlight=e.renderSpotlight.bind(Object(d.a)(Object(d.a)(e))),e}return Object(l.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return!!e.fetchedSpotlight}},{key:"componentDidMount",value:function(){this.props.getHomePageSpotlight()}},{key:"componentWillReceiveProps",value:function(e){if(e.spotlight&&e.spotlight.results&&0!==e.spotlight.results.length){var t=null,a=e.spotlight.results.map(function(e,a){return"product_detail"===e.type?t="/product/"+e.nid:"level_interactive_content"===e.type?t="/module/"+e.nid:"stories"===e.type?t="/news/"+e.nid:"ingredient"===e.type&&(t="/ingredient/"+e.nid),e.link=t,e});this.setState({items:a})}}},{key:"renderSpotlight",value:function(){var e=this.props,t=e.fetchingSpotlight,a=e.fetchedSpotlight,n=e.spotlight;if(a){if(n&&0!==n.length)return o.a.createElement("section",{className:"spotlight"},o.a.createElement(K,{data:this.state.items,responsive:{},showImage:!0,showTitle:!1,showSubtitle:!1,handleClick:this.handleVideo}))}else if(t)return o.a.createElement(w.a,{height:1920,width:1080})}},{key:"render",value:function(){var e=this.props,t=e.fetchingVideoDetails,a=e.videoDetails,n=e.fetchedVideoDetails;return o.a.createElement("div",{className:"homepage-spotlight section"},this.renderSpotlight(),this.state.modal&&o.a.createElement(X.a,{fetching:t,fetched:n,toggle:this.toggle,modal:this.state.modal,type:"videos",data:a&&a[0]?a[0]:{},className:"popup-wrapper"}))}}]),t}(c.Component);Z.defaultProps={HomeSpotlightLabel:O.r};var $=Object(m.b)(function(e){var t=e.homepageSpotlight,a=t.fetchingSpotlight,n=t.fetchedSpotlight,r=t.spotlight,i=t.spotlightError,s=e.videoDetails;return{fetchingSpotlight:a,fetchedSpotlight:n,spotlight:r,spotlightError:i,fetchingVideoDetails:s.fetchingVideoDetails,fetchedVideoDetails:s.fetchedVideoDetails,videoDetails:s.videoDetails,videoDetailsError:s.videoDetailsError}},function(e){return{getHomePageSpotlight:function(){return e(B.getSpotlight())},getVideoDetails:function(t){return e(Q.a.getVideoDetails(t))}}})(Z),ee=(a(996),function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement(x.b,null,function(){return o.a.createElement("div",{className:"homepage"},o.a.createElement($,null),o.a.createElement(U,null),o.a.createElement(L,null))})}}]),t}(c.Component));t.default=ee},959:function(e,t,a){"use strict";var n=a(114),r=a(115),i=a(118),s=a(116),l=a(117),c=a(1),o=a.n(c),u=a(8),d=a.n(u),m=a(265),p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).state={src:e.src,alt:"",title:"",status:!1},a.Image=o.a.createRef(),a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this;if("IntersectionObserver"in window){var t=new IntersectionObserver(function(a,n){a.forEach(function(a){if(a.isIntersecting){var n=a.target;n.parentNode.classList.add("lazy-wrapper"),n.parentNode.classList.add("image-load"),""!==e.state.src&&(n.src=e.state.src),n.parentNode.style.height=a.target.height+"px",n.classList.remove("lazy"),n.classList.add("lazy-item"),n.parentNode.classList.remove("lazy-wrapper"),n.parentNode.classList.remove("image-load"),n.parentNode.style.height=null,t.unobserve(n)}})});this.Img=t}}},{key:"componentDidMount",value:function(){this.Img.observe(this.Image.current)}},{key:"render",value:function(){return o.a.createElement("picture",{className:d()({banner:"banner"===this.props.type},{featured:"featured"===this.props.type},{default:this.props.src===this.props.defaultImage},{completed:this.props.completed}),style:"lg"===Object(m.b)()&&"banner"===this.props.type||"featured"===this.props.type?{backgroundImage:"url(".concat(this.props.imageLarge,")")}:{}},this.props.imageLarge&&o.a.createElement("source",{media:"(min-width: 1081px)",srcSet:this.props.imageLarge}),this.props.imageMedium&&o.a.createElement("source",{media:"(min-width: 769px)",srcSet:this.props.imageMedium}),o.a.createElement("img",{className:"lazy lazy-image",src:this.props.defaultImage,alt:this.state.alt,ref:this.Image}))}}]),t}(c.Component);t.a=p},960:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(1),r=a.n(n);function i(e){return r.a.createElement("h1",{className:"no-data text-center"},e||"No Content Found")}},961:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(928),s=function(e){return r.a.createElement(i.a,{height:22,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"110",y:"7",rx:"0",ry:"0",width:"180",height:"7"}))};s.defaultProps={height:0,width:0},t.a=s},962:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(928),s=function(e){return r.a.createElement(i.a,{speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb",className:"row"},r.a.createElement("rect",{x:"0",y:"0",rx:"0",ry:"0",width:e.width,height:e.height}))};s.defaultProps={height:0,width:0},t.a=s},963:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(928);t.a=function(){return r.a.createElement(i.a,{height:260,width:260,speed:2,primaryColor:"#f3eeed",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"8",y:"19",rx:"0",ry:"0",width:"245",height:"183"}),r.a.createElement("rect",{x:"8",y:"213",rx:"0",ry:"0",width:"245",height:"15"}),r.a.createElement("rect",{x:"67",y:"237",rx:"0",ry:"0",width:"125",height:"15"}))}},964:function(e,t,a){"use strict";var n=a(931),r=a(114),i=a(115),s=a(118),l=a(116),c=a(117),o=a(131),u=a(1),d=a.n(u),m=a(949),p=a(950),h=a(951),g=a(952),f=a(953),v=a(945),E=a(266),b=a(82),y=a(264),O=a(959),j=a(960),T=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(l.a)(t).call(this,e))).createMarkup=a.createMarkup.bind(Object(o.a)(Object(o.a)(a))),a.getRenderResults=a.getRenderResults.bind(Object(o.a)(Object(o.a)(a))),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"createMarkup",value:function(e){return{__html:e}}},{key:"getRenderResults",value:function(){var e=this,t=this.props,a=t.items,r=t.type,i=t.showBrandTitle,s=t.showSubTitle,l=Object(n.a)(t,["items","type","showBrandTitle","showSubTitle"]),c="#";if("undefined"!==typeof r)switch(r){case"levels":c="/levels/";break;case"products":case"product":c="/product/";break;case"ingredients":case"ingredient":c="/ingredient/";break;case"news":c="/news/";break;default:c="#"}return a&&0!==a.length?a.map(function(t,a){return d.a.createElement(m.a,Object.assign({key:a,xs:12,sm:6,md:4,lg:3},l,{className:"list-item text-center"}),d.a.createElement(p.a,{className:"listing-block"},d.a.createElement(h.a,{href:"".concat(c).concat(t.nid?t.nid:t.tid)},d.a.createElement(O.a,{defaultImage:b.l,src:t.imageSmall}),0!==t.discontinue&&t.discontinue&&d.a.createElement(g.a,{tag:"h3",className:"discontinue"},y.k)),d.a.createElement(f.a,{tag:"h2"},d.a.createElement(h.a,{href:"".concat(c).concat(t.nid?t.nid:t.tid),dangerouslySetInnerHTML:e.createMarkup(t.displayTitle&&t.displayTitle)})),i&&0!==t.brand&&d.a.createElement(g.a,{tag:"h3",className:"brand-title"},e.context[t.brand]),s&&t.subTitle&&d.a.createElement(g.a,{className:"sub-title"},d.a.createElement(h.a,{href:"".concat(c).concat(t.categoryId||t.nid),dangerouslySetInnerHTML:e.createMarkup(t.subTitle)}))))}):Object(j.a)(this.props.noDataLabel)}},{key:"render",value:function(){var e=this;return d.a.createElement(E.b,null,function(){return d.a.createElement(v.a,{className:"section-content"},e.getRenderResults())})}}]),t}(u.Component);T.contextType=E.a,T.defaultProps={showBrandTitle:!0},t.a=T},972:function(e,t,a){},976:function(e,t,a){},977:function(e,t,a){"use strict";var n=a(114),r=a(115),i=a(118),s=a(116),l=a(117),c=a(1),o=a.n(c),u=a(958),d=a(943),m=(a(972),a(265)),p=a(82),h=a(959),g=a(264),f=function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"createMarkup",value:function(e){return{__html:e}}},{key:"render",value:function(){var e=this.props,t=e.toggle,a=e.modal,n=e.fetching,r=e.type,i=e.data,s=e.fetched;return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,{isOpen:a,toggle:t,className:this.props.className},o.a.createElement("div",{className:"modal-header"},o.a.createElement("h5",{className:"page-title m-0 p-0"},i&&i.title),o.a.createElement("button",{type:"button",onClick:t,className:"close"},o.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),o.a.createElement(d.a,null,"videos"===r&&o.a.createElement("div",{className:"video"},n?o.a.createElement("div",{className:"loader text-center"},Object(m.c)()):null,s&&o.a.createElement("video",{width:"640",height:"360",controls:!0,poster:i&&i.videoThumbnail?i.videoThumbnail:p.a,autoPlay:!0,controlsList:"nodownload"},o.a.createElement("source",{src:i&&i.videoUrl,type:"video/mp4"}),i&&i.videoSubtitle&&o.a.createElement("track",{src:i&&i.videoSubtitle,default:!0}),"Your browser does not support the video tag.")),"tools"===r&&o.a.createElement("div",{className:"popup-wrapper pdf"},n?o.a.createElement("div",{className:"loader text-center"},Object(m.c)()):null,s&&o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{defaultImage:p.l,src:i.imageSmall}),o.a.createElement("div",{className:"description",dangerouslySetInnerHTML:this.createMarkup(i.description)}),o.a.createElement("div",{className:"col more-link"},o.a.createElement("a",{className:"btn btn-outline-secondary text-uppercase active",href:i.url,target:"_blank",rel:"noopener noreferrer"},g.Bb)))))))}}]),t}(o.a.Component);t.a=f},980:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(949),s=a(954),l=a(945),c=a(82),o=a(963),u=a(961);function d(e){for(var t=[],a=0;a<c.d;a++)t.push(r.a.createElement(i.a,{key:"".concat(e.type,"_").concat(a),xs:12,sm:6,lg:3,className:e.itemClass},r.a.createElement(o.a,null)));return r.a.createElement("section",{className:e.sectionClass},r.a.createElement(s.a,null,r.a.createElement(u.a,null),r.a.createElement(l.a,null,t)))}d.defaultProps={itemClass:"list-item",type:"home",sectionClass:"",divClass:""},t.a=d},981:function(e,t,a){e.exports=a.p+"static/media/video-play-icon.e1da21c1.png"},982:function(e,t,a){"use strict";var n=a(151),r=a.n(n),i=a(119),s=Object(i.a)();var l={getVideoDetails:function(e){return function(t){t({type:"FETCH_VIDEO_DETAILS"}),r.a.get("/api/v1/video?_format=json&nid=".concat(e),s).then(function(e){t({type:"FETCH_VIDEO_DETAILS_SUCCESS",payload:e})}).catch(function(e){t({type:"FETCH_VIDEO_DETAILS_FAILURE",payload:e.response}),t({type:"ADD_ERROR",payload:e})})}}};t.a=l},996:function(e,t,a){}}]);