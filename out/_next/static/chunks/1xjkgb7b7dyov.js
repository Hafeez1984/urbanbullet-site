(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,19172,e=>{"use strict";var s=e.i(43476),t=e.i(71645),a=e.i(32341);e.i(47167);var i=e.i(41402);e.i(17255);let r=()=>{let{login:e,signup:r}=(0,a.useAuth)(),{showNotification:n}=(0,i.useNotification)();(0,t.useEffect)(()=>{{let e=setInterval(()=>{if(window.google?.accounts?.id){clearInterval(e);let s=window.google;s.accounts.id.initialize({client_id:"555849725616-cfsnu89kf426p6c2fj476vhfqg1o5i7k.apps.googleusercontent.com",callback:e=>{try{let s=e.credential.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),t=decodeURIComponent(atob(s).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),a=JSON.parse(t),i=a.given_name||a.name?.split(" ")[0]||"Google",r=a.family_name||a.name?.split(" ")[1]||"User",l={firstName:i,lastName:r,displayName:a.name||`${i} ${r}`,email:a.email,memberSince:new Date().getFullYear().toString(),avatarInitials:(i.substring(0,1)+r.substring(0,1)).toUpperCase()};localStorage.setItem("ub_user",JSON.stringify(l)),n(`Signed in as ${a.email}!`),window.location.reload()}catch(e){console.error("JWT Decode error",e),y("Failed to process Google login response.")}}});let t=document.getElementById("google-signin-btn-div");t&&s.accounts.id.renderButton(t,{theme:"filled_blue",size:"large",text:"signin_with",shape:"rectangular",width:t.clientWidth||300})}},500);return()=>clearInterval(e)}},[!0]);let[l,d]=(0,t.useState)("signin"),[o,c]=(0,t.useState)(""),[h,u]=(0,t.useState)(""),[p,m]=(0,t.useState)(""),[x,g]=(0,t.useState)(""),[b,j]=(0,t.useState)(""),[v,f]=(0,t.useState)(!1),[N,y]=(0,t.useState)(""),w=async s=>{if(s.preventDefault(),!o||!h)return void y("Please fill in all fields.");y(""),f(!0);try{let s=await e(o,h);s.success?n("Signed in successfully!"):y(s.error||"Authentication failed.")}catch(e){y("An unexpected error occurred.")}finally{f(!1)}},k=async e=>{if(e.preventDefault(),!o||!h||!x||!b)return void y("Please fill in all fields.");if(h!==p)return void y("Passwords do not match.");if(h.length<6)return void y("Password must be at least 6 characters.");y(""),f(!0);try{let e=await r(o,h,x,b);e.success?n("Account created successfully!"):y(e.error||"Registration failed.")}catch(e){y("An unexpected error occurred.")}finally{f(!1)}};return(0,s.jsxs)("div",{className:"auth-gate-page",children:[(0,s.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        .auth-gate-page {
          --bg: #0a0a0a;
          --panel: rgba(18, 18, 24, 0.68);
          --cyan: #06b6d4;
          --purple: #a855f7;
          --text: #f8fafc;
          --muted: #9ca3af;
          --radius-xl: 28px;
          --shadow-cyan: 0 0 28px rgba(6, 182, 212, 0.22);
          --shadow-purple: 0 0 32px rgba(168, 85, 247, 0.24);
          --font-head: 'Orbitron', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;

          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background:
            radial-gradient(circle at 15% 12%, rgba(6, 182, 212, 0.22), transparent 34%),
            radial-gradient(circle at 82% 8%, rgba(168, 85, 247, 0.22), transparent 34%),
            var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          position: relative;
          z-index: 1;
        }

        .auth-gate-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at center, black, transparent 78%);
          opacity: 0.5;
          z-index: 0;
        }

        .auth-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: linear-gradient(145deg, rgba(16,16,22,0.76), rgba(10,10,10,0.62));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 40px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 0 0 1px rgba(6, 182, 212, 0.06);
        }

        .auth-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          text-align: center;
        }

        .auth-logo-mark {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(135deg, rgba(6, 182, 212, 0.24), rgba(168, 85, 247, 0.22)),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(6, 182, 212, 0.42);
          box-shadow: var(--shadow-cyan);
        }

        .auth-logo-mark svg {
          width: 30px;
          height: 30px;
          color: var(--cyan);
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.65));
        }

        .auth-title {
          margin: 0;
          font-family: var(--font-head);
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .auth-subtitle {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: rgba(5, 5, 8, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px;
          border-radius: 16px;
          margin-bottom: 28px;
        }

        .auth-tab-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 10px 0;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }

        .auth-tab-btn.active {
          color: white;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.28);
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.08);
        }

        .auth-form {
          display: grid;
          gap: 18px;
        }

        .auth-field {
          display: grid;
          gap: 8px;
        }

        .auth-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .auth-label {
          color: rgba(248, 250, 252, 0.82);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .auth-input {
          width: 100%;
          min-height: 50px;
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 15px;
          padding: 0 15px;
          color: var(--text);
          background: rgba(5, 5, 8, 0.58);
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .auth-input:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.10), 0 0 24px rgba(6, 182, 212, 0.18);
          background: rgba(5, 5, 8, 0.78);
        }

        .auth-error {
          color: #fb7185;
          font-size: 0.85rem;
          background: rgba(251, 113, 133, 0.08);
          border: 1px solid rgba(251, 113, 133, 0.22);
          padding: 12px;
          border-radius: 14px;
          line-height: 1.4;
        }

        .auth-submit-btn {
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid rgba(6, 182, 212, 0.55);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.92), rgba(168, 85, 247, 0.92));
          color: white;
          font-weight: 800;
          border-radius: 15px;
          cursor: pointer;
          box-shadow: 0 14px 40px rgba(6, 182, 212, 0.16);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 46px rgba(168, 85, 247, 0.22), 0 0 26px rgba(6, 182, 212, 0.25);
        }

        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-helper-note {
          margin-top: 24px;
          font-size: 0.82rem;
          color: var(--muted);
          text-align: center;
          line-height: 1.5;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .auth-helper-note strong {
          color: var(--cyan);
          cursor: pointer;
          text-decoration: underline;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 55%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .google-signin-container {
          margin-top: 10px;
          margin-bottom: 8px;
        }

        .google-btn {
          width: 100%;
          height: 50px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          color: #1e293b;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
        }

        .google-btn:hover {
          background-color: #f1f5f9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .google-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.4), 0 0 12px rgba(6, 182, 212, 0.2);
        }

        .google-icon {
          width: 20px;
          height: 20px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 22px 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .auth-divider:not(:empty)::before {
          margin-right: 1.2em;
        }

        .auth-divider:not(:empty)::after {
          margin-left: 1.2em;
        }
      `}}),(0,s.jsxs)("div",{className:"auth-card",children:[(0,s.jsxs)("div",{className:"auth-brand",children:[(0,s.jsx)("div",{className:"auth-logo-mark",children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"auth-title",children:"Street Revolution"}),(0,s.jsx)("p",{className:"auth-subtitle",children:"Console Gateway"})]})]}),(0,s.jsxs)("div",{className:"auth-tabs",children:[(0,s.jsx)("button",{type:"button",className:`auth-tab-btn ${"signin"===l?"active":""}`,onClick:()=>{d("signin"),y("")},children:"Sign In"}),(0,s.jsx)("button",{type:"button",className:`auth-tab-btn ${"signup"===l?"active":""}`,onClick:()=>{d("signup"),y("")},children:"Sign Up"})]}),(0,s.jsx)("div",{className:"google-signin-container",style:{display:"flex",justifyContent:"center",minHeight:"50px"},children:(0,s.jsx)("div",{id:"google-signin-btn-div",style:{width:"100%",minHeight:"40px"}})}),(0,s.jsx)("div",{className:"auth-divider",children:"or"}),N&&(0,s.jsx)("div",{className:"auth-error",children:N}),"signin"===l?(0,s.jsxs)("form",{className:"auth-form",onSubmit:w,children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-email",children:"Email Address"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-email",type:"email",placeholder:"e.g. alex@streetrevolution.com",value:o,onChange:e=>c(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-password",children:"Password"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-password",type:"password",placeholder:"Enter password",value:h,onChange:e=>u(e.target.value),disabled:v,required:!0})]}),(0,s.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"spinner"}),(0,s.jsx)("span",{children:"Syncing..."})]}):(0,s.jsx)("span",{children:"Access Console"})})]}):(0,s.jsxs)("form",{className:"auth-form",onSubmit:k,children:[(0,s.jsxs)("div",{className:"auth-field-row",children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-first-name",children:"First Name"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-first-name",type:"text",placeholder:"Alex",value:x,onChange:e=>g(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-last-name",children:"Last Name"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-last-name",type:"text",placeholder:"Rider",value:b,onChange:e=>j(e.target.value),disabled:v,required:!0})]})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-email",children:"Email Address"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-email",type:"email",placeholder:"e.g. pilot@streetrevolution.com",value:o,onChange:e=>c(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field-row",children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-pass",children:"Password"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-pass",type:"password",placeholder:"Min 6 chars",value:h,onChange:e=>u(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-confirm",children:"Confirm"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-confirm",type:"password",placeholder:"Match password",value:p,onChange:e=>m(e.target.value),disabled:v,required:!0})]})]}),(0,s.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"spinner"}),(0,s.jsx)("span",{children:"Initializing..."})]}):(0,s.jsx)("span",{children:"Register Signal"})})]}),(0,s.jsx)("div",{className:"auth-helper-note",children:"signin"===l?(0,s.jsxs)(s.Fragment,{children:["Testing credentials available: Use ",(0,s.jsx)("strong",{onClick:()=>{c("alex@streetrevolution.com"),u("any-password")},children:"alex@streetrevolution.com"})," (click to autofill)."]}):(0,s.jsxs)(s.Fragment,{children:["Already registered? Switch tab to ",(0,s.jsx)("strong",{onClick:()=>d("signin"),children:"Sign In"}),"."]})})]})]})};var n=e.i(18566),l=e.i(22016);function d({active:e,setActive:t,collapsed:a,setCollapsed:i,mobileOpen:r,setMobileOpen:n,navItems:o,icons:c}){return(0,s.jsxs)("aside",{className:`sidebar ${r?"mobile-open":""}`,"aria-label":"Account navigation",children:[(0,s.jsxs)("div",{className:"brand-row",children:[(0,s.jsxs)(l.default,{href:"/",className:"brand hover:opacity-90 transition",children:[(0,s.jsx)("div",{className:"brand-mark",children:c.bolt}),(0,s.jsxs)("div",{className:"brand-copy",children:[(0,s.jsxs)("h1",{className:"brand-title",children:["Street",(0,s.jsx)("br",{}),"Revolution"]}),(0,s.jsx)("p",{className:"brand-subtitle",children:"My Account"})]})]}),(0,s.jsx)("button",{className:"icon-button desktop-collapse",type:"button",onClick:()=>i(!a),"aria-label":"Toggle sidebar",children:c.collapse}),(0,s.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>n(!1),"aria-label":"Close menu",children:c.close})]}),(0,s.jsx)("nav",{children:(0,s.jsx)("ul",{className:"nav-list",children:o.map(a=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{type:"button",className:`nav-button ${e===a.id?"active":""}`,onClick:()=>{t(a.id),n(!1)},"aria-current":e===a.id?"page":void 0,children:[a.icon,(0,s.jsx)("span",{className:"nav-label",children:a.label})]})},a.id))})}),(0,s.jsx)("div",{className:"sidebar-footer",children:(0,s.jsxs)("div",{className:"sidebar-footer-content",children:[(0,s.jsx)("strong",{children:"Revolution Status"}),(0,s.jsx)("p",{children:"Members receive early access to limited drops, private restocks, and street-coded rewards."})]})})]})}function o({customer:e,activeLabel:t,setMobileOpen:a,onLogout:i,icons:r}){return(0,s.jsxs)("header",{className:"topbar",children:[(0,s.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>a(!0),"aria-label":"Open menu",children:r.menu}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"eyebrow",children:"Dashboard"===t||"Cart"===t?"THIS ACCOUNT BELONGS TO":"Account Console"}),(0,s.jsx)("h2",{className:"page-title text-3xl md:text-4xl",children:"Dashboard"===t||"Cart"===t?(()=>{let t=e?.displayName||(e?.firstName&&e?.lastName?`${e.firstName} ${e.lastName}`:"")||"Member",a=t.trim().split(" ");if(a.length>1){let e=a.slice(0,-1).join(" "),t=a[a.length-1];return(0,s.jsxs)(s.Fragment,{children:[e," ",(0,s.jsx)("span",{className:"gradient-text",children:t})]})}return(0,s.jsx)("span",{className:"gradient-text",children:t})})():(0,s.jsxs)(s.Fragment,{children:["Account Details"===t?"Account":t," ",(0,s.jsx)("span",{className:"gradient-text",children:"Hub"})]})})]}),(0,s.jsxs)("div",{className:"topbar-actions",children:[(0,s.jsxs)("div",{className:"user-chip",children:[(0,s.jsx)("div",{className:"avatar",children:e?.avatarInitials||"AR"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:e?.displayName||(e?`${e.firstName} ${e.lastName}`:"Member")}),(0,s.jsx)("span",{children:e?.email||""})]})]}),(0,s.jsx)(l.default,{href:"/",className:"btn btn-primary",children:"Shop New Drop"}),(0,s.jsx)("button",{className:"btn btn-danger",type:"button",onClick:i,children:"Sign Out"})]})]})}function c({status:e}){let t=`status-pill status-${e.toLowerCase()}`;return(0,s.jsx)("span",{className:t,children:e})}function h({customer:e,orders:a,icons:r}){let{showNotification:n}=(0,i.useNotification)(),l=t.default.useMemo(()=>{let e=a.reduce((e,s)=>{let t=parseFloat(s.total.replace(/[^0-9.]/g,""));return e+(isNaN(t)?0:t)},0);return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(e)},[a]),d=a[0]||{status:"N/A"};return(0,s.jsxs)("div",{className:"content-grid",children:[(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon",children:r.orders}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:a.length}),(0,s.jsx)("p",{className:"stat-label",children:"Total Orders"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon purple",children:r.card}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:l}),(0,s.jsx)("p",{className:"stat-label",children:"Lifetime Spend"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon",children:r.spark}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:"VIP"}),(0,s.jsx)("p",{className:"stat-label",children:"Member Tier"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon purple",children:r.package}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:d.status}),(0,s.jsx)("p",{className:"stat-label",children:"Latest Order"})]})]}),(0,s.jsxs)("section",{className:"card card-padding span-7",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Recent Activity"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Your latest order and profile events."})]})}),(0,s.jsx)("ul",{className:"activity-list",children:a.slice(0,3).map(e=>(0,s.jsxs)("li",{className:"activity-item",children:[(0,s.jsx)("div",{className:"activity-dot",children:r.package}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("strong",{children:[e.id," — ",e.items]}),(0,s.jsxs)("span",{children:[e.date," · ",e.total]})]}),(0,s.jsx)(c,{status:e.status})]},e.id))})]}),(0,s.jsxs)("section",{className:"card card-padding span-5",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Profile Signal"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Keep your account details current for faster checkout and exclusive access."})]})}),(0,s.jsxs)("div",{className:"notice",children:[r.info,(0,s.jsxs)("div",{children:[(0,s.jsxs)("strong",{children:["Member since ",e?.memberSince||"2023"]}),(0,s.jsx)("br",{}),"Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first."]})]}),(0,s.jsx)("div",{style:{height:16}}),(0,s.jsx)("button",{className:"btn btn-primary",type:"button",style:{width:"100%"},onClick:()=>n("SMS alert registration system initialized."),children:"Enable Drop Alerts"})]})]})}function u({status:e}){let t=`status-pill status-${e.toLowerCase()}`;return(0,s.jsx)("span",{className:t,children:e})}function p({orders:e,icons:t}){let{showNotification:a}=(0,i.useNotification)();return(0,s.jsxs)("section",{className:"card card-padding",children:[(0,s.jsxs)("div",{className:"section-head",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Order History"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Minimal, high-contrast order history details."})]}),(0,s.jsx)("button",{className:"btn",type:"button",onClick:()=>{a("Preparing CSV export of transaction logs...")},children:"Download CSV"})]}),e.length?(0,s.jsx)("div",{className:"table-wrap",children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Order"}),(0,s.jsx)("th",{children:"Date"}),(0,s.jsx)("th",{children:"Status"}),(0,s.jsx)("th",{children:"Items"}),(0,s.jsx)("th",{children:"Total"}),(0,s.jsx)("th",{children:"Action"})]})}),(0,s.jsx)("tbody",{children:e.map(e=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:"order-id",children:e.id})}),(0,s.jsx)("td",{children:e.date}),(0,s.jsx)("td",{children:(0,s.jsx)(u,{status:e.status})}),(0,s.jsx)("td",{children:e.items}),(0,s.jsx)("td",{children:e.total}),(0,s.jsx)("td",{children:(0,s.jsx)("button",{className:"link-action",type:"button",onClick:()=>a(`Tracking status for order ${e.id}`),children:"Track"})})]},e.id))})]})}):(0,s.jsxs)("div",{className:"empty-state",children:[(0,s.jsx)("div",{className:"empty-icon",children:t.orders}),(0,s.jsx)("h3",{children:"No orders yet"}),(0,s.jsx)("p",{children:"Your order history will appear here after your first checkout."}),(0,s.jsx)("button",{className:"btn btn-primary",type:"button",children:"Start Shopping"})]})]})}var m=e.i(25194);function x({icons:e}){let{cartItems:a,updateQuantity:r,removeFromCart:n,clearCart:l}=(0,m.useCart)(),{showNotification:d}=(0,i.useNotification)(),o=a||[],c=t.default.useMemo(()=>o.reduce((e,s)=>e+(s.price||0)*(s.quantity||0),0),[o]),h=c>150?0:15*(c>0),u=.08*c,p=c+h+u;return(0,s.jsxs)("section",{className:"card card-padding",children:[(0,s.jsxs)("div",{className:"section-head",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Shopping Cart"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Manage your selected items and configure checkout."})]}),o.length>0&&(0,s.jsx)("button",{className:"btn btn-danger",type:"button",onClick:l,children:"Clear Cart"})]}),o.length?(0,s.jsxs)("div",{className:"cart-content-layout",children:[(0,s.jsx)("div",{className:"table-wrap",children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Item"}),(0,s.jsx)("th",{children:"Price"}),(0,s.jsx)("th",{children:"Quantity"}),(0,s.jsx)("th",{children:"Total"}),(0,s.jsx)("th",{children:"Action"})]})}),(0,s.jsx)("tbody",{children:o.map(e=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)("div",{className:"flex items-center gap-4 py-2",children:[e.image&&(0,s.jsx)("img",{src:e.image,alt:e.name,className:"w-16 h-16 object-cover rounded-lg border border-[rgba(6,182,212,0.3)] shadow-[0_0_10px_rgba(6,182,212,0.1)] flex-shrink-0"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{className:"block text-white font-semibold tracking-wide",children:e.name}),e.size&&(0,s.jsxs)("span",{className:"text-xs text-[var(--cyan)] uppercase tracking-widest font-mono",children:["Size: ",e.size]})]})]})}),(0,s.jsxs)("td",{className:"font-mono",children:["₹",e.price.toFixed(2)]}),(0,s.jsx)("td",{children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("button",{type:"button",className:"w-8 h-8 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-sm transition",onClick:()=>r(e.id,-1),children:"-"}),(0,s.jsx)("span",{className:"w-8 text-center font-mono font-bold text-white",children:e.quantity}),(0,s.jsx)("button",{type:"button",className:"w-8 h-8 rounded border border-white/10 hover:border-[var(--cyan)] hover:bg-[rgba(6,182,212,0.1)] flex items-center justify-center text-sm transition",onClick:()=>r(e.id,1),children:"+"})]})}),(0,s.jsxs)("td",{className:"font-mono text-[var(--cyan)] font-semibold",children:["₹",(e.price*e.quantity).toFixed(2)]}),(0,s.jsx)("td",{children:(0,s.jsx)("button",{className:"link-action font-mono text-[var(--danger)] hover:text-rose-400",type:"button",onClick:()=>n(e.id),children:"Remove"})})]},e.id))})]})}),(0,s.jsxs)("div",{className:"cart-summary-card mt-8 p-6 rounded-xl border border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6",children:[(0,s.jsxs)("div",{className:"flex flex-wrap gap-8 text-sm",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"block text-gray-500 font-mono uppercase tracking-wider text-xs",children:"Subtotal"}),(0,s.jsxs)("span",{className:"text-lg font-mono font-bold text-white",children:["₹",c.toFixed(2)]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"block text-gray-500 font-mono uppercase tracking-wider text-xs",children:"Shipping"}),(0,s.jsx)("span",{className:"text-lg font-mono font-bold text-white",children:0===h?"FREE":`₹${h.toFixed(2)}`})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"block text-gray-500 font-mono uppercase tracking-wider text-xs",children:"Tax (8%)"}),(0,s.jsxs)("span",{className:"text-lg font-mono font-bold text-white",children:["₹",u.toFixed(2)]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"block text-gray-500 font-mono uppercase tracking-wider text-xs",children:"Grand Total"}),(0,s.jsxs)("span",{className:"text-lg font-mono font-black text-[var(--cyan)]",children:["₹",p.toFixed(2)]})]})]}),(0,s.jsx)("button",{className:"btn btn-primary orbitron uppercase tracking-widest text-xs py-3 px-8 shadow-[0_0_15px_rgba(6,182,212,0.4)]",type:"button",onClick:()=>{d("Initializing secure quantum checkout sequence...")},children:"Proceed to Checkout"})]})]}):(0,s.jsxs)("div",{className:"empty-state py-12",children:[(0,s.jsx)("div",{className:"empty-icon text-gray-600 mb-4",children:e.cart}),(0,s.jsx)("h3",{className:"text-lg font-bold text-white mb-2",children:"Your cart is empty"}),(0,s.jsx)("p",{className:"text-gray-400 mb-6 max-w-sm mx-auto",children:"You don't have any gear in your cart right now. Visit our shop catalog to add items."}),(0,s.jsx)("a",{href:"/",className:"btn btn-primary inline-block",children:"Start Shopping"})]})]})}function g({addresses:e,onUpdateAddresses:a}){let{showNotification:r}=(0,i.useNotification)(),[n,l]=(0,t.useState)(()=>{let s=[];return e?.billing&&(e.billing.line1||e.billing.name)&&s.push({id:"billing_default",type:"billing",name:e.billing.name||"",line1:e.billing.line1||"",line2:e.billing.line2||"",city:e.billing.city||"",state:e.billing.state||"",postcode:e.billing.postcode||"",phone:e.billing.phone||"+1 (555) 014-9090",country:e.billing.country||""}),e?.shipping&&(e.shipping.line1||e.shipping.name)&&s.push({id:"shipping_default",type:"shipping",name:e.shipping.name||"",line1:e.shipping.line1||"",line2:e.shipping.line2||"",city:e.shipping.city||"",state:e.shipping.state||"",postcode:e.shipping.postcode||"",phone:e.shipping.phone||"+1 (555) 014-9090",country:e.shipping.country||""}),s}),[d,o]=(0,t.useState)(null),[c,h]=(0,t.useState)({id:"",type:"shipping",name:"",line1:"",line2:"",city:"",state:"",postcode:"",phone:"",country:""});return(0,s.jsxs)("div",{className:"content-grid",children:[(0,s.jsxs)("section",{className:"card card-padding span-12",children:[(0,s.jsxs)("div",{className:"section-head flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Saved Address Book"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Manage billing and shipping coordinates for fast checkout."})]}),!d&&(0,s.jsx)("button",{className:"btn btn-primary",type:"button",onClick:()=>{o("new"),h({id:"",type:"shipping",name:"",line1:"",line2:"",city:"",state:"",postcode:"",phone:"",country:""})},children:"+ Add Address"})]}),(0,s.jsxs)("div",{className:"address-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"20px",marginTop:"20px"},children:[n.map(e=>(0,s.jsxs)("div",{className:"address-card",style:{display:"flex",flexDirection:"column",justifyContent:"between"},children:[(0,s.jsxs)("div",{className:"address-card-header flex justify-between items-center mb-4",children:[(0,s.jsx)("span",{className:`status-pill status-${e.type}`,style:{fontSize:"0.7rem",padding:"4px 10px",textTransform:"uppercase",letterSpacing:"0.05em"},children:e.type}),(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsx)("button",{className:"link-action",type:"button",onClick:()=>{o(e.id),h(e)},children:"Edit"}),(0,s.jsx)("button",{className:"link-action",type:"button",style:{color:"var(--danger)"},onClick:()=>{var s;let t;return s=e.id,void(l(t=n.filter(e=>e.id!==s)),a&&a({billing:t.find(e=>"billing"===e.type)||t[0]||{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""},shipping:t.find(e=>"shipping"===e.type)||t[0]||{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""}}),r("Address record deleted successfully."))},children:"Delete"})]})]}),(0,s.jsxs)("address",{style:{fontStyle:"normal",color:"var(--muted)",fontSize:"0.9rem",lineHeight:"1.6"},children:[(0,s.jsx)("strong",{style:{color:"var(--text)",fontSize:"1rem"},className:"block mb-1",children:e.name}),e.line1,e.line2&&`, ${e.line2}`,(0,s.jsx)("br",{}),e.city,", ",e.state," ",e.postcode,(0,s.jsx)("br",{}),e.country,(0,s.jsx)("br",{}),(0,s.jsxs)("span",{className:"block mt-2 font-mono text-xs text-[var(--cyan)]",children:["Phone: ",e.phone]})]})]},e.id)),0===n.length&&(0,s.jsx)("div",{className:"span-12 empty-address-placeholder text-center py-8",style:{color:"var(--muted)",fontStyle:"italic"},children:'No addresses configured. Click "+ Add Address" to build your roster.'})]})]}),d&&(0,s.jsxs)("section",{className:"card card-padding span-12",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"new"===d?"Register New Address Coordinates":"Modify Address Details"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Configure your delivery endpoint protocols. Fields marked as mandatory are required."})]})}),(0,s.jsxs)("form",{className:"form-grid",onSubmit:e=>{let s;e.preventDefault(),d&&(l(s="new"===d?[...n,{...c,id:`addr_${Date.now()}`}]:n.map(e=>e.id===d?c:e)),a&&a({billing:s.find(e=>"billing"===e.type)||s[0]||{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""},shipping:s.find(e=>"shipping"===e.type)||s[0]||{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""}}),r("new"===d?"New address record created successfully.":"Address record updated successfully."),o(null))},children:[(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"addressType",children:"Address Destination Type"}),(0,s.jsxs)("select",{className:"input select-input",id:"addressType",value:c.type,onChange:e=>h({...c,type:e.target.value}),style:{background:"rgba(0,0,0,0.5)",color:"white",border:"1px solid rgba(255,255,255,0.1)"},required:!0,children:[(0,s.jsx)("option",{value:"shipping",children:"Shipping Address"}),(0,s.jsx)("option",{value:"billing",children:"Billing Address"})]})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"fullName",children:"Full Name"}),(0,s.jsx)("input",{className:"input",id:"fullName",value:c.name,onChange:e=>h({...c,name:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"country",children:"Country"}),(0,s.jsx)("input",{className:"input",id:"country",value:c.country,onChange:e=>h({...c,country:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"street",children:"Street Address"}),(0,s.jsx)("input",{className:"input",id:"street",value:c.line1,onChange:e=>h({...c,line1:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"suite",children:"Apartment, suite, unit, etc. (optional)"}),(0,s.jsx)("input",{className:"input",id:"suite",value:c.line2,onChange:e=>h({...c,line2:e.target.value})})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"city",children:"City"}),(0,s.jsx)("input",{className:"input",id:"city",value:c.city,onChange:e=>h({...c,city:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"state",children:"State / Province"}),(0,s.jsx)("input",{className:"input",id:"state",value:c.state,onChange:e=>h({...c,state:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"postcode",children:"Postcode / Zip"}),(0,s.jsx)("input",{className:"input",id:"postcode",value:c.postcode,onChange:e=>h({...c,postcode:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"contactPhone",children:"Contact Phone Number"}),(0,s.jsx)("input",{className:"input",id:"contactPhone",type:"tel",value:c.phone,onChange:e=>h({...c,phone:e.target.value}),placeholder:"+1 (555) 000-0000",required:!0})]}),(0,s.jsxs)("div",{className:"field full flex gap-3 mt-4",children:[(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Save Address Protocol"}),(0,s.jsx)("button",{className:"btn",type:"button",onClick:()=>o(null),children:"Cancel"})]})]})]})]})}function b({customer:e,onUpdate:a}){let{showNotification:r}=(0,i.useNotification)(),[n,l]=(0,t.useState)({firstName:e?.firstName||"",lastName:e?.lastName||"",displayName:e?.displayName||"",email:e?.email||"",phone:e?.phone||"",currentPassword:"",newPassword:"",confirmPassword:""}),[d,o]=(0,t.useState)(!1),[c,h]=(0,t.useState)(!1);return(0,s.jsxs)("section",{className:"card card-padding",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Account Details"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Profile fields for identity validation and settings."})]})}),(0,s.jsxs)("form",{className:"form-grid",onSubmit:e=>{(e.preventDefault(),n.newPassword&&n.newPassword!==n.confirmPassword)?r("New passwords do not match."):(a({firstName:n.firstName,lastName:n.lastName,displayName:n.displayName,email:n.email,phone:n.phone}),r("Account details updated successfully."))},children:[(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"accountFirstName",children:"First Name"}),(0,s.jsx)("input",{className:"input",id:"accountFirstName",value:n.firstName,onChange:e=>l({...n,firstName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"accountLastName",children:"Last Name"}),(0,s.jsx)("input",{className:"input",id:"accountLastName",value:n.lastName,onChange:e=>l({...n,lastName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"displayName",children:"Display Name"}),(0,s.jsx)("input",{className:"input",id:"displayName",value:n.displayName,onChange:e=>l({...n,displayName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"phone",children:"Phone"}),(0,s.jsx)("input",{className:"input",id:"phone",value:n.phone,onChange:e=>l({...n,phone:e.target.value})})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"email",children:"Email Address"}),(0,s.jsx)("input",{className:"input",id:"email",type:"email",value:n.email,onChange:e=>l({...n,email:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"password",children:"New Password"}),(0,s.jsxs)("div",{className:"password-input-wrapper",style:{position:"relative",width:"100%"},children:[(0,s.jsx)("input",{className:"input",id:"password",type:d?"text":"password",placeholder:"••••••••••••",value:n.newPassword,onChange:e=>l({...n,newPassword:e.target.value}),style:{paddingRight:"40px",width:"100%"}}),(0,s.jsx)("button",{type:"button",onClick:()=>o(!d),style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"var(--muted)",outline:"none",cursor:"pointer",zIndex:10},"aria-label":d?"Hide password":"Show password",children:(0,s.jsx)("i",{className:`fas ${d?"fa-eye-slash":"fa-eye"}`})})]})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm Password"}),(0,s.jsxs)("div",{className:"password-input-wrapper",style:{position:"relative",width:"100%"},children:[(0,s.jsx)("input",{className:"input",id:"confirmPassword",type:c?"text":"password",placeholder:"••••••••••••",value:n.confirmPassword,onChange:e=>l({...n,confirmPassword:e.target.value}),style:{paddingRight:"40px",width:"100%"}}),(0,s.jsx)("button",{type:"button",onClick:()=>h(!c),style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"var(--muted)",outline:"none",cursor:"pointer",zIndex:10},"aria-label":c?"Hide password":"Show password",children:(0,s.jsx)("i",{className:`fas ${c?"fa-eye-slash":"fa-eye"}`})})]})]}),(0,s.jsx)("div",{className:"field full",style:{marginTop:"12px"},children:(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Update Account"})})]})]})}let j={dashboard:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,s.jsx)("path",{d:"M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),cart:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,s.jsx)("path",{d:"M6 8a6 6 0 0 1 12 0v2H6V8Zm-2 2h16l1 10H3L4 10Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),orders:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M9 12h6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),addresses:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",stroke:"currentColor",strokeWidth:"1.8"})]}),account:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M20 21a8 8 0 1 0-16 0",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z",stroke:"currentColor",strokeWidth:"1.8"})]}),bolt:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"26",height:"26",children:(0,s.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),menu:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),collapse:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"M15 6 9 12l6 6",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round"})}),close:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"m6 6 12 12M18 6 6 18",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),card:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M7 15h4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),package:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),spark:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,s.jsx)("path",{d:"M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})}),info:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:[(0,s.jsx)("path",{d:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",stroke:"currentColor",strokeWidth:"1.8"}),(0,s.jsx)("path",{d:"M12 10.5V17M12 7.2v.1",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round"})]})},v=[{id:"dashboard",label:"Dashboard",icon:j.dashboard},{id:"orders",label:"Orders",icon:j.orders},{id:"cart",label:"Cart",icon:j.cart},{id:"addresses",label:"Addresses",icon:j.addresses},{id:"account",label:"Account Details",icon:j.account}],f={firstName:"Alex",lastName:"Rider",displayName:"Alex Rider",email:"alex@streetrevolution.com",phone:"+1 (555) 014-9090",memberSince:"2023",avatarInitials:"AR"},N=[{id:"#SR-1049",date:"Feb 18, 2026",status:"Processing",total:"₹248.00",items:"Apex Carbon Tee, Neon Utility Cap"},{id:"#SR-1038",date:"Jan 29, 2026",status:"Completed",total:"₹119.00",items:"Revolution Hoodie"},{id:"#SR-1017",date:"Dec 14, 2025",status:"Completed",total:"₹312.50",items:"Night Run Jacket, Cargo Tech Pants"},{id:"#SR-0994",date:"Nov 03, 2025",status:"Pending",total:"₹88.00",items:"Chrome Logo Longsleeve"}],y={billing:{name:"Alex Rider",line1:"188 Neon District Ave",line2:"Unit 06",city:"Los Angeles",state:"CA",postcode:"90015",country:"United States",phone:"+1 (555) 014-9090"},shipping:{name:"Alex Rider",line1:"44 Cyan Boulevard",line2:"Suite 12",city:"Brooklyn",state:"NY",postcode:"11201",country:"United States",phone:"+1 (555) 014-9090"}};function w({customer:e,orders:i,addresses:r}){let{user:l,logout:c,updateUser:u}=(0,a.useAuth)(),m=e||l||f,k=m?.email?.toLowerCase()==="alex@streetrevolution.com",C=(0,t.useMemo)(()=>i||(k?N:[]),[i,k]),S=(0,t.useMemo)(()=>r||(k?y:{billing:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""},shipping:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:"",phone:""}}),[r,k]),[A,F]=(0,t.useState)("dashboard"),[M,L]=(0,t.useState)(!1),[P,R]=(0,t.useState)(!1),T=(0,n.useSearchParams)();(0,t.useEffect)(()=>{let e=T.get("tab");e&&["dashboard","orders","cart","addresses","account"].includes(e)&&F(e)},[T]);let q=(0,t.useMemo)(()=>v.find(e=>e.id===A)?.label||"Dashboard",[A]);return(0,s.jsxs)("div",{className:"sr-page",children:[(0,s.jsx)("div",{className:`overlay ${P?"show":""}`,onClick:()=>R(!1)}),(0,s.jsxs)("div",{className:`account-shell ${M?"is-collapsed":""}`,children:[(0,s.jsx)(d,{active:A,setActive:F,collapsed:M,setCollapsed:L,mobileOpen:P,setMobileOpen:R,navItems:v,icons:j}),(0,s.jsxs)("main",{className:"main",children:[(0,s.jsx)(o,{customer:m,activeLabel:q,setMobileOpen:R,onLogout:c,icons:j}),"dashboard"===A&&(0,s.jsx)(h,{customer:m,orders:C,icons:j}),"orders"===A&&(0,s.jsx)(p,{orders:C,icons:j}),"cart"===A&&(0,s.jsx)(x,{icons:j}),"addresses"===A&&(0,s.jsx)(g,{addresses:S}),"account"===A&&(0,s.jsx)(b,{customer:m,onUpdate:u})]})]})]})}e.s(["default",0,function(){let{user:e,isLoading:i}=(0,a.useAuth)();return i?(0,s.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6",children:[(0,s.jsx)("div",{className:"w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin"}),(0,s.jsx)("span",{className:"orbitron uppercase tracking-widest text-xs text-cyan-400",children:"Synchronizing Console..."})]}):e?(0,s.jsx)(t.Suspense,{fallback:(0,s.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6",children:[(0,s.jsx)("div",{className:"w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin"}),(0,s.jsx)("span",{className:"orbitron uppercase tracking-widest text-xs text-cyan-400",children:"Loading Account Panel..."})]}),children:(0,s.jsx)(w,{})}):(0,s.jsx)(r,{})}],19172)}]);