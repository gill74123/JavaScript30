const inputs = document.querySelectorAll('input')

function updateStyle(e) {
    const root = document.documentElement;
    const unit = e.target.dataset.sizing || '';
    root.style.setProperty(`--${e.target.id}`, `${e.target.value}` + unit)
}

inputs.forEach(input => {
    input.addEventListener('input', updateStyle)
})