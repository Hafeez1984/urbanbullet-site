(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18581,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"useMergedRef",{enumerable:!0,get:function(){return r}});let s=e.r(71645);function r(e,t){let a=(0,s.useRef)(null),r=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=a.current;e&&(a.current=null,e());let t=r.current;t&&(r.current=null,t())}else e&&(a.current=i(e,s)),t&&(r.current=i(t,s))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let a=e(t);return"function"==typeof a?a:()=>e(null)}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},84508,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"errorOnce",{enumerable:!0,get:function(){return s}});let s=e=>{}},22016,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={default:function(){return b},useLinkStatus:function(){return j}};for(var r in s)Object.defineProperty(a,r,{enumerable:!0,get:s[r]});let i=e.r(90809),n=e.r(43476),l=i._(e.r(71645)),o=e.r(95057),d=e.r(8372),c=e.r(18581),u=e.r(18967),h=e.r(5550);e.r(33525);let p=e.r(88540),m=e.r(91949),x=e.r(73668),g=e.r(9396);function b(t){var a,s;let r,i,b,[j,v]=(0,l.useOptimistic)(m.IDLE_LINK_STATUS),N=(0,l.useRef)(null),{href:y,as:w,children:k,prefetch:C=null,passHref:S,replace:A,shallow:M,scroll:P,onClick:L,onMouseEnter:F,onTouchStart:R,legacyBehavior:T=!1,onNavigate:O,transitionTypes:_,ref:I,unstable_dynamicOnHover:B,...E}=t;r=k,T&&("string"==typeof r||"number"==typeof r)&&(r=(0,n.jsx)("a",{children:r}));let U=l.default.useContext(d.AppRouterContext),D=!1!==C,z=!1!==C?null===(s=C)||"auto"===s?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,W="string"==typeof(a=w||y)?a:(0,o.formatUrl)(a);if(T){if(r?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(r)}let q=T?i&&"object"==typeof i&&i.ref:I,Z=l.default.useCallback(e=>(null!==U&&(N.current=(0,m.mountLinkInstance)(e,W,U,z,D,v)),()=>{N.current&&((0,m.unmountLinkForCurrentNavigation)(N.current),N.current=null),(0,m.unmountPrefetchableInstance)(e)}),[D,W,U,z,v]),$={ref:(0,c.useMergedRef)(Z,q),onClick(t){T||"function"!=typeof L||L(t),T&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!U||t.defaultPrevented||function(t,a,s,r,i,n,o){if("u">typeof window){let d,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,x.isLocalURL)(a)){r&&(t.preventDefault(),location.replace(a));return}if(t.preventDefault(),n){let e=!1;if(n({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(99781);l.default.startTransition(()=>{u(a,r?"replace":"push",!1===i?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,s.current,o)})}}(t,W,N,A,P,O,_)},onMouseEnter(e){T||"function"!=typeof F||F(e),T&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),U&&D&&(0,m.onNavigationIntent)(e.currentTarget,!0===B)},onTouchStart:function(e){T||"function"!=typeof R||R(e),T&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),U&&D&&(0,m.onNavigationIntent)(e.currentTarget,!0===B)}};return(0,u.isAbsoluteUrl)(W)?$.href=W:T&&!S&&("a"!==i.type||"href"in i.props)||($.href=(0,h.addBasePath)(W)),b=T?l.default.cloneElement(i,$):(0,n.jsx)("a",{...E,...$,children:r}),(0,n.jsx)(f.Provider,{value:j,children:b})}e.r(84508);let f=(0,l.createContext)(m.IDLE_LINK_STATUS),j=()=>(0,l.useContext)(f);("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},19172,e=>{"use strict";var t=e.i(43476),a=e.i(32341),s=e.i(47167),r=e.i(71645),i=e.i(41402),n=e.i(17255);let l=()=>{let{login:e,signup:l}=(0,a.useAuth)(),{showNotification:o}=(0,i.useNotification)(),d="true"===s.default.env.NEXT_PUBLIC_STATIC_EXPORT,[c,u]=(0,r.useState)("signin"),[h,p]=(0,r.useState)(""),[m,x]=(0,r.useState)(""),[g,b]=(0,r.useState)(""),[f,j]=(0,r.useState)(""),[v,N]=(0,r.useState)(""),[y,w]=(0,r.useState)(!1),[k,C]=(0,r.useState)(""),S=async t=>{if(t.preventDefault(),!h||!m)return void C("Please fill in all fields.");C(""),w(!0);try{let t=await e(h,m);t.success?o("Signed in successfully!"):C(t.error||"Authentication failed.")}catch(e){C("An unexpected error occurred.")}finally{w(!1)}},A=async e=>{if(e.preventDefault(),!h||!m||!f||!v)return void C("Please fill in all fields.");if(m!==g)return void C("Passwords do not match.");if(m.length<6)return void C("Password must be at least 6 characters.");C(""),w(!0);try{let e=await l(h,m,f,v);e.success?o("Account created successfully!"):C(e.error||"Registration failed.")}catch(e){C("An unexpected error occurred.")}finally{w(!1)}},M=async()=>{w(!0),C("");try{if(d){await new Promise(e=>setTimeout(e,800));let e={firstName:"Google",lastName:"User",displayName:"Google User",email:"google.user@example.com",memberSince:new Date().getFullYear().toString(),avatarInitials:"GU"};localStorage.setItem("ub_user",JSON.stringify(e)),o("Signed in with Google (Simulated)!"),window.location.reload();return}await (0,n.signIn)("google",{callbackUrl:"/account"})}catch(e){C("An unexpected error occurred during Google Sign-In.")}finally{w(!1)}};return(0,t.jsxs)("div",{className:"auth-gate-page",children:[(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:`
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
      `}}),(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-brand",children:[(0,t.jsx)("div",{className:"auth-logo-mark",children:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"auth-title",children:"Street Revolution"}),(0,t.jsx)("p",{className:"auth-subtitle",children:"Console Gateway"})]})]}),(0,t.jsxs)("div",{className:"auth-tabs",children:[(0,t.jsx)("button",{type:"button",className:`auth-tab-btn ${"signin"===c?"active":""}`,onClick:()=>{u("signin"),C("")},children:"Sign In"}),(0,t.jsx)("button",{type:"button",className:`auth-tab-btn ${"signup"===c?"active":""}`,onClick:()=>{u("signup"),C("")},children:"Sign Up"})]}),(0,t.jsx)("div",{className:"google-signin-container",children:(0,t.jsxs)("button",{type:"button",onClick:M,className:"google-btn",children:[(0,t.jsxs)("svg",{viewBox:"0 0 48 48",className:"google-icon",width:"20",height:"20","aria-hidden":"true",children:[(0,t.jsx)("path",{fill:"#EA4335",d:"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"}),(0,t.jsx)("path",{fill:"#4285F4",d:"M46.5 24c0-1.65-.15-3.22-.42-4.75H24v9h12.75c-.55 2.86-2.17 5.29-4.6 6.92l7.15 5.54C43.5 36.58 46.5 30.86 46.5 24z"}),(0,t.jsx)("path",{fill:"#FBBC05",d:"M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"}),(0,t.jsx)("path",{fill:"#34A853",d:"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.15-5.54c-2.2 1.47-5.02 2.35-8.74 2.35-6.26 0-11.57-4.22-13.46-10.19l-7.98 6.19C6.51 42.62 14.62 48 24 48z"})]}),(0,t.jsx)("span",{children:"Sign in with Google"})]})}),(0,t.jsx)("div",{className:"auth-divider",children:"or"}),k&&(0,t.jsx)("div",{className:"auth-error",children:k}),"signin"===c?(0,t.jsxs)("form",{className:"auth-form",onSubmit:S,children:[(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-email",children:"Email Address"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-email",type:"email",placeholder:"e.g. alex@streetrevolution.com",value:h,onChange:e=>p(e.target.value),disabled:y,required:!0})]}),(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-password",children:"Password"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-password",type:"password",placeholder:"Enter password",value:m,onChange:e=>x(e.target.value),disabled:y,required:!0})]}),(0,t.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:y,children:y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"spinner"}),(0,t.jsx)("span",{children:"Syncing..."})]}):(0,t.jsx)("span",{children:"Access Console"})})]}):(0,t.jsxs)("form",{className:"auth-form",onSubmit:A,children:[(0,t.jsxs)("div",{className:"auth-field-row",children:[(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-first-name",children:"First Name"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-first-name",type:"text",placeholder:"Alex",value:f,onChange:e=>j(e.target.value),disabled:y,required:!0})]}),(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-last-name",children:"Last Name"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-last-name",type:"text",placeholder:"Rider",value:v,onChange:e=>N(e.target.value),disabled:y,required:!0})]})]}),(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-email",children:"Email Address"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-signup-email",type:"email",placeholder:"e.g. pilot@streetrevolution.com",value:h,onChange:e=>p(e.target.value),disabled:y,required:!0})]}),(0,t.jsxs)("div",{className:"auth-field-row",children:[(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-pass",children:"Password"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-signup-pass",type:"password",placeholder:"Min 6 chars",value:m,onChange:e=>x(e.target.value),disabled:y,required:!0})]}),(0,t.jsxs)("div",{className:"auth-field",children:[(0,t.jsx)("label",{className:"auth-label",htmlFor:"auth-signup-confirm",children:"Confirm"}),(0,t.jsx)("input",{className:"auth-input",id:"auth-signup-confirm",type:"password",placeholder:"Match password",value:g,onChange:e=>b(e.target.value),disabled:y,required:!0})]})]}),(0,t.jsx)("button",{className:"auth-submit-btn",type:"submit",disabled:y,children:y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"spinner"}),(0,t.jsx)("span",{children:"Initializing..."})]}):(0,t.jsx)("span",{children:"Register Signal"})})]}),(0,t.jsx)("div",{className:"auth-helper-note",children:"signin"===c?(0,t.jsxs)(t.Fragment,{children:["Testing credentials available: Use ",(0,t.jsx)("strong",{onClick:()=>{p("alex@streetrevolution.com"),x("any-password")},children:"alex@streetrevolution.com"})," (click to autofill)."]}):(0,t.jsxs)(t.Fragment,{children:["Already registered? Switch tab to ",(0,t.jsx)("strong",{onClick:()=>u("signin"),children:"Sign In"}),"."]})})]})]})};var o=e.i(22016);function d({active:e,setActive:a,collapsed:s,setCollapsed:r,mobileOpen:i,setMobileOpen:n,navItems:l,icons:c}){return(0,t.jsxs)("aside",{className:`sidebar ${i?"mobile-open":""}`,"aria-label":"Account navigation",children:[(0,t.jsxs)("div",{className:"brand-row",children:[(0,t.jsxs)(o.default,{href:"/",className:"brand hover:opacity-90 transition",children:[(0,t.jsx)("div",{className:"brand-mark",children:c.bolt}),(0,t.jsxs)("div",{className:"brand-copy",children:[(0,t.jsxs)("h1",{className:"brand-title",children:["Street",(0,t.jsx)("br",{}),"Revolution"]}),(0,t.jsx)("p",{className:"brand-subtitle",children:"My Account"})]})]}),(0,t.jsx)("button",{className:"icon-button desktop-collapse",type:"button",onClick:()=>r(!s),"aria-label":"Toggle sidebar",children:c.collapse}),(0,t.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>n(!1),"aria-label":"Close menu",children:c.close})]}),(0,t.jsx)("nav",{children:(0,t.jsx)("ul",{className:"nav-list",children:l.map(s=>(0,t.jsx)("li",{children:(0,t.jsxs)("button",{type:"button",className:`nav-button ${e===s.id?"active":""}`,onClick:()=>{a(s.id),n(!1)},"aria-current":e===s.id?"page":void 0,children:[s.icon,(0,t.jsx)("span",{className:"nav-label",children:s.label})]})},s.id))})}),(0,t.jsx)("div",{className:"sidebar-footer",children:(0,t.jsxs)("div",{className:"sidebar-footer-content",children:[(0,t.jsx)("strong",{children:"Revolution Status"}),(0,t.jsx)("p",{children:"Members receive early access to limited drops, private restocks, and street-coded rewards."})]})})]})}function c({customer:e,activeLabel:a,setMobileOpen:s,onLogout:r,icons:i}){return(0,t.jsxs)("header",{className:"topbar",children:[(0,t.jsx)("button",{className:"icon-button mobile-menu-btn",type:"button",onClick:()=>s(!0),"aria-label":"Open menu",children:i.menu}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"eyebrow",children:"Account Console"}),(0,t.jsxs)("h2",{className:"page-title",children:["Account Details"===a?"Account":a," ",(0,t.jsx)("span",{className:"gradient-text",children:"Hub"})]})]}),(0,t.jsxs)("div",{className:"topbar-actions",children:[(0,t.jsxs)("div",{className:"user-chip",children:[(0,t.jsx)("div",{className:"avatar",children:e.avatarInitials||"AR"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("strong",{children:e.displayName||`${e.firstName} ${e.lastName}`}),(0,t.jsx)("span",{children:e.email})]})]}),(0,t.jsx)(o.default,{href:"/",className:"btn btn-primary",children:"Shop New Drop"}),(0,t.jsx)("button",{className:"btn btn-danger",type:"button",onClick:r,children:"Sign Out"})]})]})}function u({status:e}){let a=`status-pill status-${e.toLowerCase()}`;return(0,t.jsx)("span",{className:a,children:e})}function h({customer:e,orders:a,icons:s}){let{showNotification:n}=(0,i.useNotification)(),l=r.default.useMemo(()=>{let e=a.reduce((e,t)=>{let a=parseFloat(t.total.replace(/[^0-9.]/g,""));return e+(isNaN(a)?0:a)},0);return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(e)},[a]),o=a[0]||{status:"N/A"};return(0,t.jsxs)("div",{className:"content-grid",children:[(0,t.jsxs)("div",{className:"card stat-card span-3",children:[(0,t.jsx)("div",{className:"stat-icon",children:s.orders}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"stat-value",children:a.length}),(0,t.jsx)("p",{className:"stat-label",children:"Total Orders"})]})]}),(0,t.jsxs)("div",{className:"card stat-card span-3",children:[(0,t.jsx)("div",{className:"stat-icon purple",children:s.card}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"stat-value",children:l}),(0,t.jsx)("p",{className:"stat-label",children:"Lifetime Spend"})]})]}),(0,t.jsxs)("div",{className:"card stat-card span-3",children:[(0,t.jsx)("div",{className:"stat-icon",children:s.spark}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"stat-value",children:"VIP"}),(0,t.jsx)("p",{className:"stat-label",children:"Member Tier"})]})]}),(0,t.jsxs)("div",{className:"card stat-card span-3",children:[(0,t.jsx)("div",{className:"stat-icon purple",children:s.package}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"stat-value",children:o.status}),(0,t.jsx)("p",{className:"stat-label",children:"Latest Order"})]})]}),(0,t.jsxs)("section",{className:"card card-padding span-7",children:[(0,t.jsx)("div",{className:"section-head",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"section-title",children:"Recent Activity"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Your latest order and profile events."})]})}),(0,t.jsx)("ul",{className:"activity-list",children:a.slice(0,3).map(e=>(0,t.jsxs)("li",{className:"activity-item",children:[(0,t.jsx)("div",{className:"activity-dot",children:s.package}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("strong",{children:[e.id," — ",e.items]}),(0,t.jsxs)("span",{children:[e.date," · ",e.total]})]}),(0,t.jsx)(u,{status:e.status})]},e.id))})]}),(0,t.jsxs)("section",{className:"card card-padding span-5",children:[(0,t.jsx)("div",{className:"section-head",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"section-title",children:"Profile Signal"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Keep your account details current for faster checkout and exclusive access."})]})}),(0,t.jsxs)("div",{className:"notice",children:[s.info,(0,t.jsxs)("div",{children:[(0,t.jsxs)("strong",{children:["Member since ",e.memberSince||"2023"]}),(0,t.jsx)("br",{}),"Your profile is ready for early-access launches. Add SMS updates to receive drop alerts first."]})]}),(0,t.jsx)("div",{style:{height:16}}),(0,t.jsx)("button",{className:"btn btn-primary",type:"button",style:{width:"100%"},onClick:()=>n("SMS alert registration system initialized."),children:"Enable Drop Alerts"})]})]})}function p({status:e}){let a=`status-pill status-${e.toLowerCase()}`;return(0,t.jsx)("span",{className:a,children:e})}function m({orders:e,icons:a}){let{showNotification:s}=(0,i.useNotification)();return(0,t.jsxs)("section",{className:"card card-padding",children:[(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"section-title",children:"Order History"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Minimal, high-contrast order history details."})]}),(0,t.jsx)("button",{className:"btn",type:"button",onClick:()=>{s("Preparing CSV export of transaction logs...")},children:"Download CSV"})]}),e.length?(0,t.jsx)("div",{className:"table-wrap",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Order"}),(0,t.jsx)("th",{children:"Date"}),(0,t.jsx)("th",{children:"Status"}),(0,t.jsx)("th",{children:"Items"}),(0,t.jsx)("th",{children:"Total"}),(0,t.jsx)("th",{children:"Action"})]})}),(0,t.jsx)("tbody",{children:e.map(e=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)("span",{className:"order-id",children:e.id})}),(0,t.jsx)("td",{children:e.date}),(0,t.jsx)("td",{children:(0,t.jsx)(p,{status:e.status})}),(0,t.jsx)("td",{children:e.items}),(0,t.jsx)("td",{children:e.total}),(0,t.jsx)("td",{children:(0,t.jsx)("button",{className:"link-action",type:"button",onClick:()=>s(`Tracking status for order ${e.id}`),children:"Track"})})]},e.id))})]})}):(0,t.jsxs)("div",{className:"empty-state",children:[(0,t.jsx)("div",{className:"empty-icon",children:a.orders}),(0,t.jsx)("h3",{children:"No orders yet"}),(0,t.jsx)("p",{children:"Your order history will appear here after your first checkout."}),(0,t.jsx)("button",{className:"btn btn-primary",type:"button",children:"Start Shopping"})]})]})}function x({addresses:e,onUpdateAddresses:a}){let{showNotification:s}=(0,i.useNotification)(),[n,l]=(0,r.useState)(e),[o,d]=(0,r.useState)(null),[c,u]=(0,r.useState)({name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""});return(0,t.jsxs)("div",{className:"content-grid",children:[(0,t.jsxs)("section",{className:"card card-padding span-12",children:[(0,t.jsx)("div",{className:"section-head",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"section-title",children:"Saved Addresses"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Use these cards to manage billing and shipping destinations."})]})}),(0,t.jsx)("div",{className:"address-grid",children:Object.keys(n).map(e=>{let a=n[e];return(0,t.jsxs)("div",{className:"address-card",children:[(0,t.jsxs)("div",{className:"address-card-header",children:[(0,t.jsxs)("h4",{className:"address-type",children:[e," Address"]}),(0,t.jsx)("button",{className:"link-action",type:"button",onClick:()=>{d(e),u(n[e])},children:"Edit"})]}),a.line1?(0,t.jsxs)("address",{children:[(0,t.jsx)("strong",{style:{color:"var(--text)"},children:a.name}),(0,t.jsx)("br",{}),a.line1,(0,t.jsx)("br",{}),a.line2&&(0,t.jsxs)(t.Fragment,{children:[a.line2,(0,t.jsx)("br",{})]}),a.city,", ",a.state," ",a.postcode,(0,t.jsx)("br",{}),a.country]}):(0,t.jsx)("div",{className:"empty-address-placeholder",style:{padding:"12px 0",color:"var(--muted)",fontSize:"0.85rem",fontStyle:"italic"},children:"No address registered. Click Edit to configure."})]},e)})})]}),o&&(0,t.jsxs)("section",{className:"card card-padding span-12",children:[(0,t.jsx)("div",{className:"section-head",children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("h3",{className:"section-title",children:["Update ",o.charAt(0).toUpperCase()+o.slice(1)," Address"]}),(0,t.jsx)("p",{className:"section-subtitle",children:"Configure your shipping coordinates for rapid drops delivery."})]})}),(0,t.jsxs)("form",{className:"form-grid",onSubmit:e=>{if(e.preventDefault(),!o)return;let t={...n,[o]:c};l(t),a&&a(t),s(`${o.charAt(0).toUpperCase()+o.slice(1)} address updated successfully.`),d(null)},children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"fullName",children:"Full Name"}),(0,t.jsx)("input",{className:"input",id:"fullName",value:c.name,onChange:e=>u({...c,name:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"country",children:"Country"}),(0,t.jsx)("input",{className:"input",id:"country",value:c.country,onChange:e=>u({...c,country:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field full",children:[(0,t.jsx)("label",{htmlFor:"street",children:"Street Address"}),(0,t.jsx)("input",{className:"input",id:"street",value:c.line1,onChange:e=>u({...c,line1:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field full",children:[(0,t.jsx)("label",{htmlFor:"suite",children:"Apartment, suite, unit, etc. (optional)"}),(0,t.jsx)("input",{className:"input",id:"suite",value:c.line2,onChange:e=>u({...c,line2:e.target.value})})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"city",children:"City"}),(0,t.jsx)("input",{className:"input",id:"city",value:c.city,onChange:e=>u({...c,city:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"state",children:"State / Province"}),(0,t.jsx)("input",{className:"input",id:"state",value:c.state,onChange:e=>u({...c,state:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field full",children:[(0,t.jsx)("label",{htmlFor:"postcode",children:"Postcode / Zip"}),(0,t.jsx)("input",{className:"input",id:"postcode",value:c.postcode,onChange:e=>u({...c,postcode:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field full flex gap-3",children:[(0,t.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Save Address"}),(0,t.jsx)("button",{className:"btn",type:"button",onClick:()=>d(null),children:"Cancel"})]})]})]})]})}function g({customer:e,onUpdate:a}){let{showNotification:s}=(0,i.useNotification)(),[n,l]=(0,r.useState)({firstName:e.firstName||"",lastName:e.lastName||"",displayName:e.displayName||"",email:e.email||"",phone:e.phone||"",currentPassword:"",newPassword:"",confirmPassword:"",notes:""});return(0,t.jsxs)("section",{className:"card card-padding",children:[(0,t.jsx)("div",{className:"section-head",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"section-title",children:"Account Details"}),(0,t.jsx)("p",{className:"section-subtitle",children:"Profile fields for identity validation and preferences."})]})}),(0,t.jsxs)("form",{className:"form-grid",onSubmit:e=>{(e.preventDefault(),n.newPassword&&n.newPassword!==n.confirmPassword)?s("New passwords do not match."):(a({firstName:n.firstName,lastName:n.lastName,displayName:n.displayName,email:n.email,phone:n.phone}),s("Account details updated successfully."))},children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"accountFirstName",children:"First Name"}),(0,t.jsx)("input",{className:"input",id:"accountFirstName",value:n.firstName,onChange:e=>l({...n,firstName:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"accountLastName",children:"Last Name"}),(0,t.jsx)("input",{className:"input",id:"accountLastName",value:n.lastName,onChange:e=>l({...n,lastName:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"displayName",children:"Display Name"}),(0,t.jsx)("input",{className:"input",id:"displayName",value:n.displayName,onChange:e=>l({...n,displayName:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"phone",children:"Phone"}),(0,t.jsx)("input",{className:"input",id:"phone",value:n.phone,onChange:e=>l({...n,phone:e.target.value})})]}),(0,t.jsxs)("div",{className:"field full",children:[(0,t.jsx)("label",{htmlFor:"email",children:"Email Address"}),(0,t.jsx)("input",{className:"input",id:"email",type:"email",value:n.email,onChange:e=>l({...n,email:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"password",children:"New Password"}),(0,t.jsx)("input",{className:"input",id:"password",type:"password",placeholder:"••••••••••••",value:n.newPassword,onChange:e=>l({...n,newPassword:e.target.value})})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"confirmPassword",children:"Confirm Password"}),(0,t.jsx)("input",{className:"input",id:"confirmPassword",type:"password",placeholder:"••••••••••••",value:n.confirmPassword,onChange:e=>l({...n,confirmPassword:e.target.value})})]}),(0,t.jsxs)("div",{className:"field full",children:[(0,t.jsx)("label",{htmlFor:"notes",children:"Style Preferences"}),(0,t.jsx)("textarea",{className:"textarea",id:"notes",placeholder:"Tell us your fit, size, and drop preferences...",value:n.notes,onChange:e=>l({...n,notes:e.target.value})})]}),(0,t.jsx)("div",{className:"field full",children:(0,t.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Update Account"})})]})]})}let b={dashboard:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,t.jsx)("path",{d:"M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),orders:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,t.jsx)("path",{d:"M7 7.5V6a5 5 0 0 1 10 0v1.5M5.6 8h12.8l1 12H4.6l1-12Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M9 12h6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),addresses:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,t.jsx)("path",{d:"M12 21s7-5.1 7-11.2A7 7 0 1 0 5 9.8C5 15.9 12 21 12 21Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",stroke:"currentColor",strokeWidth:"1.8"})]}),account:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,t.jsx)("path",{d:"M20 21a8 8 0 1 0-16 0",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,t.jsx)("path",{d:"M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z",stroke:"currentColor",strokeWidth:"1.8"})]}),bolt:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"26",height:"26",children:(0,t.jsx)("path",{d:"m13 2-9 12h7l-1 8 10-13h-7l0-7Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"})}),menu:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,t.jsx)("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),collapse:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,t.jsx)("path",{d:"M15 6 9 12l6 6",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round",strokeLinejoin:"round"})}),close:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:(0,t.jsx)("path",{d:"m6 6 12 12M18 6 6 18",stroke:"currentColor",strokeWidth:"1.9",strokeLinecap:"round"})}),card:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,t.jsx)("path",{d:"M3.5 8.5h17M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),(0,t.jsx)("path",{d:"M7 15h4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),package:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:[(0,t.jsx)("path",{d:"m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z",stroke:"currentColor",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),spark:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"22",height:"22",children:(0,t.jsx)("path",{d:"M12 2.5 14.2 9l6.8 1-4.9 4.7 1.2 6.8L12 18.3l-6.1 3.2 1.2-6.8L2.2 10 9 9l3-6.5Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})}),info:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",width:"20",height:"20",children:[(0,t.jsx)("path",{d:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",stroke:"currentColor",strokeWidth:"1.8"}),(0,t.jsx)("path",{d:"M12 10.5V17M12 7.2v.1",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round"})]})},f=[{id:"dashboard",label:"Dashboard",icon:b.dashboard},{id:"orders",label:"Orders",icon:b.orders},{id:"addresses",label:"Addresses",icon:b.addresses},{id:"account",label:"Account Details",icon:b.account}],j={firstName:"Alex",lastName:"Rider",displayName:"Alex Rider",email:"alex@streetrevolution.com",phone:"+1 (555) 014-9090",memberSince:"2023",avatarInitials:"AR"},v=[{id:"#SR-1049",date:"Feb 18, 2026",status:"Processing",total:"₹248.00",items:"Apex Carbon Tee, Neon Utility Cap"},{id:"#SR-1038",date:"Jan 29, 2026",status:"Completed",total:"₹119.00",items:"Revolution Hoodie"},{id:"#SR-1017",date:"Dec 14, 2025",status:"Completed",total:"₹312.50",items:"Night Run Jacket, Cargo Tech Pants"},{id:"#SR-0994",date:"Nov 03, 2025",status:"Pending",total:"₹88.00",items:"Chrome Logo Longsleeve"}],N={billing:{name:"Alex Rider",line1:"188 Neon District Ave",line2:"Unit 06",city:"Los Angeles",state:"CA",postcode:"90015",country:"United States"},shipping:{name:"Alex Rider",line1:"44 Cyan Boulevard",line2:"Suite 12",city:"Brooklyn",state:"NY",postcode:"11201",country:"United States"}};function y({customer:e,orders:s,addresses:i}){let{user:n,logout:l,updateUser:o}=(0,a.useAuth)(),u=e||n||j,p=u?.email?.toLowerCase()==="alex@streetrevolution.com",w=(0,r.useMemo)(()=>s||(p?v:[]),[s,p]),k=(0,r.useMemo)(()=>i||(p?N:{billing:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""},shipping:{name:"",line1:"",line2:"",city:"",state:"",postcode:"",country:""}}),[i,p]),[C,S]=(0,r.useState)("dashboard"),[A,M]=(0,r.useState)(!1),[P,L]=(0,r.useState)(!1),F=(0,r.useMemo)(()=>f.find(e=>e.id===C)?.label||"Dashboard",[C]);return(0,t.jsxs)("div",{className:"sr-page",children:[(0,t.jsx)("div",{className:`overlay ${P?"show":""}`,onClick:()=>L(!1)}),(0,t.jsxs)("div",{className:`account-shell ${A?"is-collapsed":""}`,children:[(0,t.jsx)(d,{active:C,setActive:S,collapsed:A,setCollapsed:M,mobileOpen:P,setMobileOpen:L,navItems:f,icons:b}),(0,t.jsxs)("main",{className:"main",children:[(0,t.jsx)(c,{customer:u,activeLabel:F,setMobileOpen:L,onLogout:l,icons:b}),"dashboard"===C&&(0,t.jsx)(h,{customer:u,orders:w,icons:b}),"orders"===C&&(0,t.jsx)(m,{orders:w,icons:b}),"addresses"===C&&(0,t.jsx)(x,{addresses:k}),"account"===C&&(0,t.jsx)(g,{customer:u,onUpdate:o})]})]})]})}e.s(["default",0,function(){let{user:e,isLoading:s}=(0,a.useAuth)();return s?(0,t.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin"}),(0,t.jsx)("span",{className:"orbitron uppercase tracking-widest text-xs text-cyan-400",children:"Synchronizing Console..."})]}):e?(0,t.jsx)(y,{}):(0,t.jsx)(l,{})}],19172)}]);