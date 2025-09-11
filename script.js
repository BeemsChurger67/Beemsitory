windowSize = [window.innerWidth, window.innerHeight];
document.body.style.backgroundSize = `${windowSize[0]}px ${windowSize[1]}px`;
window.addEventListener('resize', function() {
    windowSize = [window.innerWidth, window.innerHeight];
    document.body.style.backgroundSize = `${windowSize[0]}px ${windowSize[1]}px`;
});