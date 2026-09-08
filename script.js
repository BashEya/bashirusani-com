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

// Exact-reference hero mode.
// If assets/hero-exact.png exists, the live hero uses that supplied artwork itself,
// so the browser view is visually identical rather than another CSS interpretation.
(()=>{
  const hero=document.querySelector('.hero');
  if(!hero) return;
  const exact=new Image();
  exact.decoding='async';
  exact.loading='eager';
  exact.alt='Bashiru Sani — Microbiology across health, environment and remediation';
  exact.onload=()=>{
    const style=document.createElement('style');
    style.textContent=`
      .hero.hero-as-reference{background:#073d58!important;padding:0!important;min-height:0!important;overflow:hidden!important;position:relative!important;}
      .hero.hero-as-reference::before,.hero.hero-as-reference::after{display:none!important;}
      .hero.hero-as-reference>.hero-grid{display:none!important;}
      .hero-exact-wrap{position:relative;width:100%;aspect-ratio:1284/600;background:#073d58;overflow:hidden;}
      .hero-reference-image{display:block;width:100%;height:100%;object-fit:cover;object-position:center center;}
      .hero-hotspot{position:absolute;display:block;z-index:3;border-radius:8px;background:transparent;color:transparent;font-size:0;}
      .hero-hotspot:focus-visible{outline:3px solid #fff;outline-offset:3px;background:rgba(255,255,255,.08);}
      .hero-hotspot.research{left:8.3%;top:73.1%;width:20.2%;height:9.4%;}
      .hero-hotspot.publications{left:31.0%;top:73.1%;width:16.8%;height:9.4%;}
      .hero-semantic{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}
      @media(max-width:700px){
        .hero-exact-wrap{aspect-ratio:1284/600;}
        .hero-reference-image{object-fit:contain;background:#073d58;}
      }
    `;
    document.head.appendChild(style);

    const wrap=document.createElement('div');
    wrap.className='hero-exact-wrap';
    exact.className='hero-reference-image';
    wrap.appendChild(exact);

    const research=document.createElement('a');
    research.className='hero-hotspot research';
    research.href='#current-project';
    research.setAttribute('aria-label','Explore my research');
    wrap.appendChild(research);

    const publications=document.createElement('a');
    publications.className='hero-hotspot publications';
    publications.href='#publications';
    publications.setAttribute('aria-label','View publications');
    wrap.appendChild(publications);

    const semantic=document.createElement('div');
    semantic.className='hero-semantic';
    semantic.innerHTML='<h1>Bashiru Sani</h1><p>Microbiologist, PhD Researcher & Lecturer</p><h2>Microbiology across health, environment and remediation.</h2><p>Research across microbial ecology, environmental microbiology, bioremediation, One Health and antimicrobial resistance.</p>';
    wrap.appendChild(semantic);

    hero.classList.add('hero-as-reference');
    hero.prepend(wrap);
  };
  // Do nothing if the asset has not yet been uploaded; the current hero remains intact.
  exact.onerror=()=>{};
  exact.src='/assets/hero-exact.png';
})();

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
