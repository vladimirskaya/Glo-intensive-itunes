/*Экспорт видеоплеера*/
export const videoPlayerInit = () => {

    //получаем доступ к элементам ДОМ
    const videoPlayer = document.querySelector('.video-player ');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed =document.querySelector('.video-time__passed');
    const videoTimeTotal =document.querySelector('.video-time__total');

    //изменение иконки play/pause при изменении состояния видео
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }
    // изменение состояния видео при клике на нем
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        toggleIcon();
    };

    // при нажатии кнопки Стоп
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    //добавление "0" при выводе времени
    const addZero = n => n < 10 ? '0' + n : n;

    //добавление события при нажатии на картинку видео или на кнопки
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);
    videoButtonStop.addEventListener('click', stopPlay);

    // функция нахождения и вывода времени воспроизведения и общего времени
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        //console.log('currentTime', currentTime);
        //console.log('duration',duration);

        //перемещение бегунка видео
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        //videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        //videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
        videoTimeTotal.textContent =`${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    });

    //функция переключения видео на заданный участок с помощью бегунка 
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

}