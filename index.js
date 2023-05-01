const body = document.querySelector('body');
let positionCarriage = 0;
let isCapsLock = false;
let shiftMouse = false;
let clickMouseKey = true;
const language = { state: 'english' };

function setLocalStorage() {
  localStorage.setItem('name', language.state.toString());
}
window.addEventListener('beforeunload', setLocalStorage);

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
      const buttons = frameKeyboard.children;
      clickMouseKey = true;
      for (let i = 0; i < buttons.length; i += 1) {
        if (letters[event.code].includes(buttons[i].firstElementChild.innerHTML)) {
          if (event.key === 'Backspace' && positionCarriage !== 0) {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = text.slice(0, positionCarriage - 1) + text.slice(positionCarriage);
            if (positionCarriage > 0) positionCarriage -= 1;
            else positionCarriage = 0;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'Tab') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}    ${text.slice(positionCarriage)}`;
            positionCarriage += 4;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'Delete') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = text.slice(0, positionCarriage) + text.slice(positionCarriage + 1);
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'CapsLock') {
            isCapsLock = !isCapsLock;
            if (isCapsLock && !event.shiftKey) {
              this.keyNames(2, 3, letters);
              buttons[i].setAttribute('style', 'background-color: #00ff00;');
            } else if (isCapsLock && event.shiftKey) {
              this.keyNames(6, 7, letters);
              buttons[i].setAttribute('style', 'background-color: #00ff00;');
            } else if (event.shiftKey && !isCapsLock) {
              this.keyNames(4, 5, letters);
              buttons[i].setAttribute('style', 'background-color: #00ff00;');
            } else {
              this.keyNames(0, 1, letters);
              buttons[i].setAttribute('style', 'background-color: black;');
              buttons[i].setAttribute('style', 'transition: all 0.5s;');
            }
          } else if (event.key === 'Enter') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}\n${
              text.slice(positionCarriage)}`;
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'Meta') {
            event.preventDefault();
          } else if (event.key === 'Alt' || event.key === 'Control') {
            event.preventDefault();
            if (event.altKey && event.ctrlKey) {
              if (language.state === 'english') {
                language.state = 'russia';
              } else {
                language.state = 'english';
              }
            }
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}►${text.slice(positionCarriage)}`;
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}◄${text.slice(positionCarriage)}`;
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}▲${text.slice(positionCarriage)}`;
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            const text = textAria.value;
            textAria.value = `${text.slice(0, positionCarriage)}▼${text.slice(positionCarriage)}`;
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          } else if (event.key === 'Shift') {
            event.preventDefault();
            if (event.shiftKey && isCapsLock) {
              this.keyNames(6, 7, letters);
            } else if (event.shiftKey) {
              this.keyNames(4, 5, letters);
            }
          } else if (event.shiftKey || shiftMouse) {
            event.preventDefault();
            if (isCapsLock) {
              const text = textAria.value;
              textAria.value = text.slice(0, positionCarriage) + (language.state === 'english' ? letters[event.code][6] : letters[event.code][7]) + text.slice(positionCarriage);
              positionCarriage += 1;
              textAria.selectionEnd = positionCarriage;
            } else {
              const text = textAria.value;
              textAria.value = text.slice(0, positionCarriage) + (language.state === 'english' ? letters[event.code][4] : letters[event.code][5]) + text.slice(positionCarriage);
              positionCarriage += 1;
              textAria.selectionEnd = positionCarriage;
            }
          } else if (event.key !== 'Backspace' && letters[event.code] !== undefined) {
            event.preventDefault();
            const text = textAria.value;
            if (!isCapsLock)textAria.value = text.slice(0, positionCarriage) + (language.state === 'english' ? letters[event.code][0].toLowerCase() : letters[event.code][1].toLowerCase()) + text.slice(positionCarriage);
            else if (isCapsLock) textAria.value = text.slice(0, positionCarriage) + (language.state === 'english' ? letters[event.code][0].toUpperCase() : letters[event.code][1].toUpperCase()) + text.slice(positionCarriage);
            positionCarriage += 1;
            textAria.selectionEnd = positionCarriage;
          }
          if (event.code === 'ShiftLeft') {
            frameKeyboard.children[42].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ShiftRight') {
            frameKeyboard.children[54].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ControlLeft') {
            frameKeyboard.children[55].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ControlRight') {
            frameKeyboard.children[63].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'AltLeft') {
            frameKeyboard.children[57].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'AltRight') {
            frameKeyboard.children[59].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ArrowRight') {
            frameKeyboard.children[62].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ArrowLeft') {
            frameKeyboard.children[60].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ArrowUp') {
            frameKeyboard.children[53].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'ArrowDown') {
            frameKeyboard.children[61].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.code === 'MetaLeft') {
            frameKeyboard.children[56].setAttribute('style', 'background-color: #00ff00;');
          } else if (event.key !== 'CapsLock') {
            buttons[i].setAttribute('style', 'background-color: #00ff00;');
          }
          break;
        }
      }
    });
    body.addEventListener('keyup', (event) => {
      const frameKeyboard = document.querySelector('.frame-keyboard');
      const addArr = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ControlLeft', 'ControlRight', 'MetaLeft', 'AltLeft', 'AltRight'];
      const keys = frameKeyboard.children;
      for (let i = 0; i < keys.length; i += 1) {
        if (letters[event.code].includes(keys[i].firstElementChild.innerHTML)) {
          if ((keys[i].firstElementChild.innerHTML !== 'CapsLock' && keys[i].firstElementChild.innerHTML !== 'Shift' && letters[event.code].includes(keys[i].firstElementChild.innerHTML)) || (addArr.includes(event.code))) {
            keys[i].setAttribute('style', 'background-color: black;');
            keys[i].setAttribute('style', 'transition: all 0.5s;');
          }
        }
      }
      if (!event.shiftKey && !isCapsLock && !shiftMouse) {
        this.keyNames(0, 1, letters);
        frameKeyboard.children[42].setAttribute('style', 'background-color: black;');
        frameKeyboard.children[42].setAttribute('style', 'transition: all 0.5s;');
        frameKeyboard.children[54].setAttribute('style', 'background-color: black;');
        frameKeyboard.children[54].setAttribute('style', 'transition: all 0.5s;');
      }
      if (!event.shiftKey && isCapsLock && !shiftMouse) {
        this.keyNames(2, 3, letters);
        frameKeyboard.children[42].setAttribute('style', 'background-color: black;');
        frameKeyboard.children[42].setAttribute('style', 'transition: all 0.5s;');
        frameKeyboard.children[54].setAttribute('style', 'background-color: black;');
        frameKeyboard.children[54].setAttribute('style', 'transition: all 0.5s;');
      }
      if (!isCapsLock) {
        frameKeyboard.children[29].setAttribute('style', 'background-color: black;');
        frameKeyboard.children[29].setAttribute('style', 'transition: all 0.5s;');
      }
    });
    body.addEventListener('mousedown', (event) => {
      const textAria = document.querySelector('.main__text-area');
      clickMouseKey = false;
      let targetButton;
      if (event.target.className.includes('frame-keyboard__button')) {
        targetButton = event.target.firstElementChild.innerHTML;
        clickMouseKey = false;
        event.preventDefault();
      } else if (event.target.className === 'frame-keyboard__text') {
        targetButton = event.target.innerHTML;
        clickMouseKey = false;
        event.preventDefault();
      } else clickMouseKey = true;
      if (targetButton === 'Backspace') {
        const text = textAria.value;
        if (positionCarriage !== 0) {
          textAria.value = text.slice(0, positionCarriage - 1)
            + text.slice(positionCarriage);
        }
        if (positionCarriage > 0) {
          positionCarriage -= 1;
          textAria.selectionEnd = positionCarriage;
        } else positionCarriage = 0;
      } else if (targetButton === 'Tab') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}    ${text.slice(positionCarriage)}`;
        positionCarriage += 4;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'Delete') {
        const text = textAria.value;
        textAria.value = text.slice(0, positionCarriage) + text.slice(positionCarriage + 1);
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'CapsLock') {
        isCapsLock = !isCapsLock;
        if (isCapsLock) {
          this.keyNames(2, 3, letters);
          if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute('style', 'background-color: #00ff00;');
          else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute('style', 'background-color: #00ff00;');
        } else {
          this.keyNames(0, 1, letters);
          if (event.target.className.includes('frame-keyboard__button')) {
            event.target.setAttribute('style', 'background-color: #000000;');
            event.target.setAttribute('style', 'transition: all 0.5s;');
          } else if (event.target.className === 'frame-keyboard__text') {
            event.target.parentNode.setAttribute('style', 'background-color: #000000;');
            event.target.parentNode.setAttribute('style', 'transition: all 0.5s;');
          }
        }
      } else if (targetButton === 'Enter') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}\n${
          text.slice(positionCarriage)}`;
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'Win') {
        positionCarriage += 0;
      } else if (targetButton === 'Alt' || targetButton === 'Ctrl') {
        if (event.altKey && event.ctrlKey) {
          if (language.state === 'english') {
            language.state = 'russia';
          } else {
            language.state = 'english';
          }
        }
      } else if (targetButton === 'right') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}►${text.slice(positionCarriage)}`;
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'left') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}◄${text.slice(positionCarriage)}`;
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'up') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}▲${text.slice(positionCarriage)}`;
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'down') {
        const text = textAria.value;
        textAria.value = `${text.slice(0, positionCarriage)}▼${
          text.slice(positionCarriage)}`;
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      } else if (targetButton === 'Shift') {
        shiftMouse = true;
        if (isCapsLock) {
          this.keyNames(6, 7, letters);
        } else if (!isCapsLock) {
          this.keyNames(4, 5, letters);
        }
      } else if (event.key !== 'Backspace' && targetButton !== undefined) {
        if (targetButton === '&amp;') targetButton = '&';
        else if (targetButton === '&lt;') targetButton = '<';
        else if (targetButton === '&gt;') targetButton = '>';
        const text = textAria.value;
        textAria.value = text.slice(0, positionCarriage) + targetButton
            + text.slice(positionCarriage);
        positionCarriage += 1;
        textAria.selectionEnd = positionCarriage;
      }
      if (event.target.className.includes('frame-keyboard__button') && event.target.firstElementChild.innerHTML !== 'CapsLock') event.target.setAttribute('style', 'background-color: #00ff00;');
      else if (event.target.className === 'frame-keyboard__text' && event.target.innerHTML !== 'CapsLock') event.target.parentNode.setAttribute('style', 'background-color: #00ff00;');
    });
    body.addEventListener('mouseup', (event) => {
      let targetButton;
      if (event.target.className.includes('frame-keyboard__button')) targetButton = event.target.firstElementChild.innerHTML;
      else if (event.target.className === 'frame-keyboard__text') targetButton = event.target.innerHTML;
      if (targetButton !== 'CapsLock' && targetButton !== 'Shift') {
        if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute('style', 'background-color: #000000;');
        else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute('style', 'background-color: #000000;');
        if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute('style', 'transition: all 0.5s;');
        else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute('style', 'transition: all 0.5s;');
      }
      if (!isCapsLock && targetButton === 'Shift') {
        shiftMouse = false;
        this.keyNames(0, 1, letters);
        if (event.target.className.includes('frame-keyboard__button')) {
          event.target.setAttribute('style', 'background-color: #000000;');
          event.target.setAttribute('style', 'transition: all 0.5s;');
        } else if (event.target.className === 'frame-keyboard__text') {
          event.target.parentNode.setAttribute('style', 'background-color: #000000;');
          event.target.parentNode.setAttribute('style', 'transition: all 0.5s;');
        }
      }
      if (targetButton === 'Shift' && isCapsLock) {
        shiftMouse = false;
        this.keyNames(2, 3, letters);
        if (event.target.className.includes('frame-keyboard__button')) {
          event.target.setAttribute('style', 'background-color: #000000;');
          event.target.setAttribute('style', 'transition: all 0.5s;');
        } else if (event.target.className === 'frame-keyboard__text') {
          event.target.parentNode.setAttribute('style', 'background-color: #000000;');
          event.target.parentNode.setAttribute('style', 'transition: all 0.5s;');
        }
      }
    });
  }

  static keyNames(english, russian, letters) {
    const frameKeyboard = document.querySelector('.frame-keyboard');
    Object.keys(letters).forEach((key, index) => {
      frameKeyboard.children[index]
        .firstElementChild.innerHTML = language.state === 'english' ? letters[key][english] : letters[key][russian];
    });
  }

  static createMain() {
    const main = document.createElement('main');
    main.classList.add('main');
    const textAria = document.createElement('textarea');
    textAria.classList.add('main__text-area');
    textAria.setAttribute('cols', '95');
    textAria.setAttribute('rows', '18');
    textAria.readOnly = true;
    textAria.addEventListener('focus', () => {
      textAria.readOnly = false;
    });
    textAria.addEventListener('blur', () => {
      if (clickMouseKey) {
        textAria.readOnly = true;
      }
      positionCarriage = textAria.selectionStart;
    });
    textAria.addEventListener('click', () => {
      positionCarriage = textAria.selectionStart;
    });
    const frameKeyboard = document.createElement('div');
    frameKeyboard.classList.add('frame-keyboard');
    main.append(textAria);
    main.append(frameKeyboard);
    body.append(main);
  }

  static objectLetters() {
    return {
      Backquote: ['`', 'ё', '`', 'Ё', '~', 'Ё', '~', 'ё'],
      Digit1: ['1', '1', '1', '1', '!', '!', '!', '!'],
      Digit2: ['2', '2', '2', '2', '@', '"', '@', '"'],
      Digit3: ['3', '3', '3', '3', '#', '№', '#', '№'],
      Digit4: ['4', '4', '4', '4', '$', ';', '$', ';'],
      Digit5: ['5', '5', '5', '5', '%', '%', '%', '%'],
      Digit6: ['6', '6', '6', '6', '^', ':', '^', ':'],
      Digit7: ['7', '7', '7', '7', '&', '?', '&', '?', '&amp;'],
      Digit8: ['8', '8', '8', '8', '*', '8', '*', '*'],
      Digit9: ['9', '9', '9', '9', '(', '(', '(', '('],
      Digit0: ['0', '0', '0', '0', ')', ')', ')', ')'],
      Minus: ['-', '-', '-', '-', '_', '_', '_', '_'],
      Equal: ['=', '=', '=', '=', '+', '+', '+', '+'],
      Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
      Tab: ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
      KeyQ: ['q', 'й', 'Q', 'Й', 'Q', 'Й', 'q', 'й'],
      KeyW: ['w', 'ц', 'W', 'Ц', 'W', 'Ц', 'w', 'ц'],
      KeyE: ['e', 'у', 'E', 'У', 'E', 'У', 'e', 'у'],
      KeyR: ['r', 'к', 'R', 'К', 'R', 'К', 'r', 'к'],
      KeyT: ['t', 'е', 'T', 'Е', 'T', 'Е', 't', 'е'],
      KeyY: ['y', 'н', 'Y', 'Н', 'Y', 'Н', 'y', 'н'],
      KeyU: ['u', 'г', 'U', 'Г', 'U', 'Г', 'u', 'г'],
      KeyI: ['i', 'ш', 'I', 'Ш', 'I', 'Ш', 'i', 'ш'],
      KeyO: ['o', 'щ', 'O', 'Щ', 'O', 'Щ', 'o', 'щ'],
      KeyP: ['p', 'з', 'P', 'З', 'P', 'З', 'p', 'з'],
      BracketLeft: ['[', 'х', '[', 'Х', '{', 'Х', '{', 'х'],
      BracketRight: [']', 'ъ', ']', 'Ъ', '}', 'Ъ', '}', 'ъ'],
      Backslash: ['\\', '\\', '\\', '\\', '|', '/', '|', '/'],
      Delete: ['Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete'],
      CapsLock: ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
      KeyA: ['a', 'ф', 'A', 'Ф', 'A', 'Ф', 'a', 'ф'],
      KeyS: ['s', 'ы', 'S', 'Ы', 'S', 'Ы', 's', 'ы'],
      KeyD: ['d', 'в', 'D', 'В', 'D', 'В', 'd', 'в'],
      KeyF: ['f', 'а', 'F', 'А', 'F', 'А', 'f', 'а'],
      KeyG: ['g', 'п', 'G', 'П', 'G', 'П', 'g', 'п'],
      KeyH: ['h', 'р', 'H', 'Р', 'H', 'Р', 'h', 'р'],
      KeyJ: ['j', 'о', 'J', 'О', 'J', 'О', 'j', 'о'],
      KeyK: ['k', 'л', 'K', 'Л', 'K', 'Л', 'k', 'л'],
      KeyL: ['l', 'д', 'L', 'Д', 'L', 'Д', 'l', 'д'],
      Semicolon: [';', 'ж', ';', 'Ж', ':', 'Ж', ':', 'ж'],
      Quote: ['\'', 'э', '\'', 'Э', '"', 'Э', '"', 'э'],
      Enter: ['Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
      ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
      KeyZ: ['z', 'я', 'Z', 'Я', 'Z', 'Я', 'z', 'я'],
      KeyX: ['x', 'ч', 'X', 'Ч', 'X', 'Ч', 'x', 'ч'],
      KeyC: ['c', 'с', 'C', 'С', 'C', 'С', 'c', 'с'],
      KeyV: ['v', 'м', 'V', 'М', 'V', 'М', 'v', 'м'],
      KeyB: ['b', 'и', 'B', 'И', 'B', 'И', 'b', 'и'],
      KeyN: ['n', 'т', 'N', 'Т', 'N', 'Т', 'n', 'т'],
      KeyM: ['m', 'ь', 'M', 'Ь', 'M', 'Ь', 'm', 'ь'],
      Comma: [',', 'б', ',', 'Б', '<', 'Б', '<', 'б', '&lt;'],
      Period: ['.', 'ю', '.', 'Ю', '>', 'Ю', '>', 'ю', '&gt;'],
      Slash: ['/', '.', '/', '.', '?', ',', '?', ','],
      ArrowUp: ['up', 'up', 'up', 'up', 'up', 'up', 'up', 'up'],
      ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
      ControlLeft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Control'],
      MetaLeft: ['Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'win'],
      AltLeft: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
      Space: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      AltRight: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
      ArrowLeft: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left'],
      ArrowDown: ['down', 'down', 'down', 'down', 'down', 'down', 'down', 'down'],
      ArrowRight: ['right', 'right', 'right', 'right', 'right', 'right', 'right', 'right'],
      ControlRight: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Control'],
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

  static createButton(letter, state) {
    const button = document.createElement('div');
    const p = document.createElement('p');
    button.classList.add('frame-keyboard__button');
    p.classList.add('frame-keyboard__text');
    p.innerText = state === 'english' ? letter[1][0].toString() : letter[1][1].toString();
    button.append(p);
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftRight') button.classList.add('frame-keyboard__button_shift-right');
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftLeft') button.classList.add('frame-keyboard__button_shift-left');
    return button;
  }

  static createFooter() {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.classList.add('footer__text');
    p.innerText = 'Клавиатура создана в операционной системе Windows\n Для переключения языка комбинация на физической клавиатуре: ctrl + alt';
    footer.append(p);
    body.append(footer);
  }

  static main(state) {
    this.createHeader();
    this.createMain();
    const letters = this.objectLetters();
    Object.entries(letters).forEach((letter) => this.addButton(this.createButton(letter, state)));
    this.createFooter();
  }
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    language.state = localStorage.getItem('name');
  }
  VirtualKeyboard.main(language.state);
}
window.addEventListener('load', getLocalStorage);
