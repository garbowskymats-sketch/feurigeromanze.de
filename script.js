document.querySelectorAll('.choice').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.choice').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelector('.signup-card').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Der Entwurf ist bereit. Die Registrierung wird beim Anschluss an das bestehende System aktiviert.');
});
