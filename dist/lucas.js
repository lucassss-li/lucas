!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);class s{constructor(){this.subs={}}addsub(e){this.subs[e.uid]=e}notify(){for(let e in this.subs)this.subs[e].update()}}let n=0;class o{constructor(e,t,i){this.uid=n++,this.cb=i,this.scope=t,this.exp=e,this.update()}get(){s.watcher=this;let e=o.computeExp(this.scope,this.exp);return s.watcher=null,e}update(){let e=this.get();this.cb(e)}static computeExp(e,t){return new Function("scope","with(scope){return "+t+"}")(e)}}class l{constructor(e){this.vm=e,this.vm.$el.appendChild(this.compile(this.vm.$el))}compile(e){let t=document.createDocumentFragment(),i=[...e.childNodes];for(let e of i)1===e.nodeType?this.compileNode(e):this.compileText(e),t.appendChild(e);return t}compileNode(e){let t=[...e.attributes];if(t.some(e=>"l-for"===e.name)){let i=t.find(e=>/^l-for/.test(e.name)),s=(i.name,i.value),n=this.vm,l=s.split(" in ");e.removeAttribute("l-for");let r=[];new o(""+l[1],n,t=>{setTimeout(()=>{let i=document.createDocumentFragment(),s=[...r];for(r=[];s.length>0;)e.parentNode.removeChild(s.pop());function n(e,t,i){if(1===e.nodeType){if(e.childNodes&&e.childNodes.length>0){let s=[...e.childNodes];for(let e of s)n(e,t,i)}let s=[...e.attributes];for(let n of s){let s=n.name,o=n.value;e.setAttribute(s,o.replace(/item/g,`${t}[${i}]`))}}else e.textContent=e.textContent.replace(/\{\{(.*)(item)(\.?.*)\}\}/g,`{{$1${t}[${i}]$3}}`)}for(let s=0;s<t.length;s++){let t=e.cloneNode(!0);n(t,l[1],s),this.compileNode(t),t.hidden=!1,r.push(t),i.appendChild(t)}setTimeout(()=>{e.hidden=!0,e.parentNode.insertBefore(i,e)},0)},0)},e,this)}else{if(e.childNodes&&e.childNodes.length>0){let t=[...e.childNodes];for(let e of t)1===e.nodeType?this.compileNode(e):this.compileText(e)}for(let i of t)this.compileIstruction(e,i)}}compileText(e){if([...e.parentNode.attributes].some(e=>"l-for"===e.name))return;let t=e.textContent.trim(),i=t.match(/\{\{.*\}\}/g),s=t.split(/\{\{(.*)\}\}/g);if(t&&i){let t=[];for(let e of s)i.indexOf("{{"+e+"}}")>-1?t.push("("+e+")"):""!==e&&t.push("'"+e+"'");new o(t.join("+"),this.vm,t=>e.textContent=t)}}compileIstruction(e,t){let i=t.name,s=t.value,n=this.vm;if(/^(l-on)/.test(i)){s=s.split(/\((.*)\)/g);let t=[];if(s[1]){let e=[...s[1]];for(let i of e)/(\[|\]|\.)/.test(i)?t.push("+"):t.push(i);t=t.join("").split("+").filter(e=>""!=e)}let o=i.slice(5);e.addEventListener(o,(function(e){n[s[0]](e,function(e){let t=n;for(let i of e)t=t[i];return t}(t))})),e.removeAttribute(i)}else if(/^(l-bind)/.test(i)){let t=i.split(":")[1];switch(t){case"class":if(/^\{/.test(s)){let t=s.slice(1,s.length-1).split(","),i={};for(let e of t){let[t,s]=e.split(":");i[t]=s}for(let t in i)new o(i[t],n,i=>{i?e.classList.add(t):e.classList.remove(t)})}else if(/^\[/.test(s)){let t=s.slice(1,s.length-1).split(",");for(let i of t)new o(i,n,t=>e.classList.add(t))}else new o(s,n,t=>e.classList.add(t));break;case"style":{let t=s.slice(1,s.length-1).split(","),i={};for(let e of t){let[t,s]=e.split(":");i[t]=s}for(let t in i)new o(i[t],n,i=>e.style[t]=i);break}default:new o(s,n,i=>e[t]=i)}e.removeAttribute(i)}else if(/^l-/.test(i)){switch(i){case"l-model":{let t=null===s.match(/(\[|\]|\.)/);if(t)/^checkbox$/.test(e.type)?new o(s,n,t=>e.checked=t):new o(s,n,t=>e.value=t);else{let t=this.changeInstruction(s);/^checkbox$/.test(e.type)?new o(t,n,t=>e.checked=t):new o(t,n,t=>e.value=t)}if(t)/^checkbox$/.test(e.type)?e.addEventListener("input",(function(){n[s]=e.checked})):e.addEventListener("input",(function(){n[s]=e.value}));else{let t=[...s],i=[];for(let e of t)/(\[|\]|\.)/.test(e)?i.push("+"):i.push(e);i=i.filter(e=>""!=e).join("").split("+"),s=i.shift();for(let e of i)""!==e&&(s=s+"['"+e+"']");if(/^checkbox$/.test(e.type)){let t=new Function("e","this."+s+"=e.target.checked").bind(n);e.addEventListener("input",t)}else{let t=new Function("e","this."+s+"=e.target.value").bind(n);e.addEventListener("input",t)}}break}case"l-text":null===s.match(/(\[|\]|\.)/)||(s=this.changeInstruction(s)),new o(s,n,t=>e.innerText=t);break;case"l-html":null===s.match(/(\[|\]|\.)/)||(s=this.changeInstruction(s)),new o(s,n,t=>e.innerHTML=t);break;case"l-show":null===s.match(/(\[|\]|\.)/)||(s=this.changeInstruction(s)),new o(s,n,t=>{e.hidden=t})}e.removeAttribute(i)}}changeInstruction(e){let t=[...e],i=[];for(let e of t)/(\[|\]|\.)/.test(e)?i.push("+"):i.push(e);i=i.filter(e=>""!=e).join("").split("+"),e=i.shift();for(let t of i)""!==t&&(e=e+"['"+t+"']");return e}}class r{constructor(e){this.$data=e||{},this.walk(this.$data)}walk(e){for(let t in e)"object"==typeof e[t]&&this.walk(e[t]),this.defineReactable(e,t,e[t])}defineReactable(e,t,i){let n=this,o=new s;Object.defineProperty(e,t,{enumerable:!0,get:()=>(s.watcher&&o.addsub(s.watcher),i),set(s){i=s,"object"==typeof s&&n.walk(e[t]),o.notify()}})}}window.Lucas=class{constructor(e){this.$el=document.querySelector(e.el),this.$options=e,this.$vm=this,this.$data=e.data,this.$methods=e.methods,this.$computed=e.computed,new r(this.$data),this._proxyData(this.$data),this._proxyMethod(this.$methods),this._proxyComputed(this.$computed),new l(this)}_proxyData(e){for(let t in e)Object.defineProperty(this,t,{enumerable:!0,get:()=>e[t],set(i){e[t]=i}})}_proxyMethod(e){for(let t in e)this[t]=e[t].bind(this)}_proxyComputed(e){for(let i in e){new o("$computed['"+i+"'].call($vm)",this,e=>{this[i]=e}),t(this,i,this[i])}function t(e,t,i){let n=new s;Object.defineProperty(e,t,{enumerable:!0,get:()=>(s.watcher&&n.addsub(s.watcher),i),set(e){i=e,n.notify()}})}}}}]);