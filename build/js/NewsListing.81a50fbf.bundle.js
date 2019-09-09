(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1020:function(e,t,a){"use strict";a.r(t);var s=a(2),n=a(930),r=a(114),i=a(115),c=a(118),o=a(116),l=a(117),u=a(131),d=a(1),h=a.n(d),p=a(152),m=a(945),g=a(8),f=a.n(g),b=a(965),y=a(964),v=a(151),E=a.n(v),S=a(119),O=Object(S.a)();var N={getStoriesListing:function(e,t){return function(a){a({type:"FETCH_TRENDING_LISTING"}),E.a.get("/api/v1/stories?_format=json&limit=".concat(e,"&offset=").concat(t),O).then(function(e){a({type:"FETCH_TRENDING_LISTING_SUCCESS",payload:e})}).catch(function(e){a({type:"FETCH_TRENDING_LISTING_FAILURE",payload:e.response}),a({type:"ADD_ERROR",payload:e})})}}},j=a(960),w=a(82),k=a(264),I=a(265),L=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={stories:[],is_disabled:!1,show:!1,fetched:!1},a.getNextPageContent=a.getNextPageContent.bind(Object(u.a)(Object(u.a)(a))),a.renderStories=a.renderStories.bind(Object(u.a)(Object(u.a)(a))),a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.results,a=e.fetchingStories,s=e.fetchedStories,r=e.pager,i=e.updatedActivities;if(s&&r&&this.state.fetched?(r.count>w.e?this.setState({show:!0}):this.setState({show:!1}),this.setState({stories:[].concat(Object(n.a)(this.state.stories),Object(n.a)(t)),is_disabled:!1,fetched:!1})):a&&(this.setState({fetched:!0}),0===this.state.stories.length&&this.setState({show:!1})),!a&&s&&i){var c=Object(I.e)(this.state.stories,t);this.setState({stories:c})}}},{key:"getNextPageContent",value:function(){var e=this.state.stories.length;this.setState({is_disabled:!0}),this.props.getStoriesListing(w.e,e)}},{key:"componentDidMount",value:function(){this.props.getStoriesListing(w.e,0),this.setState({stories:this.props.stories})}},{key:"renderStories",value:function(){var e=this.props,t=e.fetchingStories,a=e.fetchedStories,s=e.translations,n=e.status,r=this.state.stories;if(r&&0!==r.length)return h.a.createElement(y.a,{items:r,type:"news"});if(a){if(0===r.length&&204===n)return Object(j.a)(s.NoContentFound)}else if(t)return h.a.createElement(b.a,{divClass:"story-list text-center row",itemClass:"loader-list",type:"news"})}},{key:"render",value:function(){return h.a.createElement("div",{className:"trending-listing listing"},h.a.createElement("h1",{className:"page-title"},this.props.sectionHeading),h.a.createElement("div",{className:"story-list text-center"},this.renderStories()),h.a.createElement(m.a,null,h.a.createElement("div",{className:f()("col more-link",{"d-none":!this.state.show})},h.a.createElement("button",{className:f()("btn btn-outline-secondary text-uppercase",{disabled:this.state.is_disabled}),onClick:this.getNextPageContent},this.props.seeMoreLabel))))}}]),t}(d.Component);L.defaultProps={sectionHeading:k.wb,seeMoreLabel:k.lb};var x=Object(p.b)(function(e){var t=e.trendingListing;return{stories:t.stories,fetchingStories:t.fetchingStories,fetchedStories:t.fetchedStories,fetchingStoriesError:t.fetchingStoriesError,pager:t.pager,status:t.status}},function(e){return{getStoriesListing:function(t,a){return e(N.getStoriesListing(t,a))}}},function(e,t,a){return Object(s.a)({},e,t,a,{results:e.stories.results,sections:!1,countEnable:!0})})(L);t.default=x},959:function(e,t,a){"use strict";var s=a(114),n=a(115),r=a(118),i=a(116),c=a(117),o=a(1),l=a.n(o),u=a(8),d=a.n(u),h=a(265),p=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(i.a)(t).call(this,e))).state={src:e.src,alt:"",title:"",status:!1},a.Image=l.a.createRef(),a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"componentWillMount",value:function(){var e=this;if("IntersectionObserver"in window){var t=new IntersectionObserver(function(a,s){a.forEach(function(a){if(a.isIntersecting){var s=a.target;s.parentNode.classList.add("lazy-wrapper"),s.parentNode.classList.add("image-load"),""!==e.state.src&&(s.src=e.state.src),s.parentNode.style.height=a.target.height+"px",s.classList.remove("lazy"),s.classList.add("lazy-item"),s.parentNode.classList.remove("lazy-wrapper"),s.parentNode.classList.remove("image-load"),s.parentNode.style.height=null,t.unobserve(s)}})});this.Img=t}}},{key:"componentDidMount",value:function(){this.Img.observe(this.Image.current)}},{key:"render",value:function(){return l.a.createElement("picture",{className:d()({banner:"banner"===this.props.type},{featured:"featured"===this.props.type},{default:this.props.src===this.props.defaultImage},{completed:this.props.completed}),style:"lg"===Object(h.b)()&&"banner"===this.props.type||"featured"===this.props.type?{backgroundImage:"url(".concat(this.props.imageLarge,")")}:{}},this.props.imageLarge&&l.a.createElement("source",{media:"(min-width: 1081px)",srcSet:this.props.imageLarge}),this.props.imageMedium&&l.a.createElement("source",{media:"(min-width: 769px)",srcSet:this.props.imageMedium}),l.a.createElement("img",{className:"lazy lazy-image",src:this.props.defaultImage,alt:this.state.alt,ref:this.Image}))}}]),t}(o.Component);t.a=p},960:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var s=a(1),n=a.n(s);function r(e){return n.a.createElement("h1",{className:"no-data text-center"},e||"No Content Found")}},963:function(e,t,a){"use strict";var s=a(1),n=a.n(s),r=a(928);t.a=function(){return n.a.createElement(r.a,{height:260,width:260,speed:2,primaryColor:"#f3eeed",secondaryColor:"#ecebeb"},n.a.createElement("rect",{x:"8",y:"19",rx:"0",ry:"0",width:"245",height:"183"}),n.a.createElement("rect",{x:"8",y:"213",rx:"0",ry:"0",width:"245",height:"15"}),n.a.createElement("rect",{x:"67",y:"237",rx:"0",ry:"0",width:"125",height:"15"}))}},964:function(e,t,a){"use strict";var s=a(931),n=a(114),r=a(115),i=a(118),c=a(116),o=a(117),l=a(131),u=a(1),d=a.n(u),h=a(949),p=a(950),m=a(951),g=a(952),f=a(953),b=a(945),y=a(266),v=a(82),E=a(264),S=a(959),O=a(960),N=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).createMarkup=a.createMarkup.bind(Object(l.a)(Object(l.a)(a))),a.getRenderResults=a.getRenderResults.bind(Object(l.a)(Object(l.a)(a))),a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"createMarkup",value:function(e){return{__html:e}}},{key:"getRenderResults",value:function(){var e=this,t=this.props,a=t.items,n=t.type,r=t.showBrandTitle,i=t.showSubTitle,c=Object(s.a)(t,["items","type","showBrandTitle","showSubTitle"]),o="#";if("undefined"!==typeof n)switch(n){case"levels":o="/levels/";break;case"products":case"product":o="/product/";break;case"ingredients":case"ingredient":o="/ingredient/";break;case"news":o="/news/";break;default:o="#"}return a&&0!==a.length?a.map(function(t,a){return d.a.createElement(h.a,Object.assign({key:a,xs:12,sm:6,md:4,lg:3},c,{className:"list-item text-center"}),d.a.createElement(p.a,{className:"listing-block"},d.a.createElement(m.a,{href:"".concat(o).concat(t.nid?t.nid:t.tid)},d.a.createElement(S.a,{defaultImage:v.l,src:t.imageSmall}),0!==t.discontinue&&t.discontinue&&d.a.createElement(g.a,{tag:"h3",className:"discontinue"},E.k)),d.a.createElement(f.a,{tag:"h2"},d.a.createElement(m.a,{href:"".concat(o).concat(t.nid?t.nid:t.tid),dangerouslySetInnerHTML:e.createMarkup(t.displayTitle&&t.displayTitle)})),r&&0!==t.brand&&d.a.createElement(g.a,{tag:"h3",className:"brand-title"},e.context[t.brand]),i&&t.subTitle&&d.a.createElement(g.a,{className:"sub-title"},d.a.createElement(m.a,{href:"".concat(o).concat(t.categoryId||t.nid),dangerouslySetInnerHTML:e.createMarkup(t.subTitle)}))))}):Object(O.a)(this.props.noDataLabel)}},{key:"render",value:function(){var e=this;return d.a.createElement(y.b,null,function(){return d.a.createElement(b.a,{className:"section-content"},e.getRenderResults())})}}]),t}(u.Component);N.contextType=y.a,N.defaultProps={showBrandTitle:!0},t.a=N},965:function(e,t,a){"use strict";var s=a(1),n=a.n(s),r=a(949),i=a(945),c=a(82),o=a(963);function l(e){for(var t=[],a=0;a<c.d;a++)t.push(n.a.createElement(r.a,{xs:12,sm:6,md:4,lg:3,className:e.itemClass,key:"".concat(e.type,"_").concat(a)},n.a.createElement(o.a,null)));return n.a.createElement(i.a,null,t)}l.defaultProps={itemClass:"list-item",type:"loader",divClass:""},t.a=l}}]);