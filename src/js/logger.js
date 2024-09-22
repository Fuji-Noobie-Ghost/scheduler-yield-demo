class Logger {
  constructor(view) {
    this.view = view
  }

  log(textContent, backgroundColor) {
    const li = document.createElement('li')
    li.textContent = textContent

    li.style.backgroundColor = backgroundColor
    li.classList.add('log')
    this.view.appendChild(li)
  }

  clear() {
    this.view.innerHTML = ''
  }
}

export { Logger }
