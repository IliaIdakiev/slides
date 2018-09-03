const counter = document.querySelector('app-counter');
counter.addEventListener('valueChange', (event) => {
  console.log(event);
});