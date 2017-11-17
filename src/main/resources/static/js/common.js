/*!
* ga.js
* Version: 1.0.0
* Author: Aniplex Inc.
* Site: http://imas-cinderella.com/
*/
!function(e,a,t,n,s,c,o){e.GoogleAnalyticsObject=s,e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)},e[s].l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.async=1,c.src=n,o.parentNode.insertBefore(c,o)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-49665560-1","auto"),ga("require","displayfeatures"),ga("require", "linkid", "linkid.js"),ga("send","pageview");
/*!
* social.js
* Version: 1.0.0
* Author: Aniplex Inc.
* Site: http://imas-cinderella.com/
*/
// !function(){var t=function(t,e,n,i){var r,o,a=t.getElementsByTagName(e)[0],s=0,p=/MSIE 8.0/.test(navigator.userAgent)?!0:!1;if(t.getElementById(n)||/twitter/.test(i)&&p)for(o=document.querySelectorAll(".twitter-share-button, .twitter-timeline");s<o.length;s++)o[s].parentNode.removeChild(o[s]);else r=t.createElement(e),r.id=n,r.src=i,r.async="",r.defer="",a.parentNode.insertBefore(r,a)};t(document,"script","twitter-wjs","//platform.twitter.com/widgets.js"),t(document,"script","facebook-jssdk","//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0"),t(document,"script","hatena-js","//b.st-hatena.com/js/bookmark_button.js")}();
/*!
* helpers.js
* Version: 1.0.0
* Author: kirksville co.,ltd.
* Site: http://imas-cinderella.com/
*/
!function(){"use strict";function t(){this.$wrap=$("#wrap"),this.$main=this.$wrap.find("#main"),this.$side=this.$wrap.find("#side"),this.$content=this.$main.find("#content"),this.$loading=$("#loading")}t.prototype.nl2br=function(t){return t.replace(/[\r\n]/g,"<br>")},t.prototype.escapeTag=function(t){return $(document.createElement("div")).html(t).text()},t.prototype.bracketsKerning=function(t){if(Modernizr.fontface){var e=$(t),n=e.html();n=n.replace(/「/g,'<span style="margin-left: -.4em">「</span>').replace(/」/g,'<span style="margin-right: -.4em">」</span>').replace(/『/g,'<span style="margin-left: -.4em">『</span>').replace(/』/g,'<span style="margin-right: -.4em">』</span>').replace(/（/g,'<span style="margin-left: -.4em">（</span>').replace(/）/g,'<span style="margin-right: -.4em">）</span>'),e.html(n)}},t.prototype.getQueryString=function(){if(1<document.location.search.length){for(var t=document.location.search.substring(1),e=t.split("&"),n={},i=0;i<e.length;i++){var r=e[i].split("="),a=decodeURIComponent(r[0]),o=decodeURIComponent(r[1]);n[a]=decodeURIComponent(o)}return n}return null},t.prototype.adaptSideArea=function(){this.$side.css("height","auto").css("height",this.$wrap.height())},t.prototype.resizeMainArea=function(){var t=document.body.clientWidth,e=this.$side.width();this.$main.css("width",t-e)},t.prototype.pageLoaded=function(){this.$loading.velocity("fadeOut",400,function(){$(this).remove()})},window.Helpers=t}();
/*!
* common.js
* Version: 1.2.0
* Author: kirksville co.,ltd.
* Site: http://imas-cinderella.com/
*/
!function(){"use strict";$(function(){new window.Common}),window.Common=function(){function t(){this.init()}return t.prototype.init=function(){this.Helpers=new Helpers,this.cacheElemens(),this.checkPath(),this.bindEvents()},t.prototype.cacheElemens=function(){this.$side=$("#side"),this.$sideInner=this.$side.find(".sideInner"),this.$gnav=this.$side.find("#gnav"),this.$gnavItem=this.$gnav.find(".gnav__item")},t.prototype.checkPath=function(){var t,e,i,n=location.pathname,o=["home","news","story","staff-cast","onair","character","world","music","movie","package","radio","event","special","link"],a=["staff-cast","onair","movie","music","radio","event","special","link","story"];for(e=0,i=o.length;i>e;++e)-1!==n.indexOf(o[e])&&(t=o[e]);for(e=0,i=a.length;i>e;++e)-1!==n.indexOf(a[e])&&this.initView();void 0!==t&&this.setNavigation(t)},t.prototype.setNavigation=function(t){this.$gnavItem.find(".active").removeClass("active"),this.$gnavItem.filter('[data-page="'+t+'"]').children().addClass("active")},t.prototype.initView=function(){var t=this;$(window).on({load:function(){t.Helpers.resizeMainArea(),t.Helpers.adaptSideArea(),t.Helpers.pageLoaded()},resize:function(){t.Helpers.resizeMainArea()}})},t.prototype.bindEvents=function(){var t=this;$(window).on({scroll:function(){t.fixedSide(this)}}),$(".modal-video").on("click",function(){var t=navigator.userAgent,e=$(this).attr("data-width")||900,i=$(this).attr("data-height")||506;-1===t.indexOf("iPhone")&&-1===t.indexOf("iPad")&&-1===t.indexOf("iPod")&&-1===t.indexOf("Android")&&$(this).colorbox({iframe:!0,innerWidth:e,innerHeight:i,close:"X CLOSE"})})},t.prototype.fixedSide=function(t){var e=this.$sideInner,i=t.innerHeight,n=e.height(),o=document.documentElement.scrollTop||document.body.scrollTop,a=/MSIE 8.0/.test(navigator.userAgent)?!0:!1;a||e.css(n>i+o?{position:"absolute",bottom:"auto"}:{position:"fixed",bottom:0})},t}()}();
/*!
* smartMenu.js
* Version: 1.0.3
* Author: kirksville co.,ltd.
* Site: http://imas-cinderella.com/
*/
// !function(){"use strict";$.Velocity.Sequences.slideUp=function(t,i,n){var e=i.duration||200,a=i.stagger;$.Velocity.animate(t,{translateY:[0,40],opacity:1},{display:"block",duration:e,delay:n*a})},window.Navigation=function(){function t(){this.init()}return $(function(){new window.Navigation}),t.prototype.init=function(){this.menuList={name:["TOP","NEWS","STORY","STAFF&CAST","ON AIR","CHARACTER","WORLD","MUSIC","MOVIE","Blu-ray&DVD","RADIO","EVENT","SPECIAL","LINK"],path:["/","/news/","/story/","/staff-cast/","/onair/","/character/","/world/","/music/","/movie/","/package/","/radio/","/event/","/special/","/link/"]},this.create(),this.cacheElements(),this.navWidth=140,this.navHeight=430,this.btnWidth=this.$subNavBtn.width(),this.btnHeight=this.$subNavBtn.height(),this.$subNavItem.css({display:"none",opacity:0}),this.bindEvents()},t.prototype.cacheElements=function(){this.$gnav=$("#gnav"),this.$subNav=$("#smart-nav"),this.$subNavList=this.$subNav.find(".smart-nav__list"),this.$subNavItem=this.$subNav.find(".smart-nav__item"),this.$subNavBtn=this.$subNav.find(".smart-nav__btn"),this.$subNavTop=this.$subNav.find(".smart-nav__b2top")},t.prototype.create=function(){var t="",i=this.menuList;t+='<div id="smart-nav">',t+='<div class="smart-nav__list">',t+="<ul>";for(var n=0,e=i.name.length;e>n;++n)t+='<li class="smart-nav__item">',t+='<a href="'+i.path[n]+'">'+i.name[n]+"</a>",t+="</li>";t+="</ul>",t+="</div>",t+='<a class="smart-nav__btn"></a>',t+='<a class="smart-nav__b2top"></a>',t+="</div>",$(document.body).append(t)},t.prototype.bindEvents=function(){var t=this;this.$subNavBtn.on("click",function(){$(this).hasClass("isOpen")?t.hideNavigation():t.showNavigation()}),this.$subNavTop.on("click",function(){t.$subNavList.velocity("stop").velocity({height:t.btnHeight,width:t.btnWidth},100,"easeOutExpo"),t.hideNavigation(),$("body").velocity("scroll",1e3,"easeOutQuart")}),$(window).on("scroll",function(){var i=t.$gnav;i.scrollTop()+i.height()/2<$(this).scrollTop()?t.$subNav.addClass("enabled"):t.$subNav.removeClass("enabled")})},t.prototype.showNavigation=function(){var t=this;this.$subNavList.velocity("stop").velocity({height:[t.navHeight,t.btnHeight],width:[t.navWidth,t.btnWidth],opacity:[1,0]},{display:"block",duration:200,complete:function(){t.$subNavItem.velocity("stop").velocity("slideUp",{duration:300,stagger:40,easing:"easeOutExpo"}).css("opacity",0)}}),t.$subNavBtn.addClass("isOpen")},t.prototype.hideNavigation=function(){var t=this;this.$subNavItem.velocity("stop").velocity("fadeOut",200,function(){t.$subNavList.velocity("stop").velocity({height:t.btnHeight,width:t.btnWidth}),t.$subNavBtn.removeClass("isOpen")})},t}()}();