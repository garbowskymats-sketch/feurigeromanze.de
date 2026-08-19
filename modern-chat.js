const shell=document.querySelector('.messenger-shell');
document.querySelectorAll('.conversation-row').forEach((row)=>row.addEventListener('click',()=>{document.querySelectorAll('.conversation-row').forEach(r=>r.classList.remove('active'));row.classList.add('active');row.querySelector('.unread-count')?.remove();shell?.classList.add('chat-open')}));
document.querySelector('#mobileBack')?.addEventListener('click',()=>shell.classList.remove('chat-open'));
const composer=document.querySelector('#modernComposer'),input=document.querySelector('#messageInput'),area=document.querySelector('#messageArea');
composer?.addEventListener('submit',(event)=>{event.preventDefault();const value=input.value.trim();if(!value)return;const bubble=document.createElement('div');bubble.className='bubble me';bubble.innerHTML=`${value}<small>jetzt ✓</small>`;area.appendChild(bubble);input.value='';area.scrollTop=area.scrollHeight;setTimeout(()=>{const reply=document.createElement('div');reply.className='bubble them';reply.innerHTML='Das klingt interessant – erzähl mir mehr 😊<small>jetzt</small>';area.appendChild(reply);area.scrollTop=area.scrollHeight},900)});
const emojiToggle=document.querySelector('#emojiToggle'),emojiPicker=document.querySelector('#emojiPicker');
const setEmojiPicker=(open)=>{if(!emojiPicker)return;emojiPicker.hidden=!open;emojiToggle?.setAttribute('aria-expanded',String(open));};
emojiToggle?.addEventListener('click',()=>setEmojiPicker(emojiPicker.hidden));
document.querySelector('#closeEmojiPicker')?.addEventListener('click',()=>setEmojiPicker(false));
emojiPicker?.querySelectorAll('.emoji-grid button').forEach((button)=>button.addEventListener('click',()=>{input.value+=button.textContent;input.focus()}));
document.addEventListener('keydown',(event)=>{if(event.key==='Escape')setEmojiPicker(false)});
const imageInput=document.querySelector('#imageInput'),imageButton=document.querySelector('#imageButton');
imageButton?.addEventListener('click',()=>imageInput?.click());
imageInput?.addEventListener('change',()=>{
  const file=imageInput.files?.[0];
  if(!file)return;
  if(!file.type.startsWith('image/')){alert('Bitte wähle eine Bilddatei aus.');imageInput.value='';return}
  if(file.size>8*1024*1024){alert('Das Bild darf höchstens 8 MB groß sein.');imageInput.value='';return}
  const bubble=document.createElement('div');bubble.className='bubble me image-message';
  const image=document.createElement('img');image.src=URL.createObjectURL(file);image.alt='Ausgewähltes Bild';
  image.addEventListener('load',()=>URL.revokeObjectURL(image.src),{once:true});
  const time=document.createElement('small');time.textContent='jetzt ✓';
  bubble.append(image,time);area.appendChild(bubble);area.scrollTop=area.scrollHeight;imageInput.value='';
});
document.querySelector('#filterToggle')?.addEventListener('click',(event)=>{document.querySelector('#advancedFilters')?.classList.toggle('show');event.currentTarget.textContent=document.querySelector('#advancedFilters')?.classList.contains('show')?'Filter schließen':'Filter anzeigen'});
document.querySelector('#applyFilters')?.addEventListener('click',()=>{const count=document.querySelector('#resultCount');if(count)count.textContent='3';const button=document.querySelector('#applyFilters');button.textContent='Filter angewendet ✓';setTimeout(()=>button.textContent='Ergebnisse anzeigen',1600)});
document.querySelectorAll('[data-interest]').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('selected');button.textContent=button.classList.contains('selected')?'♥ Interesse gesendet':'♡ Interessiert'}));
