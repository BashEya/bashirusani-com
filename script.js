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

// Progressive SEO enrichment. The core title, description and canonical URL
// remain in index.html; these additions enrich entity and social metadata.
const ensureMeta=(key,value,attribute='name')=>{
  if(!document.head.querySelector(`meta[${attribute}="${key}"]`)){
    const meta=document.createElement('meta');
    meta.setAttribute(attribute,key);
    meta.content=value;
    document.head.appendChild(meta);
  }
};

ensureMeta('author','Bashiru Sani');
ensureMeta('robots','index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
ensureMeta('keywords','Bashiru Sani, microbiologist, environmental microbiology, microbial ecology, bioremediation, free-living amoebae, antimicrobial resistance, One Health, omics, metagenomics, University of Strathclyde');

ensureMeta('og:site_name','Bashiru Sani','property');
ensureMeta('og:locale','en_GB','property');
ensureMeta('og:image','https://bashirusani.com/assets/bashiru-portrait.jpg','property');
ensureMeta('og:image:alt','Bashiru Sani, microbiologist, PhD researcher and lecturer','property');
ensureMeta('profile:first_name','Bashiru','property');
ensureMeta('profile:last_name','Sani','property');

ensureMeta('twitter:card','summary_large_image');
ensureMeta('twitter:site','@BashEya');
ensureMeta('twitter:creator','@BashEya');
ensureMeta('twitter:title','Bashiru Sani | Microbiologist, PhD Researcher & Lecturer');
ensureMeta('twitter:description','Microbiology across health, environment and remediation — microbial ecology, bioremediation, One Health, AMR and omics.');
ensureMeta('twitter:image','https://bashirusani.com/assets/bashiru-portrait.jpg');
ensureMeta('twitter:image:alt','Bashiru Sani, microbiologist, PhD researcher and lecturer');

if(!document.getElementById('bashiru-person-schema')){
  const schema=document.createElement('script');
  schema.id='bashiru-person-schema';
  schema.type='application/ld+json';
  schema.textContent=JSON.stringify({
    '@context':'https://schema.org',
    '@type':'Person',
    name:'Bashiru Sani',
    url:'https://bashirusani.com/',
    image:'https://bashirusani.com/assets/bashiru-portrait.jpg',
    jobTitle:['PhD Researcher','Assistant Lecturer','Microbiologist'],
    description:'Microbiologist, PhD researcher and lecturer working across environmental microbiology, microbial ecology, bioremediation, antimicrobial resistance, One Health and omics.',
    address:{'@type':'PostalAddress',addressLocality:'Glasgow',addressCountry:'GB'},
    affiliation:{'@type':'CollegeOrUniversity',name:'University of Strathclyde',url:'https://www.strath.ac.uk/'},
    worksFor:{'@type':'CollegeOrUniversity',name:'Federal University of Lafia',url:'https://fulafia.edu.ng/'},
    alumniOf:[
      {'@type':'CollegeOrUniversity',name:'University of Glasgow',url:'https://www.gla.ac.uk/'},
      {'@type':'CollegeOrUniversity',name:'Federal University of Lafia',url:'https://fulafia.edu.ng/'}
    ],
    sameAs:[
      'https://www.linkedin.com/in/bashir-sani/',
      'https://orcid.org/0000-0002-2983-3861',
      'https://scholar.google.com/citations?user=ZXR2KdUAAAAJ&hl=en',
      'https://x.com/BashEya'
    ],
    knowsAbout:[
      'Environmental microbiology','Medical microbiology','Microbial ecology',
      'Bioremediation','Free-living amoebae','Antimicrobial resistance',
      'One Health','Omics','Metagenomics'
    ]
  });
  document.head.appendChild(schema);
}
