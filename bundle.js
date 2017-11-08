document.addEventListener('DOMContentLoaded', function (event) {
    const calc = document.querySelector('.calc')
    const screen = document.querySelector('.screen')
    let input = 0
    let prevInput = 0
    let action = null

    class Calculator {
        constructor(node) {
            let prevValue = '0'
            let activeValue = '0'
            this.setActiveValue = (value) => {
                activeValue.startsWith('0') && activeValue.length == 1 && value != '.' ?
                activeValue = value :
                activeValue += value
            }
            this.getActiveValue = () => activeValue
            let action = null
            this.setAction = (value) => { action = value }
            this.render = () => {
                node.innerHTML = activeValue
            }
        }
    }

    const c = new Calculator(screen)
    calc.addEventListener('click', ({target}) => {
        if (target.hasAttribute('data-value')) {
            const value = target.getAttribute('data-value')
            value.match(/\d/) || value.match(/\./) ? c.setActiveValue(value) :
            value.includes('AC') ? null :
            value.includes('+/-') ? null :
            value.includes('%') ? null :
            value.includes('=') ? null :
            value.includes('+') ||
            value.includes('-') ? c.setAction(value) :
            console.log('end of click event')
        }
        console.log(c.getActiveValue())
        c.render()
    })
})

//     function substract(a,b) {
//         console.log(a)
//         console.log(b)
//         return a - b
//     }

//     function setScreenValue(value) {
//         const currentValue = screen.innerHTML
//         currentValue.startsWith('0') && currentValue.length == 1 && value != '.' ?
//             screen.innerHTML = value :
//             screen.innerHTML += value
//     }
//     function resetScreenValue() {
//         screen.innerHTML = 0
//     }
//     function changeSign() {
//         screen.innerHTML *= -1
//     }
//     function makePercent() {
//         const currentValue = screen.innerHTML
//         const {length: currentLength} = currentValue
//         const afterDivision = currentValue / 100
//         afterDivision.toString(10).length - currentLength > 3 ?
//             screen.innerHTML = Number(afterDivision.toFixed(currentLength + 2)) :
//             screen.innerHTML = afterDivision
//     }
//     function executeAction() {
//         input = screen.innerHTML
//         const value = action == null ? null :
//                         action == "-" ? substract(prevInput, input) :
//                         console.log('smth')
//         screen.innerHTML = value
//     }
//     function addAction(value) {
//         action = value
//         prevInput = screen.innerHTML
//         screen.innerHTML = 0
//     }
//     setScreenValue(input)


//     calc.addEventListener('click', ({target}) => {
//         if (target.hasAttribute('data-value')) {
//             const value = target.getAttribute('data-value')
//             value.match(/\d/) || value.match(/\./) ? setScreenValue(value) :
//             value.includes('AC') ? resetScreenValue() :
//             value.includes('+/-') ? changeSign() :
//             value.includes('%') ? makePercent() :
//             value.includes('=') ? executeAction() :
//             value.includes('+') ||
//             value.includes('-') ? addAction(value) :
//             console.log('false')
//         }
//         console.log(screen.innerHTML)
//         console.log(typeof screen.innerHTML)
//         console.log('end')
//     })
// });
