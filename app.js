const ageGate=document.querySelector('[data-age-gate]');
if(ageGate){
  const birthdate=ageGate.querySelector('#birthdate');
  const confirmation=ageGate.querySelector('#adultConfirmation');
  const message=ageGate.querySelector('#ageMessage');
  const today=new Date();
  const latestAdultBirthdate=new Date(today.getFullYear()-18,today.getMonth(),today.getDate());
  const toDateValue=(date)=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  birthdate.max=toDateValue(today);

  const checkAge=()=>{
    if(!birthdate.value){
      birthdate.setCustomValidity('Bitte gib dein Geburtsdatum ein.');
      confirmation.disabled=true;
      confirmation.checked=false;
      message.className='age-message';
      message.textContent='Die Registrierung ist erst ab 18 Jahren möglich.';
      return false;
    }
    const entered=new Date(`${birthdate.value}T00:00:00`);
    let age=today.getFullYear()-entered.getFullYear();
    const birthdayThisYear=new Date(today.getFullYear(),entered.getMonth(),entered.getDate());
    if(today<birthdayThisYear)age--;
    const isAdult=entered<=latestAdultBirthdate;
    birthdate.setCustomValidity(isAdult?'':`Du bist erst ${Math.max(age,0)} Jahre alt. Die Registrierung ist erst ab 18 Jahren möglich.`);
    confirmation.disabled=!isAdult;
    if(!isAdult)confirmation.checked=false;
    message.className=`age-message ${isAdult?'valid':'invalid'}`;
    message.textContent=isAdult?'Dein Alter erfüllt die Voraussetzung von 18 Jahren.':`Du bist erst ${Math.max(age,0)} Jahre alt. Diese Plattform darfst du noch nicht benutzen.`;
    return isAdult;
  };
  birthdate.addEventListener('input',checkAge);
  ageGate.addEventListener('submit',(event)=>{
    if(!checkAge()){
      event.preventDefault();
      birthdate.reportValidity();
    }
  });
  checkAge();
}
document.querySelectorAll('[data-demo-form]').forEach((form)=>form.addEventListener('submit',(event)=>{event.preventDefault();if(form.matches('[data-age-gate]')&&!form.checkValidity())return;window.location.href=form.dataset.next||'members.html'}));
document.querySelectorAll('[data-message]').forEach((button)=>button.addEventListener('click',()=>window.location.href='chat.html'));
const composer=document.querySelector('.composer');
if(composer){composer.addEventListener('submit',(event)=>{event.preventDefault();const input=composer.querySelector('input');if(!input.value.trim())return;const bubble=document.createElement('div');bubble.className='bubble me';bubble.textContent=input.value;document.querySelector('.messages').appendChild(bubble);input.value='';bubble.scrollIntoView({behavior:'smooth'});});}
