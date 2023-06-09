"use strict";(self.webpackChunkpassenger=self.webpackChunkpassenger||[]).push([[195],{9195:function(e,r,n){n.r(r),n.d(r,{default:function(){return Z}});var s=n(4165),t=n(5861),i=n(3433),c=n(9439),d=n(2791),a=n(9140),o=n(2591),l=n(3360),u=n(2469),h=n(455),v=n(1413),x=n(3855),p=n(3575),f=n(184),j=function(e){var r=e.showNewTrip,n=e.drivers,i=e.vehicles,j=(0,p.a)().currentUser,Z=(0,d.useRef)(),m=(0,d.useRef)(),b=(0,d.useRef)(),g=(0,d.useRef)(),N=(0,d.useRef)(),w=(0,d.useState)(""),y=(0,c.Z)(w,2),T=y[0],k=y[1],C=(0,d.useState)(!1),R=(0,c.Z)(C,2),S=R[0],q=R[1],D=(0,d.useState)(""),F=(0,c.Z)(D,2),K=F[0],L=F[1],O=i.reduce((function(e,r){return r.owner===K&&e.push(r),e}),[]);function P(){return(P=(0,t.Z)((0,s.Z)().mark((function e(n){var t,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),t={creator:j.uid,driver:Z.current.value,regNum:g.current.value,from:m.current.value,to:b.current.value,passengers:N.current.value},e.prev=2,k(""),q(!0),e.next=7,(0,h.a5)(t);case 7:i=e.sent,r((0,v.Z)({uid:i},t)),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),k("Failed to add new Trip."),console.log(e.t0.message);case 15:q(!1);case 16:case"end":return e.stop()}}),e,null,[[2,11]])})))).apply(this,arguments)}return(0,f.jsx)("div",{className:"d-flex dashboard",children:(0,f.jsxs)(a.Z,{className:"w-100 p-2",children:[(0,f.jsx)("h3",{children:"Add new Trip"}),(0,f.jsx)("p",{children:"First choose a driver to choose a vehicle."}),(0,f.jsx)(x.Z,{onSubmit:function(e){return P.apply(this,arguments)},children:(0,f.jsx)(o.Z,{striped:!0,bordered:!0,hover:!0,children:(0,f.jsx)("tbody",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:(0,f.jsxs)(x.Z.Control,{as:"select",id:"driver",onChange:function(e){L(e.target.value)},required:!0,ref:Z,children:[(0,f.jsx)("option",{value:"",children:"Driver"}),n.map((function(e){return(0,f.jsx)("option",{value:e.uid,children:"".concat(e.firstName," ").concat(e.lastName)},e.uid)}))]})}),(0,f.jsx)("td",{children:(0,f.jsxs)(x.Z.Control,{as:"select",id:"vehicle",required:!0,ref:g,children:[(0,f.jsx)("option",{value:"",children:"Vehicle"}),O.map((function(e){return(0,f.jsx)("option",{value:e.regNum,children:"".concat(e.brand," ").concat(e.regNum)},e.uid)}))]})}),(0,f.jsx)("td",{children:(0,f.jsxs)(x.Z.Control,{as:"select",id:"from",required:!0,ref:m,children:[(0,f.jsx)("option",{value:"",children:"From"}),(0,f.jsx)("option",{value:"Kyiv",children:"Kyiv"}),(0,f.jsx)("option",{value:"Odesa",children:"Odesa"}),(0,f.jsx)("option",{value:"Lviv",children:"Lviv"})]})}),(0,f.jsx)("td",{children:(0,f.jsxs)(x.Z.Control,{as:"select",id:"to",required:!0,ref:b,children:[(0,f.jsx)("option",{value:"",children:"To"}),(0,f.jsx)("option",{value:"Kyiv",children:"Kyiv"}),(0,f.jsx)("option",{value:"Odesa",children:"Odesa"}),(0,f.jsx)("option",{value:"Lviv",children:"Lviv"})]})}),(0,f.jsx)("td",{children:(0,f.jsx)(x.Z.Control,{type:"number",placeholder:"Passengers",required:!0,ref:N})}),(0,f.jsx)("td",{children:(0,f.jsx)(l.Z,{disabled:S,type:"submit",className:"w-100",children:"Add"})})]})})})}),T&&(0,f.jsx)(u.Z,{variant:"danger",children:T})]})})},Z=function(){var e=(0,d.useState)([]),r=(0,c.Z)(e,2),n=r[0],v=r[1],x=(0,d.useState)([]),p=(0,c.Z)(x,2),Z=p[0],m=p[1],b=(0,d.useState)([]),g=(0,c.Z)(b,2),N=g[0],w=g[1];function y(){return(y=(0,t.Z)((0,s.Z)().mark((function e(r,t){var c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.IR)(r);case 2:(c=n).splice(t,1),v((0,i.Z)(c));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,d.useEffect)((function(){var e=function(){var e=(0,t.Z)((0,s.Z)().mark((function e(){var r,n,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.B7)();case 2:return r=e.sent,e.next=5,(0,h.jT)();case 5:return n=e.sent,e.next=8,(0,h.rE)();case 8:t=e.sent,v(r),m(n),w(t);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,f.jsx)(a.Z,{className:"h-100",children:(0,f.jsxs)(a.Z.Body,{children:[(0,f.jsx)("h3",{children:"Trips"}),(0,f.jsx)("p",{children:"To add a trip you must have user-drivers and added vehicles."}),(0,f.jsxs)(o.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Trip ID"}),(0,f.jsx)("th",{children:"Driver"}),(0,f.jsx)("th",{children:"Vehicle"}),(0,f.jsx)("th",{children:"From"}),(0,f.jsx)("th",{children:"To"}),(0,f.jsx)("th",{children:"Passengers"}),(0,f.jsx)("th",{})]})}),(0,f.jsx)("tbody",{children:null===n||void 0===n?void 0:n.map((function(e,r){var n,s,t,i=e.uid,c=e.driver,d=e.regNum,a=e.from,o=e.to,u=e.passengers;return(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:i}),(0,f.jsx)("td",{children:(null===(n=Z.find((function(e){return e.uid===c})))||void 0===n?void 0:n.firstName)||c}),(0,f.jsxs)("td",{children:[null===(s=N.find((function(e){return e.regNum===d})))||void 0===s?void 0:s.brand," ",null===(t=N.find((function(e){return e.regNum===d})))||void 0===t?void 0:t.regNum]}),(0,f.jsx)("td",{children:a}),(0,f.jsx)("td",{children:o}),(0,f.jsx)("td",{children:u}),(0,f.jsx)("td",{children:(0,f.jsx)(l.Z,{onClick:function(){return function(e,r){return y.apply(this,arguments)}(i,r)},children:"Del"})})]},r)}))})]}),0===n.length&&(0,f.jsx)(u.Z,{variant:"info",children:"No trips yet"}),(0,f.jsx)(j,{showNewTrip:function(e){v([].concat((0,i.Z)(n),[e]))},drivers:Z,vehicles:N})]})})}},2591:function(e,r,n){var s=n(1413),t=n(5987),i=n(1694),c=n.n(i),d=n(2791),a=n(162),o=n(184),l=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],u=d.forwardRef((function(e,r){var n=e.bsPrefix,i=e.className,d=e.striped,u=e.bordered,h=e.borderless,v=e.hover,x=e.size,p=e.variant,f=e.responsive,j=(0,t.Z)(e,l),Z=(0,a.vE)(n,"table"),m=c()(i,Z,p&&"".concat(Z,"-").concat(p),x&&"".concat(Z,"-").concat(x),d&&"".concat(Z,"-").concat("string"===typeof d?"striped-".concat(d):"striped"),u&&"".concat(Z,"-bordered"),h&&"".concat(Z,"-borderless"),v&&"".concat(Z,"-hover")),b=(0,o.jsx)("table",(0,s.Z)((0,s.Z)({},j),{},{className:m,ref:r}));if(f){var g="".concat(Z,"-responsive");return"string"===typeof f&&(g="".concat(g,"-").concat(f)),(0,o.jsx)("div",{className:g,children:b})}return b}));r.Z=u}}]);
//# sourceMappingURL=195.8a6272c7.chunk.js.map