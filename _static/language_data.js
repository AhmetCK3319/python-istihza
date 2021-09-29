/*
 * language_data.js
 * ~~~~~~~~~~~~~~~~
 *
 * This script contains the language-specific data used by searchtools.js,
 * namely the list of stopwords, stemmer, scorer and splitter.
 *
 * :copyright: Copyright 2007-2021 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */

var stopwords = [];


/* Non-minified version is copied as a separate JS file, is available */
BaseStemmer=function(){this.setCurrent=function(r){this.current=r;this.cursor=0;this.limit=this.current.length;this.limit_backward=0;this.bra=this.cursor;this.ket=this.limit};this.getCurrent=function(){return this.current};this.copy_from=function(r){this.current=r.current;this.cursor=r.cursor;this.limit=r.limit;this.limit_backward=r.limit_backward;this.bra=r.bra;this.ket=r.ket};this.in_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor++;return true};this.in_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor--;return true};this.out_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t){this.cursor++;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor++;return true}return false};this.out_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t){this.cursor--;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor--;return true}return false};this.eq_s=function(r){if(this.limit-this.cursor<r.length)return false;if(this.current.slice(this.cursor,this.cursor+r.length)!=r){return false}this.cursor+=r.length;return true};this.eq_s_b=function(r){if(this.cursor-this.limit_backward<r.length)return false;if(this.current.slice(this.cursor-r.length,this.cursor)!=r){return false}this.cursor-=r.length;return true};this.find_among=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=f;o<l[0].length;o++){if(s+f==e){a=-1;break}a=this.current.charCodeAt(s+f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s+l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s+l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.find_among_b=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit_backward;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=l[0].length-1-f;o>=0;o--){if(s-f==e){a=-1;break}a=this.current.charCodeAt(s-1-f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s-l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s-l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.replace_s=function(r,t,i){var s=i.length-(t-r);this.current=this.current.slice(0,r)+i+this.current.slice(t);this.limit+=s;if(this.cursor>=t)this.cursor+=s;else if(this.cursor>r)this.cursor=r;return s};this.slice_check=function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>this.current.length){return false}return true};this.slice_from=function(r){var t=false;if(this.slice_check()){this.replace_s(this.bra,this.ket,r);t=true}return t};this.slice_del=function(){return this.slice_from("")};this.insert=function(r,t,i){var s=this.replace_s(r,t,i);if(r<=this.bra)this.bra+=s;if(r<=this.ket)this.ket+=s};this.slice_to=function(){var r="";if(this.slice_check()){r=this.current.slice(this.bra,this.ket)}return r};this.assign_to=function(){return this.current.slice(0,this.limit)}};
TurkishStemmer=function(){var r=new BaseStemmer;var i=[["m",-1,-1],["n",-1,-1],["miz",-1,-1],["niz",-1,-1],["muz",-1,-1],["nuz",-1,-1],["mÃ¼z",-1,-1],["nÃ¼z",-1,-1],["mÄ±z",-1,-1],["nÄ±z",-1,-1]];var e=[["leri",-1,-1],["larÄ±",-1,-1]];var u=[["ni",-1,-1],["nu",-1,-1],["nÃ¼",-1,-1],["nÄ±",-1,-1]];var a=[["in",-1,-1],["un",-1,-1],["Ã¼n",-1,-1],["Ä±n",-1,-1]];var s=[["a",-1,-1],["e",-1,-1]];var t=[["na",-1,-1],["ne",-1,-1]];var l=[["da",-1,-1],["ta",-1,-1],["de",-1,-1],["te",-1,-1]];var c=[["nda",-1,-1],["nde",-1,-1]];var o=[["dan",-1,-1],["tan",-1,-1],["den",-1,-1],["ten",-1,-1]];var f=[["ndan",-1,-1],["nden",-1,-1]];var n=[["la",-1,-1],["le",-1,-1]];var b=[["ca",-1,-1],["ce",-1,-1]];var m=[["im",-1,-1],["um",-1,-1],["Ã¼m",-1,-1],["Ä±m",-1,-1]];var k=[["sin",-1,-1],["sun",-1,-1],["sÃ¼n",-1,-1],["sÄ±n",-1,-1]];var _=[["iz",-1,-1],["uz",-1,-1],["Ã¼z",-1,-1],["Ä±z",-1,-1]];var v=[["siniz",-1,-1],["sunuz",-1,-1],["sÃ¼nÃ¼z",-1,-1],["sÄ±nÄ±z",-1,-1]];var d=[["lar",-1,-1],["ler",-1,-1]];var g=[["niz",-1,-1],["nuz",-1,-1],["nÃ¼z",-1,-1],["nÄ±z",-1,-1]];var w=[["dir",-1,-1],["tir",-1,-1],["dur",-1,-1],["tur",-1,-1],["dÃ¼r",-1,-1],["tÃ¼r",-1,-1],["dÄ±r",-1,-1],["tÄ±r",-1,-1]];var q=[["casÄ±na",-1,-1],["cesine",-1,-1]];var p=[["di",-1,-1],["ti",-1,-1],["dik",-1,-1],["tik",-1,-1],["duk",-1,-1],["tuk",-1,-1],["dÃ¼k",-1,-1],["tÃ¼k",-1,-1],["dÄ±k",-1,-1],["tÄ±k",-1,-1],["dim",-1,-1],["tim",-1,-1],["dum",-1,-1],["tum",-1,-1],["dÃ¼m",-1,-1],["tÃ¼m",-1,-1],["dÄ±m",-1,-1],["tÄ±m",-1,-1],["din",-1,-1],["tin",-1,-1],["dun",-1,-1],["tun",-1,-1],["dÃ¼n",-1,-1],["tÃ¼n",-1,-1],["dÄ±n",-1,-1],["tÄ±n",-1,-1],["du",-1,-1],["tu",-1,-1],["dÃ¼",-1,-1],["tÃ¼",-1,-1],["dÄ±",-1,-1],["tÄ±",-1,-1]];var h=[["sa",-1,-1],["se",-1,-1],["sak",-1,-1],["sek",-1,-1],["sam",-1,-1],["sem",-1,-1],["san",-1,-1],["sen",-1,-1]];var z=[["miÅŸ",-1,-1],["muÅŸ",-1,-1],["mÃ¼ÅŸ",-1,-1],["mÄ±ÅŸ",-1,-1]];var y=[["b",-1,1],["c",-1,2],["d",-1,3],["ÄŸ",-1,4]];var C=[17,65,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,8,0,0,0,0,0,0,1];var S=[1,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,1];var B=[1,64,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];var T=[17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,130];var W=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];var j=[17];var x=[65];var A=[65];var D=false;function E(){var i=r.limit-r.cursor;r:while(true){var e=r.limit-r.cursor;i:{if(!r.in_grouping_b(C,97,305)){break i}r.cursor=r.limit-e;break r}r.cursor=r.limit-e;if(r.cursor<=r.limit_backward){return false}r.cursor--}r:{var u=r.limit-r.cursor;i:{if(!r.eq_s_b("a")){break i}e:while(true){var a=r.limit-r.cursor;u:{if(!r.in_grouping_b(B,97,305)){break u}r.cursor=r.limit-a;break e}r.cursor=r.limit-a;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("e")){break i}e:while(true){var s=r.limit-r.cursor;u:{if(!r.in_grouping_b(T,101,252)){break u}r.cursor=r.limit-s;break e}r.cursor=r.limit-s;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("Ä±")){break i}e:while(true){var t=r.limit-r.cursor;u:{if(!r.in_grouping_b(W,97,305)){break u}r.cursor=r.limit-t;break e}r.cursor=r.limit-t;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("i")){break i}e:while(true){var l=r.limit-r.cursor;u:{if(!r.in_grouping_b(j,101,105)){break u}r.cursor=r.limit-l;break e}r.cursor=r.limit-l;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("o")){break i}e:while(true){var c=r.limit-r.cursor;u:{if(!r.in_grouping_b(x,111,117)){break u}r.cursor=r.limit-c;break e}r.cursor=r.limit-c;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("Ã¶")){break i}e:while(true){var o=r.limit-r.cursor;u:{if(!r.in_grouping_b(A,246,252)){break u}r.cursor=r.limit-o;break e}r.cursor=r.limit-o;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;i:{if(!r.eq_s_b("u")){break i}e:while(true){var f=r.limit-r.cursor;u:{if(!r.in_grouping_b(x,111,117)){break u}r.cursor=r.limit-f;break e}r.cursor=r.limit-f;if(r.cursor<=r.limit_backward){break i}r.cursor--}break r}r.cursor=r.limit-u;if(!r.eq_s_b("Ã¼")){return false}i:while(true){var n=r.limit-r.cursor;e:{if(!r.in_grouping_b(A,246,252)){break e}r.cursor=r.limit-n;break i}r.cursor=r.limit-n;if(r.cursor<=r.limit_backward){return false}r.cursor--}}r.cursor=r.limit-i;return true}function F(){r:{var i=r.limit-r.cursor;i:{if(!r.eq_s_b("n")){break i}var e=r.limit-r.cursor;if(!r.in_grouping_b(C,97,305)){break i}r.cursor=r.limit-e;break r}r.cursor=r.limit-i;{var u=r.limit-r.cursor;i:{var a=r.limit-r.cursor;if(!r.eq_s_b("n")){break i}r.cursor=r.limit-a;return false}r.cursor=r.limit-u}var s=r.limit-r.cursor;if(r.cursor<=r.limit_backward){return false}r.cursor--;if(!r.in_grouping_b(C,97,305)){return false}r.cursor=r.limit-s}return true}function G(){r:{var i=r.limit-r.cursor;i:{if(!r.eq_s_b("s")){break i}var e=r.limit-r.cursor;if(!r.in_grouping_b(C,97,305)){break i}r.cursor=r.limit-e;break r}r.cursor=r.limit-i;{var u=r.limit-r.cursor;i:{var a=r.limit-r.cursor;if(!r.eq_s_b("s")){break i}r.cursor=r.limit-a;return false}r.cursor=r.limit-u}var s=r.limit-r.cursor;if(r.cursor<=r.limit_backward){return false}r.cursor--;if(!r.in_grouping_b(C,97,305)){return false}r.cursor=r.limit-s}return true}function H(){r:{var i=r.limit-r.cursor;i:{if(!r.eq_s_b("y")){break i}var e=r.limit-r.cursor;if(!r.in_grouping_b(C,97,305)){break i}r.cursor=r.limit-e;break r}r.cursor=r.limit-i;{var u=r.limit-r.cursor;i:{var a=r.limit-r.cursor;if(!r.eq_s_b("y")){break i}r.cursor=r.limit-a;return false}r.cursor=r.limit-u}var s=r.limit-r.cursor;if(r.cursor<=r.limit_backward){return false}r.cursor--;if(!r.in_grouping_b(C,97,305)){return false}r.cursor=r.limit-s}return true}function I(){r:{var i=r.limit-r.cursor;i:{if(!r.in_grouping_b(S,105,305)){break i}var e=r.limit-r.cursor;if(!r.out_grouping_b(C,97,305)){break i}r.cursor=r.limit-e;break r}r.cursor=r.limit-i;{var u=r.limit-r.cursor;i:{var a=r.limit-r.cursor;if(!r.in_grouping_b(S,105,305)){break i}r.cursor=r.limit-a;return false}r.cursor=r.limit-u}var s=r.limit-r.cursor;if(r.cursor<=r.limit_backward){return false}r.cursor--;if(!r.out_grouping_b(C,97,305)){return false}r.cursor=r.limit-s}return true}function J(){if(r.find_among_b(i)==0){return false}if(!I()){return false}return true}function K(){if(!E()){return false}if(!r.in_grouping_b(S,105,305)){return false}if(!G()){return false}return true}function L(){if(r.find_among_b(e)==0){return false}return true}function M(){if(!E()){return false}if(!r.in_grouping_b(S,105,305)){return false}if(!H()){return false}return true}function N(){if(!E()){return false}if(r.find_among_b(u)==0){return false}return true}function O(){if(!E()){return false}if(r.find_among_b(a)==0){return false}if(!F()){return false}return true}function P(){if(!E()){return false}if(r.find_among_b(s)==0){return false}if(!H()){return false}return true}function Q(){if(!E()){return false}if(r.find_among_b(t)==0){return false}return true}function R(){if(!E()){return false}if(r.find_among_b(l)==0){return false}return true}function U(){if(!E()){return false}if(r.find_among_b(c)==0){return false}return true}function V(){if(!E()){return false}if(r.find_among_b(o)==0){return false}return true}function X(){if(!E()){return false}if(r.find_among_b(f)==0){return false}return true}function Y(){if(!E()){return false}if(r.find_among_b(n)==0){return false}if(!H()){return false}return true}function Z(){if(!r.eq_s_b("ki")){return false}return true}function $(){if(!E()){return false}if(r.find_among_b(b)==0){return false}if(!F()){return false}return true}function rr(){if(!E()){return false}if(r.find_among_b(m)==0){return false}if(!H()){return false}return true}function ir(){if(!E()){return false}if(r.find_among_b(k)==0){return false}return true}function er(){if(!E()){return false}if(r.find_among_b(_)==0){return false}if(!H()){return false}return true}function ur(){if(r.find_among_b(v)==0){return false}return true}function ar(){if(!E()){return false}if(r.find_among_b(d)==0){return false}return true}function sr(){if(!E()){return false}if(r.find_among_b(g)==0){return false}return true}function tr(){if(!E()){return false}if(r.find_among_b(w)==0){return false}return true}function lr(){if(r.find_among_b(q)==0){return false}return true}function cr(){if(!E()){return false}if(r.find_among_b(p)==0){return false}if(!H()){return false}return true}function or(){if(r.find_among_b(h)==0){return false}if(!H()){return false}return true}function fr(){if(!E()){return false}if(r.find_among_b(z)==0){return false}if(!H()){return false}return true}function nr(){if(!r.eq_s_b("ken")){return false}if(!H()){return false}return true}function br(){r.ket=r.cursor;D=true;r:{var i=r.limit-r.cursor;i:{e:{var e=r.limit-r.cursor;u:{if(!fr()){break u}break e}r.cursor=r.limit-e;u:{if(!cr()){break u}break e}r.cursor=r.limit-e;u:{if(!or()){break u}break e}r.cursor=r.limit-e;if(!nr()){break i}}break r}r.cursor=r.limit-i;i:{if(!lr()){break i}e:{var u=r.limit-r.cursor;u:{if(!ur()){break u}break e}r.cursor=r.limit-u;u:{if(!ar()){break u}break e}r.cursor=r.limit-u;u:{if(!rr()){break u}break e}r.cursor=r.limit-u;u:{if(!ir()){break u}break e}r.cursor=r.limit-u;u:{if(!er()){break u}break e}r.cursor=r.limit-u}if(!fr()){break i}break r}r.cursor=r.limit-i;i:{if(!ar()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var a=r.limit-r.cursor;e:{r.ket=r.cursor;u:{var s=r.limit-r.cursor;a:{if(!tr()){break a}break u}r.cursor=r.limit-s;a:{if(!cr()){break a}break u}r.cursor=r.limit-s;a:{if(!or()){break a}break u}r.cursor=r.limit-s;if(!fr()){r.cursor=r.limit-a;break e}}}D=false;break r}r.cursor=r.limit-i;i:{if(!sr()){break i}e:{var t=r.limit-r.cursor;u:{if(!cr()){break u}break e}r.cursor=r.limit-t;if(!or()){break i}}break r}r.cursor=r.limit-i;i:{e:{var l=r.limit-r.cursor;u:{if(!ur()){break u}break e}r.cursor=r.limit-l;u:{if(!er()){break u}break e}r.cursor=r.limit-l;u:{if(!ir()){break u}break e}r.cursor=r.limit-l;if(!rr()){break i}}r.bra=r.cursor;if(!r.slice_del()){return false}var c=r.limit-r.cursor;e:{r.ket=r.cursor;if(!fr()){r.cursor=r.limit-c;break e}}break r}r.cursor=r.limit-i;if(!tr()){return false}r.bra=r.cursor;if(!r.slice_del()){return false}var o=r.limit-r.cursor;i:{r.ket=r.cursor;e:{var f=r.limit-r.cursor;u:{if(!ur()){break u}break e}r.cursor=r.limit-f;u:{if(!ar()){break u}break e}r.cursor=r.limit-f;u:{if(!rr()){break u}break e}r.cursor=r.limit-f;u:{if(!ir()){break u}break e}r.cursor=r.limit-f;u:{if(!er()){break u}break e}r.cursor=r.limit-f}if(!fr()){r.cursor=r.limit-o;break i}}}r.bra=r.cursor;if(!r.slice_del()){return false}return true}function mr(){r.ket=r.cursor;if(!Z()){return false}r:{var i=r.limit-r.cursor;i:{if(!R()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var e=r.limit-r.cursor;e:{r.ket=r.cursor;u:{var u=r.limit-r.cursor;a:{if(!ar()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}var a=r.limit-r.cursor;s:{if(!mr()){r.cursor=r.limit-a;break s}}break u}r.cursor=r.limit-u;if(!J()){r.cursor=r.limit-e;break e}r.bra=r.cursor;if(!r.slice_del()){return false}var s=r.limit-r.cursor;a:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-s;break a}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-s;break a}}}}break r}r.cursor=r.limit-i;i:{if(!O()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var t=r.limit-r.cursor;e:{r.ket=r.cursor;u:{var l=r.limit-r.cursor;a:{if(!L()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}break u}r.cursor=r.limit-l;a:{r.ket=r.cursor;s:{var c=r.limit-r.cursor;t:{if(!J()){break t}break s}r.cursor=r.limit-c;if(!K()){break a}}r.bra=r.cursor;if(!r.slice_del()){return false}var o=r.limit-r.cursor;s:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-o;break s}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-o;break s}}break u}r.cursor=r.limit-l;if(!mr()){r.cursor=r.limit-t;break e}}}break r}r.cursor=r.limit-i;if(!U()){return false}i:{var f=r.limit-r.cursor;e:{if(!L()){break e}r.bra=r.cursor;if(!r.slice_del()){return false}break i}r.cursor=r.limit-f;e:{if(!K()){break e}r.bra=r.cursor;if(!r.slice_del()){return false}var n=r.limit-r.cursor;u:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-n;break u}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-n;break u}}break i}r.cursor=r.limit-f;if(!mr()){return false}}}return true}function kr(){r:{var i=r.limit-r.cursor;i:{r.ket=r.cursor;if(!ar()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var e=r.limit-r.cursor;e:{if(!mr()){r.cursor=r.limit-e;break e}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;if(!$()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var u=r.limit-r.cursor;e:{u:{var a=r.limit-r.cursor;a:{r.ket=r.cursor;if(!L()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}break u}r.cursor=r.limit-a;a:{r.ket=r.cursor;s:{var s=r.limit-r.cursor;t:{if(!J()){break t}break s}r.cursor=r.limit-s;if(!K()){break a}}r.bra=r.cursor;if(!r.slice_del()){return false}var t=r.limit-r.cursor;s:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-t;break s}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-t;break s}}break u}r.cursor=r.limit-a;r.ket=r.cursor;if(!ar()){r.cursor=r.limit-u;break e}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-u;break e}}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;e:{var l=r.limit-r.cursor;u:{if(!U()){break u}break e}r.cursor=r.limit-l;if(!Q()){break i}}e:{var c=r.limit-r.cursor;u:{if(!L()){break u}r.bra=r.cursor;if(!r.slice_del()){return false}break e}r.cursor=r.limit-c;u:{if(!K()){break u}r.bra=r.cursor;if(!r.slice_del()){return false}var o=r.limit-r.cursor;a:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-o;break a}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-o;break a}}break e}r.cursor=r.limit-c;if(!mr()){break i}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;e:{var f=r.limit-r.cursor;u:{if(!X()){break u}break e}r.cursor=r.limit-f;if(!N()){break i}}e:{var n=r.limit-r.cursor;u:{if(!K()){break u}r.bra=r.cursor;if(!r.slice_del()){return false}var b=r.limit-r.cursor;a:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-b;break a}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-b;break a}}break e}r.cursor=r.limit-n;if(!L()){break i}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;if(!V()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}var m=r.limit-r.cursor;e:{r.ket=r.cursor;u:{var k=r.limit-r.cursor;a:{if(!J()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}var _=r.limit-r.cursor;s:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-_;break s}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-_;break s}}break u}r.cursor=r.limit-k;a:{if(!ar()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}var v=r.limit-r.cursor;s:{if(!mr()){r.cursor=r.limit-v;break s}}break u}r.cursor=r.limit-k;if(!mr()){r.cursor=r.limit-m;break e}}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;e:{var d=r.limit-r.cursor;u:{if(!O()){break u}break e}r.cursor=r.limit-d;if(!Y()){break i}}r.bra=r.cursor;if(!r.slice_del()){return false}var g=r.limit-r.cursor;e:{u:{var w=r.limit-r.cursor;a:{r.ket=r.cursor;if(!ar()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){break a}break u}r.cursor=r.limit-w;a:{r.ket=r.cursor;s:{var q=r.limit-r.cursor;t:{if(!J()){break t}break s}r.cursor=r.limit-q;if(!K()){break a}}r.bra=r.cursor;if(!r.slice_del()){return false}var p=r.limit-r.cursor;s:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-p;break s}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-p;break s}}break u}r.cursor=r.limit-w;if(!mr()){r.cursor=r.limit-g;break e}}}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;if(!L()){break i}r.bra=r.cursor;if(!r.slice_del()){return false}break r}r.cursor=r.limit-i;i:{if(!mr()){break i}break r}r.cursor=r.limit-i;i:{r.ket=r.cursor;e:{var h=r.limit-r.cursor;u:{if(!R()){break u}break e}r.cursor=r.limit-h;u:{if(!M()){break u}break e}r.cursor=r.limit-h;if(!P()){break i}}r.bra=r.cursor;if(!r.slice_del()){return false}var z=r.limit-r.cursor;e:{r.ket=r.cursor;u:{var y=r.limit-r.cursor;a:{if(!J()){break a}r.bra=r.cursor;if(!r.slice_del()){return false}var C=r.limit-r.cursor;s:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-C;break s}}break u}r.cursor=r.limit-y;if(!ar()){r.cursor=r.limit-z;break e}}r.bra=r.cursor;if(!r.slice_del()){return false}r.ket=r.cursor;if(!mr()){r.cursor=r.limit-z;break e}}break r}r.cursor=r.limit-i;r.ket=r.cursor;i:{var S=r.limit-r.cursor;e:{if(!J()){break e}break i}r.cursor=r.limit-S;if(!K()){return false}}r.bra=r.cursor;if(!r.slice_del()){return false}var B=r.limit-r.cursor;i:{r.ket=r.cursor;if(!ar()){r.cursor=r.limit-B;break i}r.bra=r.cursor;if(!r.slice_del()){return false}if(!mr()){r.cursor=r.limit-B;break i}}}return true}function _r(){var i;r.ket=r.cursor;i=r.find_among_b(y);if(i==0){return false}r.bra=r.cursor;switch(i){case 1:if(!r.slice_from("p")){return false}break;case 2:if(!r.slice_from("Ã§")){return false}break;case 3:if(!r.slice_from("t")){return false}break;case 4:if(!r.slice_from("k")){return false}break}return true}function vr(){var i=r.limit-r.cursor;r:{var e=r.limit-r.cursor;i:{if(!r.eq_s_b("d")){break i}break r}r.cursor=r.limit-e;if(!r.eq_s_b("g")){return false}}r.cursor=r.limit-i;r:{var u=r.limit-r.cursor;i:{var a=r.limit-r.cursor;e:while(true){var s=r.limit-r.cursor;u:{if(!r.in_grouping_b(C,97,305)){break u}r.cursor=r.limit-s;break e}r.cursor=r.limit-s;if(r.cursor<=r.limit_backward){break i}r.cursor--}e:{var t=r.limit-r.cursor;u:{if(!r.eq_s_b("a")){break u}break e}r.cursor=r.limit-t;if(!r.eq_s_b("Ä±")){break i}}r.cursor=r.limit-a;{var l=r.cursor;r.insert(r.cursor,r.cursor,"Ä±");r.cursor=l}break r}r.cursor=r.limit-u;i:{var c=r.limit-r.cursor;e:while(true){var o=r.limit-r.cursor;u:{if(!r.in_grouping_b(C,97,305)){break u}r.cursor=r.limit-o;break e}r.cursor=r.limit-o;if(r.cursor<=r.limit_backward){break i}r.cursor--}e:{var f=r.limit-r.cursor;u:{if(!r.eq_s_b("e")){break u}break e}r.cursor=r.limit-f;if(!r.eq_s_b("i")){break i}}r.cursor=r.limit-c;{var n=r.cursor;r.insert(r.cursor,r.cursor,"i");r.cursor=n}break r}r.cursor=r.limit-u;i:{var b=r.limit-r.cursor;e:while(true){var m=r.limit-r.cursor;u:{if(!r.in_grouping_b(C,97,305)){break u}r.cursor=r.limit-m;break e}r.cursor=r.limit-m;if(r.cursor<=r.limit_backward){break i}r.cursor--}e:{var k=r.limit-r.cursor;u:{if(!r.eq_s_b("o")){break u}break e}r.cursor=r.limit-k;if(!r.eq_s_b("u")){break i}}r.cursor=r.limit-b;{var _=r.cursor;r.insert(r.cursor,r.cursor,"u");r.cursor=_}break r}r.cursor=r.limit-u;var v=r.limit-r.cursor;i:while(true){var d=r.limit-r.cursor;e:{if(!r.in_grouping_b(C,97,305)){break e}r.cursor=r.limit-d;break i}r.cursor=r.limit-d;if(r.cursor<=r.limit_backward){return false}r.cursor--}i:{var g=r.limit-r.cursor;e:{if(!r.eq_s_b("Ã¶")){break e}break i}r.cursor=r.limit-g;if(!r.eq_s_b("Ã¼")){return false}}r.cursor=r.limit-v;{var w=r.cursor;r.insert(r.cursor,r.cursor,"Ã¼");r.cursor=w}}return true}function dr(){if(!r.eq_s_b("ad")){return false}var i=r.limit-r.cursor;r:{if(!r.eq_s_b("soy")){r.cursor=r.limit-i;break r}}if(r.cursor>r.limit_backward){return false}return true}function gr(){var i=r.cursor;{var e=2;while(true){var u=r.cursor;r:{i:while(true){e:{if(!r.in_grouping(C,97,305)){break e}break i}if(r.cursor>=r.limit){break r}r.cursor++}e--;continue}r.cursor=u;break}if(e>0){return false}}r.cursor=i;return true}function wr(){r.limit_backward=r.cursor;r.cursor=r.limit;{var i=r.limit-r.cursor;r:{if(!dr()){break r}return false}r.cursor=r.limit-i}var e=r.limit-r.cursor;vr();r.cursor=r.limit-e;var u=r.limit-r.cursor;_r();r.cursor=r.limit-u;r.cursor=r.limit_backward;return true}this.stem=function(){if(!gr()){return false}r.limit_backward=r.cursor;r.cursor=r.limit;var i=r.limit-r.cursor;br();r.cursor=r.limit-i;if(!D){return false}var e=r.limit-r.cursor;kr();r.cursor=r.limit-e;r.cursor=r.limit_backward;if(!wr()){return false}return true};this["stemWord"]=function(i){r.setCurrent(i);this.stem();return r.getCurrent()}};
Stemmer = TurkishStemmer;



