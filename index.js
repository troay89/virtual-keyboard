const body = document.querySelector('body');
let pisitionCoretky = 0;
let isCapsLock = false;
let language = { state: 'english'};

function setLocalStorage() {
  console.log(language.state)
  localStorage.setItem('name', language.state.toString());
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    console.log(localStorage.getItem('name'))
    language.state = localStorage.getItem('name');
  }
  VirtualKeyboard.main(language.state)
}
window.addEventListener('load', getLocalStorage)

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
      // console.log(event)
      for (let button of frameKeyboard.children){
        if(letters[event.code].includes(button.firstElementChild.innerHTML)) {
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
              const capsObject = this.objectLetters();
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in capsObject){
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? capsObject[key][2]: capsObject[key][3];
                index ++;
              }
              button.setAttribute("style", "background-color: #00ff00;");
            }else {
              const object = this.objectLetters();
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in object){
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? object[key][0]: object[key][1];
                index ++;
              }
              button.setAttribute("style", "background-color: black;");
            }
          }else if(event.key === 'Enter') {
            if(textAria.readOnly) {
              textAria.value += '\n'
              pisitionCoretky += 1;
            }
          } else if(event.key === 'Meta') {
            event.preventDefault();
          }
          else if(event.key === 'Alt' || event.key === 'Control') {
            event.preventDefault();
            if (event.altKey && event.ctrlKey) {
              language.state === 'english'? language.state = 'russia' : language.state = 'english';
            }
          }
          else if(event.key === 'ArrowRight') {
            event.preventDefault();
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '►' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(event.key === 'ArrowLeft') {
            event.preventDefault();
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '◄' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(event.key === 'ArrowUp') {
            event.preventDefault();
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '▲' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(event.key === 'ArrowDown') {
            event.preventDefault();
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '▼' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(event.key === 'Shift') {
            event.preventDefault();
            const shiftObject = this.objectLetters()
            const shiftCapslockObject = this.objectLetters();
            const frameKeyboard = document.querySelector('.frame-keyboard');
            let index = 0;
            if (event.shiftKey && isCapsLock){
              for (let key in shiftObject) {
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? shiftCapslockObject[key][6]: shiftCapslockObject[key][7];
                index++;
              }
            } else if (event.shiftKey) {
              for (let key in shiftObject) {
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? shiftObject[key][4]: shiftObject[key][5];
                index++;
              }
            }
          }else if (event.shiftKey){
            event.preventDefault();
            const shiftObject = this.objectLetters();
            const shiftCapslockObject = this.objectLetters()
            if (isCapsLock) {
              const text = textAria.value;
              textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? shiftObject[event.code][6]: shiftObject[event.code][7]) + text.slice(pisitionCoretky);
              pisitionCoretky ++;
              textAria.selectionEnd = pisitionCoretky;
            }else {
              const text = textAria.value;
              textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? shiftObject[event.code][4]: shiftObject[event.code][5]) + text.slice(pisitionCoretky);
              pisitionCoretky++;
              textAria.selectionEnd = pisitionCoretky;
            }
          }  else if (textAria.readOnly && event.key !== 'Backspace' && letters[event.code] !== undefined)  {
            event.preventDefault();
            const text = textAria.value;
            if(!isCapsLock)textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toLowerCase(): letters[event.code][1].toLowerCase()) + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toUpperCase(): letters[event.code][1].toUpperCase()) + text.slice(pisitionCoretky);
            pisitionCoretky ++;
          }else  if (!textAria.readOnly && event.key !== 'Backspace' && event.key !== 'Delete' && letters[event.code] !== undefined) {
            event.preventDefault();
            const text = textAria.value;
            if(!isCapsLock)textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toLowerCase(): letters[event.code][1].toLowerCase()) + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toUpperCase(): letters[event.code][1].toUpperCase()) + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }
          if (event.code === 'ShiftLeft'){
            frameKeyboard.children[42].setAttribute("style", "background-color: #00ff00;");
          } else if (event.code === 'ShiftRight'){
            frameKeyboard.children[54].setAttribute("style", "background-color: #00ff00;");
          } else if (event.code === 'ControlLeft'){
            frameKeyboard.children[55].setAttribute("style", "background-color: #00ff00;");
          } else if (event.code === 'ControlRight'){
            frameKeyboard.children[63].setAttribute("style", "background-color: #00ff00;");
          }else if (event.code === 'AltLeft'){
            frameKeyboard.children[57].setAttribute("style", "background-color: #00ff00;");
          } else if (event.code === 'AltRight'){
            frameKeyboard.children[59].setAttribute("style", "background-color: #00ff00;");
          }else if (event.code === 'ArrowRight'){
            frameKeyboard.children[62].setAttribute("style", "background-color: #00ff00;");
          }else if (event.code === 'ArrowLeft'){
            frameKeyboard.children[60].setAttribute("style", "background-color: #00ff00;");
          } else if (event.code === 'ArrowUp'){
            frameKeyboard.children[53].setAttribute("style", "background-color: #00ff00;");
          }else if (event.code === 'ArrowDown'){
            frameKeyboard.children[61].setAttribute("style", "background-color: #00ff00;");
          }else if (event.code === 'MetaLeft'){
            frameKeyboard.children[56].setAttribute("style", "background-color: #00ff00;");
          } else if (event.key !== 'CapsLock') {
            button.setAttribute("style", "background-color: #00ff00;");
          }
          break;
        }
      }
    })
    body.addEventListener("keyup", (event) => {
      const frameKeyboard = document.querySelector('.frame-keyboard');
      const addArr = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ControlLeft', 'ControlRight', 'MetaLeft', 'AltLeft', 'AltRight'];
      for (let button of frameKeyboard.children){
        if(letters[event.code].includes(button.firstElementChild.innerHTML)) {
          if (button.firstElementChild.innerHTML !== 'CapsLock' && button.firstElementChild.innerHTML !== 'Shift' && letters[event.code].includes(button.firstElementChild.innerHTML)|| addArr.includes(event.code)){
            button.setAttribute("style", "background-color: black;")
            button.setAttribute('style', "transition: all 0.5s;")
          }
        }
      }
      if (!event.shiftKey && !isCapsLock){
        const object = this.objectLetters();
        const frameKeyboard = document.querySelector('.frame-keyboard');
        let index = 0;
        for (let key in object){
          frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? object[key][0]: object[key][1];
          index ++;
        }
        frameKeyboard.children[42].setAttribute("style", "background-color: black;");
        frameKeyboard.children[54].setAttribute("style", "background-color: black;");
      }
      if (!event.shiftKey && isCapsLock){
        const capsObject = this.objectLetters()
        const frameKeyboard = document.querySelector('.frame-keyboard');
        let index = 0;
        for (let key in capsObject) {
          frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? capsObject[key][2]: capsObject[key][3];
          index++;
        }
        frameKeyboard.children[42].setAttribute("style", "background-color: black;");
        frameKeyboard.children[54].setAttribute("style", "background-color: black;");
      }
    });
    body.addEventListener('mousedown', (event) => {
      const textAria = document.querySelector('.main__text-area');
      const frameKeyboard = document.querySelector('.frame-keyboard');
      console.log(event.target)
      let targetButton;
      if(event.target.className.includes('frame-keyboard__button')) targetButton = event.target.firstElementChild.innerHTML;
      else if(event.target.className === 'frame-keyboard__text') targetButton = event.target.innerHTML;
          if (targetButton === 'Backspace' && textAria.readOnly && pisitionCoretky !== 0){
            const text = textAria.value;
            textAria.value = text.slice(0, pisitionCoretky - 1) + text.slice(pisitionCoretky);
            pisitionCoretky > 0 ? pisitionCoretky -- : 0;
          }
          else if (targetButton === 'Tab') {
            const text = textAria.value;
            textAria.value = text.slice(0, pisitionCoretky) + '    ' + text.slice(pisitionCoretky);
            pisitionCoretky += 4;
            textAria.selectionEnd = pisitionCoretky;
          } else if (targetButton === 'Delete' && textAria.readOnly) {
            const text = textAria.value;
            textAria.value = text.slice(0, pisitionCoretky) + text.slice(pisitionCoretky + 1);
          }else if (targetButton === 'CapsLock'){

            isCapsLock = !isCapsLock
            if (isCapsLock) {
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in letters){
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][2]: letters[key][3];
                index ++;
              }
              if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute("style", "background-color: #00ff00;");
              else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute("style", "background-color: #00ff00;");
            }else {
              const frameKeyboard = document.querySelector('.frame-keyboard');
              let index = 0;
              for (let key in letters){
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][0]: letters[key][1];
                index ++;
              }
              if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute("style", "background-color: #000000;");
              else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute("style", "background-color: #000000;");
            }
          }else if(targetButton === 'Enter') {
            if(textAria.readOnly) {
              textAria.value += '\n'
              pisitionCoretky += 1;
            }
          } else if(targetButton === 'Meta') {
            event.preventDefault();
          }
          else if(targetButton === 'Alt' || event.key === 'Control') {
            event.preventDefault();
            if (event.altKey && event.ctrlKey) {
              language.state === 'english'? language.state = 'russia' : language.state = 'english';
            }
          }
          else if(targetButton === 'right') {
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '►' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(targetButton === 'left') {
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '◄' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(targetButton === 'up') {
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '▲' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }else if(targetButton === 'down') {
            let text = textAria.value
            textAria.value = text.slice(0, pisitionCoretky) + '▼' + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }
          else if(targetButton === 'Shift') {
            const frameKeyboard = document.querySelector('.frame-keyboard');
            let index = 0;
            if (isCapsLock){
              for (let key in letters) {
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][6]: letters[key][7];
                index++;
              }
            } else if (!isCapsLock) {
              for (let key in letters) {
                frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][4]: letters[key][5];
                index++;
              }
            }
          }else if (event.shiftKey){
            if (isCapsLock) {
              const text = textAria.value;
              textAria.value = text.slice(0, pisitionCoretky) + targetButton + text.slice(pisitionCoretky);
              pisitionCoretky ++;
              textAria.selectionEnd = pisitionCoretky;
            }else {
              const text = textAria.value;
              textAria.value = text.slice(0, pisitionCoretky) + targetButton + text.slice(pisitionCoretky);
              pisitionCoretky++;
              textAria.selectionEnd = pisitionCoretky;
            }
          }  else if (textAria.readOnly && event.key !== 'Backspace' && targetButton !== undefined)  {
            event.preventDefault();
            const text = textAria.value;
            if(!isCapsLock) textAria.value = text.slice(0, pisitionCoretky) +  targetButton + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + targetButton + text.slice(pisitionCoretky);
            pisitionCoretky ++;
          }else  if (!textAria.readOnly && event.key !== 'Backspace' && event.key !== 'Delete' && letters[event.code] !== undefined) {
            event.preventDefault();
            const text = textAria.value;
            if(!isCapsLock)textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toLowerCase(): letters[event.code][1].toLowerCase()) + text.slice(pisitionCoretky);
            else if(isCapsLock) textAria.value = text.slice(0, pisitionCoretky) + (language.state === 'english'? letters[event.code][0].toUpperCase(): letters[event.code][1].toUpperCase()) + text.slice(pisitionCoretky);
            pisitionCoretky ++;
            textAria.selectionEnd = pisitionCoretky;
          }


          if (event.target.className.includes('frame-keyboard__button') && event.target.firstElementChild.innerHTML !== 'CapsLock') event.target.setAttribute("style", "background-color: #00ff00;");
          else if (event.target.className === 'frame-keyboard__text' && event.target.innerHTML !== 'CapsLock') event.target.parentNode.setAttribute("style", "background-color: #00ff00;");

    })
    body.addEventListener("mouseup", (event) => {
      const frameKeyboard = document.querySelector('.frame-keyboard');
      let targetButton;
      if(event.target.className.includes('frame-keyboard__button')) targetButton = event.target.firstElementChild.innerHTML;
      else if(event.target.className === 'frame-keyboard__text') targetButton = event.target.innerHTML;
        if (targetButton !== 'CapsLock' && targetButton !== 'Shift'){
          if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute("style", "background-color: #000000;");
          else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute("style", "background-color: #000000;");
          if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute('style', "transition: all 0.5s;")
          else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute('style', "transition: all 0.5s;")
        }
      if (!isCapsLock && targetButton === 'Shift'){
        const frameKeyboard = document.querySelector('.frame-keyboard');
        let index = 0;
        for (let key in letters){
          frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][0]: letters[key][1];
          index ++;
        }
        if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute("style", "background-color: #000000;");
        else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute("style", "background-color: #000000;");
      }
      if (targetButton === 'Shift' && isCapsLock){
        const frameKeyboard = document.querySelector('.frame-keyboard');
        let index = 0;
        for (let key in letters) {
          frameKeyboard.children[index].firstElementChild.innerHTML = language.state === 'english'? letters[key][2]: letters[key][3];
          index++;
        }
        if (event.target.className.includes('frame-keyboard__button')) event.target.setAttribute("style", "background-color: #000000;");
        else if (event.target.className === 'frame-keyboard__text') event.target.parentNode.setAttribute("style", "background-color: #000000;");
      }
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
      // console.log(pisitionCoretky)
    });
    textAria.addEventListener('blur', () => {
      textAria.readOnly = true;
      pisitionCoretky = textAria.selectionStart;
    });
    textAria.addEventListener('click', () => {
      pisitionCoretky = textAria.selectionStart;
      // console.log(pisitionCoretky)
    });
    const frameKeyboard = document.createElement('div');
    frameKeyboard.classList.add('frame-keyboard');
    main.append(textAria);
    main.append(frameKeyboard);
    body.append(main);
  }

  static objectLetters() {
    return {
      'Backquote': ['`', 'ё', '`', 'Ё', '~', 'Ё', '~', 'ё'],
      'Digit1': ['1', '1', '1', '1', '!', '!','!', '!'],
      'Digit2': ['2', '2', '2', '2', '@', '"', '@', '"'],
      'Digit3': ['3', '3', '3', '3', '#', '№', '#', '№'],
      'Digit4': ['4', '4', '4', '4', '$', ';', '$', ';'],
      'Digit5': ['5', '5', '5', '5', '%', '%', '%', '%'],
      'Digit6': ['6', '6', '6', '6', '^', ':', '^', ':'],
      'Digit7': ['7', '7', '7', '7', '&', '?', '&', '?'],
      'Digit8': ['8', '8', '8', '8', '*', '8', '*', '*'],
      'Digit9': ['9', '9', '9', '9', '(', '(', '(', '('],
      'Digit0': ['0', '0', '0', '0', ')', ')', ')', ')'],
      'Minus': ['-', '-', '-', '-', '_', '_', '_', '_'],
      'Equal': ['=', '=', '=', '=', '+', '+', '+', '+'],
      'Backspace': ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
      'Tab': ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
      'KeyQ': ['q', 'й', 'Q', 'Й', 'Q', 'Й', 'q', 'й'],
      'KeyW': ['w', 'ц', 'W', 'Ц', 'W', 'Ц', 'w', 'ц'],
      'KeyE': ['e', 'у', 'E', 'У', 'E', 'У', 'e', 'у'],
      'KeyR': ['r', 'к', 'R', 'К', 'R', 'К', 'r', 'к'],
      'KeyT': ['t', 'е', 'T', 'Е', 'T', 'Е', 't', 'е'],
      'KeyY': ['y', 'н', 'Y', 'Н', 'Y', 'Н', 'y', 'н'],
      'KeyU': ['u', 'г', 'U', 'Г', 'U', 'Г', 'u', 'г'],
      'KeyI': ['i', 'ш', 'I', 'Ш', 'I', 'Ш', 'i', 'ш'],
      'KeyO': ['o', 'щ', 'O', 'Щ', 'O', 'Щ', 'o', 'щ'],
      'KeyP': ['p', 'з', 'P', 'З', 'P', 'З', 'p', 'з'],
      'BracketLeft': ['[', 'х', '[', 'Х', '{', 'Х', '{', 'х'],
      'BracketRight': [']', 'ъ', ']', 'Ъ', '}', 'Ъ', '}', 'ъ'],
      'Backslash': ['\\', '\\', '\\', '\\', '|', '/', '|', '/'],
      'Delete': ['Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete', 'Delete'],
      'CapsLock': ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
      'KeyA': ['a', 'ф', 'A', 'Ф', 'A', 'Ф', 'a', 'ф'],
      'KeyS': ['s', 'ы', 'S', 'Ы', 'S', 'Ы', 's', 'ы'],
      'KeyD': ['d', 'в', 'D', 'В', 'D', 'В', 'd', 'в'],
      'KeyF': ['f', 'а', 'F', 'А', 'F', 'А', 'f', 'а'],
      'KeyG': ['g', 'п', 'G', 'П', 'G', 'П', 'g', 'п'],
      'KeyH': ['h', 'р', 'H', 'Р', 'H', 'Р', 'h', 'р'],
      'KeyJ': ['j', 'о', 'J', 'О', 'J', 'О', 'j', 'о'],
      'KeyK': ['k', 'л', 'K', 'Л', 'K', 'Л', 'k', 'л'],
      'KeyL': ['l', 'д', 'L', 'Д', 'L', 'Д', 'l', 'д'],
      'Semicolon': [';', 'ж', ';', 'Ж', ':', 'Ж', ':', 'ж'],
      'Quote': ['\'', 'э', '\'', 'Э', '"', 'Э', '"', 'э'],
      'Enter': ['Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
      'ShiftLeft': ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
      'KeyZ': ['z', 'я', 'Z', 'Я', 'Z', 'Я', 'z', 'я'],
      'KeyX': ['x', 'ч', 'X', 'Ч', 'X', 'Ч', 'x', 'ч'],
      'KeyC': ['c', 'с', 'C', 'С', 'C', 'С', 'c', 'с'],
      'KeyV': ['v', 'м', 'V', 'М', 'V', 'М', 'v', 'м'],
      'KeyB': ['b', 'и', 'B', 'И', 'B', 'И' ,'b', 'и'],
      'KeyN': ['n', 'т', 'N', 'Т', 'N', 'Т', 'n', 'т'],
      'KeyM': ['m', 'ь', 'M', 'Ь', 'M', 'Ь', 'm', 'ь'],
      'Comma': [',', 'б', ',', 'Б', '<', 'Б', '<', 'б'],
      'Period': ['.', 'ю', '.', 'Ю', '>', 'Ю', '>', 'ю'],
      'Slash': ['/', '.', '/', '.', '?', ',', '?', ','],
      'ArrowUp': ['up', 'up', 'up', 'up', 'up', 'up', 'up', 'up'],
      'ShiftRight': ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
      'ControlLeft': ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Control'],
      'MetaLeft': ['Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win'],
      'AltLeft': ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
      'Space': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      'AltRight': ['Alt' ,'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
      'ArrowLeft': ['left' ,'left', 'left', 'left', 'left', 'left', 'left', 'left'],
      'ArrowDown': ['down', 'down', 'down', 'down', 'down', 'down', 'down', 'down'],
      'ArrowRight': ['right' , 'right', 'right', 'right', 'right', 'right', 'right', 'right'],
      'ControlRight': ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Control'],
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
    const textAria = document.querySelector('.main__text-area');
    const button = document.createElement('div');
    const p = document.createElement('p');
    button.classList.add('frame-keyboard__button');
    p.classList.add('frame-keyboard__text');
    p.innerText = state === 'english' ? letter[1][0].toString(): letter[1][1].toString()
    // button.addEventListener('click', () => {
    //   textAria.value += letter[1];
    // });
    button.append(p);
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftRight') button.classList.add('frame-keyboard__button_shift-right');
    if (button.firstElementChild.innerHTML === 'Shift' && letter[0] === 'ShiftLeft') button.classList.add('frame-keyboard__button_shift-left');
    return button;
  }

  static main(state) {
    this.createHeader();
    this.createMain();
    const letters =  this.objectLetters();
    Object.entries(letters).forEach((letter) => this.addButton(this.createButton(letter, state)));
  }
}

