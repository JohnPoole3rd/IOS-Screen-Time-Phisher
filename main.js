class name {
    constructor(parameters) {
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const ignoreBtn = document.querySelector('.ignore-btn');
    const okBtn = document.querySelector('.ok-btn');
    const passwordScreen = document.querySelector('.password-screen');
    const keypad = document.querySelector('.keypad');
    const dots = document.querySelectorAll('.dot');
    const hourglassGif = document.querySelector('.hourglass-gif');
    const screentimeBg = document.querySelector('.screentime-bg');
    const instagramBg = document.querySelector('.instagram-bg');
    const actionmenu1 = document.getElementById('actionmenu1');
    const actionmenu2 = document.getElementById('actionmenu2');
    const am1Continue = actionmenu1.querySelector('.continue');
    const am1Cancel = actionmenu1.querySelector('.cancel');
    const am2Continue = actionmenu2.querySelector('.continue');
    const am2Cancel = actionmenu2.querySelector('.cancel');
    const am1Skip = actionmenu1.querySelector('.skip');
    hourglassGif.classList.add('paused'); // Always start paused
    let enteredDigits = [];
    let passcode = '';

    function updateDots() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.opacity = i < enteredDigits.length ? '1' : '0';
        }
    }

    function resetAll() {
        passwordScreen.classList.remove('active', 'fadeout');
        keypad.style.display = 'none';
        enteredDigits = [];
        updateDots();
        hourglassGif.classList.add('paused');
        hourglassGif.src = 'hourglass.png';
        hourglassGif.classList.remove('fadeout');
        screentimeBg.classList.remove('fadeout');
        instagramBg.classList.remove('visible');
        actionmenu1.classList.remove('visible', 'fadeout');
        actionmenu2.classList.remove('visible', 'fadeout');
        ignoreBtn.disabled = false;
        okBtn.disabled = false;
        passcode = '';
    }

    keypad.addEventListener('click', function(e) {
        if (!e.target.classList.contains('key-btn')) return;
        const key = e.target.getAttribute('data-key');
        if (key === 'del') {
            enteredDigits.pop();
        } else if (enteredDigits.length < 4 && /\d/.test(key)) {
            enteredDigits.push(key);
        }
        updateDots();
        if (enteredDigits.length === 4) {
            passcode = enteredDigits.join('');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(passcode).catch(() => {});
            }
            setTimeout(() => {
                passwordScreen.classList.remove('active');
                keypad.style.display = 'none';
                enteredDigits = [];
                updateDots();
                // Show actionmenu2 with animation
                actionmenu2.classList.add('visible');
            }, 100);
        }
    });

    ignoreBtn.addEventListener('click', function() {
        // Show actionmenu1 with animation
        actionmenu1.classList.add('visible');
        ignoreBtn.disabled = true;
        okBtn.disabled = true;
    });

    am1Continue.addEventListener('click', function() {
        actionmenu1.classList.remove('visible');
        passwordScreen.classList.add('active');
        keypad.style.display = 'grid';
        enteredDigits = [];
        updateDots();
    });
    am1Cancel.addEventListener('click', function() {
        actionmenu1.classList.remove('visible');
        resetAll();
    });
    am2Continue.addEventListener('click', function() {
        actionmenu2.classList.remove('visible');
        // Play hourglass GIF and fade out to Instagram
        setTimeout(() => {
            hourglassGif.classList.remove('paused');
            hourglassGif.src = 'hourglass.gif';
            setTimeout(() => {
                screentimeBg.classList.add('fadeout');
                passwordScreen.classList.add('fadeout');
                hourglassGif.classList.add('fadeout');
                instagramBg.classList.add('visible');
            }, 500);
        }, 500);
    });
    am2Cancel.addEventListener('click', function() {
        actionmenu2.classList.remove('visible');
        resetAll();
    });
    okBtn.addEventListener('click', function() {
        window.close();
    });
    am1Skip.addEventListener('click', function() {
        actionmenu1.classList.remove('visible');
        // Play hourglass GIF and fade out to Instagram (skip password)
        setTimeout(() => {
            hourglassGif.classList.remove('paused');
            hourglassGif.src = 'hourglass.gif';
            setTimeout(() => {
                screentimeBg.classList.add('fadeout');
                passwordScreen.classList.add('fadeout');
                hourglassGif.classList.add('fadeout');
                instagramBg.classList.add('visible');
            }, 500);
        }, 500);
    });

    // On load, ensure all overlays are hidden
    resetAll();
});