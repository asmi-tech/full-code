document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submitButton');
    if (!submitButton) {
        console.error('Submit tugmasi topilmadi!');
        return;
    }
    submitButton.disabled = true;

    const name = document.querySelector('input[name="name"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    if (!name || !phone) {
        document.getElementById('responseMessage').textContent = 'Ism va telefon raqamini to\'ldiring!';
        document.getElementById('responseMessage').className = 'message error';
        submitButton.disabled = false;
        return;
    }

    const token = '8445853368:AAHm4Rqu684QgeuXblS7eNGb9LDr-eDvz4s'; // Serverda saqlash tavsiya qilinadi
    const chatId = '-1002738305486'; // Serverda saqlash tavsiya qilinadi

    let znak = '5'; // Default

    const message = `Yangi buyurtma:\n\nIsm: ${name}\n\nTelefon: <a href="tel:${phone}">${phone}</a>\n\nMahsulot : Worm Stop\n\nZnak: ${znak}`;
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
            document.getElementById('contactForm').reset();
            setTimeout(() => {
                responseMessage.textContent = '';
                responseMessage.className = 'message';
            }, 5000);
             submitButton.disabled = true;
        } else {
            responseMessage.textContent = `Xatolik: ${result.description || 'Qayta urinib ko\'ring'}`;
            responseMessage.className = 'message error';
            submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Xatolik:', error);
        responseMessage.textContent = `Xatolik yuz berdi (${error.message}), qayta urinib ko\'ring.`;
        responseMessage.className = 'message error';
        submitButton.disabled = false;
    }
});

document.querySelectorAll('.audio-play').forEach(button => {
    button.addEventListener('click', () => {
        const audioId = button.getAttribute('data-audio');
        const audio = document.getElementById(audioId);
        const progressBar = document.getElementById('progress' + audioId.replace('audio', ''));
        const durationText = document.getElementById('duration' + audioId.replace('audio', ''));

        if (!audio || !progressBar || !durationText) {
            console.error('Audio yoki progress elementlari topilmadi!');
            return;
        }

        document.querySelectorAll('audio').forEach(a => {
            if (a !== audio) {
                a.pause();
                a.currentTime = 0;
                document.querySelector(`[data-audio="${a.id}"]`).classList.remove('playing');
            }
        });

        if (audio.paused) {
            audio.play().catch(error => console.error('Audio o\'ynashda xatolik:', error));
            button.classList.add('playing');
        } else {
            audio.pause();
            button.classList.remove('playing');
        }

        audio.ontimeupdate = () => {
            const progress = (audio.currentTime / audio.duration) * 100 || 0;
            progressBar.style.width = progress + '%';

            const currentMin = Math.floor(audio.currentTime / 60);
            const currentSec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
            const totalMin = Math.floor(audio.duration / 60);
            const totalSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
            durationText.textContent = `${currentMin}:${currentSec} / ${totalMin}:${totalSec}`;
        };

        audio.onended = () => {
            button.classList.remove('playing');
            progressBar.style.width = '0%';
            durationText.textContent = `0:00 / ${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`;
        };
    });
});
   const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('998')) {
      value = '998' + value;
    }
    value = '+' + value
      .replace(/^(\d{3})/, '$1 ')           // +998 dan keyin bo'sh joy
      .replace(/^(\d{3})\s(\d{0,2})/, '$1 ($2')
      .replace(/(\(\d{2})(\d{0,3})/, '$1) $2 ')
      .replace(/(\d{3})(\d{0,2})/, '$1 $2')
      .replace(/(\d{2})(\d{0,2})$/, '$1 $2');
    e.target.value = value.trim();
  });


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Form yuborilishini to‘xtatish (serverga yubormaslik uchun)
    document.getElementById("overlay").classList.add("show");
});

document.getElementById("returnBtn").addEventListener("click", function() {
    document.getElementById("overlay").classList.remove("show");
});