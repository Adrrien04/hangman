class HangedMan {

  constructor({parent_element, liste_mots }){
    this.attempts = 0;
    this.error = 0;
    this.letters_found = 0;
    this.letter_caches;
    this.parent_element = parent_element;
    this.liste_mots = liste_mots;
    this.random_word;
    this.init();
     
  }
    init(){
      this.random_word = this.getRandomWord(this.liste_mots);
      console.log(this.random_word);

      const word_section_element = document.createElement('section');
      word_section_element.id = "mot_a_trouver";

      word_section_element.innerHTML =  `
        <figure>
          <img src="Imagependu/logo%20jaune.png" alt="LOGO"width="400px">
          <figcaption>Nombre de lettres &#224 trouver : ${this.random_word.length}<hr>Lettres trouv&#233es : ${this.letters_found}<hr>Tentatives : ${this.attempts}<hr>Erreurs : ${this.error} / 7</figcaption>
        </figure>
      `;

      const letters_section_element = document.createElement('section');

      letters_section_element.id = "letters";
      this.generateLetterButtons(letters_section_element);

      this.parent_element.appendChild(word_section_element);
      this.parent_element.appendChild(letters_section_element);

      this.letter_caches = this.displayHiddenWord(this.random_word);
      console.log(this.letter_caches);

    }

  /*getRandomWord(array){
    for (let i = array.lenght - 1; i > 0; i --){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array[0];

      getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }*/

    /*getRandomWord(){
      let liste = ["un", "deux", "trois"];
      let index = parseInt(Math.random()*liste.length);
      console.log(liste[index]);
   }*/
   getRandomWord(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }



  generateLetterButtons(letters_section_element) {

    const ul_element = document.createElement('ul');

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {

      const li_element = document.createElement('li');
      li_element.textContent = letter;

      li_element.addEventListener('click', () => this.checkIfLetterIsInTheWord(event), {once: true});

      ul_element.appendChild(li_element);

    });

    letters_section_element.appendChild(ul_element);
  }

  displayHiddenWord(){
    const hidden_word = this.random_word.slice().replace(/[A-Z]/g, '_');

    const paragraph_element = document.createElement('p');

    paragraph_element.textContent = hidden_word;

    document.body.querySelector('section[id="mot_a_trouver"]').appendChild(paragraph_element);
    return hidden_word.split('');
  }

  checkIfLetterIsInTheWord(event) {

    this.attempts++;

    const selected_letter = event.target.textContent;

    if (this.random_word.includes(selected_letter)){

      event.target.classList.add('good');

      this.random_word.split('').forEach((letter,index) => {
        if (letter === selected_letter){
            this.letters_found++;
            this.letter_caches[index] = selected_letter;
        }
    });

    document.body.querySelector('section[id="mot_a_trouver"] > p').textContent = this.letter_caches.join('');

  }

  else{
    this.error++;
    event.target.classList.add('wrong');
    document.body.querySelector('img').src=`Imagependu/1.2.png`;

    if (this.error==2)
    document.body.querySelector('img').src=`Imagependu/2.2.png`;

    if (this.error==3)
    document.body.querySelector('img').src=`Imagependu/3.2.png`;

    if (this.error==4)
    document.body.querySelector('img').src=`Imagependu/4.2.png`;

    if (this.error==5)
    document.body.querySelector('img').src=`Imagependu/5.2.png`;

    if (this.error==6)
    document.body.querySelector('img').src=`Imagependu/6.2.png`;

    if (this.error==7)
    document.body.querySelector('img').src=`Imagependu/7.2.png`;

  }




  document.body.querySelector('figcaption').innerHTML =`Nombre de lettres &#224 trouver : ${this.random_word.lenght}<hr>Lettres trouv&#233es : ${this.letters_found}<hr>Tentatives : ${this.attempts}<hr>Erreurs : ${this.error} / 7 `;
  this.checkIfWinnerOrLoser();
}
  checkIfWinnerOrLoser() {
      const word_paragraph = document.body.querySelector('section[id="mot_a_trouver"] > p');
    if (this.error === 7) {
      this.gameOver(word_paragraph);
      word_paragraph.classList.add('looser');
      word_paragraph.textContent = this.random_word;
    }
    if (this.letters_found === this.random_word.lenght) {
      this.gameOver(word_paragraph);
      word_paragraph.classList.add('winner');
      word_paragraph.textContent = this.random_word;
    }

  }
  gameOver() {
    const word_paragraph = document.body.querySelector('section[id="mot_a_trouver"] > p');
    word_paragraph.classList.add('gameover');
    document.body.querySelectorAll('li').forEach(letter => letter.className = 'disabled');
    const button_element = document.createElement('button');
    button_element.textContent = 'Recharger la page';
    button_element.addEventListener('click', () => window.location.reload(false));

    document.body.querySelector('section[id="letters"]').appendChild(button_element);

  }
}
