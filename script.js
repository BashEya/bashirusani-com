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
