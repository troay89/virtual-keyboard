const body = document.querySelector('body');

class VirtualKeyboard {
  static createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');
    const mainText = document.createElement('h1');
    mainText.classList.add('header__main-text');
    mainText.innerText = 'RSS Виртуальная клавиатура';
    header.append(mainText);
    body.append(header);
    const letters = this.objectLetters();
    body.addEventListener('keydown', (event) => {
      const textAria = document.querySelector('.main__text-area');
      const frameKeyboard = document.querySelector('.frame-keyboard');
      console.log(event)
      for (let button of frameKeyboard.children){
        if(button.firstElementChild.innerHTML === event.key.trim()) {
          textAria.value += letters[' ' + button.firstElementChild.innerHTML];
          button.setAttribute("style", "background-color: #00ff00;");
        }
      }
    })
    body.addEventListener("keyup", (event) => {
      const frameKeyboard = document.querySelector('.frame-keyboard');
      for (let button of frameKeyboard.children){
        if(button.firstElementChild.innerHTML.trim() === event.key.trim()) {
          button.setAttribute("style", "background-color: black;");
        }
      }
    });
  }

  static createMain() {
    const main = document.createElement('main');
    main.classList.add('main');
    const textAria = document.createElement('textarea');
    textAria.classList.add('main__text-area');
    textAria.setAttribute('cols', '105');
    textAria.setAttribute('rows', '18');
    const frameKeyboard = document.createElement('div');
    frameKeyboard.classList.add('frame-keyboard');
    main.append(textAria);
    main.append(frameKeyboard);
    body.append(main);
  }

  static objectLetters() {
    return {
      ' `': '`',
      ' 1': '1',
      ' 2': '2',
      ' 3': '3',
      ' 4': '4',
      ' 5': '5',
      ' 6': '6',
      ' 7': '7',
      ' 8': '8',
      ' 9': '9',
      ' 0': '0',
      ' -': '-',
      ' =': '=',
      ' Backspace': '',
      ' Tab': 'Tab',
      ' q': 'q',
      ' w': 'w',
      ' e': 'e',
      ' r': 'r',
      ' t': 't',
      ' y': 'y',
      ' u': 'u',
      ' i': 'i',
      ' o': 'o',
      ' p': 'p',
      ' [': '[',
      ' ]': ']',
      ' \\': '\\',
      ' Del': 'Del',
      ' Caps': 'Caps',
      ' a': 'a',
      ' s': 's',
      ' d': 'd',
      ' f': 'f',
      ' g': 'g',
      ' h': 'h',
      ' j': 'j',
      ' k': 'k',
      ' l': 'l',
      ' ;': ';',
      ' \'': '\'',
      ' Ent': 'Ent',
      ' Sh': 'Sh',
      ' z': 'z',
      ' x': 'x',
      ' c': 'c',
      ' v': 'v',
      ' b': 'b',
      ' n': 'n',
      ' m': 'm',
      ' ,': ',',
      ' .': '.',
      ' /': '/',
      ' up': 'up',
      ' RSh': 'RSh',
      ' Ct': 'Ct',
      ' Win': 'Win',
      ' Alt': 'Alt',
      ' ': ' ',
      ' RAlt': 'RAlt',
      ' left': 'left',
      ' down': 'down',
      ' right': 'right',
      ' ctrl': 'ctrl',
    };
  }

  static addButton(btn) {
    const frameKeyboard = document.querySelector('.frame-keyboard');
    if (btn.firstElementChild.innerHTML === 'Backspace') btn.classList.add('frame-keyboard__button_backspace');
    frameKeyboard.append(btn);
  }

  static createButton(letter) {
    const textAria = document.querySelector('.main__text-area');
    const button = document.createElement('div');
    const p = document.createElement('p');
    button.classList.add('frame-keyboard__button');
    p.classList.add('frame-keyboard__text');
    p.innerText = letter[0].toString().trim();
    button.addEventListener('click', () => {
      textAria.value += letter[1];
    });
    button.append(p);
    return button;
  }

  static main() {
    this.createHeader();
    this.createMain();
    const letters = this.objectLetters();
    Object.entries(letters).forEach((letter) => this.addButton(this.createButton(letter)));
  }
}

VirtualKeyboard.main();
