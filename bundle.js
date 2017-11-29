document.addEventListener('DOMContentLoaded', function () {
    const initialStore = {
        chain: ['0']
    }
    const screenNode = document.querySelector('.screen')
    const calcNode = document.querySelector('.calc')
    let calcStore = {...initialStore}
    function renderStore() {
        screenNode.innerHTML = calcStore.chain.slice(-1).shift()
    }
    function changeValue(value = '') {
        const lastValue = calcStore.chain.slice(-1).shift()
        calcStore.chain = [
            ...calcStore.chain.slice(0,-1),
            lastValue.startsWith('0') && lastValue.length === 1 ? value : lastValue + value
        ]
        renderStore()
    }
    function addDot() {
        const lastValue = calcStore.chain.slice(-1).shift()
        calcStore.chain = [...calcStore.chain.slice(0,-1), lastValue.includes('.') ? lastValue : lastValue + '.']
        renderStore()
    }
    function resetStore(init = {}) {
        calcStore = {
            ...initialStore,
            ...init
        }
        renderStore()
    }
    function changeSign() {
        const lastValue = calcStore.chain.slice(-1).shift()
        calcStore.chain = [...calcStore.chain.slice(0,-1), ((+lastValue) * -1).toString()]
        renderStore()
    }
    function makePercent() {
        const lastValue = calcStore.chain.slice(-1).shift()
        calcStore.chain = [...calcStore.chain.slice(0,-1), ((+lastValue) / 100).toString()]
        renderStore()
    }
    function executeAction() {
        calcStore.chain = [eval(calcStore.chain.join('')).toString()]
        renderStore()
    }
    function actionPlus() {
        calcStore.action = '+'
        renderStore()
    }
    function actionMinus() {
        calcStore.action = '+'
        renderStore()
    }
    function addAction(action) {
        const convertedAction =
            action.includes('×') ? '*' :
            action.includes('÷') ? '/' :
            action
        calcStore.chain = [
            ...calcStore.chain,
            convertedAction,
            '0'
        ]
        renderStore()
    }
    calcNode.addEventListener('click', ({target}) => {
        if(target.hasAttribute('data-value')) {
            const clickValue = target.getAttribute('data-value') || ''
            clickValue.match(/\d/) ? changeValue(clickValue) :
            clickValue.match(/\./) ? addDot() :
            clickValue.includes('AC') ? resetStore() :
            clickValue.includes('+/-') ? changeSign() :
            clickValue.includes('%') ? makePercent() :
            clickValue.includes('=') ? executeAction() :
            clickValue.includes('+') || clickValue.includes('-') ||
            clickValue.includes('×') || clickValue.includes('÷') ? addAction(clickValue) :
            console.log('false')
        }
    })
    renderStore()
})