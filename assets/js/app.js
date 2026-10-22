'use strict';
const $ = id => document.getElementById(id);
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NOTES = {
 T1:['崇礼 · 冰雪背后的山地','冬奥让人们记住这里的雪道，山地的高差与谷地形态，则提供了理解这片冰雪风景的另一条线索。从雪场和冬奥场馆出发，把目光移向山脊与谷地，观察地形如何参与四季山地休闲的组织。'],
 T2:['张北 · 草原天路','坝上高原、波状丘陵与山地过渡带共同构成开阔的景观层次。草原天路将沿途风光串联起来，形成以自驾、避暑和摄影为特色的旅游体验。'],
 T3:['沽源 · 湖泊湿地','高原湖盆与湿地草原相互交织，带来不同于山地景观的开阔与舒缓。认识这里，可以从湖泊、湿地与周边草地的空间联系入手。'],
 T4:['康保 · 湿地观鸟','湖沼湿地与缓丘草地，构成鸟类栖息与自然观察的空间。这里的探索主题是低干扰：在保留生态环境的前提下，开展观鸟与科普体验。'],
 T5:['蔚县 · 古城民俗','在山间盆地与河谷之间，古城、古镇和民俗成为鲜明的文化标识。地貌提供生活的空间，历史与日常生活则赋予这片土地独特的记忆。'],
 T6:['阳原 · 泥河湾遗址','盆地、河谷阶地与黄土丘陵，不只是今天的景观，也是理解遗址环境的线索。这里适合通过考古展示与研学，认识自然环境与人类活动的联系。'],
 T7:['怀来 · 官厅水库','水库湖盆、河谷平原与低山丘陵在这里交汇。滨水休闲与葡萄酒旅游，为认识怀来的资源组合提供了两个不同的观察入口。'],
 T8:['张家口 · 长城关隘','大境门与张家口堡，把长城关隘、商道文化与城市生活串联起来。观察山口和谷地的位置，有助于理解这座城市的空间特色。'],
 P1:['尚义 · 察汗淖尔','高原湖盆、湿地与缓丘草地相互连接。这个点位强调生态研学的潜力，适合以候鸟观察与自然科普为主题，探索轻量、低干扰的游憩方式。'],
 P2:['赤城 · 温泉山地','燕山山地、河谷盆地与温泉资源相互结合，形成山地康养的资源基础。潜力方向包括温泉度假、森林休闲与四季康养体验。'],
 P3:['蔚县 · 飞狐峪与空中草原','峡谷山地与高山草甸构成鲜明的景观反差。沿着地形变化认识这一区域，可以把地貌观察、自然摄影与户外体验结合起来。'],
 P4:['涿鹿 · 桑干河谷','河谷平原、盆地与低山丘陵，共同构成文化研学的空间背景。把河流、聚落与古遗址放在同一张地图上，有助于理解河谷资源之间的联系。'],
 D1:['张北 · 云计算产业','这是原图标注的云计算与数字产业集群点位。它为观察城市发展提供了产业视角，也与图中的绿电和算力配套方向形成联系。'],
 D2:['怀来 · 大数据产业','原图将沙城和怀来列为大数据与信息服务产业集聚点。结合旅游资源分布观察，可以认识同一区域中不同功能的空间组合。'],
 D3:['张家口 · 装备制造','这个点位位于市区南侧，原图重点呈现装备制造与新能源装备相关产业。它为理解张家口的产业构成，提供了城市制造业的观察窗口。'],
 D4:['怀安 · 汽车产业','原图以汽车整车与零部件制造概括怀安南山汽车产业园的特色。继续关注怀安与万全的配套点位，可以读到更完整的产业协作线索。'],
 D5:['宣化 · 装备与材料','宣化点位展示装备制造与钢铁材料相关产业基础。与其他制造业点位对照，可以观察不同区域在制造业和材料方向上的功能分工。'],
 D6:['尚义 · 新能源装备','这个点位以风电、光伏等新能源装备制造为特色。它与图中的绿色能源和产业协作方向，共同构成认识区域产业的线索。'],
 E1:['张北 · 绿电与算力','这一点位表达新能源与算力产业配套的潜力方向。可以结合张北云计算产业基地，思考能源供给与数字产业之间的协同关系。'],
 E2:['怀安—万全 · 汽车配套','原图将怀安与万全连接为汽车零部件及相关产业协作方向。这个点位强调产业链联系，适合与怀安汽车产业园一同阅读。'],
 E3:['涿鹿—下花园 · 装备协作','这一通道体现结合区位交通发展装备制造协作的潜力。阅读时可关注区域之间的连接，理解产业布局从单个点位走向协同发展的思路。'],
 E4:['阳原—蔚县 · 农产品加工','这一点位聚焦特色农产品精深加工与食品产业方向。它提示我们，区域资源不仅可以形成旅游体验，也可以延伸出加工和配套产业。']
};
const TOURS = {panorama:{title:'从冬奥走入山河',ids:['T1','P3','P2','T6']},study:{title:'读懂大地的纹理',ids:['T6','P3','T3','P4']},industry:{title:'山河与城市的生长',ids:['D1','D6','E1','E4']}};
const INTRO = '一座被冬奥光环遮住的地质博物馆，正在等待被打开。这座博物馆，叫张家口。你或许因冰雪记住这里，今天，让我们把目光穿过冬奥的光环，移向脚下的大地。这里，以山河为展厅，以地貌为展品，以地名为线索。从飞狐峪的峡谷与草甸，到赤城的温泉谷地，再到泥河湾的河谷与遗址，风景背后，还有值得细读的大地故事。这张互动地图保留二十二个资源与产业点位、总览与三维两个独立展区，以及十五张区域三维示意图。点击编号或地名，就能查看图件，聆听讲解；也可以选择主题路线，开启连续导览。现在，让我们打开这座以山河为展厅的地质博物馆。';
let preferences = {rate:1,voice:'',autoRead:true,hoverRead:false};
try {const saved=JSON.parse(localStorage.getItem('zjk-atlas-prefs')||'null');if(saved&&typeof saved==='object'){if([.8,1,1.2,1.5].includes(saved.rate))preferences.rate=saved.rate;if(typeof saved.voice==='string')preferences.voice=saved.voice;for(const k of ['autoRead','hoverRead'])if(typeof saved[k]==='boolean')preferences[k]=saved[k];}} catch {}
function savePreferences(){try{localStorage.setItem('zjk-atlas-prefs',JSON.stringify(preferences));}catch{}}
let toastTimer;
function toast(text){$('toast').textContent=text;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,4000);}

