(()=>{
const d=document,h=d.documentElement,$=(s,r=d)=>r.querySelector(s),$$=(s,r=d)=>[...r.querySelectorAll(s)];
const nav=$('nav'),lg=$('.lang'),burger=$('.burger');
const COLORS={dark:'#080b16',light:'#eef2fb'};

/* theme: follows the system until the visitor chooses; the choice is remembered */
const paint=t=>{h.dataset.theme=t;const m=$('meta[name=theme-color]');if(m)m.content=COLORS[t]};
$('.theme')?.addEventListener('click',()=>{
  const t=h.dataset.theme==='light'?'dark':'light';paint(t);
  try{localStorage.setItem('lucent-theme',t)}catch(e){}
});
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',e=>{
  try{if(localStorage.getItem('lucent-theme'))return}catch(x){}
  paint(e.matches?'light':'dark');
});

/* mobile menu + language dropdown */
const setMenu=o=>{nav.classList.toggle('open',o);burger?.setAttribute('aria-expanded',o)};
burger?.addEventListener('click',()=>{setMenu(!nav.classList.contains('open'));if(lg)lg.open=false});
lg?.addEventListener('toggle',()=>{if(lg.open)setMenu(false)});
d.addEventListener('click',e=>{
  if(lg?.open&&!lg.contains(e.target))lg.open=false;
  if(!nav.contains(e.target))setMenu(false);
});
d.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(lg?.open){lg.open=false;$('summary',lg).focus()}
  setMenu(false);
});
matchMedia('(min-width:861px)').addEventListener('change',()=>setMenu(false));

/* nav gets a denser glass once the page scrolls */
const onScroll=()=>nav.classList.toggle('scrolled',scrollY>8);
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.08});
$$('.rv').forEach(el=>io.observe(el));

/* desktop only: pointer-tracked glass highlight + gentle background parallax */
if(matchMedia('(hover:hover) and (pointer:fine) and (min-width:861px)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  d.addEventListener('pointermove',e=>{
    const g=e.target.closest?.('.glass');if(!g)return;
    const r=g.getBoundingClientRect();
    g.style.setProperty('--mx',e.clientX-r.left+'px');g.style.setProperty('--my',e.clientY-r.top+'px');
  },{passive:true});
  const orbs=$$('.orb');let tick=0;
  addEventListener('scroll',()=>{tick||(tick=requestAnimationFrame(()=>{tick=0;orbs.forEach((o,i)=>o.style.translate=`0 ${scrollY*(.04+i*.02)}px`)}))},{passive:true});
}
})();
