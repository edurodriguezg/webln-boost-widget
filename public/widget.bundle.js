
// Función global para renderizar el widget
window.renderBitflowWidget = (container, config) => {
  const { useState, useEffect } = React;
  const requestProvider = window.WebLN?.requestProvider;
  const QRCodeSVG = window.QRCodeSVG;
  const bech32 = window.bech32;
  
  "use client";(()=>{var ie=Object.create;var F=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var de=Object.getOwnPropertyNames;var ue=Object.getPrototypeOf,ge=Object.prototype.hasOwnProperty;var me=(n,o,a,g)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of de(o))!ge.call(n,l)&&l!==a&&F(n,l,{get:()=>o[l],enumerable:!(g=ce(o,l))||g.enumerable});return n};var V=(n,o,a)=>(a=n!=null?ie(ue(n)):{},me(o||!n||!n.__esModule?F(a,"default",{value:n,enumerable:!0}):a,n));var k=(n,o,a)=>new Promise((g,l)=>{var E=i=>{try{m(a.next(i))}catch(s){l(s)}},R=i=>{try{m(a.throw(i))}catch(s){l(s)}},m=i=>i.done?g(i.value):Promise.resolve(i.value).then(E,R);m((a=a.apply(n,o)).next())});var r=require("react"),Q=require("webln"),f=require("@/app/components/ui/button"),G=require("qrcode.react"),J=require("./webln-guide"),O=V(require("./ui/robo-avatar")),K=V(require("./ui/custom-avatar")),W=require("bech32");const pe="bitflowz@getalby.com",fe=n=>{try{const{words:o}=W.bech32.decode(n,2e3),a=W.bech32.fromWords(o);return new TextDecoder().decode(new Uint8Array(a))}catch(o){return n}},be=(n,o)=>Array.isArray(n)&&n[o]||"";function he({receiverType:n="lightning",receiver:o=pe,amounts:a=[21,100,1e3],labels:g=["Caf\xE9","Propina","Boost"],theme:l="orange",incrementSpeed:E=50,incrementValue:R=10,avatarSeed:m,avatarSet:i="set1",image:s}){const[X,p]=(0,r.useState)("initial"),[B,v]=(0,r.useState)(0),[N,$]=(0,r.useState)(""),[A,j]=(0,r.useState)(null),[Y,y]=(0,r.useState)(""),[U,M]=(0,r.useState)(""),[T,L]=(0,r.useState)(!1),[C,Z]=(0,r.useState)(!1),[S,D]=(0,r.useState)(!1),[ee,te]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if(console.log("WebLNBoostButton props:",{receiverType:n,receiver:o,amounts:a,labels:g,theme:l,avatarSeed:m,avatarSet:i,image:s}),s){const e=new window.Image;e.src=s,e.onerror=()=>{console.error("Error precargando imagen:",s)}}console.log("Avatar debug info:",{hasAvatarSeed:!!m,avatarSeedValue:m,avatarSetValue:i,hasImage:!!s,imageValue:s})},[n,o,a,g,l,m,i,s]),(0,r.useEffect)(()=>{const e=()=>{const t=/iPhone|iPad|Android/i.test(navigator.userAgent);Z(t),t&&y("")};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,r.useEffect)(()=>{k(this,null,function*(){try{if(!C){const t=yield(0,Q.requestProvider)();yield t.enable(),j(t),y("")}}catch(t){console.error("WebLN no est\xE1 disponible:",t),j(null),C||y("No se detect\xF3 una billetera compatible con WebLN")}})},[C]),(0,r.useEffect)(()=>{let e=null;return T&&(e=setInterval(()=>{v(t=>t+R)},E)),()=>{e&&clearInterval(e)}},[T,R,E]),(0,r.useEffect)(()=>{te(!0)},[]);const oe=e=>{e<=0||v(e)},ne=e=>{const t=parseInt(e.target.value);t<0?v(0):v(t)},re=e=>{$(e.target.value)},z=()=>{v(0),$(""),p("initial")},ae=()=>k(this,null,function*(){var b,H;const e=Math.round(B*1e3);let t;try{if(n==="lnurl")try{console.log("Procesando LNURL:",o);let h;o.toLowerCase().startsWith("lnurl")?h=fe(o):h=o,console.log("URL decodificada o directa:",h);const _=yield fetch(h);if(!_.ok)throw console.error("Error en respuesta inicial:",_.status),new Error(`Error al obtener par\xE1metros LNURL: ${_.status}`);const c=yield _.json();if(console.log("Par\xE1metros LNURL recibidos:",c),!c.tag||c.tag!=="payRequest")throw console.error("Tag inv\xE1lido:",c.tag),new Error("El LNURL proporcionado no es un endpoint de pago v\xE1lido");if(console.log(`Verificando monto ${e} entre ${c.minSendable} y ${c.maxSendable}`),e<c.minSendable||e>c.maxSendable)throw new Error(`El monto debe estar entre ${c.minSendable/1e3} y ${c.maxSendable/1e3} sats`);const I=new URL(c.callback);I.searchParams.append("amount",e.toString());let x,u;try{if(N&&I.searchParams.append("comment",N),x=yield fetch(I.toString()),u=yield x.json(),u.status==="ERROR"&&((b=u.reason)!=null&&b.toLowerCase().includes("comment"))){console.log("El servicio no acepta comentarios, reintentando sin comentario");const P=new URL(c.callback);P.searchParams.append("amount",e.toString()),x=yield fetch(P.toString()),u=yield x.json()}}catch(P){throw console.error("Error al obtener la factura:",P),new Error("Error al generar la factura LNURL")}if(!x.ok)throw console.error("Error en respuesta de factura:",x.status),new Error(`Error al generar la factura LNURL: ${x.status}`);if(console.log("Datos de factura recibidos:",u),u.pr)return console.log("Factura encontrada en pr"),u.pr;if(u.invoice)return console.log("Factura encontrada en invoice"),u.invoice;throw console.error("No se encontr\xF3 factura en la respuesta:",u),new Error("No se pudo obtener la factura del servicio LNURL")}catch(h){throw console.error("Error detallado en el proceso LNURL:",h),new Error(`Error procesando LNURL: ${h instanceof Error?h.message:"Error desconocido"}`)}switch(n){case"lightning":t=yield fetch(`https://api.getalby.com/lnurl/generate-invoice?ln=${o}&amount=${e}&comment=${encodeURIComponent(N||"Boost con Bitflow")}`);break;case"node":t=yield fetch(`https://api.getalby.com/payments/keysend?node_id=${o}&amount=${e}&comment=${encodeURIComponent(N||"Boost con Bitflow")}`);break;default:throw new Error("Tipo de receptor no v\xE1lido")}if(!t.ok)throw new Error(`Error al generar factura: ${t.status}`);const w=yield t.json();if(console.log("Respuesta:",w),!((H=w.invoice)!=null&&H.pr)||typeof w.invoice.pr!="string")throw new Error("La factura no se gener\xF3 correctamente");return w.invoice.pr}catch(w){throw console.error("Error en generateInvoice:",w),w}}),se=()=>ee?o?!0:(console.warn("Por favor, ingresa una direcci\xF3n de receptor"),!1):!0,le=()=>k(this,null,function*(){var e;if(!(S||!se()))try{D(!0),console.log("Iniciando proceso de pago...");const t=yield ae();if(console.log("Factura generada:",t),C||!A){console.log("Mostrando QR (m\xF3vil o sin WebLN)"),M(t),p("qr");return}try{console.log("Intentando pago con WebLN"),yield A.sendPayment(t),console.log("Pago completado con \xE9xito"),z()}catch(b){console.error("Error detallado en pago WebLN:",b),b instanceof Error&&((e=b.message)!=null&&e.includes("User rejected"))?(y("Pago cancelado por el usuario."),p("initial")):(console.log("Mostrando QR despu\xE9s de error WebLN"),M(t),p("qr"))}}catch(t){console.error("Error detallado en handleBoost:",t);const b=t instanceof Error?t.message:"Error desconocido";y(`Error al generar la factura: ${b}`),p("initial")}finally{D(!1)}}),q={orange:"#FF8C00",blue:"#3B81A2",green:"#2E7D32"},d=q[l]||q.orange;return React.createElement("div",{className:"flex flex-col items-center gap-8"},React.createElement("div",{className:"w-full h-full"},React.createElement("div",{className:"flex flex-col items-center justify-center w-full h-full rounded-3xl p-6 space-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden",style:{backgroundColor:d,width:"100%",height:"100%",minHeight:"410px"}},(()=>{switch(X){case"initial":return React.createElement("div",{className:"relative w-full h-full"},React.createElement("div",{className:"absolute inset-0 rounded-lg flex flex-col items-center justify-center",style:{backgroundColor:d}},React.createElement("div",{className:"relative w-24 h-24 mb-4"},React.createElement("div",{className:"absolute inset-0 bg-[#3B81A2] rounded-full"},s?React.createElement(K.default,{imageUrl:s,size:96,className:"w-full h-full"}):React.createElement(O.default,{seed:m||"default",set:i,size:96,className:"w-full h-full"}))),React.createElement("h1",{className:"text-3xl font-bold text-white mb-6"},"Bitflow"),React.createElement(f.Button,{onClick:()=>p("amount"),className:"bg-white text-[#3B81A2] hover:bg-white/90 font-bold text-lg px-6 py-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-200"},"Donate Sats")));case"amount":return React.createElement(React.Fragment,null,React.createElement("h1",{className:"text-3xl font-bold text-white mb-6"},"How many Sats?"),React.createElement("div",{className:"flex gap-3 mb-4 w-full max-w-[280px] justify-center"},a.map((e,t)=>React.createElement(f.Button,{key:e,onClick:()=>oe(e),className:`rounded-full px-4 py-3 flex-1 text-sm flex flex-col items-center leading-tight h-[70px] justify-center ${B===e?"bg-white":"bg-transparent text-white border-2 border-white"}`,style:B===e?{color:d}:{}},React.createElement("span",{className:"font-medium"},be(g,t)||e),React.createElement("span",{className:"text-xs mt-1"},e," sats")))),React.createElement(f.Button,{onMouseDown:()=>L(!0),onMouseUp:()=>L(!1),onMouseLeave:()=>L(!1),onTouchStart:()=>L(!0),onTouchEnd:()=>L(!1),className:"w-22 h-22 mb-4 rounded-full bg-white hover:bg-white/90 font-bold flex items-center justify-center shadow-lg transform active:scale-95 transition-transform",style:{color:d}},React.createElement("div",{className:"flex flex-col items-center justify-center h-full text-xs font-bold"},React.createElement("span",null,"Press"),React.createElement("span",null,"to Boost"),React.createElement("span",{className:"text-lg mt-1 font-bold"},"\u26A1"))),React.createElement("div",{className:"w-full max-w-[280px] flex justify-center"},React.createElement("input",{type:"number",inputMode:"numeric",pattern:"[0-9]*",value:B||"",onChange:ne,placeholder:"Enter an amount",className:"w-full px-4 py-2 mb-4 rounded-full text-center text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2",style:{color:d,"--tw-ring-color":d}})),React.createElement("div",{className:"flex gap-4"},React.createElement(f.Button,{onClick:()=>p("initial"),className:"bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-lg px-6 py-3 rounded-full transition-all duration-200"},"Back"),React.createElement(f.Button,{onClick:()=>p("note"),className:"bg-white hover:bg-white/90 font-bold text-lg px-6 py-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-200",style:{color:d}},"Next")));case"note":return React.createElement(React.Fragment,null,React.createElement("h1",{className:"text-3xl font-bold text-white mb-8"},"Want to add a note?"),React.createElement("textarea",{value:N,onChange:re,placeholder:"Enter your note",className:"w-full max-w-[320px] p-4 rounded-3xl text-xl mb-6 h-40 resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2",style:{color:d,"--tw-ring-color":d}}),React.createElement("div",{className:"flex gap-4"},React.createElement(f.Button,{onClick:()=>p("amount"),className:"bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-lg px-6 py-3 rounded-full transition-all duration-200"},"Back"),React.createElement(f.Button,{onClick:le,disabled:S,className:`bg-white hover:bg-white/90 font-bold text-xl px-8 py-4 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-200
                  ${S?"opacity-50 cursor-not-allowed":""}`,style:{color:d}},S?"Processing...":"Next")));case"qr":return React.createElement("div",{className:"w-full flex flex-col items-center"},React.createElement("div",{className:"bg-white p-4 rounded-lg mb-4"},React.createElement(G.QRCodeSVG,{value:U,size:200})),React.createElement("div",{className:"w-full bg-[#2d2d2d] p-3 rounded-lg mb-4"},React.createElement("div",{className:"flex items-center justify-between mb-2"},React.createElement("p",{className:"text-xs text-white/70"},"Lightning Invoice:"),React.createElement("button",{onClick:()=>navigator.clipboard.writeText(U),className:"text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors"},"Copiar")),React.createElement("p",{className:"text-[10px] text-white/90 font-mono truncate"},U)),React.createElement(f.Button,{onClick:z,className:"bg-white hover:bg-white/90 font-bold text-lg px-6 py-2 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-200",style:{color:d}},"Done?"))}})())),Y&&React.createElement("div",{className:"w-[400px]"},React.createElement(J.WebLNGuide,null)))}})();


  // Renderizar el componente
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(WebLNBoostButton, config));
};