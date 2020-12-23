/* вызов плеера радио */
export const radioPlayerInit = () => {
    // Получение элементов ДОМ-дерева
    const radio = document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');

    //Создание нового объекта Аудио
    const audio = new Audio();
    audio.type = 'audio/aac';

    //делаем неактивной кнопку Плей
    radioStop.disable = true;

    // Изменение состояния иконки и формата анимации
    const changeIconPlay = () => {
        if (audio.paused) {
            //при остановке вращение пластинки останавливается
            radio.classList.remove('play');
            // а также меняется иконка кнопки Плей
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop')
        } else {
            //при проигрывании происходит вращение пластинки
            radio.classList.add('play');
            // а также меняется иконка кнопки Плей
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop')
        }
    }
     
    // Функция обеспечивает выделение только выбранной станции серым кружком
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    //Функция действует при нажатии на выбранную станцию и воспроизводит ее
    radioNavigation.addEventListener('change', event => {
        const target = event.target; 
        const parent = target.closest('.radio-item'); 
        selectItem(parent); 

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg

        radioStop.disable = false;
        console.log(parent);
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    //Функция выполняется при нажатии на кнопку воспроизведения/стоп
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })

};

