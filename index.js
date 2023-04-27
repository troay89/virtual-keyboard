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
      '`': '0027',
      ' 1': '0031',
      ' 2': '0032',
      ' 3': '0033',
      ' 4': '0034',
      ' 5': '0035',
      ' 6': '0036',
      ' 7': '0037',
      ' 8': '0038',
      ' 9': '0039',
      ' 0': '0030',
      '-': '-',
      '=': '=',
      Back: 'Back',
      Tab: 'Tab',
      q: '0071',
      w: '0077',
      e: '0065',
      r: 'r',
      t: 't',
      y: 'y',
      u: 'u',
      i: 'i',
      o: 'o',
      p: 'p',
      '[': '[',
      ']': ']',
      '\\': '\\',
      Del: 'Del',
      Caps: 'Caps',
      a: 'a',
      s: 's',
      d: 'd',
      f: 'f',
      g: 'g',
      h: 'h',
      j: 'j',
      k: 'k',
      l: 'l',
      ';': ';',
      '\'': '\'',
      Ent: 'Ent',
      Sh: 'Sh',
      z: 'z',
      x: 'x',
      c: 'c',
      v: 'v',
      b: 'b',
      n: 'n',
      m: 'm',
      ',': ',',
      '.': '.',
      '/': '/',
      up: 'up',
      RSh: 'RSh',
      Ct: 'Ct',
      Win: 'Win',
      Alt: 'Alt',
      pr: 'pr',
      RAlt: 'RAlt',
      left: 'left',
      down: 'down',
      right: 'right',
      ctrl: 'ctrl',
    };
  }

  static addButton(btn) {
    const frameKeyboard = document.querySelector('.frame-keyboard');
    frameKeyboard.append(btn);
  }

  static createButton(letter) {
    const button = document.createElement('div');
    const p = document.createElement('p');
    button.classList.add('frame-keyboard__button');
    p.classList.add('frame-keyboard__text');
    p.innerText = letter[0].toString().trim();
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
