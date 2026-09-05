const btn=document.getElementById('menuBtn');
const nav=document.getElementById('navMenu');

btn?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();

// Vercel Web Analytics for this static HTML site.
window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};
const analyticsScript=document.createElement('script');
analyticsScript.defer=true;
analyticsScript.src='/_vercel/insights/script.js';
document.head.appendChild(analyticsScript);

// Vercel Speed Insights for this static HTML site.
window.si=window.si||function(){(window.siq=window.siq||[]).push(arguments);};
const speedInsightsScript=document.createElement('script');
speedInsightsScript.defer=true;
speedInsightsScript.src='/_vercel/speed-insights/script.js';
document.head.appendChild(speedInsightsScript);

// Use the dedicated favicon/app-icon set across browsers and devices.
// Remove the earlier single-logo favicon links first so browsers do not choose
// the old full-size logo in preference to the optimized icons.
document.head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="manifest"]').forEach(link=>link.remove());

const addHeadLink=(rel,href,{sizes,type}={})=>{
  const link=document.createElement('link');
  link.rel=rel;
  link.href=href;
  if(sizes) link.sizes=sizes;
  if(type) link.type=type;
  document.head.appendChild(link);
};

addHeadLink('icon','/assets/favicon.ico',{type:'image/x-icon'});
addHeadLink('icon','/assets/favicon-16x16.png',{sizes:'16x16',type:'image/png'});
addHeadLink('icon','/assets/favicon-32x32.png',{sizes:'32x32',type:'image/png'});
addHeadLink('icon','/assets/favicon-48x48.png',{sizes:'48x48',type:'image/png'});
addHeadLink('apple-touch-icon','/assets/apple-touch-icon.png',{sizes:'180x180'});
addHeadLink('manifest','/site.webmanifest');

if(!document.head.querySelector('meta[name="application-name"]')){
  const meta=document.createElement('meta');
  meta.name='application-name';
  meta.content='Bashiru Sani';
  document.head.appendChild(meta);
}
