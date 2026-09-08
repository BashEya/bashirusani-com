const btn=document.getElementById('menuBtn');
const nav=document.getElementById('navMenu');

btn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  btn.setAttribute('aria-expanded',String(open));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  btn?.setAttribute('aria-expanded','false');
}));

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

// Fresh FormSubmit AJAX flow. This gives visitors an in-page success/error state
// instead of redirecting away from the site. FormSubmit may send a one-time
// activation email to the site owner the first time this endpoint is used.
const form=document.getElementById('contactForm');
const formStatus=document.getElementById('formStatus');

form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const submitButton=form.querySelector('button[type="submit"]');
  const endpoint=form.dataset.formsubmit;

  if(!endpoint){
    form.submit();
    return;
  }

  const originalButton=submitButton.innerHTML;
  submitButton.disabled=true;
  submitButton.textContent='Sending…';
  formStatus.className='form-status';
  formStatus.textContent='Sending your message securely…';

  try{
    const data=Object.fromEntries(new FormData(form).entries());
    const response=await fetch(endpoint,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(data)
    });

    let result={};
    try{result=await response.json();}catch(_){/* response body is optional */}

    if(!response.ok){
      throw new Error(result.message||'Unable to submit form');
    }

    form.reset();
    formStatus.className='form-status success';
    formStatus.textContent='Thank you — your message has been submitted successfully.';
  }catch(error){
    formStatus.className='form-status error';
    formStatus.textContent='The message could not be sent. Please email bashmodulus@gmail.com directly or try again shortly.';
    console.error('Contact form submission failed:',error);
  }finally{
    submitButton.disabled=false;
    submitButton.innerHTML=originalButton;
  }
});

// Hero backdrop: keep the live website structure, but use the visual language
// from the approved mockup — Earth on the right and microbes across the field.
const heroBackdropStyle=document.createElement('style');
heroBackdropStyle.textContent=`
  .hero{
    background:#073c55 url('/assets/hero-earth-microbes.svg') center center/cover no-repeat !important;
  }
  .hero:before{
    background:linear-gradient(90deg,rgba(2,25,45,.60) 0%,rgba(3,37,56,.34) 38%,rgba(3,46,62,.12) 67%,rgba(2,28,46,.05) 100%) !important;
  }
  .hero:after,.microbe-field,.planet{display:none !important;}
  .hero-copy,.hero-visual{position:relative;z-index:2;}
  @media(max-width:1000px){
    .hero{background-position:66% center !important;}
    .hero:before{background:linear-gradient(180deg,rgba(2,26,44,.48),rgba(2,30,47,.24)) !important;}
  }
  @media(max-width:620px){
    .hero{background-position:72% center !important;background-size:auto 100% !important;}
    .hero:before{background:linear-gradient(180deg,rgba(2,24,42,.66) 0%,rgba(2,31,48,.36) 58%,rgba(2,29,44,.22) 100%) !important;}
  }
`;
document.head.appendChild(heroBackdropStyle);
