// Javascript is available, unhide `script only` components
document.querySelectorAll('.script.only')
  .forEach(x => x.classList.remove('script', 'only'))
