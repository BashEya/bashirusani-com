const btn=document.getElementById('menuBtn');
const nav=document.getElementById('navMenu');
btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');}));
const year=document.getElementById('year');if(year) year.textContent=new Date().getFullYear();

// Remove the olive studio backdrop from the existing portrait at runtime.
// This keeps the real portrait but lets it sit naturally inside the blue science hero.
const portrait=document.getElementById('heroPortrait');
if(portrait){
  const process=()=>{
    try{
      const canvas=document.createElement('canvas');
      canvas.width=portrait.naturalWidth;canvas.height=portrait.naturalHeight;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(portrait,0,0);
      const frame=ctx.getImageData(0,0,canvas.width,canvas.height);
      const d=frame.data;
      for(let i=0;i<d.length;i+=4){
        const r=d[i],g=d[i+1],b=d[i+2];
        const olive=(b<72 && g>b*1.45 && g>r*.88 && g<r*1.42 && r<145);
        if(olive){
          const strength=Math.min(1,Math.max(0,(72-b)/44));
          d[i+3]=Math.round(255*(1-strength));
        }
      }
      ctx.putImageData(frame,0,0);
      canvas.className='processed-portrait';
      canvas.setAttribute('aria-label',portrait.alt||'Professional portrait of Bashiru Sani');
      portrait.replaceWith(canvas);
    }catch(e){console.warn('Portrait background processing skipped',e);}
  };
  if(portrait.complete) process(); else portrait.addEventListener('load',process,{once:true});
}

const form=document.getElementById('contactForm');
const formStatus=document.getElementById('formStatus');
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const submitButton=form.querySelector('button[type="submit"]');
  const endpoint=form.dataset.formsubmit;
  const original=submitButton.innerHTML;
  submitButton.disabled=true;submitButton.textContent='Sending…';formStatus.textContent='Sending your message securely…';
  try{
    const data=Object.fromEntries(new FormData(form).entries());
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
    let result={};try{result=await response.json()}catch{}
    if(!response.ok) throw new Error(result.message||'Unable to submit');
    form.reset();formStatus.textContent='Thank you — your message has been submitted successfully.';
  }catch(e){formStatus.textContent='The message could not be sent. Please email bashmodulus@gmail.com directly or try again shortly.';}
  finally{submitButton.disabled=false;submitButton.innerHTML=original;}
});

window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};const a=document.createElement('script');a.defer=true;a.src='/_vercel/insights/script.js';document.head.appendChild(a);
window.si=window.si||function(){(window.siq=window.siq||[]).push(arguments)};const s=document.createElement('script');s.defer=true;s.src='/_vercel/speed-insights/script.js';document.head.appendChild(s);
