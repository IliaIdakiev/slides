function createTemplate(strings) {
  const template = document.createElement('template');
  template.innerHTML = strings;
  return template;
}

function updateDOM(root, updates) {
  updates.forEach(item => {
    root.querySelectorAll(`[name=${item.name}]`).forEach(element => element.textContent = item.value);
  });
}
