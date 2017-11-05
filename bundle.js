document.addEventListener("DOMContentLoaded", function (event) {
    const calc = document.querySelector('.calc')
    const screen = document.querySelector('.screen')
    let input = 0
    let prevInput = 0

    function setScreenValue(value) {
        const currentValue = screen.innerHTML
        currentValue.startsWith('0') && currentValue.length == 1 && value != '.' ?
            screen.innerHTML = value
            : screen.innerHTML += value
    }
    setScreenValue(input)


    calc.addEventListener('click', ({target}) => {
        const value = target.getAttribute('data-value')
        value.match(/\d/) || value.match(/\./) ? setScreenValue(value) : console.log('false')
        console.log('a')
    })
});
