
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link, .nav-connect-btn, .nav-hire-btn");
const bgAudioElements = document.querySelectorAll("#bg-audio");
const bgAudio = bgAudioElements.length ? bgAudioElements[0] : null;

if (bgAudioElements.length > 1) {
    bgAudioElements.forEach((audio, index) => {
        if (index > 0) {
            audio.remove();
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});

function startBackgroundMusic() {
    if (!bgAudio) return;

    bgAudio.loop = true;
    bgAudio.preload = "auto";

    const playPromise = bgAudio.play();
    if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => {
            bgAudio.dataset.started = "true";
        }).catch(() => {
            bgAudio.dataset.started = "false";
        });
    }
}

if (bgAudio) {
    startBackgroundMusic();

    const enableAfterInteraction = () => {
        startBackgroundMusic();
        document.removeEventListener("pointerdown", enableAfterInteraction);
        document.removeEventListener("keydown", enableAfterInteraction);
        document.removeEventListener("touchstart", enableAfterInteraction);
    };

    document.addEventListener("pointerdown", enableAfterInteraction, { once: true });
    document.addEventListener("keydown", enableAfterInteraction, { once: true });
    document.addEventListener("touchstart", enableAfterInteraction, { once: true });
}
