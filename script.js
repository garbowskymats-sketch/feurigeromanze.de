document.querySelectorAll('.choice').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.choice').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});
