// The same scene clock drives snow, aurora, the museum light and the opening.
// The background covers the viewport; real HTML typography stays clear at every screen size.
(() => {
  'use strict';
  const get = id => document.getElementById(id);
  const cover = get('cover');
  const stage = get('photoStage');
  const canvas = get('coverWeather');
  let ctx = null;
  try { ctx = canvas.getContext('2d'); } catch {}
  const playButton = get('coverPlay');
  const playLabel = get('coverPlayLabel');
  const playIcon = get('coverPlayIcon');
  const status = get('coverMotionStatus');
  const openButton = get('openCoverBtn');
  const openLabel = get('openCoverLabel');
  const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let playing = !media?.matches;
  let inView = true;
  let speed = 1;
  let time = 0;
  let lastFrame = null;
  let frameId = null;
  let openingStart = null;
  let opened = false;
  let width = 1, height = 1, pixelRatio = 1;
  let protectedArea = null;
  const TAU = Math.PI * 2;
  const snow = Array.from({length:36}, (_,i) => ({
    x:(i*.61803398875+.13)%1,
    y:(i*.38196601125+.24)%1,
    radius:.48+(i%5)*.19,
    alpha:.12+(i%4)*.035,
    phase:i*.71
  }));
  function resize() {
    const bounds = stage.getBoundingClientRect();
    width = Math.max(1,bounds.width);
    height = Math.max(1,bounds.height);
    pixelRatio = Math.min(window.devicePixelRatio||1,2);
    canvas.width = Math.round(width*pixelRatio);
    canvas.height = Math.round(height*pixelRatio);
    if (ctx) ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
    // Position the light over the source museum even when object-fit:cover crops the background.
    const narrow=window.innerWidth<=700;
    const scale=Math.max(width/1672,height/941);
    const imageWidth=1672*scale,imageHeight=941*scale;
    const offsetX=(width-imageWidth)*(narrow?.62:.56),offsetY=(height-imageHeight)*.5;
    const rect=(prefix,x,y,w,h)=>{
      stage.style.setProperty('--'+prefix+'-left',(offsetX+imageWidth*x)+'px');
      stage.style.setProperty('--'+prefix+'-top',(offsetY+imageHeight*y)+'px');
      stage.style.setProperty('--'+prefix+'-width',(imageWidth*w)+'px');
      stage.style.setProperty('--'+prefix+'-height',(imageHeight*h)+'px');
    };
    rect('museum',.562,.34,.165,.27);rect('opening',.55,.34,.19,.31);
    const copy=get('photoCopy').getBoundingClientRect();
    protectedArea={left:copy.left-bounds.left-15,right:copy.right-bounds.left+15,top:copy.top-bounds.top-15,bottom:copy.bottom-bounds.top+15};
    paint();
  }
  function progress() {
    return openingStart===null ? (opened?1:0) : Math.min(1,(time-openingStart)/1.8);
  }
  function paint() {
    const phase = TAU*time/24;
    const p = progress();
    const opening = openingStart!==null;
    const eased = p*p*(3-2*p);
    stage.style.setProperty('--aurora-x',(Math.sin(phase)*5).toFixed(3)+'%');
    stage.style.setProperty('--aurora-opacity',(.1+.035*Math.sin(phase+.4)).toFixed(4));
    stage.style.setProperty('--museum-warmth',(.14+.04*Math.sin(phase+1.2)+eased*.18).toFixed(4));
    stage.style.setProperty('--opening-light',opening?(Math.sin(Math.PI*p)*.35).toFixed(4):'0');
    stage.style.setProperty('--opening-scale',(1+eased*3).toFixed(4));
    stage.style.setProperty('--cool-veil',(.09*(1-eased)).toFixed(4));
    if (!ctx) return;
    ctx.clearRect(0,0,width,height);
    for (const flake of snow) {
      const x = (flake.x+Math.sin(phase+flake.phase)*.009+1)%1;
      const y = (flake.y+time/24)%1;
      // Keep particles away from the live heading and its controls.
      if(protectedArea&&x*width>=protectedArea.left&&x*width<=protectedArea.right&&y*height>=protectedArea.top&&y*height<=protectedArea.bottom)continue;
      ctx.beginPath();
      ctx.fillStyle='rgba(246,237,216,'+flake.alpha+')';
      ctx.arc(x*width,y*height,Math.max(.3,flake.radius*width/1300),0,TAU);
      ctx.fill();
    }
  }
  function syncControls(message) {
    playLabel.textContent=playing?'暂停':'播放';
    playIcon.setAttribute('href',playing?'#i-pause':'#i-play');
    playButton.setAttribute('aria-label',playing?'暂停封面动画':'播放封面动画');
    playButton.setAttribute('aria-pressed',String(playing));
    status.textContent=message||(playing?'日光落进展厅，山河正在等待被打开。':'封面动画已暂停，图片与标题完整保留。');
  }
  function stopFrame() {
    if(frameId!==null)window.cancelAnimationFrame(frameId);
    frameId=null;
    lastFrame=null;
  }
  function schedule() {
    if(frameId===null&&playing&&inView&&!document.hidden)frameId=window.requestAnimationFrame(tick);
  }
  function enterMap() {
    opened=true;
    openingStart=null;
    openButton.setAttribute('aria-busy','false');
    openLabel.textContent='再次走进山河展厅';
    stage.setAttribute('aria-busy','false');
    paint();
    status.textContent='山河已打开，欢迎走进互动地图。';
    const heading=get('exploreTitle');
    get('explore').scrollIntoView({behavior:media?.matches?'auto':'smooth',block:'start'});
    heading.focus({preventScroll:true});
  }
  function tick(now) {
    frameId=null;
    if(!playing||!inView||document.hidden){lastFrame=null;return;}
    if(lastFrame!==null)time+=Math.min((now-lastFrame)/1000,.08)*speed;
    lastFrame=now;
    const done=openingStart!==null&&progress()>=1;
    paint();
    if(done)enterMap();
    schedule();
  }
  playButton.addEventListener('click',()=>{
    playing=!playing;
    if(!playing){stopFrame();if(openingStart!==null)enterMap();}
    syncControls();
    schedule();
  });
  get('coverRestart').addEventListener('click',()=>{
    time=0;lastFrame=null;openingStart=null;opened=false;
    openButton.setAttribute('aria-busy','false');
    stage.setAttribute('aria-busy','false');
    openLabel.textContent='打开这座地质博物馆';
    paint();syncControls(playing?'已从第一帧重新开始。':'已回到第一帧，点击播放开启动画。');schedule();
  });
  get('coverSpeed').addEventListener('input',event=>{
    const next=Number(event.target.value);
    if(!Number.isFinite(next))return;
    speed=Math.max(.5,Math.min(1.5,next));
    get('coverSpeedValue').value=speed.toFixed(1)+'×';
    get('coverSpeedValue').textContent=speed.toFixed(1)+'×';
  });
  openButton.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(openingStart!==null)return;
    if(!playing||media?.matches||opened){enterMap();return;}
    openingStart=time;
    openButton.setAttribute('aria-busy','true');
    stage.setAttribute('aria-busy','true');
    openLabel.textContent='正在为山河开馆…';
    status.textContent='让目光穿过冰雪光环，走向地质展厅。';
    schedule();
  });
  const onMotionChange=()=>{
    if(media?.matches){playing=false;stopFrame();if(openingStart!==null)enterMap();paint();syncControls('已按设备设置减少动态效果；点击播放可手动开启。');}
  };
  if(media?.addEventListener)media.addEventListener('change',onMotionChange);
  else if(media?.addListener)media.addListener(onMotionChange);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      inView=entries[0].isIntersecting;
      if(!inView){
        stopFrame();
        // Manual scrolling cancels the pending jump so returning never moves the page unexpectedly.
        if(openingStart!==null){openingStart=null;openButton.setAttribute('aria-busy','false');stage.setAttribute('aria-busy','false');openLabel.textContent='打开这座地质博物馆';paint();}
      } else schedule();
    },{threshold:0});
    observer.observe(cover);
  }
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',()=>{stopFrame();schedule();});
  window.addEventListener('pagehide',stopFrame);
  window.addEventListener('pageshow',()=>{resize();schedule();});
  resize();
  syncControls(media?.matches?'已按设备设置减少动态效果；点击播放可手动开启。':undefined);
  schedule();
})();
