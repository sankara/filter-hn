!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t){function n(e){let t=document.querySelector(".ctrHiddenUsers"),r=document.createElement("ul");r.className="ctrHiddenUsers",e.forEach(e=>{let t=document.createElement("li");t.textContent=e;let o=document.createElement("a");o.style.padding="0 5px",o.style.cursor="pointer",o.innerHTML="(x)",o.onclick=t=>{console.log(e),unHideUser(e,e=>{n(e)})},t.appendChild(o),r.appendChild(t)}),t.parentNode.replaceChild(r,t)}document.addEventListener("DOMContentLoaded",()=>{getConfig("hiddenUsers",e=>{n(e)})}),document.querySelector("form").addEventListener("submit",(function(e){browser.storage.sync.get().then(e=>{e.hiddenUsers.push(document.querySelector("#txtUser").value),browser.storage.sync.set(e),n(e)}),e.preventDefault()}))}});