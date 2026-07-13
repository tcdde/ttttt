const slides=[...document.querySelectorAll('.slide')];
const dotsWrap=document.querySelector('.slider-dots');
let current=0, timer;
slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`Go to slide ${i+1}`);b.addEventListener('click',()=>go(i));dotsWrap.appendChild(b)});
const dots=[...dotsWrap.children];
function go(i){slides[current].classList.remove('active');dots[current].classList.remove('active');current=(i+slides.length)%slides.length;slides[current].classList.add('active');dots[current].classList.add('active');reset()}
function reset(){clearInterval(timer);timer=setInterval(()=>go(current+1),5500)}
dots[0].classList.add('active');reset();
document.querySelector('.next').onclick=()=>go(current+1);
document.querySelector('.prev').onclick=()=>go(current-1);

const menu=document.querySelector('.main-nav'),menuBtn=document.querySelector('.menu-toggle');
menuBtn.onclick=()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)};
document.querySelectorAll('.main-nav a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));

const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>revealObs.observe(x));

let counted=false;
const statsObs=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;document.querySelectorAll('.counter').forEach(el=>{const target=+el.dataset.target;let n=0;const step=Math.max(1,Math.floor(target/30));const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=n+'+'},60)})}},{threshold:.4});
statsObs.observe(document.querySelector('.stats-band'));

document.querySelectorAll('.gallery-filters button').forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll('.gallery-filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;document.querySelectorAll('.gallery-item').forEach(item=>item.classList.toggle('hidden',f!=='all'&&item.dataset.category!==f));
});
const lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.onclick=()=>{const img=item.querySelector('img');lbImg.src=img.src;lbImg.alt=img.alt;lb.showModal()});
lb.querySelector('button').onclick=()=>lb.close();

document.getElementById('admissionForm').addEventListener('submit',e=>{
 e.preventDefault();const d=new FormData(e.currentTarget);
 const msg=`Hello SALT Special Vocational Training Center,

I would like to make an admission enquiry.

Parent/Guardian: ${d.get('guardian')||''}
Phone: ${d.get('phone')||''}
Learner: ${d.get('learner')||''}
Age: ${d.get('age')||''}
Program: ${d.get('program')||''}
Message: ${d.get('message')||''}`;
 window.open(`https://wa.me/255719324324?text=${encodeURIComponent(msg)}`,'_blank');
});

const translations={
 sw:{
  nav_about:"Kuhusu",nav_programs:"Programu",nav_profiles:"Wasifu",nav_news:"Habari",nav_gallery:"Picha",nav_admission:"Udahili",nav_donate:"Changia",nav_contact:"Mawasiliano",
  hero_title:"Tunaona uwezo wako.",hero_text:"Kuwawezesha watoto na vijana wenye changamoto za maendeleo kupitia tiba, mafunzo ya ufundi, stadi za maisha na kazi zenye maana.",
  apply_now:"Omba Udahili",explore_programs:"Tazama Programu",slide2_title:"Mafunzo kwa ajili ya maisha ya kujitegemea.",slide2_text:"Mafunzo ya vitendo katika chakula, nguo, uchapishaji, vipodozi, biashara na ujasiriamali.",view_training:"Tazama Mafunzo",
  slide3_title:"Kila mwanafunzi anastahili nafasi.",slide3_text:"Kituo chenye upendo ambapo kila mtu anahimizwa kushiriki, kukua na kuchangia.",learn_more:"Jifunze Zaidi",
  about_label:"Kuhusu Kituo",about_title:"Kumsaidia kila mwanafunzi kufikia uwezo wake.",about_p1:"SALT ni shirika lisilo la kiserikali lililosajiliwa kwa lengo la kuwawezesha watoto na vijana wenye changamoto za maendeleo.",about_p2:"Kituo kinatoa tiba, elimu ya ufundi, stadi za maisha, ujasiriamali, ushauri na fursa za kazi jumuishi.",about_badge:"Kituo cha uwezo, heshima na matumaini",
  mission:"Dhamira",vision:"Maono",mission_text:"Kuboresha maisha kupitia elimu ya ufundi, ujasiriamali, ushauri, utetezi na huduma za ushauri.",vision_text:"Kuwa kituo bora kinachotoa huduma zenye ubora na kuboresha maisha ya watu wenye changamoto za maendeleo.",
  programs_label:"Programu na Huduma",programs_title:"Msaada kamili na mafunzo ya vitendo",profiles_label:"Watu wa SALT",profiles_title:"Kutana na wanafunzi na timu yetu",profiles_note:"Badilisha majina ya mfano kwa majina na wasifu ulioidhinishwa kabla ya kuchapisha.",
  news_label:"Habari na Matukio",news_title:"Kinachoendelea Kituoni",gallery_label:"Picha",gallery_title:"Maisha katika Kituo cha SALT",admission_label:"Udahili Mtandaoni",admission_title:"Anza kuulizia udahili",admission_text:"Jaza fomu na itafungua WhatsApp ikiwa na taarifa zako tayari kutumwa Kituoni.",
  donate_label:"Saidia SALT",donate_title:"Saidia kuunda fursa za mafunzo, tiba na kazi.",donate_text:"Mchango wako unaweza kusaidia vifaa vya kujifunzia, tiba, chakula, vifaa vya ufundi na maono ya VIWANDA KUMI.",
  contact_label:"Tembelea Kituo",contact_title:"Mbezi Makabe, Dar es Salaam"
 }
};
const original={};
document.querySelectorAll('[data-i18n]').forEach(el=>original[el.dataset.i18n]=el.textContent);
let sw=false;
document.getElementById('langToggle').onclick=()=>{sw=!sw;document.getElementById('langToggle').textContent=sw?'EN':'SW';document.documentElement.lang=sw?'sw':'en';document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;el.textContent=sw?(translations.sw[k]||original[k]):original[k]})};

document.getElementById('year').textContent=new Date().getFullYear();
