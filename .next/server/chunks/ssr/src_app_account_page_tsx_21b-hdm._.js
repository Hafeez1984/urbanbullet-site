module.exports=[93818,a=>{"use strict";var b=a.i(87924),c=a.i(56025),d=a.i(72131),e=a.i(20735),f=a.i(75003);let g=()=>{let{login:a,signup:g}=(0,c.useAuth)(),{showNotification:h}=(0,e.useNotification)(),i="true"===process.env.NEXT_PUBLIC_STATIC_EXPORT,[j,k]=(0,d.useState)("signin"),[l,m]=(0,d.useState)(""),[n,o]=(0,d.useState)(""),[p,q]=(0,d.useState)(""),[r,s]=(0,d.useState)(""),[t,u]=(0,d.useState)(""),[v,w]=(0,d.useState)(!1),[x,y]=(0,d.useState)(""),z=async b=>{if(b.preventDefault(),!l||!n)return void y("Please fill in all fields.");y(""),w(!0);try{let b=await a(l,n);b.success?h("Signed in successfully!"):y(b.error||"Authentication failed.")}catch(a){y("An unexpected error occurred.")}finally{w(!1)}},A=async a=>{if(a.preventDefault(),!l||!n||!r||!t)return void y("Please fill in all fields.");if(n!==p)return void y("Passwords do not match.");if(n.length<6)return void y("Password must be at least 6 characters.");y(""),w(!0);try{let a=await g(l,n,r,t);a.success?h("Account created successfully!"):y(a.error||"Registration failed.")}catch(a){y("An unexpected error occurred.")}finally{w(!1)}},B=async()=>{w(!0),y("");try{if(i){await new Promise(a=>setTimeout(a,800));let a={firstName:"Google",lastName:"User",displayName:"Google User",email:"google.user@example.com",memberSince:new Date().getFullYear().toString(),avatarInitials:"GU"};localStorage.setItem("ub_user",JSON.stringify(a)),h("Signed in with Google (Simulated)!"),window.location.reload();return}await (0,f.signIn)("google",{callbackUrl:"/account"})}catch(a){y("An unexpected error occurred during Google Sign-In.")}finally{w(!1)}};return(0,b.jsxs)("div",{className:"auth-gate-page",children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:`
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
      `}}),(0,b.jsxs)("div",{className:"auth-card",children:[(0,b.jsxs)("div",{className:"auth-brand",children:[(0,b.jsx)("div",{className:"auth-logo-mark",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,b.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"auth-title",children:"Street Revolution"}),(0,b.jsx)("p",{className:"auth-subtitle",children:"Console Gateway"})]})]}),(0,b.jsxs)("div",{className:"auth-tabs",children:[(0,b.jsx)("button",{type:"button",className:`auth-tab-btn ${"signin"===j?"active":""}`,onClick:()=>{k("signin"),y("")},children:"Sign In"}),(0,b.jsx)("button",{type:"button",className:`auth-tab-btn ${"signup"===j?"active":""}`,onClick:()=>{k("signup"),y("")},children:"Sign Up"})]}),(0,b.jsx)("div",{className:"google-signin-container",children:(0,b.jsxs)("button",{type:"button",onClick:B,className:"google-btn",children:[(0,b.jsxs)("svg",{viewBox:"0 0 48 48",className:"google-icon",width:"20",height:"20","aria-hidden":"true",children:[(0,b.jsx)("path",{fill:"#EA4335",d:"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"}),(0,b.jsx)("path",{fill:"#4285F4",d:"M46.5 24c0-1.65-.15-3.22-.42-4.75H24v9h12.75c-.55 2.86-2.17 5.29-4.6 6.92l7.15 5.54C43.5 36.58 46.5 30.86 46.5 24z"}),(0,b.jsx)("path",{fill:"#FBBC05",d:"M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"}),(0,b.jsx)("path",{fill:"#34A853",d:"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.15-5.54c-2.2 1.47-5.02 2.35-8.74 2.35-6.26 0-11.57-4.22-13.46-10.19l-7.98 6.19C6.51 42.62 14.62 48 24 48z"})]}),(0,b.jsx)("span",{children:"Sign in with Google"})]})}),(0,b.jsx)("div",{className:"auth-divider",children:"or"}),x&&(0,b.jsx)("div",{className:"auth-error",children:x}),"signin"===j?(0,b.jsxs)("form",{className:"auth-form",onSubmit:z,children:[(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-email",children:"Email Address"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-email",type:"email",placeholder:"e.g. alex@streetrevolution.com",value:l,onChange:a=>m(a.target.value),disabled:v,required:!0})]}),(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-password",children:"Password"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-password",type:"password",placeholder:"Enter password",value:n,onChange:a=>o(a.target.value),disabled:v,required:!0})]}),(0,b.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"spinner"}),(0,b.jsx)("span",{children:"Syncing..."})]}):(0,b.jsx)("span",{children:"Access Console"})})]}):(0,b.jsxs)("form",{className:"auth-form",onSubmit:A,children:[(0,b.jsxs)("div",{className:"auth-field-row",children:[(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-first-name",children:"First Name"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-first-name",type:"text",placeholder:"Alex",value:r,onChange:a=>s(a.target.value),disabled:v,required:!0})]}),(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-last-name",children:"Last Name"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-last-name",type:"text",placeholder:"Rider",value:t,onChange:a=>u(a.target.value),disabled:v,required:!0})]})]}),(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-email",children:"Email Address"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-signup-email",type:"email",placeholder:"e.g. pilot@streetrevolution.com",value:l,onChange:a=>m(a.target.value),disabled:v,required:!0})]}),(0,b.jsxs)("div",{className:"auth-field-row",children:[(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-pass",children:"Password"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-signup-pass",type:"password",placeholder:"Min 6 chars",value:n,onChange:a=>o(a.target.value),disabled:v,required:!0})]}),(0,b.jsxs)("div",{className:"auth-field",children:[(0,b.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-confirm",children:"Confirm"}),(0,b.jsx)("input",{className:"auth-input",id:"auth-signup-confirm",type:"password",placeholder:"Match password",value:p,onChange:a=>q(a.target.value),disabled:v,required:!0})]})]}),(0,b.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:v,children:v?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"spinner"}),(0,b.jsx)("span",{children:"Initializing..."})]}):(0,b.jsx)("span",{children:"Register Signal"})})]}),(0,b.jsx)("div",{className:"auth-helper-note",children:"signin"===j?(0,b.jsxs)(b.Fragment,{children:["Testing credentials available: Use ",(0,b.jsx)("strong",{onClick:()=>{m("alex@streetrevolution.com"),o("any-password")},children:"alex@streetrevolution.com"})," (click to autofill)."]}):(0,b.jsxs)(b.Fragment,{children:["Already registered? Switch tab to ",(0,b.jsx)("strong",{onClick:()=>k("signin"),children:"Sign In"}),"."]})})]})]})};var h=a.i(38246);function i({active:a,setActive:c,collapsed:d,setCollapsed:e,mobileOpen:f,setMobileOpen:g,navItems:j,icons:k}){return(0,b.jsxs)("aside",{className:`sidebar ${f?"mobile-open":""}`,"aria-label":"Account navigation",children:[(0,b.jsxs)("div",{className:"brand-row",children:[(0,b.jsxs)(h.default,{href:"/",className:"brand hover:opacity-90 transition",children:[(0,b.jsx)("div",{className:"brand-mark",children:k.bolt}),(0,b.jsxs)("div",{className:"brand-copy",children:[(0,b.jsxs)("h1",{className:"brand-title",children:["Street",(0,b.jsx)("br",{}),"Revolution"]}),(0,b.jsx)("p",{className:"brand-subtitle",children:"My Account"})]})]}),(0,b.jsx)("button",{className:"icon-button desktop-collapse",type:"button",onClick:()=>e(!d),"aria-label":"Toggle sidebar",children:k.collapse}),(0,b.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>g(!1),"aria-label":"Close menu",children:k.close})]}),(0,b.jsx)("nav",{children:(0,b.jsx)("ul",{className:"nav-list",children:j.map(d=>(0,b.jsx)("li",{children:(0,b.jsxs)("button",{type:"button",className:`nav-button ${a===d.id?"active":""}`,onClick:()=>{c(d.id),g(!1)},"aria-current":a===d.id?"page":void 0,children:[d.icon,(0,b.jsx)("span",{className:"nav-label",children:d.label})]})},d.id))})}),(0,b.jsx)("div",{className:"sidebar-footer",children:(0,b.jsxs)("div",{className:"sidebar-footer-content",children:[(0,b.jsx)("strong",{children:"Revolution Status"}),(0,b.jsx)("p",{children:"Members receive early access to limited drops, private restocks, and street-coded rewards."})]})})]})}function j({customer:a,activeLabel:c,setMobileOpen:d,onLogout:e,icons:f}){return(0,b.jsxs)("header",{className:"topbar",children:[(0,b.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>d(!0),"aria-label":"Open menu",children:f.menu}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"eyebrow",children:"Account Console"}),(0,b.jsxs)("h2",{className:"page-title",children:["Account Details"===c?"Account":c," ",(0,b.jsx)("span",{className:"gradient-text",children:"Hub"})]})]}),(0,b.jsxs)("div",{className:"topbar-actions",children:[(0,b.jsxs)("div",{className:"user-chip",children:[(0,b.jsx)("div",{className:"avatar",children:a.avatarInitials||"AR"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:a.displayName||`${a.firstName} ${a.lastName}`}),(0,b.jsx)("span",{children:a.email})]})]}),(0,b.jsx)(h.default,{href:"/",className:"btn btn-primary",children:"Shop New Drop"}),(0,b.jsx)("button",{className:"btn btn-danger",type:"button",onClick:e,children:"Sign Out"})]})]})}function k({status:a}){let c=`status-pill status-${a.toLowerCase()}`;return(0,b.jsx)("span",{className:c,children:a})}function l({customer:a,orders:c,icons:f}){let{showNotification:g}=(0,e.useNotification)(),h=d.default.useMemo(()=>{let a=c.reduce((a,b)=>{let c=parseFloat(b.total.replace(/[^0-9.]/g,""));return a+(isNaN(c)?0:c)},0);return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(a)},[c]),i=c[0]||{status:"N/A"};return(0,b.jsxs)("div",{className:"content-grid",children:[(0,b.jsxs)("div",{className:"card stat-card span-3",children:[(0,b.jsx)("div",{className:"stat-icon",children:f.orders}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"stat-value",children:c.length}),(0,b.jsx)("p",{className:"stat-label",children:"Total Orders"})]})]}),(0,b.jsxs)("div",{className:"card stat-card span-3",children:[(0,b.jsx)("div",{className:"stat-icon purple",children:f.card}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"stat-value",children:h}),(0,b.jsx)("p",{className:"stat-label",children:"Lifetime Spend"})]})]}),(0,b.jsxs)("div",{className:"card stat-card span-3",children:[(0,b.jsx)("div",{className:"stat-icon",children:f.spark}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"stat-value",children:"VIP"}),(0,b.jsx)("p",{className:"stat-label",children:"Member Tier"})]})]}),(0,b.jsxs)("div",{className:"card stat-card span-3",children:[(0,b.jsx)("div",{className:"stat-icon purple",children:f.package}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"stat-value",children:i.status}),(0,b.jsx)("p",{className:"stat-label",children:"Latest Order"})]})]}),(0,b.jsxs)("section",{className:"card card-padding span-7",children:[(0,b.jsx)("div",{className:"section-head",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"section-title",children:"Recent Activity"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Your latest order and profile events."})]})}),(0,b.jsx)("ul",{className:"activity-list",children:c.slice(0,3).map(a=>(0,b.jsxs)("li",{className:"activity-item",children:[(0,b.jsx)("div",{className:"activity-dot",children:f.package}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("strong",{children:[a.id," — ",a.items]}),(0,b.jsxs)("span",{children:[a.date," · ",a.total]})]}),(0,b.jsx)(k,{status:a.status})]},a.id))})]}),(0,b.jsxs)("section",{className:"card card-padding span-5",children:[(0,b.jsx)("div",{className:"section-head",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"section-title",children:"Profile Signal"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Keep your account details current for faster checkout and exclusive access."})]})}),(0,b.jsxs)("div",{className:"notice",children:[f.info,(0,b.jsxs)("div",{children:[(0,b.jsxs)("strong",{children:["Member since ",a.memberSince||"2023"]}),(0,b.jsx)("br",{}),"Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first."]})]}),(0,b.jsx)("div",{style:{height:16}}),(0,b.jsx)("button",{className:"btn btn-primary",type:"button",style:{width:"100%"},onClick:()=>g("SMS alert registration system initialized."),children:"Enable Drop Alerts"})]})]})}function m({status:a}){let c=`status-pill status-${a.toLowerCase()}`;return(0,b.jsx)("span",{className:c,children:a})}function n({orders:a,icons:c}){let{showNotification:d}=(0,e.useNotification)();return(0,b.jsxs)("section",{className:"card card-padding",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"section-title",children:"Order History"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Minimal, high-contrast order history details."})]}),(0,b.jsx)("button",{className:"btn",type:"button",onClick:()=>{d("Preparing CSV export of transaction logs...")},children:"Download CSV"})]}),a.length?(0,b.jsx)("div",{className:"table-wrap",children:(0,b.jsxs)("table",{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Order"}),(0,b.jsx)("th",{children:"Date"}),(0,b.jsx)("th",{children:"Status"}),(0,b.jsx)("th",{children:"Items"}),(0,b.jsx)("th",{children:"Total"}),(0,b.jsx)("th",{children:"Action"})]})}),(0,b.jsx)("tbody",{children:a.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"order-id",children:a.id})}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)(m,{status:a.status})}),(0,b.jsx)("td",{children:a.items}),(0,b.jsx)("td",{children:a.total}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{className:"link-action",type:"button",onClick:()=>d(`Tracking status for order ${a.id}`),children:"Track"})})]},a.id))})]})}):(0,b.jsxs)("div",{className:"empty-state",children:[(0,b.jsx)("div",{className:"empty-icon",children:c.orders}),(0,b.jsx)("h3",{children:"No orders yet"}),(0,b.jsx)("p",{children:"Your order history will appear here after your first checkout."}),(0,b.jsx)("button",{className:"btn btn-primary",type:"button",children:"Start Shopping"})]})]})}function o({addresses:a,onUpdateAddresses:c}){let{showNotification:f}=(0,e.useNotification)(),[g,h]=(0,d.useState)(a),[i,j]=(0,d.useState)(null),[k,l]=(0,d.useState)({name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""});return(0,b.jsxs)("div",{className:"content-grid",children:[(0,b.jsxs)("section",{className:"card card-padding span-12",children:[(0,b.jsx)("div",{className:"section-head",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"section-title",children:"Saved Addresses"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Use these cards to manage billing and shipping destinations."})]})}),(0,b.jsx)("div",{className:"address-grid",children:Object.keys(g).map(a=>{let c=g[a];return(0,b.jsxs)("div",{className:"address-card",children:[(0,b.jsxs)("div",{className:"address-card-header",children:[(0,b.jsxs)("h4",{className:"address-type",children:[a," Address"]}),(0,b.jsx)("button",{className:"link-action",type:"button",onClick:()=>{j(a),l(g[a])},children:"Edit"})]}),c.line1?(0,b.jsxs)("address",{children:[(0,b.jsx)("strong",{style:{color:"var(--text)"},children:c.name}),(0,b.jsx)("br",{}),c.line1,(0,b.jsx)("br",{}),c.line2&&(0,b.jsxs)(b.Fragment,{children:[c.line2,(0,b.jsx)("br",{})]}),c.city,", ",c.state," ",c.postcode,(0,b.jsx)("br",{}),c.country]}):(0,b.jsx)("div",{className:"empty-address-placeholder",style:{padding:"12px 0",color:"var(--muted)",fontSize:"0.85rem",fontStyle:"italic"},children:"No address registered. Click Edit to configure."})]},a)})})]}),i&&(0,b.jsxs)("section",{className:"card card-padding span-12",children:[(0,b.jsx)("div",{className:"section-head",children:(0,b.jsxs)("div",{children:[(0,b.jsxs)("h3",{className:"section-title",children:["Update ",i.charAt(0).toUpperCase()+i.slice(1)," Address"]}),(0,b.jsx)("p",{className:"section-subtitle",children:"Configure your shipping coordinates for rapid drops delivery."})]})}),(0,b.jsxs)("form",{className:"form-grid",onSubmit:a=>{if(a.preventDefault(),!i)return;let b={...g,[i]:k};h(b),c&&c(b),f(`${i.charAt(0).toUpperCase()+i.slice(1)} address updated successfully.`),j(null)},children:[(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"fullName",children:"Full Name"}),(0,b.jsx)("input",{className:"input",id:"fullName",value:k.name,onChange:a=>l({...k,name:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"country",children:"Country"}),(0,b.jsx)("input",{className:"input",id:"country",value:k.country,onChange:a=>l({...k,country:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field full",children:[(0,b.jsx)("label",{htmlFor:"street",children:"Street Address"}),(0,b.jsx)("input",{className:"input",id:"street",value:k.line1,onChange:a=>l({...k,line1:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field full",children:[(0,b.jsx)("label",{htmlFor:"suite",children:"Apartment, suite, unit, etc. (optional)"}),(0,b.jsx)("input",{className:"input",id:"suite",value:k.line2,onChange:a=>l({...k,line2:a.target.value})})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"city",children:"City"}),(0,b.jsx)("input",{className:"input",id:"city",value:k.city,onChange:a=>l({...k,city:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"state",children:"State / Province"}),(0,b.jsx)("input",{className:"input",id:"state",value:k.state,onChange:a=>l({...k,state:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field full",children:[(0,b.jsx)("label",{htmlFor:"postcode",children:"Postcode / Zip"}),(0,b.jsx)("input",{className:"input",id:"postcode",value:k.postcode,onChange:a=>l({...k,postcode:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field full flex gap-3",children:[(0,b.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Save Address"}),(0,b.jsx)("button",{className:"btn",type:"button",onClick:()=>j(null),children:"Cancel"})]})]})]})]})}function p({customer:a,onUpdate:c}){let{showNotification:f}=(0,e.useNotification)(),[g,h]=(0,d.useState)({firstName:a.firstName||"",lastName:a.lastName||"",displayName:a.displayName||"",email:a.email||"",phone:a.phone||"",currentPassword:"",newPassword:"",confirmPassword:"",notes:""});return(0,b.jsxs)("section",{className:"card card-padding",children:[(0,b.jsx)("div",{className:"section-head",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"section-title",children:"Account Details"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Profile fields for identity validation and preferences."})]})}),(0,b.jsxs)("form",{className:"form-grid",onSubmit:a=>{(a.preventDefault(),g.newPassword&&g.newPassword!==g.confirmPassword)?f("New passwords do not match."):(c({firstName:g.firstName,lastName:g.lastName,displayName:g.displayName,email:g.email,phone:g.phone}),f("Account details updated successfully."))},children:[(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"accountFirstName",children:"First Name"}),(0,b.jsx)("input",{className:"input",id:"accountFirstName",value:g.firstName,onChange:a=>h({...g,firstName:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"accountLastName",children:"Last Name"}),(0,b.jsx)("input",{className:"input",id:"accountLastName",value:g.lastName,onChange:a=>h({...g,lastName:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"displayName",children:"Display Name"}),(0,b.jsx)("input",{className:"input",id:"displayName",value:g.displayName,onChange:a=>h({...g,displayName:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"phone",children:"Phone"}),(0,b.jsx)("input",{className:"input",id:"phone",value:g.phone,onChange:a=>h({...g,phone:a.target.value})})]}),(0,b.jsxs)("div",{className:"field full",children:[(0,b.jsx)("label",{htmlFor:"email",children:"Email Address"}),(0,b.jsx)("input",{className:"input",id:"email",type:"email",value:g.email,onChange:a=>h({...g,email:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"password",children:"New Password"}),(0,b.jsx)("input",{className:"input",id:"password",type:"password",placeholder:"••••••••••••",value:g.newPassword,onChange:a=>h({...g,newPassword:a.target.value})})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm Password"}),(0,b.jsx)("input",{className:"input",id:"confirmPassword",type:"password",placeholder:"••••••••••••",value:g.confirmPassword,onChange:a=>h({...g,confirmPassword:a.target.value})})]}),(0,b.jsxs)("div",{className:"field full",children:[(0,b.jsx)("label",{htmlFor:"notes",children:"Style Preferences"}),(0,b.jsx)("textarea",{className:"textarea",id:"notes",placeholder:"Tell us your fit, size, and drop preferences...",value:g.notes,onChange:a=>h({...g,notes:a.target.value})})]}),(0,b.jsx)("div",{className:"field full",children:(0,b.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Update Account"})})]})]})}let q={dashboard:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,b.jsx)("path",{d:"M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),orders:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,b.jsx)("path",{d:"M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"}),(0,b.jsx)("path",{d:"M9 12h6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),addresses:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,b.jsx)("path",{d:"M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,b.jsx)("path",{d:"M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",stroke:"currentColor",strokeWidth:"1.8"})]}),account:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,b.jsx)("path",{d:"M20 21a8 8 0 1 0-16 0",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z",stroke:"currentColor",strokeWidth:"1.8"})]}),bolt:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"26",height:"26",children:(0,b.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),menu:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,b.jsx)("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),collapse:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,b.jsx)("path",{d:"M15 6 9 12l6 6",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round"})}),close:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,b.jsx)("path",{d:"m6 6 12 12M18 6 6 18",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),card:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,b.jsx)("path",{d:"M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M7 15h4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),package:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,b.jsx)("path",{d:"m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,b.jsx)("path",{d:"m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),spark:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,b.jsx)("path",{d:"M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})}),info:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:[(0,b.jsx)("path",{d:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",stroke:"currentColor",strokeWidth:"1.8"}),(0,b.jsx)("path",{d:"M12 10.5V17M12 7.2v.1",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round"})]})},r=[{id:"dashboard",label:"Dashboard",icon:q.dashboard},{id:"orders",label:"Orders",icon:q.orders},{id:"addresses",label:"Addresses",icon:q.addresses},{id:"account",label:"Account Details",icon:q.account}],s={firstName:"Alex",lastName:"Rider",displayName:"Alex Rider",email:"alex@streetrevolution.com",phone:"+1 (555) 014-9090",memberSince:"2023",avatarInitials:"AR"},t=[{id:"#SR-1049",date:"Feb 18, 2026",status:"Processing",total:"₹248.00",items:"Apex Carbon Tee, Neon Utility Cap"},{id:"#SR-1038",date:"Jan 29, 2026",status:"Completed",total:"₹119.00",items:"Revolution Hoodie"},{id:"#SR-1017",date:"Dec 14, 2025",status:"Completed",total:"₹312.50",items:"Night Run Jacket, Cargo Tech Pants"},{id:"#SR-0994",date:"Nov 03, 2025",status:"Pending",total:"₹88.00",items:"Chrome Logo Longsleeve"}],u={billing:{name:"Alex Rider",line1:"188 Neon District Ave",line2:"Unit 06",city:"Los Angeles",state:"CA",postcode:"90015",country:"United States"},shipping:{name:"Alex Rider",line1:"44 Cyan Boulevard",line2:"Suite 12",city:"Brooklyn",state:"NY",postcode:"11201",country:"United States"}};function v({customer:a,orders:e,addresses:f}){let{user:g,logout:h,updateUser:k}=(0,c.useAuth)(),m=a||g||s,w=m?.email?.toLowerCase()==="alex@streetrevolution.com",x=(0,d.useMemo)(()=>e||(w?t:[]),[e,w]),y=(0,d.useMemo)(()=>f||(w?u:{billing:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""},shipping:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""}}),[f,w]),[z,A]=(0,d.useState)("dashboard"),[B,C]=(0,d.useState)(!1),[D,E]=(0,d.useState)(!1),F=(0,d.useMemo)(()=>r.find(a=>a.id===z)?.label||"Dashboard",[z]);return(0,b.jsxs)("div",{className:"sr-page",children:[(0,b.jsx)("div",{className:`overlay ${D?"show":""}`,onClick:()=>E(!1)}),(0,b.jsxs)("div",{className:`account-shell ${B?"is-collapsed":""}`,children:[(0,b.jsx)(i,{active:z,setActive:A,collapsed:B,setCollapsed:C,mobileOpen:D,setMobileOpen:E,navItems:r,icons:q}),(0,b.jsxs)("main",{className:"main",children:[(0,b.jsx)(j,{customer:m,activeLabel:F,setMobileOpen:E,onLogout:h,icons:q}),"dashboard"===z&&(0,b.jsx)(l,{customer:m,orders:x,icons:q}),"orders"===z&&(0,b.jsx)(n,{orders:x,icons:q}),"addresses"===z&&(0,b.jsx)(o,{addresses:y}),"account"===z&&(0,b.jsx)(p,{customer:m,onUpdate:k})]})]})]})}a.s(["default",0,function(){let{user:a,isLoading:d}=(0,c.useAuth)();return d?(0,b.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6",children:[(0,b.jsx)("div",{className:"w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin"}),(0,b.jsx)("span",{className:"orbitron uppercase tracking-widest text-xs text-cyan-400",children:"Synchronizing Console..."})]}):a?(0,b.jsx)(v,{}):(0,b.jsx)(g,{})}],93818)}];

//# sourceMappingURL=src_app_account_page_tsx_21b-hdm._.js.map