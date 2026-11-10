/* PROOF RUSH — Japanese / English interface. Mathematical answers remain language-neutral. */
(()=>{
'use strict';
const KEY='proof-rush-language-v1';
let language='ja';
try{language=localStorage.getItem(KEY)==='en'?'en':'ja'}catch(e){}
const dictionary=[
['2組の辺とその間の角がそれぞれ等しい。','Two pairs of corresponding sides and their included angles are equal.'],
['1組の辺とその両端の角がそれぞれ等しい。','One pair of corresponding sides and their adjacent angles are equal.'],
['3組の辺がそれぞれ等しい。','Three pairs of corresponding sides are equal.'],
['図の同じ印の辺・角はそれぞれ等しい','Matching marks indicate equal sides or equal angles'],
['合同な図形の対応する辺はそれぞれ等しいので、','Since corresponding sides of congruent triangles are equal,'],
['合同な図形の対応する角はそれぞれ等しいので、','Since corresponding angles of congruent triangles are equal,'],
['平行線の錯角は等しいから','Alternate interior angles are equal'],
['対頂角は等しいから','Vertically opposite angles are equal'],
['共通な辺だから','They share the same side'],
['仮定より','Given'],
['合同条件の入口','Recognize Congruence'],
['対応する辺と角','Matching Sides & Angles'],
['証明の地下道','Build the Proof'],
['合同の宝箱','Use Congruence'],
['最深部の証明','Advanced Proofs'],
['図を見て3つの合同条件を選ぶ','Identify the three triangle congruence conditions'],
['三角形と等しい3組を見つける','Match vertices and three equal pairs'],
['仮定・共通な辺の理由も考える','Explain the given facts and shared sides'],
['合同を使って辺や角を証明','Prove equal sides or angles using congruence'],
['平行線・錯角・対頂角にも挑戦','Use parallel lines and angle properties'],
['左右の角を証明','Prove Two Angles Equal'],
['左右の辺を証明','Prove Two Sides Equal'],
['向かい合う辺を証明','Prove Opposite Sides Equal'],
['別々の三角形の角','Two Separate Triangles: Angles'],
['別々の三角形の辺','Two Separate Triangles: Sides'],
['2つの角を使う証明','Prove Using Two Angles'],
['共通な辺とその間の角','A Shared Side and Included Angle'],
['回転した三角形','Rotated Triangles'],
['左右反転した三角形','Reflected Triangles'],
['平行線と共通な辺','Parallel Lines and Shared Side'],
['2組の平行線と錯角','Two Pairs of Parallel Lines'],
['対頂角を使って角を証明','Prove Angles Using Vertical Angles'],
['3組の辺を見つけよう','Find Three Equal Side Pairs'],
['2組の辺と間の角','Two Sides and Included Angle'],
['1組の辺と両端の角','One Side and Adjacent Angles'],
['合同に使う2つの三角形を選ぼう','Choose the two triangles to prove congruent'],
['合同を正しく表す式は？','Which expression correctly shows congruence?'],
['使える合同条件は？','Which congruence condition applies?'],
['合同から結論を導く理由は？','Why does the conclusion follow from congruence?'],
['最後に証明する式は？','Which equality completes the proof?'],
['図の印を見ながら、対応する頂点の順序を考えよう。','Use the marks to match corresponding vertices in the right order.'],
['平行線からわかる錯角と、2つの三角形の共通な辺に注目。','Look for alternate interior angles and a side shared by the triangles.'],
['与えられた角と、その両端を結ぶ辺に注目。','Look at the given angles and the side between them.'],
['2組の辺と、その間の角に注目しよう。','Look for two corresponding side pairs and the included angle.'],
['3組の辺の等しさを集めよう。','Find three pairs of equal corresponding sides.'],
['仮定・共通な辺・対頂角・平行線の性質から、使える理由を探そう。','Use the givens, shared sides, vertical angles, or properties of parallel lines.'],
['集めた等しさは「辺」が何組、「角」が何組かな？','How many pairs of sides and angles have you matched?'],
['合同な三角形どうしは「≡」で表す。辺・角の等しさと区別し、頂点の対応順を確かめよう。','Use ≡ for congruent triangles, and = for equal sides or angles. Check the vertex order.'],
['結論で示すのは「辺」の等しさ？「角」の等しさ？','Are you proving equal sides or equal angles?'],
['図の下にある目標を確認しよう。','Check the GOAL below the diagram.'],
['2つの三角形の頂点の対応順を、図で確認しよう。','Check the order of corresponding vertices in the diagram.'],
['三角形どうしの合同は「≡」。頂点の順番も確かめよう。','Triangles use ≡. Check the order of the vertices.'],
['同じ印の辺・角と対応関係に注目。記号の違いではなく根拠を考えよう。','Look for matching side/angle marks and explain why they are equal.'],
['「仮定」「共通」「対頂角」「錯角」のどれからいえるか考えよう。','Use the givens, a shared side, vertical angles, or alternate interior angles.'],
['辺と角の組数、角の位置を図で確認しよう。','Count the side and angle pairs, and check where the angles lie.'],
['証明したい結論が辺なのか角なのかを確認。','Check whether the conclusion concerns a side or an angle.'],
['GOALで示したい辺の長さ・角の大きさと対応関係を確認しよう。','Check the target equality and corresponding parts in the GOAL.'],
['対応する頂点を確かめよう','Check the corresponding vertices'],
['図の印から等しい組を探そう','Find equal pairs in the diagram'],
['その等しさの理由を考えよう','Explain why they are equal'],
['合同条件を決めよう','Choose the congruence condition'],
['三角形の合同を示そう','Show triangle congruence'],
['合同からわかることは？','What follows from congruence?'],
['最後の結論を完成させよう','Complete the conclusion'],
['正しい答えで道を開こう','Choose correctly to clear the path'],
['正解するとモグラが掘り進む','Correct answers help the mole dig'],
['考える × 掘り進む · 16-BIT','THINK × DIG · 16-BIT'],
['図を見て考えよう','Study the diagram'],
['図を拡大して見る（制限時間は停止）','Enlarge the diagram (timer pauses)'],
['証明に使う図形','Diagram for the proof'],
['問題の図形','Problem diagram'],
['正しい証明の道を掘り進もう！','Dig your way through the proof!'],
['ヘビに追いつかれるまでの残り時間とライフ','Remaining time and lives'],
['証明の進行','Proof progress'],
['土を掘りながら自動で下へ逃げるモグラと追いかけるヘビのドット絵','Pixel-art mole digging down as a snake chases it'],
['ヘビの追跡状況','Snake pursuit progress'],
['ゲームメニュー','Game menu'],
['証明のパーツ選択','Choose the proof step'],
['証明の道','Proof path'],
['図を読む → 根拠を探す → 証明する','Read diagram → Find reasons → Prove'],
['モグラは自動で土を掘って進む！','The mole digs automatically!'],
['上から追ってくるヘビにつかまる前に','Before the snake catches you'],
['正しい言葉・式・記号を選ぼう。','choose the right words, equations and symbols.'],
['正解すれば掘り進む！ ヘビの追跡から逃げ切ろう！','Each correct answer helps you dig deeper and escape!'],
['ヘビから逃げて証明完成！','Escape the snake and complete the proof!'],
['RUSH専用：3回のライフで地下の証明を突破しよう','RUSH: Complete the proofs with three lives'],
['三角形の合同条件は教科書表記。等しい式を選んだら、その理由も選ぼう。順番は自由！','Congruence conditions use textbook wording. Choose equalities and explain why they hold.'],
['まずはゲームをスタートしよう！','Start the game!'],
['スタートすると選択肢が現れます。','Your choices will appear here.'],
['正しい道を選んで、モグラを助けよう。','Choose the correct path to help the mole.'],
['土を掘ってヘビから逃げよう！','Dig fast and escape the snake!'],
['ヘビ接近中','Snake approaching'],
['正しい答えで道を開こう','Choose the right answer to dig'],
['証明の道を掘ろう','Dig the proof path'],
['ヘビが迫る前に、正しい答えを選ぼう！','Choose the right answer before the snake catches up!'],
['🐍 ヘビが上から迫ってくる！','🐍 The snake is coming!'],
['正解！ ヘビを引き離した！','Correct! You escaped the snake!'],
['🐍 ヘビを引き離した！','🐍 You pulled ahead!'],
['🐍 ヘビが近い！ 急いで！','🐍 The snake is close! Hurry!'],
['🐍 ヘビに追いつかれた！','🐍 The snake caught you!'],
['つかまった！ 同じ関門から再挑戦','Caught! Try this step again'],
['ライフがなくなった！','Out of lives!'],
['掘り進め！','Keep digging!'],
['つかまった！','Caught!'],
['🐍 追跡中','🐍 Chasing!'],
['ヘビから逃げて、証明を完成させろ！','Escape the snake and complete the proof!'],
['やさしい問題から本格的な証明へ。クリアはこのブラウザに保存されます。','Progress from basics to full proofs. Completed stages are saved in this browser.'],
['図の印：同じ刻み＝等しい辺 ／ 同じ弧＝等しい角 ／ 同じ矢印＝平行','Diagram marks: matching ticks = equal sides / arcs = equal angles / arrows = parallel'],
['苦手な証明を復習（3問）','Review tricky proofs (3 questions)'],
['苦手問題と同じ合同条件を含む3問','Three questions with similar congruence conditions'],
['ライフ3つ・ヒントで＋3秒','3 lives · Hint adds 3 seconds'],
['全ステージ自由に選べます。時間切れでも何度でも再挑戦できます。','Choose any stage. You can retry as many times as you like.'],
['クリア・▼ スクロール','cleared · ▼ scroll'],
['3問ずつ・全15問','3 each · 15 total'],
['証明の道、突破！','Proof completed!'],
['復習チャレンジ完了！','Review completed!'],
['ステージクリア！','Stage clear!'],
['パーフェクトクリア！','Perfect clear!'],
['パーフェクトクリア認定証','Perfect Clear Certificate'],
['クリア認定証','Stage Clear Certificate'],
['ミス ０ 回　｜　ライフ ３ / ３','0 mistakes | 3 / 3 lives'],
['最後までよくがんばりました','Well done completing the stage'],
['あなたは一度も間違えず、すべての証明を完成させました。','You completed every proof without a single mistake.'],
['あなたは証明の道を最後まで進み、ステージを見事にクリアしました。','You completed the proof challenge and cleared the stage.'],
['ミス０回・♥３つを維持してステージを完走！','You cleared the stage without a mistake and kept all 3 lives!'],
['名前を入力して、認定証を画像で保存しよう。','Enter your name and save the certificate as an image.'],
['ステージを最後までクリア！','You completed the whole stage!'],
['名前を入力して、シルバーの認定証を画像で保存しよう。','Enter your name and save your silver certificate.'],
['認定証に記載する名前','Name on certificate'],
['お名前を入力してください','Enter your name'],
['例：山田 太郎','e.g. Alex Smith'],
['認定証のプレビュー','Certificate preview'],
['画像を保存して、先生の指定する方法で提出してください。名前を入力すると画像にも反映されます。','Save the image and submit it as instructed by your teacher. Your typed name appears on the certificate.'],
['名前を入力してから保存してください。','Enter your name before saving.'],
['認定証を画像保存（PNG）','Save certificate (PNG)'],
['認定証を保存しよう','Save your certificate'],
['達成日時（日本時間）','Completed (Japan time)'],
['日本時間','Japan time'],
['証明完成！','Proof completed!'],
['学習の記録（各行を押すと図で確認）','Your proof (tap a line to highlight it)'],
['まだ証明は始まっていません。','The proof has not started yet.'],
['図形で根拠を確認！','Check the reason in the diagram!'],
['ヘビにつかまった！','The snake caught you!'],
['正しい証明をもう一度つなげよう。','Try building the proof again.'],
['途中までの証明を見る','View your partial proof'],
['ステージを選び直す','Choose another stage'],
['このステージをやり直す','Restart this stage'],
['ステージ選択','Choose stage'],
['ステージを選ぶ','Choose stage'],
['次のステージに挑戦','Try the next stage'],
['次の問題へ','Next question'],
['冒険スタート！','Start adventure!'],
['ゲームを再開','Resume game'],
['図形を拡大','Enlarge diagram'],
['図を拡大','Enlarge'],
['図を確認している間、タイマーは停止します。','The timer is paused while you inspect the diagram.'],
['／　同じ刻み → 等しい辺','／ Matching tick marks → equal sides'],
['⌒　同じ弧 → 等しい角','⌒ Matching arcs → equal angles'],
['➜　同じ矢印 → 平行','➜ Matching arrows → parallel lines'],
['同じ辺を共有する場合は、その辺にも注目しよう。','Remember that triangles may share a common side.'],
['タイマーを止めています。','The timer is paused.'],
['読む間はヘビが止まっています。再開すると＋3秒です。','The snake is paused while you read. You get 3 extra seconds when you resume.'],
['ヒント使用・＋3秒（読む間はタイマー停止）','Hint used: +3 seconds (timer paused)'],
['ヒント ＋3秒','Hint +3s'],
['使用済み','Used'],
['証明ノート','Proof notes'],
['閉じる','Close'],
['一時停止','Pause'],
['再開','Resume'],
['等しい理由を選ぶ','Choose the reason'],
['等しい式を選ぶ','Select an equality'],
['合同の利用','Use congruence'],
['合同の式','Congruence statement'],
['合同条件','Congruence condition'],
['三角形','Triangles'],
['結論','Conclusion'],
['根拠','Reason'],
['証明','Proof'],
['同じ色の頂点どうしが対応','Same-colored vertices correspond'],
['復習チャレンジ ・ 3問','Review challenge · 3 questions'],
['復習','Review'],
['クリア','Clear'],
['おすすめ','Recommended'],
['挑戦','Play'],
['ヒント','Hint'],
['辺','Side'],
['角','Angle'],
['問',' questions'],
['深さ','Depth'],
['残り猶予','Time left'],
['達成日時','Completion date'],
];
dictionary.sort((a,b)=>b[0].length-a[0].length);
function translateJapanese(source){
 let s=String(source);
 if(!/[\u3040-\u30ff\u3400-\u9fff]/.test(s))return s;
 s=s.replace(/^(△[A-Z]{3})と(△[A-Z]{3})において、$/,(_m,a,b)=>'In '+a+' and '+b+',');
 s=s.replace(/^(.+?) を証明しよう$/,'Prove $1');
 s=s.replace(/^なぜ (.+) といえる？$/,'Why is $1 true?');
 s=s.replace(/^等しい辺・角を選ぼう（([0-9]+)\/3）$/,'Select equal sides / angles ($1/3)');
 s=s.replace(/^①、②、③より、(.+)ので、$/,(_m,p)=>'From ①, ② and ③: '+translateJapanese(p)+', therefore');
 s=s.replace(/^合同条件：(.+)$/,(_m,p)=>'Congruence condition: '+translateJapanese(p));
 s=s.replace(/^(仮定より|共通な辺だから|対頂角は等しいから|平行線の錯角は等しいから)、(.+)$/,_m=>{const j=_m.indexOf('、');return translateJapanese(_m.slice(0,j))+': '+_m.slice(j+1)});
 s=s.replace(/^(.+) ……([①②③])$/,'$1 ……$2');
 s=s.replace(/^図形：(.+)。証明すること：(.+)。頂点は各三角形の対応順に記す。$/,'Diagram: $1. Goal: $2. Match corresponding vertices in order.');
 s=s.replace(/^深さ ([0-9]+) ?m$/,'Depth $1 m');
 s=s.replace(/^🐍 残り猶予 ([0-9]+)%$/,'🐍 Time left $1%');
 s=s.replace(/^([0-9]+)問目の関門で失敗。$/,'Failed on question $1.');
 s=s.replace(/^この問題：([0-9]+)秒・ミス([0-9]+)回・ヒント([0-9]+)回$/,'This question: $1s · $2 mistakes · $3 hints');
 s=s.replace(/^ここまでの解答成功率：([0-9]+)%（時間切れも失敗として集計）$/,'Accuracy so far: $1% (timeouts count as errors)');
 s=s.replace(/^達成日時：(.+)（日本時間）$/,'Completed: $1 (Japan time)');
 for(const [ja,en] of dictionary)if(s.includes(ja))s=s.split(ja).join(en);
 return s;
}
const translatedText=new WeakMap(), translatedAttrs=new WeakMap();
function applyText(n){
 if(!n||n.nodeType!==3||!n.parentElement||n.parentElement.closest('script,style,svg,.lang-toggle'))return;
 let rec=translatedText.get(n),v=n.nodeValue;
 if(!rec||v!==rec.display){rec={original:v,display:v};translatedText.set(n,rec)}
 const target=language==='en'?translateJapanese(rec.original):rec.original;
 if(v!==target){rec.display=target;n.nodeValue=target}else rec.display=v;
}
function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function mathHTML(s){
 let str=escapeHTML(s);
 str=str.replace(/△([A-Z]{3})/g,'<span class="tri-group"><span class="tri">△</span><span class="name">$1</span></span>');
 str=str.replace(/∠([A-Z]{3})/g,'<span class="ang-group"><span class="ang">∠</span><span class="name">$1</span></span>');
 str=str.replace(/≡/g,'<span class="cong">≡</span>');
 str=str.replace(/＝/g,'<span class="eq">＝</span>');
 return str;
}
function applyMath(el){
 const source=el.getAttribute('data-i18n-source');
 if(source===null)return;
 if(el.dataset.renderLanguage===language)return;
 let raw;
 try{raw=decodeURIComponent(source)}catch(e){raw=source}
 el.dataset.renderLanguage=language;
 el.innerHTML=mathHTML(language==='en'?translateJapanese(raw):raw);
}
function applyAttrs(el){
 let records=translatedAttrs.get(el);
 if(!records){records={};translatedAttrs.set(el,records)}
 for(const name of ['aria-label','placeholder','title']){
  if(!el.hasAttribute(name))continue;
  const actual=el.getAttribute(name),prev=records[name];
  if(!prev||actual!==prev.display)records[name]={original:actual,display:actual};
  const entry=records[name],dest=language==='en'?translateJapanese(entry.original):entry.original;
  if(actual!==dest){entry.display=dest;el.setAttribute(name,dest)}else entry.display=actual;
 }
}
function localizeNode(node){
 if(!node)return;
 if(node.nodeType===3){applyText(node);return}
 if(node.nodeType!==1)return;
 const el=node;
 if(el.matches('script,style,svg'))return;
 if(el.classList.contains('math')){applyMath(el);return}
 applyAttrs(el);
 if(!el.classList.contains('lang-toggle'))for(const child of [...el.childNodes])localizeNode(child);
}
function syncButtons(){
 document.querySelectorAll('.lang-toggle [data-lang]').forEach(b=>{
  const active=b.dataset.lang===language;
  b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
 });
 document.documentElement.lang=language;
 document.title=language==='en'?'PROOF RUSH | Triangle Congruence & Proof':'PROOF RUSH｜三角形の合同・証明ゲーム';
}
function localizeAll(){localizeNode(document.getElementById('app'));localizeNode(document.getElementById('overlay'));syncButtons()}
function changeLanguage(lang){
 if(lang!=='ja'&&lang!=='en')return;
 language=lang;
 try{localStorage.setItem(KEY,lang)}catch(e){}
 localizeAll();
 const cert=document.getElementById('certificateName');
 if(cert)cert.dispatchEvent(new Event('input'));
}
document.addEventListener('click',event=>{
 const button=event.target.closest&&event.target.closest('.lang-toggle [data-lang]');
 if(button)changeLanguage(button.dataset.lang);
});
const observer=new MutationObserver(records=>{
 for(const rec of records){
  if(rec.type==='characterData')applyText(rec.target);
  else if(rec.type==='attributes'){
   if(rec.attributeName==='data-i18n-source'&&rec.target.classList.contains('math'))applyMath(rec.target);
   else if(rec.attributeName!=='data-render-language')applyAttrs(rec.target);
  }else if(rec.type==='childList')for(const node of rec.addedNodes)localizeNode(node);
 }
 syncButtons();
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','data-i18n-source']});
window.__proofI18n={get language(){return language},translate:s=>language==='en'?translateJapanese(s):String(s),setLanguage:changeLanguage};
localizeAll();
})();