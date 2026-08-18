document.body.classList.add('has-mobile-member-nav');
const currentPage=location.pathname.split('/').pop()||'index.html';
const activeKey=currentPage==='members.html'?'discover':currentPage==='chat.html'?'chat':['profile.html','edit-profile.html'].includes(currentPage)?'profile':'more';
const nav=document.createElement('nav');
nav.className='mobile-member-nav';
nav.setAttribute('aria-label','Mobile Mitgliedernavigation');
nav.innerHTML=`
  <a href="members.html" class="${activeKey==='discover'?'active':''}"><span class="mobile-nav-icon">⌕</span><span>Entdecken</span></a>
  <a href="chat.html" class="${activeKey==='chat'?'active':''}"><span class="mobile-nav-icon">✉</span><span>Nachrichten</span></a>
  <a href="edit-profile.html" class="${activeKey==='profile'?'active':''}"><span class="mobile-nav-icon">♙</span><span>Profil</span></a>
  <button type="button" id="mobileMoreButton" class="${activeKey==='more'?'active':''}"><span class="mobile-nav-icon">☰</span><span>Mehr</span></button>`;
const backdrop=document.createElement('div');backdrop.className='mobile-sheet-backdrop';
const sheet=document.createElement('section');sheet.className='mobile-more-sheet';sheet.setAttribute('aria-label','Weitere Bereiche');
sheet.innerHTML=`<header><strong>Mein Bereich</strong><button type="button" id="closeMobileSheet" aria-label="Schließen">×</button></header>
  <a href="edit-profile.html"><span>Profil bearbeiten</span><small>›</small></a>
  <a href="settings.html"><span>Einstellungen & Privatsphäre</span><small>›</small></a>
  <a href="help.html"><span>Hilfe & Sicherheit</span><small>›</small></a>
  <a href="contact.html"><span>Support kontaktieren</span><small>›</small></a>
  <a href="index.html" class="logout-link"><span>Abmelden</span><small>›</small></a>`;
document.body.append(backdrop,sheet,nav);
const setOpen=(open)=>{sheet.classList.toggle('open',open);backdrop.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''};
document.querySelector('#mobileMoreButton').addEventListener('click',()=>setOpen(true));
document.querySelector('#closeMobileSheet').addEventListener('click',()=>setOpen(false));
backdrop.addEventListener('click',()=>setOpen(false));
