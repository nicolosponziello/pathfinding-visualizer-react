(this["webpackJsonppathfinding-visualizer-react"]=this["webpackJsonppathfinding-visualizer-react"]||[]).push([[0],[,,,,,,,,,,,,,function(r,t,e){},function(r,t,e){},function(r,t,e){},function(r,t,e){},function(r,t,e){},,,,function(r,t,e){"use strict";e.r(t);var n,c=e(0),a=e(1),u=e.n(a),o=e(7),s=e.n(o),i=(e(13),e(14),e(2)),f=.9*window.innerWidth,h=.7*window.innerHeight,l=f/30,p=h/30;e(15);!function(r){r[r.WALL=0]="WALL",r[r.EMPTY=1]="EMPTY",r[r.START=2]="START",r[r.END=3]="END",r[r.VISITED=4]="VISITED",r[r.SHORTEST_PATH=5]="SHORTEST_PATH"}(n||(n={}));var A=function(r){var t="";switch(r.type){case n.EMPTY:t="empty";break;case n.START:t="start";break;case n.END:t="end";break;case n.WALL:t="wall";break;case n.VISITED:t="visited";break;case n.SHORTEST_PATH:t="shortestPath"}return Object(c.jsx)("div",{onMouseDown:function(){return r.mouseDown()},onMouseEnter:function(){return r.mouseEnter()},className:"node ".concat(t),style:{width:30,height:30}})},v=e(3);function b(r,t){return Math.floor(Math.random()*(t-r+1))+r}var y=[{r:1,c:0},{r:-1,c:0},{r:0,c:-1},{r:0,c:1}];function j(r,t){var e=Array();return t.r>0&&e.push({r:t.r-1,c:t.c}),t.r+1<r.length&&e.push({r:t.r+1,c:t.c}),t.c>0&&e.push({r:t.r,c:t.c-1}),t.c+1<r[0].length&&e.push({r:t.r,c:t.c+1}),e.filter((function(t){return r[t.r][t.c].type!=n.WALL}))}var T=function(r,t){return r.r===t.r&&r.c===t.c};var d=e(4);var O;e(16);!function(r){r[r.BFS=0]="BFS",r[r.DFS=1]="DFS",r[r.DIJKSTRA=2]="DIJKSTRA",r[r.ASTAR=3]="ASTAR"}(O||(O={}));var g;!function(r){r[r.MANHATTAN=0]="MANHATTAN",r[r.EUCLIDEAN=1]="EUCLIDEAN",r[r.DIAGONAL=2]="DIAGONAL"}(g||(g={}));var S=function(r,t,e){switch(r){case g.DIAGONAL:return function(r,t){return Math.max(Math.abs(r.r-t.r),Math.abs(r.c-t.c))}(t,e);case g.EUCLIDEAN:return function(r,t){return Math.sqrt(Math.pow(t.r-r.r,2)+Math.pow(t.c-r.c,2))}(t,e);case g.MANHATTAN:return function(r,t){return Math.abs(r.r-t.r)+Math.abs(r.c-t.c)}(t,e)}},m=(e(17),function(r){var t=Object(a.useState)(10),e=Object(i.a)(t,2),n=e[0],u=e[1],o=Object(a.useState)(O.BFS),s=Object(i.a)(o,2),f=s[0],h=s[1],l=Object(a.useState)(g.MANHATTAN),p=Object(i.a)(l,2),A=p[0],v=p[1];return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"header-bar",children:[Object(c.jsx)("span",{className:"app-name",children:"Algorithm Pathfinding"}),Object(c.jsxs)("label",{children:[Object(c.jsx)("span",{className:"selector-label",children:"Walls: "}),Object(c.jsx)("input",{className:"input",value:n,type:"number",onChange:function(r){return u(parseInt(r.target.value))}})]}),Object(c.jsx)("button",{className:"button",onClick:function(){return r.randomWalls(n)},children:"Generate Walls"}),Object(c.jsx)("button",{className:"button",onClick:r.generateMaze,children:"Generate Maze"}),Object(c.jsx)("button",{className:"button start-btn",onClick:function(){return r.onStart(f,A)},children:"START"}),Object(c.jsxs)("div",{children:[Object(c.jsx)("span",{className:"selector-label",children:"Algorithm: "}),Object(c.jsx)("select",{className:"select",onChange:function(r){return h(r.target.value)},defaultValue:O[0],children:Object.values(O).filter((function(r){return!isNaN(r)})).map((function(r){return Object(c.jsx)("option",{value:r,children:O[r]},r)}))}),Object(c.jsx)("select",{defaultValue:g.MANHATTAN,disabled:f!=O.ASTAR,className:"select",onChange:function(r){return v(r.target.value)},children:Object.values(g).filter((function(r){return!isNaN(r)})).map((function(r){return Object(c.jsx)("option",{value:r,children:g[r]},r)}))})]}),Object(c.jsx)("button",{className:"button",onClick:r.resetAnimation,children:"Reset Animation"}),Object(c.jsx)("button",{className:"button",onClick:r.resetAll,children:"Reset All"})]})})});var E=e(18),N=[{r:1,c:0},{r:-1,c:0},{r:0,c:1},{r:0,c:-1}];var M=function(){var r=Object(a.useState)((function(){return function(){for(var r=Array(),t=0;t<p;t++){for(var e=Array(),c=0;c<l;c++)e.push({row:t,col:c,type:n.EMPTY});r.push(e)}return r[5][5].type=n.START,r[r.length-5][r[0].length-5].type=n.END,r}()})),t=Object(i.a)(r,2),e=t[0],u=t[1],o=Object(a.useState)({r:5,c:5}),s=Object(i.a)(o,2),f=s[0],h=s[1],g=Object(a.useState)({r:e.length-5,c:e[0].length-5}),M=Object(i.a)(g,2),P=M[0],L=M[1],D=Object(a.useState)(!1),x=Object(i.a)(D,2),R=x[0],I=x[1],w=Object(a.useState)(!1),V=Object(i.a)(w,2),H=V[0],W=V[1],k=Object(a.useState)(!1),C=Object(i.a)(k,2),Y=C[0],F=C[1],B=Object(a.useState)(!1),_=Object(i.a)(B,2),z=_[0],G=_[1];window.addEventListener("mouseup",(function(){I(!1),W(!1),F(!1)}),!1);var J=function(){u((function(r){return Object(v.a)(r,(function(r){for(var t=0;t<r.length;t++)for(var e=0;e<r[0].length;e++)r[t][e].type!==n.SHORTEST_PATH&&r[t][e].type!==n.VISITED||(r[t][e].type=n.EMPTY)}))}))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(m,{onStart:function(r,t){J(),G(!0);var c={orderOfVisit:[],shortestPath:[]};switch(Number(r)){case O.DFS:c=function(r,t,e){for(var n=Array(),c=Array(),a=Array(),u=Array(),o=!1,s=0;s<r.length;s++){for(var i=Array(),f=0;f<r[0].length;f++)i.push({r:-1,c:-1});u.push(i)}var h={r:t.r,c:t.c};n.push(h);for(var l=function(){h=n.pop(),a.push(h),c.some((function(r){return r.r===h.r&&r.c===h.c}))||c.push(h);for(var t=j(r,h),s=function(r){c.some((function(e){return e.r===t[r].r&&e.c===t[r].c}))||(u[t[r].r][t[r].c]=h,n.push(t[r]))},i=0;i<t.length;i++)s(i);h.r===e.r&&h.c===e.c&&(o=!0)};!o&&n.length;)l();if(!o)return{orderOfVisit:a,shortestPath:[]};var p=Array();for(h=e;h.r!=t.r||h.c!=t.c;)p.push(h),h=u[h.r][h.c];return p.reverse(),{orderOfVisit:a,shortestPath:p}}(e,f,P);break;case O.DIJKSTRA:c=function(r,t,e){for(var c=Array(),a=Array(),u=Array(),o=(Array(),Array()),s=Array(),i=!1,f=0;f<r.length;f++){for(var h=Array(),l=Array(),p=0;p<r[0].length;p++)l.push({r:-1,c:-1}),h.push(1/0);o.push(l),s.push(h)}o[t.r][t.c]={r:0,c:0},s[t.r][t.c]=0;for(var A=0;A<r.length;A++)for(var v=0;v<r[0].length;v++)c.push({r:r[A][v].row,c:r[A][v].col});for(var b={r:t.r,c:t.c};!i&&c.length;){c.sort((function(r,t){return s[r.r][r.c]-s[t.r][t.c]}));var j=c.shift();if(r[null===j||void 0===j?void 0:j.r][null===j||void 0===j?void 0:j.c].type!==n.WALL){if(s[j.r][j.c]===1/0)return{orderOfVisit:u,shortestPath:[]};u.push(j),j.r===e.r&&j.c===e.c&&(i=!0);for(var T=[],d=function(t){var e={r:j.r+y[t].r,c:j.c+y[t].c};e.r>=0&&e.r<r.length&&e.c>=0&&e.c<r[0].length&&!u.some((function(r){return r.r===e.r&&r.c===e.c}))&&T.push(e)},O=0;O<y.length;O++)d(O);for(var g=0,S=T;g<S.length;g++){var m=S[g];s[m.r][m.c]=s[j.r][j.c]+1,o[m.r][m.c]=j}}}for(b.c=e.c,b.r=e.r;b.c!=t.c||b.r!=t.r;)a.push(b),b=o[b.r][b.c];return a=a.reverse(),{orderOfVisit:u,shortestPath:a}}(e,f,P);break;case O.BFS:c=function(r,t,e){for(var n,c=Array(),a=Array(),u=Array(),o=Array(),s=Array(),i=!1,f=0;f<r.length;f++){for(var h=Array(),l=Array(),p=Array(),A=0;A<r[0].length;A++)h.push({r:-1,c:-1}),l.push(1/0),p.push(!1);o.push(h),u.push(l),s.push(p)}for(u[t.r][t.c]=0,s[t.r][t.c]=!0,c.push(t);!i&&c.length;){s[(n=c.shift()).r][n.c]=!0,n.r===e.r&&n.c===e.c&&(i=!0),a.push(n);var v,b=j(r,n),y=Object(d.a)(b);try{for(y.s();!(v=y.n()).done;){var T=v.value;s[T.r][T.c]||(u[T.r][T.c]=u[n.r][n.c]+1,o[T.r][T.c]=n,s[T.r][T.c]=!0,c.push(T),T.r===e.r&&T.c===e.c&&(i=!0))}}catch(g){y.e(g)}finally{y.f()}}if(!i)return{orderOfVisit:a,shortestPath:[]};n=e;for(var O=Array();n.r!=t.r||n.c!=t.c;)O.push(n),n=o[n.r][n.c];return O.reverse(),console.log("bfs completed"),{orderOfVisit:a,shortestPath:O}}(e,f,P);break;case O.ASTAR:c=function(r,t,e,n){for(var c=Array(),a=Array(),u=Array(),o=!1,s=Array(),i=Array(),f=0;f<r.length;f++){for(var h=[],l=[],p=0;p<r[0].length;p++)l.push(1/0),h.push({r:f,c:p,g:1/0,f:1/0,h:1/0,parent:null});s.push(h),i.push(l)}for(i[t.r][t.c]=0,s[t.r][t.c].g=0,s[t.r][t.c].h=S(n,t,e),s[t.r][t.c].f=s[t.r][t.c].g+s[t.r][t.c].h,a.push(t);!o&&a.length;){a.sort((function(r,t){return s[r.r][r.c].f-s[t.r][t.c].f}));var A=a.shift(),v=s[A.r][A.c];if(T(v,e)){o=!0;break}c.push({r:v.r,c:v.c}),u.push(v);var b,y=j(r,v),O=Object(d.a)(y);try{var g=function(){var r=b.value;if(u.some((function(t){return T(t,r)})))return"continue";var t=v.g+1;(!a.some((function(t){return T(t,r)}))||t<s[r.r][r.c].g)&&(s[r.r][r.c].parent=v,s[r.r][r.c].g=t,s[r.r][r.c].f=s[r.r][r.c].g+S(n,r,e),a.some((function(t){return T(t,r)}))||a.push(r))};for(O.s();!(b=O.n()).done;)g()}catch(N){O.e(N)}finally{O.f()}}if(!o)return{orderOfVisit:c,shortestPath:[]};for(var m=e,E=Array();m.r!=t.r||m.c!=t.c;)E.push(m),m=s[m.r][m.c].parent;return E.reverse(),{orderOfVisit:c,shortestPath:E}}(e,f,P,Number(t))}!function(r){for(var t=function(t){var e=r.orderOfVisit[t];if(!e)return{v:void 0};setTimeout((function(){u((function(r){return Object(v.a)(r,(function(r){r[e.r][e.c].type!=n.END&&r[e.r][e.c].type!=n.START&&(r[e.r][e.c].type=n.VISITED)}))}))}),100)},e=0;e<r.orderOfVisit.length;e++){var c=t(e);if("object"===typeof c)return c.v}for(var a=function(t){var e=r.shortestPath[t];if(!e)return{v:void 0};setTimeout((function(){u((function(r){return Object(v.a)(r,(function(r){r[e.r][e.c].type!=n.END&&r[e.r][e.c].type!=n.START&&(r[e.r][e.c].type=n.SHORTEST_PATH)}))}))}),100)},o=0;o<r.shortestPath.length;o++){var s=a(o);if("object"===typeof s)return s.v}}(c),G(!1)},resetAnimation:J,resetAll:function(){u((function(r){return Object(v.a)(r,(function(r){for(var t=0;t<r.length;t++)for(var e=0;e<r[0].length;e++)r[t][e].type!==n.SHORTEST_PATH&&r[t][e].type!==n.VISITED&&r[t][e].type!==n.WALL||(r[t][e].type=n.EMPTY)}))}))},randomWalls:function(r){u((function(t){return Object(v.a)(t,(function(t){for(var c,a,u=0;u<r;u++){do{c=b(0,e.length-1),a=b(0,e[0].length-1)}while(t[c][a].type!=n.EMPTY);t[c][a].type=n.WALL}}))}))},generateMaze:function(){u((function(r){return function(r,t){for(var e=Array(),c=Array(),a=0;a<p;a++){for(var u=Array(),o=Array(),s=0;s<l;s++)u.push({row:a,col:s,type:n.WALL}),o.push(!1);e.push(u),c.push(o)}var i=[];i.push(r);var f=r;for(c[f.r][f.c]=!0;i.length>0&&void 0!==(f=i.pop());){var h=[];if(N.forEach((function(r){var t;(t={r:f.r+r.r,c:f.c+r.c}).r>0&&t.r<p-1&&t.c>0&&t.c<l-1&&(c[f.r+r.r][f.c+r.c]||h.push({r:f.r+r.r,c:f.c+r.c}))})),h.length>0){var A=E.sample(h);e[A.r][A.c].type=n.EMPTY,e[f.r][f.c].type=n.EMPTY,h.forEach((function(r){return c[r.r][r.c]=!0})),h.forEach((function(r){r!=A&&i.push(r)})),i.push(A)}}return e[r.r][r.c].type=n.START,e[t.r][t.c].type=n.END,e}(f,P)}))}}),Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"grid",style:{display:"grid",gridTemplateColumns:"repeat(".concat(l.toFixed(0),", ").concat(30,"px)")},children:e.map((function(r,t){return r.map((function(r,e){return Object(c.jsx)(A,{row:t,col:e,type:r.type,mouseDown:function(){z||(r.type===n.START?I(!0):r.type==n.END?W(!0):(F(!0),u((function(r){return Object(v.a)(r,(function(r){r[t][e].type===n.EMPTY?r[t][e].type=n.WALL:r[t][e].type===n.WALL&&(r[t][e].type=n.EMPTY)}))}))))},mouseEnter:function(){z||(R?(u((function(r){return Object(v.a)(r,(function(r){r[f.r][f.c].type=n.EMPTY,r[t][e].type=n.START}))})),h({r:t,c:e})):H?(u((function(r){return Object(v.a)(r,(function(r){r[P.r][P.c].type=n.EMPTY,r[t][e].type=n.END}))})),L({r:t,c:e})):Y&&u((function(r){return Object(v.a)(r,(function(r){r[t][e].type===n.EMPTY?r[t][e].type=n.WALL:r[t][e].type===n.WALL&&(r[t][e].type=n.EMPTY)}))})))}},"".concat(t,"-").concat(e))}))}))})})]})};var P=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(M,{})})},L=function(r){r&&r instanceof Function&&e.e(3).then(e.bind(null,22)).then((function(t){var e=t.getCLS,n=t.getFID,c=t.getFCP,a=t.getLCP,u=t.getTTFB;e(r),n(r),c(r),a(r),u(r)}))};s.a.render(Object(c.jsx)(u.a.StrictMode,{children:Object(c.jsx)(P,{})}),document.getElementById("root")),L()}],[[21,1,2]]]);
//# sourceMappingURL=main.25f459c2.chunk.js.map