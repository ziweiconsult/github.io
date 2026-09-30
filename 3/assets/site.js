/* 安猷 A&U — 全站共用脚本 */

/* 1. 进场动画 */
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.06});
  els.forEach(function(el){io.observe(el);});
})();

/* 2. 来源追踪：网址带 ?src=xxx 时，把来源附在 WhatsApp 预填讯息末尾
      例：courses_cn.html?src=fb-nov → 客人送出的讯息尾端会多一行 [fb-nov] */
(function(){
  var src=new URLSearchParams(location.search).get('src');
  if(!src) return;
  src=src.replace(/[^\w\-]/g,'').slice(0,24);
  if(!src) return;
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){
    try{
      var u=new URL(a.href);
      var t=u.searchParams.get('text')||'';
      u.searchParams.set('text', t+'\n['+src+']');
      a.href=u.toString();
    }catch(e){}
  });
})();

/* 3. 手机版选单 */
(function(){
  var b=document.getElementById('menuBtn'), n=document.getElementById('nav');
  if(!b||!n) return;
  b.addEventListener('click',function(e){
    e.stopPropagation();
    var open=n.classList.toggle('open');
    b.setAttribute('aria-expanded',open?'true':'false');
  });
  n.addEventListener('click',function(e){ if(e.target.closest('a')) n.classList.remove('open'); });
  document.addEventListener('click',function(e){
    if(!n.contains(e.target) && !b.contains(e.target)) n.classList.remove('open');
  });
})();

/* 4. 课程页教材／证书：照片还没上传的格子自动隐藏；整组都没有就连小标题一起隐藏 */
(function(){
  function hide(img){
    var f=img.closest('figure'), box=img.closest('.media');
    if(f) f.style.display='none';
    if(box && !Array.prototype.some.call(box.querySelectorAll('figure'),function(x){return x.style.display!=='none';})){
      box.style.display='none';
      var h=box.previousElementSibling;
      if(h && h.classList.contains('subhead')) h.style.display='none';
    }
  }
  document.querySelectorAll('.media img').forEach(function(img){
    if(img.complete && img.naturalWidth===0 && img.currentSrc){hide(img);}
    else{img.addEventListener('error',function(){hide(img);});}
  });
})();
