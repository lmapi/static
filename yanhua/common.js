//cookie
!function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function f(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function a(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function e(u){function c(){}function t(e,n,t){if("undefined"!=typeof document){"number"==typeof(t=f({path:"/"},c.defaults,t)).expires&&(t.expires=new Date(1*new Date+864e5*t.expires)),t.expires=t.expires?t.expires.toUTCString():"";try{var o=JSON.stringify(n);/^[\{\[]/.test(o)&&(n=o)}catch(e){}n=u.write?u.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var r="";for(var i in t)t[i]&&(r+="; "+i,!0!==t[i]&&(r+="="+t[i].split(";")[0]));return document.cookie=e+"="+n+r}}function n(e,n){if("undefined"!=typeof document){for(var t={},o=document.cookie?document.cookie.split("; "):[],r=0;r<o.length;r++){var i=o[r].split("="),c=i.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var f=a(i[0]);if(c=(u.read||u)(c,f)||a(c),n)try{c=JSON.parse(c)}catch(e){}if(t[f]=c,e===f)break}catch(e){}}return e?t[e]:t}}return c.set=t,c.get=function(e){return n(e,!1)},c.getJSON=function(e){return n(e,!0)},c.remove=function(e,n){t(e,"",f(n,{expires:-1}))},c.defaults={},c.withConverter=e,c}(function(){})});

//lazy
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/* axios v0.20.0 | (c) 2020 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(4),a=n(22),u=n(10),c=r(u);c.Axios=s,c.create=function(e){return r(a(c.defaults,e))},c.Cancel=n(23),c.CancelToken=n(24),c.isCancel=n(9),c.all=function(e){return Promise.all(e)},c.spread=n(25),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"undefined"==typeof e}function i(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function s(e){return"[object ArrayBuffer]"===R.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function u(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function c(e){return"string"==typeof e}function f(e){return"number"==typeof e}function p(e){return null!==e&&"object"==typeof e}function d(e){if("[object Object]"!==R.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Date]"===R.call(e)}function h(e){return"[object File]"===R.call(e)}function m(e){return"[object Blob]"===R.call(e)}function y(e){return"[object Function]"===R.call(e)}function g(e){return p(e)&&y(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function x(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function w(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function b(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function E(){function e(e,n){d(t[n])&&d(e)?t[n]=E(t[n],e):d(e)?t[n]=E({},e):r(e)?t[n]=e.slice():t[n]=e}for(var t={},n=0,o=arguments.length;n<o;n++)b(arguments[n],e);return t}function C(e,t,n){return b(t,function(t,r){n&&"function"==typeof t?e[r]=S(t,n):e[r]=t}),e}function j(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}var S=n(3),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:s,isBuffer:i,isFormData:a,isArrayBufferView:u,isString:c,isNumber:f,isObject:p,isPlainObject:d,isUndefined:o,isDate:l,isFile:h,isBlob:m,isFunction:y,isStream:g,isURLSearchParams:v,isStandardBrowserEnv:w,forEach:b,merge:E,extend:C,trim:x,stripBOM:j}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(2),i=n(5),s=n(6),a=n(7),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),i(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}if(i){var a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(8),s=n(9),a=n(10);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||a.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(12):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(e=n(12)),e}var i=n(2),s=n(11),a={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){u.headers[e]={}}),i.forEach(["post","put","patch"],function(e){u.headers[e]=i.merge(a)}),e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(13),i=n(16),s=n(5),a=n(17),u=n(20),c=n(21),f=n(14);e.exports=function(e){return new Promise(function(t,n){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"],(r.isBlob(p)||r.isFile(p))&&p.type&&delete d["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=unescape(encodeURIComponent(e.auth.password))||"";d.Authorization="Basic "+btoa(h+":"+m)}var y=a(e.baseURL,e.url);if(l.open(e.method.toUpperCase(),s(y,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in l?u(l.getAllResponseHeaders()):null,i=e.responseType&&"text"!==e.responseType?l.response:l.responseText,s={data:i,status:l.status,statusText:l.statusText,headers:r,config:e,request:l};o(t,n,s),l=null}},l.onabort=function(){l&&(n(f("Request aborted",e,"ECONNABORTED",l)),l=null)},l.onerror=function(){n(f("Network Error",e,null,l)),l=null},l.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||c(y))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),r.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),n(e),l=null)}),p||(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),s===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";var r=n(18),o=n(19);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){function n(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function o(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(i[o]=n(void 0,e[o])):i[o]=n(e[o],t[o])}t=t||{};var i={},s=["url","method","data"],a=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],c=["validateStatus"];r.forEach(s,function(e){r.isUndefined(t[e])||(i[e]=n(void 0,t[e]))}),r.forEach(a,o),r.forEach(u,function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(i[o]=n(void 0,e[o])):i[o]=n(void 0,t[o])}),r.forEach(c,function(r){r in t?i[r]=n(e[r],t[r]):r in e&&(i[r]=n(void 0,e[r]))});var f=s.concat(a).concat(u).concat(c),p=Object.keys(e).concat(Object.keys(t)).filter(function(e){return f.indexOf(e)===-1});return r.forEach(p,o),i}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});




var shost = location.host,
	dom = {'novel':1,'photo':2,'movie':3,'user':4};
	subdomain= shost.substr(0,shost.indexOf('.')),
	mhost = shost.substr(shost.indexOf('.')+1),
	action = window.location.pathname.split('/')[1],
	api='//api.'+mhost+'/',
	sup=Cookies.get('sup'),
	last=Cookies.get('last'),
	notice = Cookies.get('notice'),
	uinfo=(u=Cookies.get('user'))?JSON.parse(u):false,
	maps = '<div id="menu" class="mask" act="remove"><div><a href="//novel.'+mhost+'"><i class="iconfont icon-zhuye"></i><p>主站</p></a><a href="//novel.'+mhost+'"><i class="iconfont icon-novel"></i><p>小说</p></a><a href="//photo.'+mhost+'"><i class="iconfont icon-image"></i><p>套图</p></a><a href="http://movie.'+mhost+'"><i class="iconfont icon-dianying"></i><p>视频</p></a><a href="//down.'+mhost+'"><i class="iconfont icon-app"></i><p>App</p></a></div></div>';




if (sup==undefined && get('sup')!=null) {
	sup = get('sup');
	console.log(mhost);
	Cookies.set('sup', get('sup'),{expires:30,domain:mhost});
}

if (sup!=undefined && sup!='undefined' ) {$('a[href]').attr('href',function(k,v){return v+'?sup='+sup ;})}


if (notice!=1 && subdomain!='user' ) {
	$('body').append('<div class="lay-bg"><div class = "notice"><h3>公告</h3><div class="content"><p>阅读小说赚取积分</p><p>积分可以兑换现金</p><p>推广下线注册阅读</p><p>享有下线积分分成</p><p>点击用户中心推广用户</p><p>保存图片分享到微信群</p><p>永久域名:yanhuayuedu.com</p></div><em class="btn">知道了</em></div></div>')
	$('.btn').click(e=>{$('.lay-bg').remove();Cookies.set('notice',1,{expires:1,domain:mhost});})
}

if(uinfo){
	if (uinfo.type>2 && subdomain!='user') {
		share();
	}
setInterval(()=>{ 
	http(api+'online',{uid:uinfo.id},i=>{
		if (i.code==200) {
			if (last == i.data || i.data == false) {
				console.log('online');
			} else {
				Cookies.remove('last',{domain:mhost});
				Cookies.remove('sup',{domain:mhost});
				Cookies.remove('user',{domain:mhost});
				msg('其它地方登陆',true,1);
			}
		}
	},false,false);
	}, 1000*60);
}


if (!action && subdomain!='agent') {


	if (navigator.userAgent.indexOf('Mac')!=-1) {
		$('footer').css('align-items','flex-start')
	}


	$('footer>:nth-of-type('+dom[subdomain]+')>.iconfont').css('color','#f77')
	$('footer>:nth-of-type('+dom[subdomain]+')>p').css('color','#f77')
	$('main').css('padding-bottom','1rem')
}

// console.log(action)

switch(action)
{
	case 'search':searchV();break;
	case 'chapter': chapterV();break;
	case 'novel': novelV();break;
	case 'photo': photoV();break;
	case 'movie': movieV();break;
	case 'login': if (uinfo){location.href='/'} break;
}

pact();uact();

function pact() {
	$('[act]').click(function(){
		let pact = $(this).attr('act')
		console.log('pact '+pact);
		switch(pact)
		{
			case 'refresh':msg('刷新成功',true,1);break;
			case 'maps':menu(this,maps);break;
			case 'photo_menu':menu(this,photoMaps);break;
			case 'novel_menu':menu(this,novelMaps);break;
			case 'movie_menu':menu(this,movieMaps);break;
			case 'user'  :location.href='//user.'+mhost;break;
			case 'clearo'  :clearo();break;
			case 'search'  :search();break;
			case 'back'    :back();break;
			case 'eye'     :eye(this);break;
			case 'register':register();break;
			case 'login'   :login();break;
			case 'remove':break;

			case 'catalog' :catalog();break;
			case 'catalogsort'    :catalogsort();break;
			case 'skin'    :skins(this);break;
			case 'fontsize'    :fontsize(this);break;
			case 'closeDown' :$('#downapp').remove(); break;
			case 'down'    :window.location.href="//down."+mhost;break;


			case 'read':
				$('nav').toggle()
			break;
			case 'invite':
	 			var a = document.createElement('a')
		        a.download = $('img').attr('src')
		        a.href = $('img').attr('src')
		        a.click();
			break;
			case 'pick_b':
				$(this).toggle();
				$($(this).next()[0]).toggle()
			break;
			case 'pick':
				console.log(this)
				console.log($(this.children[0]).text())
				$('[act="catalog"]').text($(this.children[0]).text())
				let map = $("#catalog>a");
				$("#catalog input").removeAttr("checked");
				$(this.children[1]).attr('checked',true);

				for(let i =0;i<=map.length;i++){
					$(map[i]).show()
					if (i<this.dataset.s) {
						$(map[i]).hide()
					}
					if (i>=this.dataset.e) {
						$(map[i]).hide()
					}
				}
			break;


		}
	});
}

function uact() {
	$('[uact]').click(function(){
		if (uinfo==false) {return;}
		let uact = $(this).attr('uact')
		console.log('uact '+uact);
		switch(uact)
		{
			case 'vip':vip(this.dataset.id,this.dataset.amount);break;
			case 'logout':logout();break;
			case 'editinfo':editinfo();break;
			case 'exchange':exchange();break;
			case 'withdraw':withdraw();break;
			case 'pay2':pay2(this.dataset.id,this.dataset.name,this.dataset.amount,this.dataset.days);break;
			case 'pay3':pay3(this.dataset.id,this.dataset.name,this.dataset.amount);break;
		}
	});
}


function copyUrl(){
	var dwz = document.createElement('button');
	dwz.className = 'iconfont icon-share share';
	document.body.appendChild(dwz);
	$('.icon-share').click(function(){
	    $.ajax({
	        type: 'post',
	        url: api+'url',
	        dataType: 'json',
	        data: {url:location.href,uid:uinfo.id},
	        beforeSend:function(xhr){
	        	$('body').append('<div class="loading"><div class="sk-bounce-1 sk-child"></div><div class="sk-bounce-2 sk-child"></div><div class="sk-bounce-3 sk-child"></div></div>');
	        },
	        success:e => {
				if (XEClipboard.copy(e.data)) {
					msg('复制成功！');
				} else {
					msg('复制失败，请手动复制页面地址。');
				}
	        	$('.loading').remove();
	        },
	    });
	});
}


function share() {
	var dwz = document.createElement('button');
	dwz.className = 'iconfont icon-share share';
	document.body.appendChild(dwz);

	$('.icon-share').click(function(){

		http(api+'url',{url:location.href,uid:uinfo.id},e=>{
			console.log(e.data);
				msg('生成短网址成功，继续点击复制短网址');
				var dwz = document.createElement('button');
				dwz.className = 'iconfont icon-copy share';
				document.body.appendChild(dwz);

			    var clipboard = new ClipboardJS('.icon-copy', {
			        text: function() {
			        	console.log(e.data)
			            return e.data;
			        }
			    });

			    clipboard.on('success', function(e) {
			        console.log(e);
			        msg('复制成功！');
			    });

			    clipboard.on('error', function(e) {
			        console.log(e);
			    });
		});

	});
}


function pullUser(call=false) {
	if (uinfo) {
		http(api+'pull',{id:uinfo.id},e=>{

			if (e.code==200) {
				console.log(e)
				Cookies.set('user',e.data,{expires:0.5,domain:mhost});
				if (call!=false) {
					call(e.data);
				}
			}

		},{table:'user',type:'get'})
	} else {
		console.log('用户不存在')
	}
}

function withdraw() {
	http(api+'withdraw',{uid:uinfo.id},e=>{
        if (e.code==200) {pullUser();msg(e.msg,true,1)}
        if (e.code==222) {msg(e.msg,'info',1)}
        if (e.code==-1) {pullUser();msg(e.msg,false,1)}
	})
}


function novelV() {
	if (uinfo) {
		if (storeArr('favorite','has',novel)==true) {
			$('[act2=favorite]').html('取消收藏');
		} 
		$('[act2=favorite]').click(function(){
			storeArr('favorite','toggle',novel,e=>{
				if (e==false) {
					$('[act2=favorite]').html('取消收藏');
					msg('收藏成功');
				} else {
					$('[act2=favorite]').html('加入收藏');
					msg('取消成功');
				}
			})
		});
	} else {
		$('[act2=favorite]').attr('href',"//user."+mhost+'/favorite')
	}
	if (subdomain=='app') {
		$('[act2=history]').remove()
	} else {
		$('[act2=history]').attr('href',"http://down."+mhost)
	}
	
}

function regUrl() {
	if (sup) {
		return '//user.'+mhost+'/register?sup='+sup;
	} else {
		return '//user.'+mhost+'/register';
	}
}

function photoV() {


	if (auth=='2') {

		let photoS = Cookies.get('photoS')==undefined?[]:JSON.parse(Cookies.get('photoS'));

		console.log(photoS)
		console.log(parseInt(uinfo.sub)+1)

		if (uinfo && (uinfo.type==2 || uinfo.sub >= 20 )) { console.log('VIP 无限观看'); return;}

		if (!uinfo && photoS.length>1) {
			msg('游客一天只能欣赏一个VIP相册',regUrl(),2)
			$('.photo').css('filter','blur(5px)');return;
		}  

		if (photoS.length/5>(parseInt(uinfo.sub)+1)) {
			$('body').append('<div class="lay-bg"><div class="notice"><p>您已超过欣赏次数</p><p>普通会员每天可以欣赏5个VIP相册,如需欣赏更多,请分享二维码给你的好友,每分享注册一个用户可永久增加(5次/天)欣赏次数</p><div><a href="//novel.'+mhost+'/invite" class="btn">分享</a></div></div>');
			$('.photo').css('filter','blur(5px)');return;
		}

		if (photoS.includes(id)==false) {
			photoS.push(id);
			Cookies.set('photoS',photoS,{expires:1,domain:mhost});
		}
	}


	$('#play').click(function(){
		if(isVip(true)){
			let imgs = [];
			for (var i = 1; i <= photoNum; i++) {
			    imgs.push({src:'//img.056.run/photo/'+id+'/'+i+'.jpg'})
			}
			$.fancybox.open(imgs); 
		} 
	});

	// if (!uinfo && page>=2) {
	// 	console.log('登陆' + page);
	// 	$('.next').attr('href',regUrl())
	// }


	pin('img:first',1,e=>{
		$('main').before('<div id="notice">注册会员可点击相册上方的播放按钮进行全屏免广告欣赏</div>')
	},function(){$('#notice').remove()});

	http(api+'click',{id:id},e=>{
		console.log(e.msg);
	},{table:'photo',token:tk});
}

function movieV() {
	http(api+'click',{id:id},e=>{
		console.log(e.msg);
	},{table:'movie',token:tk},false);

	let movieS = Cookies.get('movieS')==undefined?[]:JSON.parse(Cookies.get('movieS'));


	console.log(movieS.length)
	console.log(parseInt(uinfo.sub)+1)

	if (uinfo && (uinfo.type==2 || uinfo.sub >= 20 )) { console.log('VIP 无限观看'); return;}

	if (!uinfo && movieS.length>1) {
		msg('游客一天只能欣赏一个视频',regUrl(),2)
		$('#player').css('filter','blur(5px)');return;
	}  

	if (movieS.length/5>(parseInt(uinfo.sub)+1)) {
		$('body').append('<div class="lay-bg"><div class="notice"><p>您已超过观看次数</p><p>普通会员每天可以观看5次,如需观看更多,请分享二维码给你的好友,每分享注册一个用户可永久增加(5次/天)观看次数</p><div><a href="//novel.'+mhost+'/invite" class="btn">分享</a>');
		$('#player').css('filter','blur(5px)');return;
	}

	if (movieS.includes(id)==false) {
		movieS.push(id);
		Cookies.set('movieS',movieS,{expires:1,domain:mhost});
	}

	console.log(movieS)
}

function chapterV() {

	if (auth=='2') {
		if (uinfo==false ) {	
			$('.next').attr('href',regUrl())
			console.log('register')
			$('#chapter').css('filter','blur(5px)')
			$('#chapter').after('<a class="openvip" href="'+regUrl()+'">注册会员查看更多</a>')
		} else {

			// if (uinfo.type !=2 && cid > free[2]) {
			// 	$('.next').attr('href','//user.'+mhost+'/vip')
			// 	console.log('vip')
			// 	$('#chapter').css('filter','blur(5px)')
			// 	$('#chapter').after('<a class="openvip" href="//user.'+mhost+'/vip">开通VIP查看更多</a>')
			// }
		}
	}

	size=Cookies.get('size');
	console.log(size)
	size != undefined ? size =parseInt(size) : size = 16 ;

	skin=Cookies.get('skin');if (skin==undefined) { skin = 'skin1'};
	$('body').addClass(skin);
	$('nav').attr('class','read '+skin);

	$('[data-skin="'+skin+'"]').css('order',10)

	$('#chapter').css('font-size',size+'px');
	

	roller(function(){
		if(!uinfo){return};
		data.uid=uinfo.id;
		console.log(data);
	    http(api+'logs',data,e=>{console.log(e)},{sup:sup});	
	},100);
	console.log(storeArr('history','len'))
 	storeArr('history','update',chapterHistory,nid)

}

//高亮搜索关键字
function searchV() {
	searchClear();
	// $('.so>input').bind('input propertychange', e=>{console.log(e)});
	$('.so>input').on('search',function(){search()});
	$('p').html(function(k,v){return v.replace(key,'<b>'+key+'</b>')})
}
//清除搜索关键字
function searchClear() { $('[type="search"]').val() ? $('.so>i').show() : $('.so>i').hide();}
//执行搜索
function search() {let key = $(".so>input").val();if(key){window.location.href="/search/"+key}}

function clearo(){ $("nav input").val('');$('.so>i').hide();}
function back(){document.referrer == ""?location.href = "/":history.go(-1);}
function menu(e,menu) {
	$(e).toggleClass('icon-quxiao');JSON.stringify($('#menu')) == "{}" ? $('body').append(menu) : $('#menu').remove();
}
function catalog() {
	$('#catalog>.log>div').toggle();
	$('#catalog>.log>ul').toggle();
}

function catalogsort() {
	let list = document.querySelector("#catalog");
	let children = list.children; 
	for(let i =children.length-1;i>=0;i--){
		list.appendChild(children[i])
	}
}

function skins(e) {

	Cookies.set('skin',e.dataset.skin,{expires:30,domain:mhost})

	$('body').attr('class',e.dataset.skin);
	$('nav').attr('class','read '+e.dataset.skin);
	$('i[act=skin]').removeAttr('style')
	$(e).css('order',10)
}

function fontsize(e) {
	e.dataset.act=='add' ? size+=1 : size-=1;
	Cookies.set('size',size,{expires:30,domain:mhost})
	$('#chapter').css('font-size',size+'px');
}


function isVip(show=false) {
	if (show==true) {
		if (uinfo==false) {
			msg('请先登陆','//user.'+mhost,1);
			return false;
		}
		// if (uinfo.type!=2) {
		// 	msg('仅限VIP使用','//user.'+mhost+'/vip',1);
		// 	return false;
		// }
	} else {
		if (uinfo==false || uinfo.type!=2) {
			return false;
		}
	}
	return true;
}

function get(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
 }


function storeArr(key,action=false,value,callback) {
	let store=window.localStorage,
	    tmp = store.getItem(key),
		v = value+',';
		
	if (tmp==null) {tmp=''};
	let has = tmp.indexOf(v) != -1 ? true : false;
	switch(action){
		case 'add':
			if (!has) {
				store.setItem(key,tmp+v);
			}
		break;
		case 'del':
			store.setItem(key,tmp.replace(v,''));
		break;
		case 'update':
			//替换数组的值 如果存在某个匹配的值就替换 不存在就写入
			if (tmp.indexOf(callback) != -1) {
				let reg = new RegExp('('+callback+'.+),','g');
				t = tmp.replace(reg,v)
				store.setItem(key,t);
				console.log('更新记录')
			} else {
				store.setItem(key,tmp+v);
				console.log('写入记录')
			}

		break;
		case 'has':
			return has;
		break;
		case 'toggle':
			if (has) {
				store.setItem(key,tmp.replace(v,''));
				callback(true)
			} else {
				store.setItem(key,tmp+v);
				callback(false)
			}
		break;
		case 'len':
			return tmp.split(',').slice(0,-1).length;
		break;
		default:
			return tmp.split(',').slice(0,-1)
		break;
	}
}


function vfor(s,data) {
    if (data!=null) {
    	let html='';
		for(var i of data) {
			html+=temp.replace(/\{(\w+)\}/g,function(t,v){return i[v]})
		};
		$(s).html(html);
    }
}

function pin(select,top,success,other) {
	let bar = false;
	$(window).scroll(function() {

	    let bTop = (document.documentElement.scrollTop || document.body.scrollTop)/size;
	    let sTop = $(select).offset().top/size;

	    if (bTop > sTop - top && bar == false) {
	    	bar = true;
	    	success()
	    }

	    if (bTop < sTop - top && bar == true) {
	    	bar = false;
	    	other()
	    }
	});
}



function slider(slider='slider',ms=800) {
    let tiemr = null,pd=0,index=0,that,li='';
    let imgs = document.querySelectorAll('#'+slider+">*");

    let icon = document.createElement("ul"); 
        icon.id="li";
        document.getElementById(slider).appendChild(icon)
        for (var i = 0; i < imgs.length; i++) {li+='<li></li>';}
        document.getElementById('li').innerHTML=li;

    let lis = document.querySelectorAll('#'+slider+">ul>*");
 
    function lbt(that) {
        if (that >= 0) {
            index = that;
        } else {
            if (pd == 0) {
                index++;
            } else {
                index--;
                pd = 0;
            }
        }
        if (index >= lis.length) index = 0;
        if (index < 0) index = lis.length - 1;
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
            imgs[j].className = "";
        }
        lis[index].className = "on";
        imgs[index].className = "curr";
    }

    imgs[index].className = "curr";
    lis[index].className = "on";
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {
            that = this.index;
            lbt(that);
        }
    }
    timer = setInterval(lbt, ms);
}



function post(url,data,call,headers) {
    $.ajax({
        type: 'post',
        url: url,
        headers:headers,
        dataType: 'json',
        data: data,
        beforeSend:function(xhr){
            $('body').append('<div class="loading"><div class="sk-bounce-1 sk-child"></div><div class="sk-bounce-2 sk-child"></div><div class="sk-bounce-3 sk-child"></div></div>');
        },
        success:e => {
            $(".loading").remove();
            call(e)
        },
    });
}


function http(url,data,callback,headers={page:null},loading=true) {

	pull();

	function pull2() {


		if (typeof data == 'function') {

			axios.get(url)
			  .then(function (e) {
			    data(e.data)
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

		} else {

	  		let params='';
	  		for(var i in data){
	  			params += i + '=' + data[i] + '&';
	  		}

	    	if (loading==true) {
	    		$('body').append('<div class="loading"><div class="sk-bounce-1 sk-child"></div><div class="sk-bounce-2 sk-child"></div><div class="sk-bounce-3 sk-child"></div></div>');
	    	}

			axios({
			  method: 'post',
			  url: url,
			  headers:headers,
			  data:params,
			})
			.then(function(ei) {
				let e=ei.data;
	        	if (loading==true) {$(".loading").remove();}
	        	callback(e);
	        	if (headers.page==null ) {return;}

	        	let p = Math.ceil(e.count/15),c = headers.page;
	        	let pg='<li>'+c+'/'+p+'页</li><li><a class="prev">上一页</a></li><li><a class="next">下一页</a></li>'
	        	
	        	if (c==1) {
	        		pg='<li>'+c+'/'+p+'页</li><li><a class="next">下一页</a></li>'
	        	}
	        	
	        	if (c==p || p==0) {
	        		pg='<li>'+c+'/'+p+'页</li>'
	        	}

	        	$('#pager').html(pg)

				$('.next').click(function(){
					headers.page = headers.page+1;
				    pull2();
				});
				
				$('.prev').click(function(){
					headers.page = headers.page-1;
				    pull2();
				});

			})
		}
	}


	function pull() {
		if (typeof data == 'function') {
		    $.ajax({
		        type: 'get',
		        url: url,
		        headers:callback,
		        dataType: 'json',
		        success: e => {data(e)},
		    });
		} else {
		    $.ajax({
		        type: 'post',
		        url: url,
		        headers:headers,
		        dataType: 'json',
		        data: data,
		        beforeSend:function(xhr){
		        	if (loading==true) {
		        		$('body').append('<div class="loading"><div class="sk-bounce-1 sk-child"></div><div class="sk-bounce-2 sk-child"></div><div class="sk-bounce-3 sk-child"></div></div>');
		        	}
		        	
		        },
		        success:e => {
		        	if (loading==true) {$(".loading").remove();}
		        	callback(e);
		        	if (headers.page==null ) {return;}

		        	let p = Math.ceil(e.count/15),c = headers.page;
		        	let pg='<li>'+c+'/'+p+'页</li><li><a class="prev">上一页</a></li><li><a class="next">下一页</a></li>'
		        	
		        	if (c==1) {
		        		pg='<li>'+c+'/'+p+'页</li><li><a class="next">下一页</a></li>'
		        	}
		        	
		        	if (c==p || p==0) {
		        		pg='<li>'+c+'/'+p+'页</li>'
		        	}

		        	$('#pager').html(pg)

					$('.next').click(function(){
						headers.page = headers.page+1;
					    pull();
					});
					
					$('.prev').click(function(){
						headers.page = headers.page-1;
					    pull();
					});

		        },
		    });
		}
	}
}


function roller(e,height=200,loop=false) {
let scroll = true;
$(window).scroll(
	()=> {
		if (loop) {
		    if ( scroll == false  && $(this).scrollTop() + $(this).height() + height < $(document).height()) {
		     	typeof e =='function' ? e() : console.log('roll参数错误');
		        scroll = true;

		        console.log('go',scroll)
		    }
		} 
	    if ($(this).scrollTop() + $(this).height() + height >= $(document).height() && scroll) {
	        typeof e =='function' ? e() : console.log('roll参数错误');
	        scroll = false;
	        console.log('do',scroll)
	    }
	});
}



function layer(html) {
    var o = document.body;
    var body = document.createElement("div");
    body.innerHTML = html;
    body.style='position: fixed;left: 50%;top: 50%;background: #fff;transform: translate(-50%, -50%);z-index: 999;box-shadow: 0 0 .1rem #999;border-radius: .1rem;padding: .1rem;'
    o.appendChild(body);

}


function msg(text, f=false, time=3) {
    var o = document.body;
    var body = document.createElement("div");
    body.innerHTML = text;
    body.style='max-width: 200px;padding: 15px;background-color: rgba(0,0,0,.5);font-size:12px;word-wrap: break-word;color: #EEE;border-radius: 3px;position: fixed;left: 50%;top: 50%;z-index: 10000;transform: translate(-50%, -50%);'
    o.appendChild(body);
    setTimeout(function() {
        o.removeChild(body);
        if (f == true) {
            location.reload()
        } 

        if (typeof f == 'string') {
	        location.href=f;
        }


    }, time * 1000);
}



function getDate() {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // toJSON 的时区补偿
    return date.toJSON().substr(0, 19).replace(/[T]/g, ' '); 
}

function PostJump(url, params) {
 var form = $("<form method='post'></form>");
 form.attr({"action":url});
 for (pa in params) {
     var input = $("<input type='hidden'>");
     input.attr({"name":pa});
     input.val(params[pa]);
     form.append(input);
 }
 $("html").append(form);
  form.submit();
}












