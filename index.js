 document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.querySelector('input[name="name"]').value;
            const phone = document.querySelector('input[name="phone"]').value;
            const token = '8445853368:AAHm4Rqu684QgeuXblS7eNGb9LDr-eDvz4s'; // @BotFather dan olingan Telegram bot tokenini qo'shing
            const chatId = '-1002738305486'; // Telegram chat ID ni qo'shing
            const message = `Yangi buyurtma:\nIsm: ${name}\nTelefon: <a href="tel:${phone}">${phone}</a>`;
            const responseMessage = document.getElementById('responseMessage');

            try {
                const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'HTML'
                    })
                });
                const result = await response.json();
                if (result.ok) {
                    responseMessage.textContent = 'Buyurtma muvaffaqiyatli yuborildi!';
                    responseMessage.className = 'message success';
                    document.getElementById('contactForm').reset(); // Formani tozalash
                    setTimeout(() => {
                        responseMessage.textContent = '';
                        responseMessage.className = 'message';
                    }, 5000);
                } else {
                    responseMessage.textContent = 'Xatolik yuz berdi, qayta urinib ko\'ring.';
                    responseMessage.className = 'message error';
                      setTimeout(() => {
                        responseMessage.textContent = '';
                        responseMessage.className = 'message';
                    }, 5000);
                }
            } catch (error) {
                console.error('Xatolik:', error);
                responseMessage.textContent = 'Xatolik yuz berdi, qayta urinib ko\'ring.';
                responseMessage.className = 'message error';
            }
        });

document.querySelectorAll('.audio-play').forEach(playButton => {
    const audioId = playButton.getAttribute('data-audio');
    const audio = document.getElementById(audioId);
    const durationEl = document.getElementById(`duration${audioId.slice(-1)}`);
    const progressBar = document.getElementById(`progress${audioId.slice(-1)}`);

    playButton.addEventListener('click', () => {
        if (playButton.classList.contains('paused')) {
            audio.play();
            playButton.classList.remove('paused');
            playButton.classList.add('playing');
        } else {
            audio.pause();
            playButton.classList.remove('playing');
            playButton.classList.add('paused');
        }
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration);
        durationEl.textContent = `${currentTime} / ${duration}`;
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    audio.addEventListener('ended', () => {
        playButton.classList.remove('playing');
        playButton.classList.add('paused');
        durationEl.textContent = `0:00 / ${formatTime(audio.duration)}`;
        progressBar.style.width = '0%';
    });
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

