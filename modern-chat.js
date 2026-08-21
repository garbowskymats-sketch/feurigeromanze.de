const shell=document.querySelector('.messenger-shell');
document.querySelectorAll('.conversation-row').forEach((row)=>row.addEventListener('click',()=>{document.querySelectorAll('.conversation-row').forEach(r=>r.classList.remove('active'));row.classList.add('active');row.querySelector('.unread-count')?.remove();shell?.classList.add('chat-open')}));
document.querySelector('#mobileBack')?.addEventListener('click',()=>shell.classList.remove('chat-open'));
const composer=document.querySelector('#modernComposer'),input=document.querySelector('#messageInput'),area=document.querySelector('#messageArea');
const replyPreview=document.querySelector('#replyPreview'),replyPreviewName=document.querySelector('#replyPreviewName'),replyPreviewText=document.querySelector('#replyPreviewText');
let selectedReply=null;
const getBubbleText=(bubble)=>{
  if(bubble.classList.contains('image-message'))return '📷 Bild';
  const clone=bubble.cloneNode(true);clone.querySelectorAll('small,.message-reply-button,.quoted-message').forEach(element=>element.remove());
  return clone.textContent.trim().slice(0,160);
};
const setReply=(bubble)=>{
  selectedReply={name:bubble.classList.contains('me')?'Du':'Lena',text:getBubbleText(bubble)};
  replyPreviewName.textContent=selectedReply.name;replyPreviewText.textContent=selectedReply.text;replyPreview.hidden=false;input.focus();
};
const clearReply=()=>{selectedReply=null;if(replyPreview)replyPreview.hidden=true};
document.querySelector('#cancelReply')?.addEventListener('click',clearReply);
const addQuotedMessage=(bubble,reply)=>{
  if(!reply)return;
  const quote=document.createElement('div');quote.className='quoted-message';
  const name=document.createElement('strong');name.textContent=reply.name;
  const text=document.createElement('span');text.textContent=reply.text;
  quote.append(name,text);bubble.appendChild(quote);
};
const enhanceBubble=(bubble)=>{
  if(bubble.querySelector('.message-reply-button'))return;
  const button=document.createElement('button');button.type='button';button.className='message-reply-button';button.textContent='↩';button.title='Auf diese Nachricht antworten';button.setAttribute('aria-label','Auf diese Nachricht antworten');
  button.addEventListener('click',()=>setReply(bubble));bubble.appendChild(button);
};
area?.querySelectorAll('.bubble').forEach(enhanceBubble);
composer?.addEventListener('submit',(event)=>{
  event.preventDefault();const value=input.value.trim();if(!value)return;
  const bubble=document.createElement('div');bubble.className='bubble me';addQuotedMessage(bubble,selectedReply);
  const message=document.createElement('span');message.className='message-text';message.textContent=value;
  const time=document.createElement('small');time.textContent='jetzt ✓';bubble.append(message,time);enhanceBubble(bubble);area.appendChild(bubble);
  input.value='';clearReply();area.scrollTop=area.scrollHeight;
  setTimeout(()=>{const reply=document.createElement('div');reply.className='bubble them';const text=document.createElement('span');text.className='message-text';text.textContent='Das klingt interessant – erzähl mir mehr 😊';const time=document.createElement('small');time.textContent='jetzt';reply.append(text,time);enhanceBubble(reply);area.appendChild(reply);area.scrollTop=area.scrollHeight},900);
});
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
  const bubble=document.createElement('div');bubble.className='bubble me image-message';addQuotedMessage(bubble,selectedReply);
  const image=document.createElement('img');image.src=URL.createObjectURL(file);image.alt='Ausgewähltes Bild';
  image.addEventListener('load',()=>URL.revokeObjectURL(image.src),{once:true});
  const time=document.createElement('small');time.textContent='jetzt ✓';
  bubble.append(image,time);enhanceBubble(bubble);area.appendChild(bubble);clearReply();area.scrollTop=area.scrollHeight;imageInput.value='';
});
document.querySelector('#filterToggle')?.addEventListener('click',(event)=>{document.querySelector('#advancedFilters')?.classList.toggle('show');event.currentTarget.textContent=document.querySelector('#advancedFilters')?.classList.contains('show')?'Filter schließen':'Filter anzeigen'});
document.querySelector('#applyFilters')?.addEventListener('click',()=>{const count=document.querySelector('#resultCount');if(count)count.textContent='3';const button=document.querySelector('#applyFilters');button.textContent='Filter angewendet ✓';setTimeout(()=>button.textContent='Ergebnisse anzeigen',1600)});
document.querySelectorAll('[data-interest]').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('selected');button.textContent=button.classList.contains('selected')?'♥ Interesse gesendet':'♡ Interessiert'}));
