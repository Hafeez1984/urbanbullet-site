(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,19172,e=>{"use strict";var s=e.i(43476),a=e.i(32341);e.i(47167);var t=e.i(71645),i=e.i(41402);e.i(17255);let r=()=>{let{login:e,signup:r}=(0,a.useAuth)(),{showNotification:n}=(0,i.useNotification)();(0,t.useEffect)(()=>{{let e=setInterval(()=>{if(window.google?.accounts?.id){clearInterval(e);let s=window.google;s.accounts.id.initialize({client_id:"555849725616-cfsnu89kf426p6c2fj476vhfqg1o5i7k.apps.googleusercontent.com",callback:e=>{try{let s=e.credential.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(s).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t=JSON.parse(a),i=t.given_name||t.name?.split(" ")[0]||"Google",r=t.family_name||t.name?.split(" ")[1]||"User",l={firstName:i,lastName:r,displayName:t.name||`${i} ${r}`,email:t.email,memberSince:new Date().getFullYear().toString(),avatarInitials:(i.substring(0,1)+r.substring(0,1)).toUpperCase()};localStorage.setItem("ub_user",JSON.stringify(l)),n(`Signed in as ${t.email}!`),window.location.reload()}catch(e){console.error("JWT Decode error",e),y("Failed to process Google login response.")}}});let a=document.getElementById("google-signin-btn-div");a&&s.accounts.id.renderButton(a,{theme:"filled_blue",size:"large",text:"signin_with",shape:"rectangular",width:a.clientWidth||300})}},500);return()=>clearInterval(e)}},[!0]);let[l,d]=(0,t.useState)("signin"),[o,c]=(0,t.useState)(""),[h,u]=(0,t.useState)(""),[p,m]=(0,t.useState)(""),[x,g]=(0,t.useState)(""),[b,j]=(0,t.useState)(""),[v,f]=(0,t.useState)(!1),[N,y]=(0,t.useState)(""),w=async s=>{if(s.preventDefault(),!o||!h)return void y("Please fill in all fields.");y(""),f(!0);try{let s=await e(o,h);s.success?n("Signed in successfully!"):y(s.error||"Authentication failed.")}catch(e){y("An unexpected error occurred.")}finally{f(!1)}},k=async e=>{if(e.preventDefault(),!o||!h||!x||!b)return void y("Please fill in all fields.");if(h!==p)return void y("Passwords do not match.");if(h.length<6)return void y("Password must be at least 6 characters.");y(""),f(!0);try{let e=await r(o,h,x,b);e.success?n("Account created successfully!"):y(e.error||"Registration failed.")}catch(e){y("An unexpected error occurred.")}finally{f(!1)}};return(0,s.jsxs)("div",{className:"auth-gate-page",children:[(0,s.jsx)("style",{dangerouslySetInnerHTML:{__html:`
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
      `}}),(0,s.jsxs)("div",{className:"auth-card",children:[(0,s.jsxs)("div",{className:"auth-brand",children:[(0,s.jsx)("div",{className:"auth-logo-mark",children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"auth-title",children:"Street Revolution"}),(0,s.jsx)("p",{className:"auth-subtitle",children:"Console Gateway"})]})]}),(0,s.jsxs)("div",{className:"auth-tabs",children:[(0,s.jsx)("button",{type:"button",className:`auth-tab-btn ${"signin"===l?"active":""}`,onClick:()=>{d("signin"),y("")},children:"Sign In"}),(0,s.jsx)("button",{type:"button",className:`auth-tab-btn ${"signup"===l?"active":""}`,onClick:()=>{d("signup"),y("")},children:"Sign Up"})]}),(0,s.jsx)("div",{className:"google-signin-container",style:{display:"flex",justifyContent:"center",minHeight:"50px"},children:(0,s.jsx)("div",{id:"google-signin-btn-div",style:{width:"100%",minHeight:"40px"}})}),(0,s.jsx)("div",{className:"auth-divider",children:"or"}),N&&(0,s.jsx)("div",{className:"auth-error",children:N}),"signin"===l?(0,s.jsxs)("form",{className:"auth-form",onSubmit:w,children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-email",children:"Email Address"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-email",type:"email",placeholder:"e.g. alex@streetrevolution.com",value:o,onChange:e=>c(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-password",children:"Password"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-password",type:"password",placeholder:"Enter password",value:h,onChange:e=>u(e.target.value),disabled:v,required:!0})]}),(0,s.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"spinner"}),(0,s.jsx)("span",{children:"Syncing..."})]}):(0,s.jsx)("span",{children:"Access Console"})})]}):(0,s.jsxs)("form",{className:"auth-form",onSubmit:k,children:[(0,s.jsxs)("div",{className:"auth-field-row",children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-first-name",children:"First Name"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-first-name",type:"text",placeholder:"Alex",value:x,onChange:e=>g(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-last-name",children:"Last Name"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-last-name",type:"text",placeholder:"Rider",value:b,onChange:e=>j(e.target.value),disabled:v,required:!0})]})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-email",children:"Email Address"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-email",type:"email",placeholder:"e.g. pilot@streetrevolution.com",value:o,onChange:e=>c(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field-row",children:[(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-pass",children:"Password"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-pass",type:"password",placeholder:"Min 6 chars",value:h,onChange:e=>u(e.target.value),disabled:v,required:!0})]}),(0,s.jsxs)("div",{className:"auth-field",children:[(0,s.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-confirm",children:"Confirm"}),(0,s.jsx)("input",{className:"auth-input",id:"auth-signup-confirm",type:"password",placeholder:"Match password",value:p,onChange:e=>m(e.target.value),disabled:v,required:!0})]})]}),(0,s.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"spinner"}),(0,s.jsx)("span",{children:"Initializing..."})]}):(0,s.jsx)("span",{children:"Register Signal"})})]}),(0,s.jsx)("div",{className:"auth-helper-note",children:"signin"===l?(0,s.jsxs)(s.Fragment,{children:["Testing credentials available: Use ",(0,s.jsx)("strong",{onClick:()=>{c("alex@streetrevolution.com"),u("any-password")},children:"alex@streetrevolution.com"})," (click to autofill)."]}):(0,s.jsxs)(s.Fragment,{children:["Already registered? Switch tab to ",(0,s.jsx)("strong",{onClick:()=>d("signin"),children:"Sign In"}),"."]})})]})]})};var n=e.i(22016);function l({active:e,setActive:a,collapsed:t,setCollapsed:i,mobileOpen:r,setMobileOpen:d,navItems:o,icons:c}){return(0,s.jsxs)("aside",{className:`sidebar ${r?"mobile-open":""}`,"aria-label":"Account navigation",children:[(0,s.jsxs)("div",{className:"brand-row",children:[(0,s.jsxs)(n.default,{href:"/",className:"brand hover:opacity-90 transition",children:[(0,s.jsx)("div",{className:"brand-mark",children:c.bolt}),(0,s.jsxs)("div",{className:"brand-copy",children:[(0,s.jsxs)("h1",{className:"brand-title",children:["Street",(0,s.jsx)("br",{}),"Revolution"]}),(0,s.jsx)("p",{className:"brand-subtitle",children:"My Account"})]})]}),(0,s.jsx)("button",{className:"icon-button desktop-collapse",type:"button",onClick:()=>i(!t),"aria-label":"Toggle sidebar",children:c.collapse}),(0,s.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>d(!1),"aria-label":"Close menu",children:c.close})]}),(0,s.jsx)("nav",{children:(0,s.jsx)("ul",{className:"nav-list",children:o.map(t=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{type:"button",className:`nav-button ${e===t.id?"active":""}`,onClick:()=>{a(t.id),d(!1)},"aria-current":e===t.id?"page":void 0,children:[t.icon,(0,s.jsx)("span",{className:"nav-label",children:t.label})]})},t.id))})}),(0,s.jsx)("div",{className:"sidebar-footer",children:(0,s.jsxs)("div",{className:"sidebar-footer-content",children:[(0,s.jsx)("strong",{children:"Revolution Status"}),(0,s.jsx)("p",{children:"Members receive early access to limited drops, private restocks, and street-coded rewards."})]})})]})}function d({customer:e,activeLabel:a,setMobileOpen:t,onLogout:i,icons:r}){return(0,s.jsxs)("header",{className:"topbar",children:[(0,s.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>t(!0),"aria-label":"Open menu",children:r.menu}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"eyebrow",children:"Account Console"}),(0,s.jsxs)("h2",{className:"page-title",children:["Account Details"===a?"Account":a," ",(0,s.jsx)("span",{className:"gradient-text",children:"Hub"})]})]}),(0,s.jsxs)("div",{className:"topbar-actions",children:[(0,s.jsxs)("div",{className:"user-chip",children:[(0,s.jsx)("div",{className:"avatar",children:e.avatarInitials||"AR"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:e.displayName||`${e.firstName} ${e.lastName}`}),(0,s.jsx)("span",{children:e.email})]})]}),(0,s.jsx)(n.default,{href:"/",className:"btn btn-primary",children:"Shop New Drop"}),(0,s.jsx)("button",{className:"btn btn-danger",type:"button",onClick:i,children:"Sign Out"})]})]})}function o({status:e}){let a=`status-pill status-${e.toLowerCase()}`;return(0,s.jsx)("span",{className:a,children:e})}function c({customer:e,orders:a,icons:r}){let{showNotification:n}=(0,i.useNotification)(),l=t.default.useMemo(()=>{let e=a.reduce((e,s)=>{let a=parseFloat(s.total.replace(/[^0-9.]/g,""));return e+(isNaN(a)?0:a)},0);return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(e)},[a]),d=a[0]||{status:"N/A"};return(0,s.jsxs)("div",{className:"content-grid",children:[(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon",children:r.orders}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:a.length}),(0,s.jsx)("p",{className:"stat-label",children:"Total Orders"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon purple",children:r.card}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:l}),(0,s.jsx)("p",{className:"stat-label",children:"Lifetime Spend"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon",children:r.spark}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:"VIP"}),(0,s.jsx)("p",{className:"stat-label",children:"Member Tier"})]})]}),(0,s.jsxs)("div",{className:"card stat-card span-3",children:[(0,s.jsx)("div",{className:"stat-icon purple",children:r.package}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"stat-value",children:d.status}),(0,s.jsx)("p",{className:"stat-label",children:"Latest Order"})]})]}),(0,s.jsxs)("section",{className:"card card-padding span-7",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Recent Activity"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Your latest order and profile events."})]})}),(0,s.jsx)("ul",{className:"activity-list",children:a.slice(0,3).map(e=>(0,s.jsxs)("li",{className:"activity-item",children:[(0,s.jsx)("div",{className:"activity-dot",children:r.package}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("strong",{children:[e.id," — ",e.items]}),(0,s.jsxs)("span",{children:[e.date," · ",e.total]})]}),(0,s.jsx)(o,{status:e.status})]},e.id))})]}),(0,s.jsxs)("section",{className:"card card-padding span-5",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Profile Signal"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Keep your account details current for faster checkout and exclusive access."})]})}),(0,s.jsxs)("div",{className:"notice",children:[r.info,(0,s.jsxs)("div",{children:[(0,s.jsxs)("strong",{children:["Member since ",e.memberSince||"2023"]}),(0,s.jsx)("br",{}),"Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first."]})]}),(0,s.jsx)("div",{style:{height:16}}),(0,s.jsx)("button",{className:"btn btn-primary",type:"button",style:{width:"100%"},onClick:()=>n("SMS alert registration system initialized."),children:"Enable Drop Alerts"})]})]})}function h({status:e}){let a=`status-pill status-${e.toLowerCase()}`;return(0,s.jsx)("span",{className:a,children:e})}function u({orders:e,icons:a}){let{showNotification:t}=(0,i.useNotification)();return(0,s.jsxs)("section",{className:"card card-padding",children:[(0,s.jsxs)("div",{className:"section-head",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Order History"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Minimal, high-contrast order history details."})]}),(0,s.jsx)("button",{className:"btn",type:"button",onClick:()=>{t("Preparing CSV export of transaction logs...")},children:"Download CSV"})]}),e.length?(0,s.jsx)("div",{className:"table-wrap",children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Order"}),(0,s.jsx)("th",{children:"Date"}),(0,s.jsx)("th",{children:"Status"}),(0,s.jsx)("th",{children:"Items"}),(0,s.jsx)("th",{children:"Total"}),(0,s.jsx)("th",{children:"Action"})]})}),(0,s.jsx)("tbody",{children:e.map(e=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:"order-id",children:e.id})}),(0,s.jsx)("td",{children:e.date}),(0,s.jsx)("td",{children:(0,s.jsx)(h,{status:e.status})}),(0,s.jsx)("td",{children:e.items}),(0,s.jsx)("td",{children:e.total}),(0,s.jsx)("td",{children:(0,s.jsx)("button",{className:"link-action",type:"button",onClick:()=>t(`Tracking status for order ${e.id}`),children:"Track"})})]},e.id))})]})}):(0,s.jsxs)("div",{className:"empty-state",children:[(0,s.jsx)("div",{className:"empty-icon",children:a.orders}),(0,s.jsx)("h3",{children:"No orders yet"}),(0,s.jsx)("p",{children:"Your order history will appear here after your first checkout."}),(0,s.jsx)("button",{className:"btn btn-primary",type:"button",children:"Start Shopping"})]})]})}function p({addresses:e,onUpdateAddresses:a}){let{showNotification:r}=(0,i.useNotification)(),[n,l]=(0,t.useState)(e),[d,o]=(0,t.useState)(null),[c,h]=(0,t.useState)({name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""});return(0,s.jsxs)("div",{className:"content-grid",children:[(0,s.jsxs)("section",{className:"card card-padding span-12",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Saved Addresses"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Use these cards to manage billing and shipping destinations."})]})}),(0,s.jsx)("div",{className:"address-grid",children:Object.keys(n).map(e=>{let a=n[e];return(0,s.jsxs)("div",{className:"address-card",children:[(0,s.jsxs)("div",{className:"address-card-header",children:[(0,s.jsxs)("h4",{className:"address-type",children:[e," Address"]}),(0,s.jsx)("button",{className:"link-action",type:"button",onClick:()=>{o(e),h(n[e])},children:"Edit"})]}),a.line1?(0,s.jsxs)("address",{children:[(0,s.jsx)("strong",{style:{color:"var(--text)"},children:a.name}),(0,s.jsx)("br",{}),a.line1,(0,s.jsx)("br",{}),a.line2&&(0,s.jsxs)(s.Fragment,{children:[a.line2,(0,s.jsx)("br",{})]}),a.city,", ",a.state," ",a.postcode,(0,s.jsx)("br",{}),a.country]}):(0,s.jsx)("div",{className:"empty-address-placeholder",style:{padding:"12px 0",color:"var(--muted)",fontSize:"0.85rem",fontStyle:"italic"},children:"No address registered. Click Edit to configure."})]},e)})})]}),d&&(0,s.jsxs)("section",{className:"card card-padding span-12",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsxs)("h3",{className:"section-title",children:["Update ",d.charAt(0).toUpperCase()+d.slice(1)," Address"]}),(0,s.jsx)("p",{className:"section-subtitle",children:"Configure your shipping coordinates for rapid drops delivery."})]})}),(0,s.jsxs)("form",{className:"form-grid",onSubmit:e=>{if(e.preventDefault(),!d)return;let s={...n,[d]:c};l(s),a&&a(s),r(`${d.charAt(0).toUpperCase()+d.slice(1)} address updated successfully.`),o(null)},children:[(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"fullName",children:"Full Name"}),(0,s.jsx)("input",{className:"input",id:"fullName",value:c.name,onChange:e=>h({...c,name:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"country",children:"Country"}),(0,s.jsx)("input",{className:"input",id:"country",value:c.country,onChange:e=>h({...c,country:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"street",children:"Street Address"}),(0,s.jsx)("input",{className:"input",id:"street",value:c.line1,onChange:e=>h({...c,line1:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"suite",children:"Apartment, suite, unit, etc. (optional)"}),(0,s.jsx)("input",{className:"input",id:"suite",value:c.line2,onChange:e=>h({...c,line2:e.target.value})})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"city",children:"City"}),(0,s.jsx)("input",{className:"input",id:"city",value:c.city,onChange:e=>h({...c,city:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"state",children:"State / Province"}),(0,s.jsx)("input",{className:"input",id:"state",value:c.state,onChange:e=>h({...c,state:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"postcode",children:"Postcode / Zip"}),(0,s.jsx)("input",{className:"input",id:"postcode",value:c.postcode,onChange:e=>h({...c,postcode:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field full flex gap-3",children:[(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Save Address"}),(0,s.jsx)("button",{className:"btn",type:"button",onClick:()=>o(null),children:"Cancel"})]})]})]})]})}function m({customer:e,onUpdate:a}){let{showNotification:r}=(0,i.useNotification)(),[n,l]=(0,t.useState)({firstName:e.firstName||"",lastName:e.lastName||"",displayName:e.displayName||"",email:e.email||"",phone:e.phone||"",currentPassword:"",newPassword:"",confirmPassword:"",notes:""});return(0,s.jsxs)("section",{className:"card card-padding",children:[(0,s.jsx)("div",{className:"section-head",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"section-title",children:"Account Details"}),(0,s.jsx)("p",{className:"section-subtitle",children:"Profile fields for identity validation and preferences."})]})}),(0,s.jsxs)("form",{className:"form-grid",onSubmit:e=>{(e.preventDefault(),n.newPassword&&n.newPassword!==n.confirmPassword)?r("New passwords do not match."):(a({firstName:n.firstName,lastName:n.lastName,displayName:n.displayName,email:n.email,phone:n.phone}),r("Account details updated successfully."))},children:[(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"accountFirstName",children:"First Name"}),(0,s.jsx)("input",{className:"input",id:"accountFirstName",value:n.firstName,onChange:e=>l({...n,firstName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"accountLastName",children:"Last Name"}),(0,s.jsx)("input",{className:"input",id:"accountLastName",value:n.lastName,onChange:e=>l({...n,lastName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"displayName",children:"Display Name"}),(0,s.jsx)("input",{className:"input",id:"displayName",value:n.displayName,onChange:e=>l({...n,displayName:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"phone",children:"Phone"}),(0,s.jsx)("input",{className:"input",id:"phone",value:n.phone,onChange:e=>l({...n,phone:e.target.value})})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"email",children:"Email Address"}),(0,s.jsx)("input",{className:"input",id:"email",type:"email",value:n.email,onChange:e=>l({...n,email:e.target.value}),required:!0})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"password",children:"New Password"}),(0,s.jsx)("input",{className:"input",id:"password",type:"password",placeholder:"••••••••••••",value:n.newPassword,onChange:e=>l({...n,newPassword:e.target.value})})]}),(0,s.jsxs)("div",{className:"field",children:[(0,s.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm Password"}),(0,s.jsx)("input",{className:"input",id:"confirmPassword",type:"password",placeholder:"••••••••••••",value:n.confirmPassword,onChange:e=>l({...n,confirmPassword:e.target.value})})]}),(0,s.jsxs)("div",{className:"field full",children:[(0,s.jsx)("label",{htmlFor:"notes",children:"Style Preferences"}),(0,s.jsx)("textarea",{className:"textarea",id:"notes",placeholder:"Tell us your fit, size, and drop preferences...",value:n.notes,onChange:e=>l({...n,notes:e.target.value})})]}),(0,s.jsx)("div",{className:"field full",children:(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Update Account"})})]})]})}let x={dashboard:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,s.jsx)("path",{d:"M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),orders:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M9 12h6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),addresses:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",stroke:"currentColor",strokeWidth:"1.8"})]}),account:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M20 21a8 8 0 1 0-16 0",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z",stroke:"currentColor",strokeWidth:"1.8"})]}),bolt:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"26",height:"26",children:(0,s.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),menu:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),collapse:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"M15 6 9 12l6 6",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round"})}),close:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,s.jsx)("path",{d:"m6 6 12 12M18 6 6 18",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),card:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M7 15h4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),package:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,s.jsx)("path",{d:"m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),spark:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,s.jsx)("path",{d:"M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})}),info:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:[(0,s.jsx)("path",{d:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",stroke:"currentColor",strokeWidth:"1.8"}),(0,s.jsx)("path",{d:"M12 10.5V17M12 7.2v.1",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round"})]})},g=[{id:"dashboard",label:"Dashboard",icon:x.dashboard},{id:"orders",label:"Orders",icon:x.orders},{id:"addresses",label:"Addresses",icon:x.addresses},{id:"account",label:"Account Details",icon:x.account}],b={firstName:"Alex",lastName:"Rider",displayName:"Alex Rider",email:"alex@streetrevolution.com",phone:"+1 (555) 014-9090",memberSince:"2023",avatarInitials:"AR"},j=[{id:"#SR-1049",date:"Feb 18, 2026",status:"Processing",total:"₹248.00",items:"Apex Carbon Tee, Neon Utility Cap"},{id:"#SR-1038",date:"Jan 29, 2026",status:"Completed",total:"₹119.00",items:"Revolution Hoodie"},{id:"#SR-1017",date:"Dec 14, 2025",status:"Completed",total:"₹312.50",items:"Night Run Jacket, Cargo Tech Pants"},{id:"#SR-0994",date:"Nov 03, 2025",status:"Pending",total:"₹88.00",items:"Chrome Logo Longsleeve"}],v={billing:{name:"Alex Rider",line1:"188 Neon District Ave",line2:"Unit 06",city:"Los Angeles",state:"CA",postcode:"90015",country:"United States"},shipping:{name:"Alex Rider",line1:"44 Cyan Boulevard",line2:"Suite 12",city:"Brooklyn",state:"NY",postcode:"11201",country:"United States"}};function f({customer:e,orders:i,addresses:r}){let{user:n,logout:o,updateUser:h}=(0,a.useAuth)(),N=e||n||b,y=N?.email?.toLowerCase()==="alex@streetrevolution.com",w=(0,t.useMemo)(()=>i||(y?j:[]),[i,y]),k=(0,t.useMemo)(()=>r||(y?v:{billing:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""},shipping:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""}}),[r,y]),[C,S]=(0,t.useState)("dashboard"),[A,F]=(0,t.useState)(!1),[L,M]=(0,t.useState)(!1),P=(0,t.useMemo)(()=>g.find(e=>e.id===C)?.label||"Dashboard",[C]);return(0,s.jsxs)("div",{className:"sr-page",children:[(0,s.jsx)("div",{className:`overlay ${L?"show":""}`,onClick:()=>M(!1)}),(0,s.jsxs)("div",{className:`account-shell ${A?"is-collapsed":""}`,children:[(0,s.jsx)(l,{active:C,setActive:S,collapsed:A,setCollapsed:F,mobileOpen:L,setMobileOpen:M,navItems:g,icons:x}),(0,s.jsxs)("main",{className:"main",children:[(0,s.jsx)(d,{customer:N,activeLabel:P,setMobileOpen:M,onLogout:o,icons:x}),"dashboard"===C&&(0,s.jsx)(c,{customer:N,orders:w,icons:x}),"orders"===C&&(0,s.jsx)(u,{orders:w,icons:x}),"addresses"===C&&(0,s.jsx)(p,{addresses:k}),"account"===C&&(0,s.jsx)(m,{customer:N,onUpdate:h})]})]})]})}e.s(["default",0,function(){let{user:e,isLoading:t}=(0,a.useAuth)();return t?(0,s.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6",children:[(0,s.jsx)("div",{className:"w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin"}),(0,s.jsx)("span",{className:"orbitron uppercase tracking-widest text-xs text-cyan-400",children:"Synchronizing Console..."})]}):e?(0,s.jsx)(f,{}):(0,s.jsx)(r,{})}],19172)}]);