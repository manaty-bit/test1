/* Stage selection — six chapters always open. Preserves stored cases, answers and certificates. */
(() => {
 'use strict';
 const byId=id=>document.getElementById(id);
 const totalSolved=()=>cases.reduce((n,_,i)=>n+Number(state.solved[i]!==undefined),0);
 const allSolved=()=>totalSolved()===cases.length;
 const stageIndices=rank=>cases.map((c,i)=>c.rank===rank?i:-1).filter(i=>i>=0);
 const completed=rank=>stageIndices(rank).every(i=>state.solved[i]!==undefined);
 const stageCount=rank=>stageIndices(rank).filter(i=>state.solved[i]!==undefined).length;
 const uncompletedRankAfter=rank=>{
  for(let x=1;x<=rankInfo.length;x++){
   const r=(rank+x)%rankInfo.length;
   if(!completed(r))return r;
  }
  return null;
 };
 const style=document.createElement('style');
 style.textContent=`
 .rank-item.stage-link{display:flex;width:100%;font:inherit;text-align:left;color:inherit;cursor:pointer}
 .rank-item.stage-link:hover,.rank-item.stage-link:focus-visible{opacity:1;background:#e8be6524;border-color:#e8be6588;outline-offset:2px}
 .rank-item.stage-link:focus-visible{outline:2px solid #f5d68a}
 .stage-dialog{border:1px solid #e6c68d;border-radius:22px;background:linear-gradient(155deg,#1a3048,#0e1b2d);color:#f4f0e6;box-shadow:0 25px 85px #000b;width:min(780px,calc(100vw - 20px));max-height:min(91dvh,830px);padding:0;overflow:auto}
 .stage-dialog::backdrop{background:#07101bcc;backdrop-filter:blur(3px)}
 .stage-dialog-head{position:sticky;top:0;z-index:1;background:#12243a;border-bottom:1px solid #f5d68a55;padding:15px 18px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
 .stage-dialog-head small{color:#e8be65;font-size:10px;letter-spacing:.15em;font-weight:900}
 .stage-dialog-head h2{font-family:var(--serif,serif);font-size:clamp(20px,3.5vw,28px);margin:3px 0 0;color:#fff0cc}
 .stage-dialog-close{flex:none;border:1px solid #8ea3b5;background:#20374d;border-radius:9px;color:#fff;padding:8px 12px;font-size:12px;font-weight:800}
 .stage-dialog-inner{padding:14px 18px 18px}
 .stage-dialog-hint{font-size:12px;color:#bbccda;margin:0 0 12px;line-height:1.65}
 .stage-dialog-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
 .stage-tile{display:flex;width:100%;align-items:center;text-align:left;gap:11px;min-width:0;background:#233a52;border:1px solid #6b8496;border-radius:13px;color:#f8f5e9;padding:12px;min-height:105px}
 .stage-tile:hover,.stage-tile:focus-visible{background:#304d61;border-color:#f4d68a}
 .stage-tile.is-active{background:#4b4435;border-color:#f4cc79}
 .stage-tile.is-complete{border-color:#6cbaa4}
 .stage-tile-mark{flex:0 0 42px;height:42px;border-radius:12px;display:grid;place-items:center;background:#e8be6520;border:1px solid #e8be6599;font-size:23px}
 .stage-tile-body{min-width:0;flex:1;display:flex;flex-direction:column;gap:2px}
 .stage-tile-body strong{font-size:14px;color:#fff2ce;line-height:1.3}
 .stage-tile-body small{color:#c5d9e3;font-size:11px;line-height:1.4}
 .stage-tile-foot{color:#f3da97;font-size:11px;font-weight:900;margin-top:3px}
 .stage-dialog-bottom{margin:14px 0 0;padding:10px 12px;background:#0b2033;border:1px solid #4c7782;border-radius:10px;font-size:12px;color:#dce3d6;line-height:1.6}
 .stage-dialog-result{width:100%;margin-top:12px;background:#e8be65;color:#202639;border:0;border-radius:9px;padding:10px;font-weight:900}
 .stage-nav-btn{border-color:#e8be6580!important;color:#ffdda1!important}
 @media(max-width:700px){.stage-dialog-grid{grid-template-columns:1fr}.stage-dialog-head{padding:12px}.stage-dialog-inner{padding:11px}.stage-tile{min-height:79px;padding:10px}.topbar{flex-wrap:wrap}.top-actions{flex-wrap:wrap;justify-content:flex-end;gap:5px}.stage-nav-btn{font-size:11px}}
 @media(max-width:920px){.rail #rank-nav .rank-item.stage-link{min-width:0;justify-content:center;display:flex}.rail #rank-nav .rank-item.stage-link .rank-number{flex:none}.rail-heading{display:block;text-align:center;margin:0 0 5px!important;font-size:10px!important;letter-spacing:.07em!important}}
 `;
 document.head.appendChild(style);
 const stageButton=document.createElement('button');
 stageButton.id='stage-menu-btn';stageButton.className='smallbtn stage-nav-btn';stageButton.type='button';
 stageButton.textContent='🗂 ステージ選択';stageButton.title='どのステージからでも挑戦できます';
 byId('archive-btn').before(stageButton);
 const dialog=document.createElement('dialog');dialog.id='stage-dialog';dialog.className='stage-dialog';
 dialog.setAttribute('aria-label','挑戦するステージを選ぶ');
 dialog.innerHTML='<div class="stage-dialog-head"><div><small>SECRET MISSION MAP · 全6ステージ開放</small><h2>🗂 どの事件から捜査する？</h2></div><button type="button" id="stage-dialog-close" class="stage-dialog-close">閉じる ✕</button></div><div class="stage-dialog-inner"><p class="stage-dialog-hint">どの章からでも挑戦OK。途中まで解いた章は、未解決の事件から再開するぞ。</p><div class="stage-dialog-grid" id="stage-dialog-grid"></div><div class="stage-dialog-bottom">🎖 各章の事件をすべて解決すると、探偵名入りの認定証を発行。全54事件を解決すると最終称号を獲得！</div><button type="button" id="stage-dialog-result" class="stage-dialog-result hidden">🏆 全事件クリアの記録を見る</button></div>';
 document.body.appendChild(dialog);
 const hide=()=>{if(dialog.open)dialog.close();else dialog.removeAttribute('open');};
 function renderStageMenu(){
  const current=state.index<cases.length?cases[state.index]?.rank:null;
  byId('stage-dialog-grid').innerHTML=rankInfo.map((r,rank)=>{
   const all=stageIndices(rank).length,done=stageCount(rank),award=!!state.awards?.[rank];
   const active=current===rank&&!state.finished;
   const status=award?'🏅 認定証 獲得済み':`${done} / ${all} 事件 解決`;
   return `<button type="button" class="stage-tile ${active?'is-active':''} ${award?'is-complete':''}" data-stage="${rank}" aria-label="第${rank+1}章 ${esc(r[0])}、${done}問解決、選択して開始"><span class="stage-tile-mark">${chapterIcons[rank]}</span><span class="stage-tile-body"><strong>第${rank+1}章 · ${esc(r[0])}</strong><small>${esc(r[1])}</small><span class="stage-tile-foot">${status} · ${done===all?'最初から見直す':'続きから捜査'}</span></span></button>`;
  }).join('');
  byId('stage-dialog-result').classList.toggle('hidden',!allSolved());
  dialog.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>chooseStage(Number(b.dataset.stage))));
 }
 function openStageMenu(){
  if(!state.name){view('start');byId('join-name').focus();return;}
  renderStageMenu();
  if(typeof dialog.showModal==='function'&&!dialog.open)dialog.showModal();else dialog.setAttribute('open','');
 }
 function chooseStage(rank){
  if(!Number.isInteger(rank)||rank<0||rank>=rankInfo.length)return;
  if(!state.name){hide();view('start');byId('join-name').focus();return;}
  const indices=stageIndices(rank),next=indices.find(i=>state.solved[i]===undefined);
  state.index=next??indices[0];state.finished=false;save();hide();render();
  if(window.matchMedia('(max-width:899px)').matches)window.scrollTo({top:0,behavior:'instant'});
 }
 const priorDrawRail=drawRail;
 drawRail=function(){
  const rank=state.index<cases.length?cases[state.index].rank:-1;
  byId('rank-nav').innerHTML=rankInfo.map((r,i)=>{
   const done=!!state.awards?.[i],active=i===rank&&!state.finished,progress=stageCount(i);
   return `<button type="button" class="rank-item stage-link ${done?'done':''} ${active?'active':''}" data-stage="${i}" title="第${i+1}章：${esc(r[0])}（${progress}/${stageIndices(i).length}事件解決）" aria-label="第${i+1}章 ${esc(r[0])}に移動" ${active?'aria-current="step"':''}><span class="rank-number">${done?'✓':i+1}</span><span class="rank-desc"><strong>${esc(r[0])}</strong>${esc(r[1])}${done?'<span class="tiny-earned">🎖 認定済</span>':''}</span></button>`;
  }).join('');
  byId('rank-nav').querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>chooseStage(Number(b.dataset.stage))));
 };
 const oldRender=render;
 render=function(...args){
  if(state.index>=cases.length){
   if(allSolved()){finish();return;}
   state.index=cases.findIndex((c,i)=>state.solved[i]===undefined);
  }
  const r=oldRender.apply(this,args);
  const num=totalSolved();
  byId('progress-fill').style.width=`${100*num/cases.length}%`;
  byId('progress-track').setAttribute('aria-valuenow',String(num));
  return r;
 };
 ensureAward=function(rank){
  state.awards=state.awards||{};
  if(state.awards[rank]||!completed(rank))return;
  const indices=stageIndices(rank),miss=indices.reduce((n,i)=>n+(state.eliminated[i]||[]).length,0);
  const hints=indices.reduce((n,i)=>n+Number(!!state.hintUsed[i]),0);
  const score=indices.reduce((n,i)=>n+(state.solved[i]===undefined?0:Math.max(40,100-((state.eliminated[i]||[]).length*20)-(state.hintUsed[i]?15:0))),0);
  state.awards[rank]={name:state.name,date:new Date().toISOString(),totalMiss:state.miss,totalHints:state.hints,miss,hints,score};
  save();updateMemberUI();
 };
 advance=function(){
  const q=cases[state.index];
  if(!q)return openStageMenu();
  if(!isChapterLast(state.index)){state.index++;save();render();return;}
  if(allSolved()){finish();return;}
  const next=uncompletedRankAfter(q.rank);
  if(next===null){openStageMenu();return;}
  chooseStage(next);
 };
 solvedAction=function(){
  const q=cases[state.index],last=isChapterLast(state.index);
  if(last&&completed(q.rank))ensureAward(q.rank);
  const b=document.createElement('button');b.className='goldbtn';
  b.textContent=last?(completed(q.rank)?`🎖 第${q.rank+1}章の認定証を受け取る`:'次の未解決事件へ →'):'次の事件へ →';
  b.onclick=last&&completed(q.rank)?()=>showAward(q.rank,true):advance;
  byId('feedback-actions').appendChild(b);
 };
 finish=function(){
  if(!allSolved()){state.finished=false;openStageMenu();return;}
  for(let rank=0;rank<rankInfo.length;rank++)ensureAward(rank);
  state.finished=true;state.index=cases.length;save();view('result');
  const perfect=state.miss===0&&state.hints===0;
  byId('result-medal').textContent=perfect?'🥇':'🏆';
  byId('result-title').textContent=`${state.name}、全事件解決！`;
  byId('result-lead').textContent=perfect?'6つの章をノーミス・ノーヒントで突破。団長も認める、証明探偵団の名探偵だ！':'最後の謎まで解き明かした！ よくやった。次は選択肢を見ずに、自分の言葉で証明してみよう。';
  byId('end-score').textContent=state.score;byId('end-miss').textContent=state.miss;byId('end-hints').textContent=state.hints;
 };
 returnFromAward=function(){
  const was=awardFromCheckpoint;
  closeAward();
  if(was)advance();else showArchive();
 };
 const oldDrawIntro=drawIntro;
 drawIntro=function(...args){const v=oldDrawIntro.apply(this,args);if(state.name&&state.index<cases.length&&!state.finished){byId('start-btn').textContent=`🔎 捜査を再開（${totalSolved()}/${cases.length}事件解決）`;}return v;};
 stageButton.addEventListener('click',openStageMenu);
 byId('stage-dialog-close').addEventListener('click',hide);
 byId('stage-dialog-result').addEventListener('click',()=>{hide();finish();});
 dialog.addEventListener('click',e=>{if(e.target===dialog)hide();});
 // Make switching stages discoverable immediately on the first visit.
 const heading=document.querySelector('.rail-heading');
 if(heading)heading.textContent='🗺 章を選ぶ（全ステージ開放）';
 const note=document.querySelector('.rail-tip');
 if(note)note.textContent='章番号をタップして自由に切り替えられる。認定証は各章の全事件を解決すると発行！';
 if(!state.name)stageButton.classList.add('hidden');
 const oldUpdateMember=updateMemberUI;
 updateMemberUI=function(...args){const v=oldUpdateMember.apply(this,args);stageButton.classList.toggle('hidden',!state.name);return v;};
 if(state.name&&state.finished&&allSolved())finish();
 if(state.name&&!state.finished&&!byId('game-screen').classList.contains('hidden'))render();
})();
