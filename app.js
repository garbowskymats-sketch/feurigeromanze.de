document.querySelectorAll('[data-demo-form]').forEach((form)=>form.addEventListener('submit',(event)=>{event.preventDefault();window.location.href=form.dataset.next||'members.html'}));
document.querySelectorAll('[data-message]').forEach((button)=>button.addEventListener('click',()=>window.location.href='chat.html'));
const composer=document.querySelector('.composer');
if(composer){composer.addEventListener('submit',(event)=>{event.preventDefault();const input=composer.querySelector('input');if(!input.value.trim())return;const bubble=document.createElement('div');bubble.className='bubble me';bubble.textContent=input.value;document.querySelector('.messages').appendChild(bubble);input.value='';bubble.scrollIntoView({behavior:'smooth'});});}
