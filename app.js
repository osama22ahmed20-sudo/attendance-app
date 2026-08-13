const KEY='attendance_records_v1';
const $=id=>document.getElementById(id);
function dateKey(){return new Date().toLocaleDateString('en-CA')}
function time(){return new Date().toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'})}
function get(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function set(a){localStorage.setItem(KEY,JSON.stringify(a))}
function toast(x){$('toast').textContent=x;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',1800)}
function save(type){
 const code=$('code').value.trim(),name=$('name').value.trim();
 if(!code||!name){toast('اكتب كود واسم الموظف');return}
 let a=get(), r=a.find(x=>x.date===dateKey()&&x.code===code);
 if(!r){r={date:dateKey(),code,name,in:'',out:''};a.push(r)}
 if(type==='حضور'){if(r.in){toast('تم تسجيل الحضور بالفعل');return}r.in=time()}
 else{if(r.out){toast('تم تسجيل الانصراف بالفعل');return}r.out=time()}
 set(a);render();toast('تم تسجيل '+type+' بنجاح')
}
function render(){
 const q=($('search').value||'').toLowerCase(), day=dateKey();
 let a=get().filter(x=>x.date===day&&(x.name.toLowerCase().includes(q)||x.code.toLowerCase().includes(q)));
 $('list').innerHTML=a.length?a.map(x=>`<div class="item"><div class="name">${esc(x.name)} — ${esc(x.code)}</div><div class="muted">🟢 الحضور: ${x.in||'—'} &nbsp;&nbsp; 🔴 الانصراف: ${x.out||'—'}</div></div>`).join(''):'<div class="empty">لا يوجد سجل اليوم</div>';
}
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
$('today').textContent=new Date().toLocaleDateString('ar-EG',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
render();
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