// Only one narration session can own the speech engine. Tokens invalidate late
// browser events after cancellation, navigation, rate changes, or tour changes.
class Narrator {
 constructor(){this.supported='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;this.engine=this.supported?window.speechSynthesis:null;this.token=0;this.index=0;this.state='idle';this.chunks=[];this.current=null;this.voices=[];this.done=null;this.request=null;this.watchdog=null;this.advanceTimer=null;}
 loadVoices(){
  if(!this.supported){$('voiceHint').textContent='当前浏览器不支持语音合成。文字讲解仍可完整阅读；请使用支持语音合成的浏览器。';$('voiceSelect').disabled=true;return;}
  this.voices=this.engine.getVoices().filter(v=>/^zh([_-]|$)|Chinese|中文/i.test(v.lang+' '+v.name));
  this.voices.sort((a,b)=>Number(b.localService)-Number(a.localService)||Number(/^zh-CN/i.test(b.lang))-Number(/^zh-CN/i.test(a.lang)));
  $('voiceSelect').innerHTML='<option value="">系统默认中文声音</option>';
  this.voices.forEach(v=>{const o=document.createElement('option');o.value=v.voiceURI;o.textContent=v.name+' · '+v.lang;$('voiceSelect').append(o);});
  $('voiceSelect').value=this.voices.some(v=>v.voiceURI===preferences.voice)?preferences.voice:'';
  $('voiceHint').textContent=this.voices.length?'已找到 '+this.voices.length+' 个中文声音。语音由当前设备提供，部分声音需要网络。':'语音由当前浏览器与设备提供。若无法发声，请检查音量，并在系统中安装或启用中文语音。图件与文字讲解可离线查看。';
 }
 split(text){
  const sentences=text.match(/[^。！？；\n]+[。！？；\n]?/g)||[text];const result=[];
  for(const sentence of sentences){if(sentence.length<=100){result.push(sentence);continue;}const parts=sentence.match(/[^，、：]+[，、：]?/g)||[sentence];let chunk='';for(const part of parts){if(chunk.length+part.length>100&&chunk){result.push(chunk);chunk='';}if(part.length>100){if(chunk){result.push(chunk);chunk='';}for(let i=0;i<part.length;i+=90)result.push(part.slice(i,i+90));}else chunk+=part;}if(chunk)result.push(chunk);}
  return result.filter(s=>s.trim());
 }
 play(request){
  this.stop(false);this.request=request;this.done=request.onEnd||null;this.chunks=this.split(request.text);this.index=0;
  $('audioDock').hidden=false;document.body.classList.add('narrating');$('audioTitle').textContent=request.title;
  if(!this.supported){this.state='unsupported';this.render('当前浏览器不支持语音，请阅读点位文字讲解');$('audioTranscript').textContent=request.text;return false;}
  if(!this.chunks.length){this.state='idle';return false;}
  this.state='playing';this.say(this.token);return true;
 }
 say(token){
  if(token!==this.token||this.state!=='playing')return;
  if(this.index>=this.chunks.length){this.state='ended';this.current=null;this.progress(100);this.render('播报完成');const done=this.done;this.done=null;if(done)done();return;}
  clearTimeout(this.watchdog);const chunk=this.chunks[this.index];
  // Keep displayed place names intact while helping system voices with polyphones.
  const pronounce=chunk.replace(/蔚县/g,'玉县').replace(/涿鹿/g,'捉鹿').replace(/淖尔/g,'闹尔');
  const utterance=new SpeechSynthesisUtterance(pronounce);utterance.lang='zh-CN';utterance.rate=preferences.rate;utterance.pitch=1;utterance.volume=1;
  const chosen=this.voices.find(v=>v.voiceURI===preferences.voice)||this.voices[0];if(chosen)utterance.voice=chosen;
  this.current=utterance;this.started=false;$('audioTranscript').textContent=chunk;$('audioTranscript').title=chunk;this.render('正在准备语音…');this.updateProgress();
  utterance.onstart=()=>{if(token!==this.token)return;this.started=true;clearTimeout(this.watchdog);this.render(this.state==='paused'?'已暂停':'正在播报 · '+(this.index+1)+' / '+this.chunks.length+' 段');};
  utterance.onboundary=e=>{if(token===this.token){this.updateProgress(Math.min(e.charIndex||0,chunk.length));}};
  utterance.onend=()=>{if(token!==this.token)return;clearTimeout(this.watchdog);this.current=null;this.index++;this.updateProgress();this.advanceTimer=setTimeout(()=>{if(token===this.token)this.say(token);},90);};
  utterance.onerror=e=>{if(token!==this.token)return;clearTimeout(this.watchdog);if(e.error==='interrupted'||e.error==='canceled')return;this.state='error';this.current=null;this.render('语音未能播放，可重播或更换中文声音');};
  this.engine.speak(utterance);
  this.watchdog=setTimeout(()=>{if(token!==this.token||this.started||this.state==='paused')return;this.token++;this.engine.cancel();this.current=null;this.state='error';this.render('语音未启动，请重播或在语音设置中更换中文声音');},10000);
 }
 updateProgress(offset=0){const total=this.chunks.join('').length||1;const complete=this.chunks.slice(0,this.index).join('').length+offset;this.progress(Math.round(complete/total*100));}
 progress(value){$('audioProgress').style.width=value+'%';$('audioTrack').setAttribute('aria-valuenow',String(value));}
 render(status){
  const playing=this.state==='playing';document.body.classList.toggle('is-speaking',playing&&this.started===true);$('audioStatus').textContent=status;
  $('audioToggleIcon').setAttribute('href',playing?'#i-pause':'#i-play');$('audioToggle').setAttribute('aria-label',playing?'暂停播报':'继续播报');$('audioToggle').title=playing?'暂停播报':'继续播报';$('audioToggle').disabled=!this.supported;
 }
 toggle(){
  if(!this.supported)return;
  if(this.state==='playing'){this.state='paused';clearTimeout(this.watchdog);this.engine.pause();this.render('已暂停');}
  else if(this.state==='paused'){this.state='playing';if(this.current){this.engine.resume();this.render('继续播报');if(!this.started){this.engine.cancel();this.token++;this.say(this.token);}}else this.say(this.token);}
  else this.restart();
 }
 restart(){if(this.request)this.play(this.request);}
 changeVoiceOrRate(){if(!['playing','paused'].includes(this.state))return;const paused=this.state==='paused';const idx=this.index;const request=this.request;this.stop(false);this.request=request;this.done=request.onEnd||null;this.index=idx;this.state='playing';this.say(this.token);if(paused){this.state='paused';this.engine.pause();this.render('已暂停 · 设置已更新');}}
 stop(hide=false){this.token++;clearTimeout(this.watchdog);clearTimeout(this.advanceTimer);if(this.engine){this.engine.cancel();if(this.engine.paused)this.engine.resume();}this.current=null;this.done=null;this.started=false;this.state='idle';document.body.classList.remove('is-speaking');if(hide){$('audioDock').hidden=true;document.body.classList.remove('narrating');}else this.render('已停止');}
}
const narrator=new Narrator();
let activeView='overview',activeId=null,lastFocus=null,tour=null,tourTimer=null,tourToken=0,hoverTimer=null,hoverOwner=null;
// Both maps stay on the page. Each owns its search, category, labels and zoom.
class MapPanel {
 constructor(view,root){
  this.view=view;this.root=root;this.filter='all';this.zoom=1;
  this.elements=Object.fromEntries([...root.querySelectorAll('[data-map-el]')].map(el=>[el.dataset.mapEl,el]));
  this.pins=[...root.querySelectorAll('.hotspot')];
  this.filters=[...root.querySelectorAll('[data-filter]')];
  this.elements.mainImage.src=VIEW_IMAGES[view];
 }
 ids(){return this.view==='overview'?OVERVIEW_IDS:REGIONAL_IDS;}
 matching(){
  const q=this.elements.poiSearch.value.trim().toLocaleLowerCase();
  return this.ids().filter(id=>(this.filter==='all'||id[0]===this.filter)&&(!q||[id,...Object.values(DATA[id]),...NOTES[id]].join(' ').toLocaleLowerCase().includes(q)));
 }
 render(){
  const matches=this.matching();
  this.elements.resultCount.textContent=matches.length+' 个点位';
  this.pins.forEach(pin=>{pin.hidden=!matches.includes(pin.dataset.id);pin.classList.toggle('selected',activeView===this.view&&activeId===pin.dataset.id);});
  this.elements.poiList.innerHTML=matches.length?matches.map(id=>{
   const d=DATA[id],selected=activeView===this.view&&activeId===id;
   return `<button type="button" class="poi-btn spot-${id[0].toLowerCase()}${selected?' active':''}" data-poi="${id}" aria-label="${escapeHTML(id+'：'+d.title+'，打开'+(this.view==='section'?'三维图件':'总览详情')+'与讲解')}"><span class="poi-code">${id}</span><span class="poi-copy"><strong>${escapeHTML(d.title)}</strong><small>${escapeHTML(d.type)}</small></span>${icon('arrow')}</button>`;
  }).join(''):'<p class="empty-state">暂未找到匹配的点位。<br>试试其他地名，或切换到「全部」。</p>';
 }
 setFilter(value){
  this.filter=value;
  this.filters.forEach(button=>{const on=button.dataset.filter===value;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
  this.render();
 }
 resetFilters(){this.elements.poiSearch.value='';this.setFilter('all');}
 zoomTo(value){
  const {stage,stageFrame,zoomValue,zoomOut,zoomIn}=this.elements;
  const oldWidth=stage.getBoundingClientRect().width||1;
  const center=(stageFrame.scrollLeft+stageFrame.clientWidth/2)/oldWidth;
  this.zoom=Math.max(1,Math.min(2,value));
  stage.style.width=this.zoom*100+'%';zoomValue.textContent=Math.round(this.zoom*100)+'%';
  zoomOut.disabled=this.zoom===1;zoomIn.disabled=this.zoom===2;
  stageFrame.scrollLeft=Math.max(0,center*(stage.getBoundingClientRect().width||1)-stageFrame.clientWidth/2);
 }
 bind(){
  const el=this.elements;
  el.poiList.addEventListener('click',event=>{const button=event.target.closest('[data-poi]');if(button){setView(this.view);openDetail(button.dataset.poi);}});
  el.poiSearch.addEventListener('input',()=>{activeView=this.view;this.render();});
  this.filters.forEach(button=>button.addEventListener('click',()=>{activeView=this.view;this.setFilter(button.dataset.filter);}));
  if(el.labelsBtn)el.labelsBtn.addEventListener('click',()=>{const on=el.stage.classList.toggle('labels-visible');el.labelsBtn.setAttribute('aria-pressed',String(on));});
  el.zoomIn.addEventListener('click',()=>this.zoomTo(this.zoom+.25));
  el.zoomOut.addEventListener('click',()=>this.zoomTo(this.zoom-.25));
  el.zoomReset.addEventListener('click',()=>{this.zoomTo(1);el.stageFrame.scrollLeft=0;el.stageFrame.scrollTop=0;});
 }
}
const hotspots=[...document.querySelectorAll('.hotspot')];
const mapPanels=Object.fromEntries(['overview','section'].map(view=>[view,new MapPanel(view,document.querySelector('[data-map-view="'+view+'"]'))]));
Object.values(mapPanels).forEach(panel=>{panel.bind();panel.render();panel.zoomTo(1);});
const allowedIds=(view=activeView)=>mapPanels[view].ids();
function matchingIds(view=activeView){return mapPanels[view].matching();}
function renderIndex(view=null){if(view)mapPanels[view].render();else Object.values(mapPanels).forEach(panel=>panel.render());}
function setZoom(value,view=activeView){mapPanels[view].zoomTo(value);}
function setView(view,{announce=false,preserveTour=false}={}){
 if(!Object.hasOwn(mapPanels,view))view='overview';
 if(!preserveTour)stopTour();
 activeView=view;renderIndex();
 if(announce)toast(view==='overview'?'总览展区已就绪':'三维展区已就绪，点击区域标签查看图件');
 return view;
}

function narrationText(id){const d=DATA[id];const industrial=/^[DE]/.test(id);return `${d.title}。点位类型，${d.type}。${NOTES[id][1]}${industrial?'所在区域':'地貌特征'}，${d.geomorph.replaceAll('/','、')}。区域特色，${d.feature.replaceAll('/','、')}。${industrial?'产业方向':'适宜方向'}，${d.direction.replaceAll('/','、')}。${activeView==='section'?'当前展示的是区域地貌与地下岩体分解示意图，图件用于辅助理解，不作为实测剖面。':''}`;}
function speakDetail(){if(!activeId)return;const serial=tourToken;narrator.play({title:(tour?tour.title+' · ':'')+DATA[activeId].title,text:narrationText(activeId),onEnd:()=>{if(tour&&serial===tourToken){$('audioStatus').textContent='本处讲解结束，即将前往下一处';tourTimer=setTimeout(()=>{if(tour&&serial===tourToken)advanceTour(1);},1300);}}});}
function openDetail(id,rememberFocus=true,{fromTour=false,forceRead=false}={}){
 if(!Object.hasOwn(DATA,id)||!allowedIds().includes(id))return false;
 clearTimeout(hoverTimer);hoverOwner=null;if(!fromTour)stopTour();clearTimeout(tourTimer);narrator.stop(true);
 if(rememberFocus&&!$('modal').classList.contains('open'))lastFocus=document.activeElement;
 activeId=id;const item=DATA[id];const model=activeView==='section'&&Object.hasOwn(REGIONAL_3D_IMAGES,id);const industrial=/^[DE]/.test(id);
 $('detailCode').textContent=id;$('detailCode').className='detail-code spot-'+id[0].toLowerCase();$('detailTitle').textContent=item.title;$('detailSubtitle').textContent=item.type+' · '+(model?'区域三维分解图':'资源与产业观察');
 $('detailImage').src=model?REGIONAL_3D_IMAGES[id]:DETAIL_IMAGES[id];$('detailImage').alt=item.title+(model?'区域地貌与地下岩体分解示意图':'资源与区域示意图');
 $('detailShortTitle').textContent=NOTES[id][0];$('detailExplanation').textContent=NOTES[id][1];for(const [key,field] of [['mType','type'],['mGeomorph','geomorph'],['mFeature','feature'],['mDirection','direction']])$(key).textContent=item[field];$('geomorphLabel').textContent=industrial?'所在区域':'地貌特征';
 $('detailCaption').textContent=model?'区域地貌与地下岩体分解示意图，仅作辅助理解；具体层位与岩性应以专业调查资料为准。':industrial?(id==='D1'||id==='D5'?'原网页产业分区与区域资源示意图。':'原网页总览图局部，辅助定位该产业点位。'):'原网页分区地貌与旅游资源示意图。';
 $('switchDetailView').hidden=!REGIONAL_IDS.includes(id);$('switchDetailView').textContent=model?'在总览展区查看本点位':'在三维展区查看本点位';
 $('tourProgress').hidden=!tour;if(tour)$('tourLabel').textContent=tour.title+' · 第 '+(tour.index+1)+' / '+tour.ids.length+' 处';
 hotspots.forEach(pin=>pin.classList.toggle('selected',pin.dataset.id===id&&pin.dataset.view===activeView));renderIndex();
 $('modal').classList.add('open');$('modal').setAttribute('aria-hidden','false');document.body.classList.add('modal-visible');$('detailCard').scrollTop=0;setSettings(false,false);$('closeBtn').focus({preventScroll:true});
 if(preferences.autoRead||forceRead||fromTour)speakDetail();return true;
}
function closeDetail(){if(!$('modal').classList.contains('open'))return;stopTour();narrator.stop(true);$('modal').classList.remove('open');$('modal').setAttribute('aria-hidden','true');document.body.classList.remove('modal-visible');hotspots.forEach(pin=>pin.classList.remove('selected'));activeId=null;renderIndex();if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});}
function moveDetail(delta){if(tour)return advanceTour(delta);if(!activeId)return false;const list=matchingIds();const ids=list.includes(activeId)&&list.length?list:allowedIds();const idx=ids.indexOf(activeId);return openDetail(ids[(idx+delta+ids.length)%ids.length],false);}
function stopTour(){tourToken++;clearTimeout(tourTimer);tour=null;$('tourProgress').hidden=true;}
function startTour(key){const source=TOURS[key];if(!source)return;closeDetail();stopTour();narrator.stop(true);mapPanels.overview.resetFilters();setView('overview');tour={...source,index:0};openDetail(tour.ids[0],true,{fromTour:true,forceRead:true});}
function advanceTour(delta){if(!tour)return false;const next=tour.index+delta;if(next>=tour.ids.length){const title=tour.title;stopTour();narrator.done=null;narrator.stop(false);narrator.state='ended';narrator.progress(100);narrator.render('主题导览已完成');toast('「'+title+'」导览完成，可以继续自由探索');return true;}tour.index=(next+tour.ids.length)%tour.ids.length;clearTimeout(tourTimer);return openDetail(tour.ids[tour.index],false,{fromTour:true,forceRead:true});}
function setSettings(open,restoreFocus=true){$('settingsPanel').hidden=!open;$('settingsBtn').setAttribute('aria-expanded',String(open));if(open){narrator.loadVoices();$('closeSettings').focus();}else if(restoreFocus)$('settingsBtn').focus();}
function setRate(rate){preferences.rate=Number(rate);$('dockRate').value=String(rate);$('settingsRate').value=String(rate);savePreferences();narrator.changeVoiceOrRate();}
// UI wiring; delegation keeps dynamically filtered buttons keyboard accessible.
// Maps have separate sections; point interactions select their own detail context.
hotspots.forEach(pin=>{
 pin.addEventListener('click',()=>{setView(pin.dataset.view);openDetail(pin.dataset.id);});
 const schedule=()=>{clearTimeout(hoverTimer);if(!preferences.hoverRead||!$('audioDock').hidden||$('modal').classList.contains('open')||!$('settingsPanel').hidden)return;hoverTimer=setTimeout(()=>{if(pin.hidden)return;hoverOwner=pin;narrator.play({title:'地名 · '+DATA[pin.dataset.id].title,text:DATA[pin.dataset.id].title+'。'});},650);};
 const clear=()=>{clearTimeout(hoverTimer);if(hoverOwner===pin){hoverOwner=null;narrator.stop(true);}};
 pin.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')schedule();});pin.addEventListener('pointerleave',clear);pin.addEventListener('focus',schedule);pin.addEventListener('blur',clear);
});
$('prevBtn').addEventListener('click',()=>moveDetail(-1));$('nextBtn').addEventListener('click',()=>moveDetail(1));$('closeBtn').addEventListener('click',closeDetail);document.querySelector('[data-close]').addEventListener('click',closeDetail);
$('switchDetailView').addEventListener('click',()=>{const id=activeId;stopTour();const view=setView(activeView==='overview'?'section':'overview');mapPanels[view].root.scrollIntoView({behavior:'auto',block:'start'});lastFocus=mapPanels[view].root.querySelector('h2');openDetail(id,false);});
$('readDetailBtn').addEventListener('click',()=>{stopTour();speakDetail();});
$('introBtn').addEventListener('click',()=>{stopTour();narrator.play({title:'开馆序言 · 被冬奥光环遮住的地质博物馆',text:INTRO});});
document.querySelectorAll('[data-tour]').forEach(b=>b.addEventListener('click',()=>startTour(b.dataset.tour)));
$('endTourBtn').addEventListener('click',()=>{stopTour();narrator.done=null;toast('已结束连续导览，可继续阅读当前点位');});
$('audioToggle').addEventListener('click',()=>{clearTimeout(tourTimer);if(narrator.state==='ended'&&tour){advanceTour(1);return;}narrator.toggle();});
$('audioRestart').addEventListener('click',()=>{clearTimeout(tourTimer);narrator.restart();});
$('audioClose').addEventListener('click',()=>{stopTour();narrator.stop(true);if($('modal').classList.contains('open'))$('readDetailBtn').focus();else $('introBtn').focus({preventScroll:true});});
$('dockRate').addEventListener('change',e=>setRate(e.target.value));$('settingsRate').addEventListener('change',e=>setRate(e.target.value));
$('voiceSelect').addEventListener('change',e=>{preferences.voice=e.target.value;savePreferences();narrator.changeVoiceOrRate();});
$('autoRead').addEventListener('change',e=>{preferences.autoRead=e.target.checked;savePreferences();});$('hoverRead').addEventListener('change',e=>{preferences.hoverRead=e.target.checked;savePreferences();if(!preferences.hoverRead&&hoverOwner){hoverOwner=null;narrator.stop(true);}});
$('settingsBtn').addEventListener('click',()=>setSettings($('settingsPanel').hidden));$('dockSettingsBtn').addEventListener('click',()=>setSettings(true));$('closeSettings').addEventListener('click',()=>setSettings(false));
document.addEventListener('pointerdown',e=>{if(!$('settingsPanel').hidden&&!e.target.closest('#settingsPanel,#settingsBtn,#dockSettingsBtn'))setSettings(false,false);});
$('fullscreenBtn').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('当前环境不支持全屏，可使用浏览器的全屏功能');}catch{toast('当前环境未能进入全屏，可使用浏览器的全屏功能');}});
document.addEventListener('fullscreenchange',()=>{const isFull=!!document.fullscreenElement;$('fullscreenLabel').textContent=isFull?'退出全屏':'全屏展示';$('fullscreenBtn').title=isFull?'退出全屏展示':'进入全屏展示';});
document.addEventListener('keydown',event=>{
 if(!$('settingsPanel').hidden){if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setSettings(false);return;}if(event.key==='Tab'){const all=[...$('settingsPanel').querySelectorAll('button,select,input')].filter(e=>!e.disabled);trapFocus(event,all);}return;}
 if(!$('modal').classList.contains('open'))return;
 const isEditing=/INPUT|SELECT|TEXTAREA/.test(event.target.tagName);
 if(event.key==='Escape'){event.preventDefault();closeDetail();return;}
 if(!isEditing&&event.key==='ArrowLeft'){event.preventDefault();moveDetail(-1);}
 if(!isEditing&&event.key==='ArrowRight'){event.preventDefault();moveDetail(1);}
 if(event.key==='Tab'){const focusables=[...$('detailCard').querySelectorAll('button:not([disabled]),[tabindex="0"]'),...(!$('audioDock').hidden?$('audioDock').querySelectorAll('button:not([disabled]),select'):[])].filter(el=>!el.hidden&&el.getClientRects().length>0);trapFocus(event,focusables);}
});
function trapFocus(event,list){if(!list.length)return;const first=list[0],last=list.at(-1);if(event.shiftKey&&(document.activeElement===first||!list.includes(document.activeElement))){event.preventDefault();last.focus();}else if(!event.shiftKey&&(document.activeElement===last||!list.includes(document.activeElement))){event.preventDefault();first.focus();}}
window.addEventListener('pagehide',()=>{stopTour();narrator.stop(true);});
// Images stay embedded in one file; the original map bytes and data are retained.
// The cover uses the supplied artwork; map assets remain available in the original views.
const resources=[['T1','展窗 01 / 冰雪与山地','崇礼 · 雪道之外'],['P3','展窗 02 / 峡谷与草甸','蔚县 · 峡谷之上'],['P2','展窗 03 / 温泉与谷地','赤城 · 山间暖泉'],['T6','展窗 04 / 河谷与遗址','阳原 · 大地记忆'],['T2','展窗 05 / 高原与丘陵','张北 · 天路起伏'],['T7','展窗 06 / 湖盆与河谷','怀来 · 山水之间']];
$('resourceGrid').innerHTML=resources.map(([id,tag,title])=>`<button class="resource-card" data-resource="${id}" aria-label="探索${escapeHTML(DATA[id].title)}"><div class="resource-image"><img loading="lazy" decoding="async" alt="${escapeHTML(DATA[id].title)}示意图" data-image="${id}"></div><div class="resource-copy"><div class="resource-kicker"><span>${tag}</span><span>${id}</span></div><h3>${title}</h3><p>${escapeHTML(DATA[id].feature)}</p><span class="resource-link">打开这扇展窗${icon('arrow')}</span></div></button>`).join('');
document.querySelectorAll('[data-image]').forEach(img=>img.src=DETAIL_IMAGES[img.dataset.image]);$('resourceGrid').addEventListener('click',e=>{const card=e.target.closest('[data-resource]');if(card){setView('overview');openDetail(card.dataset.resource);}});
$('dockRate').value=$('settingsRate').value=String(preferences.rate);$('autoRead').checked=preferences.autoRead;$('hoverRead').checked=preferences.hoverRead;
narrator.loadVoices();if(narrator.supported){if(typeof window.speechSynthesis.addEventListener==='function')window.speechSynthesis.addEventListener('voiceschanged',()=>narrator.loadVoices());else window.speechSynthesis.onvoiceschanged=()=>narrator.loadVoices();}setView('overview');
window.__mapTest={DATA,NOTES,OVERVIEW_IDS,REGIONAL_IDS,setView,setZoom,openDetail,closeDetail,moveDetail,startTour,stopTour,narrator,mapPanels,getState:()=>({activeView,activeId,filter:mapPanels[activeView].filter,zoomLevel:mapPanels[activeView].zoom,panels:Object.fromEntries(Object.entries(mapPanels).map(([view,p])=>[view,{filter:p.filter,zoomLevel:p.zoom,query:p.elements.poiSearch.value}])),tour:tour?{...tour}:null,speech:narrator.state})};
