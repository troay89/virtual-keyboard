const body = document.querySelector('body');
let pisitionCoretky = 0;
let isCapsLock = false;

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
        if(button.firstElementChild.innerHTML.toLowerCase() === event.key.toLowerCase()) {
          if (event.key === 'Backspace' && textAria.readOnly && pisitionCoretky !== 0){
            const text = textAria.value;
            textAria.value = text.slice(0, pisitionCoretky - 1) + text.slice(pisitionCoretky);
            pisitionCoretky > 0 ? pisitionCoretky -- : 0;
          }
          else if (event.key === 'Tab') {
            event.preventDefault();
              const text = textAria.value;
              textAria.value = text.slice(0, pisitionCoretky) + '    ' + text.slice(pisitionCoretky);
              pisitionCoretky += 4;
              textAria.selectionEnd = pisitionCoretky;
          } else if (event.key === 'Delete' && textAria.readOnly) {
            const text = textAria.value;
            textAria.value = text.slice(0, pisitionCoretky) + text.slice(pisitionCoretky + 1);
          }else if (event.key === 'CapsLock'){
            isCapsLock = !isCapsLock
            if (isCapsLock) {
              const capsObject = this.objectLettersCapsLock();
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in capsObject){
                frameKeyboard.children[index].firstElementChild.innerHTML = capsObject[key];
                index ++;
              }
              button.setAttribute("style", "background-color: #00ff00;");
            }else {
              const object = this.objectLetters();
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in object){
                frameKeyboard.children[index].firstElementChild.innerHTML = object[key];
                index ++;
              }
              button.setAttribute("style", "background-color: black;");
            }
          }else if(event.key === 'Enter') {
            if(textAria.readOnly) {
              textAria.value += '\n'
              pisitionCoretky += 1;
            }
          }
          else if (textAria.readOnly && event.key !== 'Backspace')  {
            const text = textAria.value;
            if(!isCapsLock)textAria.value = text.slice(0, pisitionCoretky) + letters[event.code].toLowerCase() + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + letters[event.code].toUpperCase() + text.slice(pisitionCoretky);
            pisitionCoretky ++;
          }else  if (!textAria.readOnly && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
            const text = textAria.value;
            if(!isCapsLock)textAria.value = text.slice(0, pisitionCoretky) + letters[event.code].toLowerCase() + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + letters[event.code].toUpperCase() + text.slice(pisitionCoretky);
            pisitionCoretky ++;
          }
          event.key !== 'CapsLock' ? button.setAttribute("style", "background-color: #00ff00;") : 0;
        }
      }
    })
    body.addEventListener("keyup", (event) => {
      const frameKeyboard = document.querySelector('.frame-keyboard');
      for (let button of frameKeyboard.children){
        if(button.firstElementChild.innerHTML.toLowerCase() === event.key.toLowerCase()) {
          event.key !== 'CapsLock' ? button.setAttribute("style", "background-color: black;") : 0;
        }
      }
    });
  }

  static createMain() {
    let b = 'aasc';
    let a = b.slice(0,-1) + b[b.length -1].toUpperCase();
    console.log(a)
    const main = document.createElement('main');
    main.classList.add('main');
    const textAria = document.createElement('textarea');
    textAria.classList.add('main__text-area');
    textAria.setAttribute('cols', '95');
    textAria.setAttribute('rows', '18');
    textAria.readOnly = true;
    textAria.addEventListener('focus', () => {
      textAria.readOnly = false;
      console.log(pisitionCoretky)
    });
    textAria.addEventListener('blur', () => {
      textAria.readOnly = true;
      pisitionCoretky = textAria.selectionStart;
      console.log(pisitionCoretky)
    });
    textAria.addEventListener('click', () => {
      pisitionCoretky = textAria.selectionStart;
      console.log(pisitionCoretky)
    });
    const frameKeyboard = document.createElement('div');
    frameKeyboard.classList.add('frame-keyboard');
    main.append(textAria);
    main.append(frameKeyboard);
    body.append(main);
  }

  static objectLetters() {
    return {
      'Backquote': '`',
      'Digit1': '1',
      'Digit2': '2',
      'Digit3': '3',
      'Digit4': '4',
      'Digit5': '5',
      'Digit6': '6',
      'Digit7': '7',
      'Digit8': '8',
      'Digit9': '9',
      'Digit0': '0',
      'Minus': '-',
      'Equal': '=',
      'Backspace': 'Backspace',
      'Tab': 'Tab',
      'KeyQ': 'q',
      'KeyW': 'w',
      'KeyE': 'e',
      'KeyR': 'r',
      'KeyT': 't',
      'KeyY': 'y',
      'KeyU': 'u',
      'KeyI': 'i',
      'KeyO': 'o',
      'KeyP': 'p',
      'BracketLeft': '[',
      'BracketRight': ']',
      'Backslash': '\\',
      'Delete': 'Delete',
      'CapsLock': 'CapsLock',
      'KeyA': 'a',
      'KeyS': 's',
      'KeyD': 'd',
      'KeyF': 'f',
      'KeyG': 'g',
      'KeyH': 'h',
      'KeyJ': 'j',
      'KeyK': 'k',
      'KeyL': 'l',
      'Semicolon': ';',
      'Quote': '\'',
      'Enter': 'Enter',
      'ShiftLeft': 'Shift',
      'KeyZ': 'z',
      'KeyX': 'x',
      'KeyC': 'c',
      'KeyV': 'v',
      'KeyB': 'b',
      'KeyN': 'n',
      'KeyM': 'm',
      'Comma': ',',
      'Period': '.',
      'Slash': '/',
      'ArrowUp': 'up',
      'ShiftRight': 'Shift',
      'ControlLeft': 'Ctrl',
      'MetaLeft': 'Win',
      'AltLeft': 'Alt',
      'Space': ' ',
      'AltRight': 'Alt',
      'ArrowLeft': 'left',
      'ArrowDown': 'down',
      'ArrowRight': 'right',
      'ControlRight': 'Ctrl',
    };
  }

  static objectLettersCapsLock() {
    return {
      'Backquote': '`',
      'Digit1': '1',
      'Digit2': '2',
      'Digit3': '3',
      'Digit4': '4',
      'Digit5': '5',
      'Digit6': '6',
      'Digit7': '7',
      'Digit8': '8',
      'Digit9': '9',
      'Digit0': '0',
      'Minus': '-',
      'Equal': '=',
      'Backspace': 'Backspace',
      'Tab': 'Tab',
      'KeyQ': 'Q',
      'KeyW': 'W',
      'KeyE': 'E',
      'KeyR': 'R',
      'KeyT': 'T',
      'KeyY': 'Y',
      'KeyU': 'U',
      'KeyI': 'I',
      'KeyO': 'O',
      'KeyP': 'P',
      'BracketLeft': '[',
      'BracketRight': ']',
      'Backslash': '\\',
      'Delete': 'Delete',
      'CapsLock': 'CapsLock',
      'KeyA': 'A',
      'KeyS': 'S',
      'KeyD': 'D',
      'KeyF': 'F',
      'KeyG': 'G',
      'KeyH': 'H',
      'KeyJ': 'J',
      'KeyK': 'K',
      'KeyL': 'L',
      'Semicolon': ';',
      'Quote': '\'',
      'Enter': 'Enter',
      'ShiftLeft': 'Shift',
      'KeyZ': 'Z',
      'KeyX': 'X',
      'KeyC': 'C',
      'KeyV': 'V',
      'KeyB': 'B',
      'KeyN': 'N',
      'KeyM': 'M',
      'Comma': ',',
      'Period': '.',
      'Slash': '/',
      'ArrowUp': 'up',
      'ShiftRight': 'Shift',
      'ControlLeft': 'Ctrl',
      'MetaLeft': 'Win',
      'AltLeft': 'Alt',
      'Space': ' ',
      'AltRight': 'Alt',
      'ArrowLeft': 'left',
      'ArrowDown': 'down',
      'ArrowRight': 'right',
      'ControlRight': 'Ctrl',
    };
  }

  static addButton(btn) {
    const frameKeyboard = document.querySelector('.frame-keyboard');
    if (btn.firstElementChild.innerHTML === 'Backspace') btn.classList.add('frame-keyboard__button_backspace');
    if (btn.firstElementChild.innerHTML === 'Tab') btn.classList.add('frame-keyboard__button_tab');
    if (btn.firstElementChild.innerHTML === 'CapsLock') btn.classList.add('frame-keyboard__button_capsLock');
    if (btn.firstElementChild.innerHTML === 'Enter') btn.classList.add('frame-keyboard__button_enter');
    if (btn.firstElementChild.innerHTML === ' ') btn.classList.add('frame-keyboard__button_space');
    frameKeyboard.append(btn);
  }

  static createButton(letter) {
    const textAria = document.querySelector('.main__text-area');
    const button = document.createElement('div');
    const p = document.createElement('p');
    button.classList.add('frame-keyboard__button');
    p.classList.add('frame-keyboard__text');
    p.innerText = letter[1].toString()
    button.addEventListener('click', () => {
      textAria.value += letter[1];
    });
    button.append(p);
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftRight') button.classList.add('frame-keyboard__button_shift-right');
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftLeft') button.classList.add('frame-keyboard__button_shift-left');
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