var splitChars = (function() {
    var result = {};
    var singles = [96, 180, 187, 191, 215, 247, 749, 885, 903, 907, 909, 930, 1014, 1648,
         1748, 1809, 2416, 2473, 2481, 2526, 2601, 2609, 2612, 2615, 2653, 2702,
         2706, 2729, 2737, 2740, 2857, 2865, 2868, 2910, 2928, 2948, 2961, 2971,
         2973, 3085, 3089, 3113, 3124, 3213, 3217, 3241, 3252, 3295, 3341, 3345,
         3369, 3506, 3516, 3633, 3715, 3721, 3736, 3744, 3748, 3750, 3756, 3761,
         3781, 3912, 4239, 4347, 4681, 4695, 4697, 4745, 4785, 4799, 4801, 4823,
         4881, 5760, 5901, 5997, 6313, 7405, 8024, 8026, 8028, 8030, 8117, 8125,
         8133, 8181, 8468, 8485, 8487, 8489, 8494, 8527, 11311, 11359, 11687, 11695,
         11703, 11711, 11719, 11727, 11735, 12448, 12539, 43010, 43014, 43019, 43587,
         43696, 43713, 64286, 64297, 64311, 64317, 64319, 64322, 64325, 65141];
    var i, j, start, end;
    for (i = 0; i < singles.length; i++) {
        result[singles[i]] = true;
    }
    var ranges = [[0, 47], [58, 64], [91, 94], [123, 169], [171, 177], [182, 184], [706, 709],
         [722, 735], [741, 747], [751, 879], [888, 889], [894, 901], [1154, 1161],
         [1318, 1328], [1367, 1368], [1370, 1376], [1416, 1487], [1515, 1519], [1523, 1568],
         [1611, 1631], [1642, 1645], [1750, 1764], [1767, 1773], [1789, 1790], [1792, 1807],
         [1840, 1868], [1958, 1968], [1970, 1983], [2027, 2035], [2038, 2041], [2043, 2047],
         [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2307], [2362, 2364], [2366, 2383],
         [2385, 2391], [2402, 2405], [2419, 2424], [2432, 2436], [2445, 2446], [2449, 2450],
         [2483, 2485], [2490, 2492], [2494, 2509], [2511, 2523], [2530, 2533], [2546, 2547],
         [2554, 2564], [2571, 2574], [2577, 2578], [2618, 2648], [2655, 2661], [2672, 2673],
         [2677, 2692], [2746, 2748], [2750, 2767], [2769, 2783], [2786, 2789], [2800, 2820],
         [2829, 2830], [2833, 2834], [2874, 2876], [2878, 2907], [2914, 2917], [2930, 2946],
         [2955, 2957], [2966, 2968], [2976, 2978], [2981, 2983], [2987, 2989], [3002, 3023],
         [3025, 3045], [3059, 3076], [3130, 3132], [3134, 3159], [3162, 3167], [3170, 3173],
         [3184, 3191], [3199, 3204], [3258, 3260], [3262, 3293], [3298, 3301], [3312, 3332],
         [3386, 3388], [3390, 3423], [3426, 3429], [3446, 3449], [3456, 3460], [3479, 3481],
         [3518, 3519], [3527, 3584], [3636, 3647], [3655, 3663], [3674, 3712], [3717, 3718],
         [3723, 3724], [3726, 3731], [3752, 3753], [3764, 3772], [3774, 3775], [3783, 3791],
         [3802, 3803], [3806, 3839], [3841, 3871], [3892, 3903], [3949, 3975], [3980, 4095],
         [4139, 4158], [4170, 4175], [4182, 4185], [4190, 4192], [4194, 4196], [4199, 4205],
         [4209, 4212], [4226, 4237], [4250, 4255], [4294, 4303], [4349, 4351], [4686, 4687],
         [4702, 4703], [4750, 4751], [4790, 4791], [4806, 4807], [4886, 4887], [4955, 4968],
         [4989, 4991], [5008, 5023], [5109, 5120], [5741, 5742], [5787, 5791], [5867, 5869],
         [5873, 5887], [5906, 5919], [5938, 5951], [5970, 5983], [6001, 6015], [6068, 6102],
         [6104, 6107], [6109, 6111], [6122, 6127], [6138, 6159], [6170, 6175], [6264, 6271],
         [6315, 6319], [6390, 6399], [6429, 6469], [6510, 6511], [6517, 6527], [6572, 6592],
         [6600, 6607], [6619, 6655], [6679, 6687], [6741, 6783], [6794, 6799], [6810, 6822],
         [6824, 6916], [6964, 6980], [6988, 6991], [7002, 7042], [7073, 7085], [7098, 7167],
         [7204, 7231], [7242, 7244], [7294, 7400], [7410, 7423], [7616, 7679], [7958, 7959],
         [7966, 7967], [8006, 8007], [8014, 8015], [8062, 8063], [8127, 8129], [8141, 8143],
         [8148, 8149], [8156, 8159], [8173, 8177], [8189, 8303], [8306, 8307], [8314, 8318],
         [8330, 8335], [8341, 8449], [8451, 8454], [8456, 8457], [8470, 8472], [8478, 8483],
         [8506, 8507], [8512, 8516], [8522, 8525], [8586, 9311], [9372, 9449], [9472, 10101],
         [10132, 11263], [11493, 11498], [11503, 11516], [11518, 11519], [11558, 11567],
         [11622, 11630], [11632, 11647], [11671, 11679], [11743, 11822], [11824, 12292],
         [12296, 12320], [12330, 12336], [12342, 12343], [12349, 12352], [12439, 12444],
         [12544, 12548], [12590, 12592], [12687, 12689], [12694, 12703], [12728, 12783],
         [12800, 12831], [12842, 12880], [12896, 12927], [12938, 12976], [12992, 13311],
         [19894, 19967], [40908, 40959], [42125, 42191], [42238, 42239], [42509, 42511],
         [42540, 42559], [42592, 42593], [42607, 42622], [42648, 42655], [42736, 42774],
         [42784, 42785], [42889, 42890], [42893, 43002], [43043, 43055], [43062, 43071],
         [43124, 43137], [43188, 43215], [43226, 43249], [43256, 43258], [43260, 43263],
         [43302, 43311], [43335, 43359], [43389, 43395], [43443, 43470], [43482, 43519],
         [43561, 43583], [43596, 43599], [43610, 43615], [43639, 43641], [43643, 43647],
         [43698, 43700], [43703, 43704], [43710, 43711], [43715, 43738], [43742, 43967],
         [44003, 44015], [44026, 44031], [55204, 55215], [55239, 55242], [55292, 55295],
         [57344, 63743], [64046, 64047], [64110, 64111], [64218, 64255], [64263, 64274],
         [64280, 64284], [64434, 64466], [64830, 64847], [64912, 64913], [64968, 65007],
         [65020, 65135], [65277, 65295], [65306, 65312], [65339, 65344], [65371, 65381],
         [65471, 65473], [65480, 65481], [65488, 65489], [65496, 65497]];
    for (i = 0; i < ranges.length; i++) {
        start = ranges[i][0];
        end = ranges[i][1];
        for (j = start; j <= end; j++) {
            result[j] = true;
        }
    }
    return result;
})();

function splitQuery(query) {
    var result = [];
    var start = -1;
    for (var i = 0; i < query.length; i++) {
        if (splitChars[query.charCodeAt(i)]) {
            if (start !== -1) {
                result.push(query.slice(start, i));
                start = -1;
            }
        } else if (start === -1) {
            start = i;
        }
    }
    if (start !== -1) {
        result.push(query.slice(start));
    }
    return result;
}


