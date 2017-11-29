document.addEventListener('DOMContentLoaded', function () {
    const initialStore = {
        firstValue: '0',
        secondValue: '0',
        action: null
    }
    const screenNode = document.querySelector('.screen')
    const calcNode = document.querySelector('.calc')
    let calcStore = {...initialStore}
    function renderStore() {
        const activeValueKey =  calcStore.action === null ? 'firstValue' : 'secondValue'
        screenNode.innerHTML = calcStore[activeValueKey]
    }
    function changeValue(activeValueKey = 'firstValue', value = '') {
        const activeValue = calcStore[activeValueKey]
        calcStore[activeValueKey] =
            activeValue === '0' && value === '0' ? '0' :
            activeValue === '0' && value !== '0' ? value :
            activeValue + value
        renderStore()
    }
    function addDot(activeValueKey = 'firstValue') {
        const activeValue = calcStore[activeValueKey]
        calcStore[activeValueKey] =
            activeValue.includes('.') ? activeValue : activeValue + '.'
        renderStore()
    }
    function resetStore(init = {}) {
        calcStore = {
            ...initialStore,
            ...init
        }
        renderStore()
    }
    function changeSign(activeValueKey) {
        calcStore[activeValueKey] = (calcStore[activeValueKey] * -1).toString()
        renderStore()
    }
    function makePercent(activeValueKey) {
        calcStore[activeValueKey] = (calcStore[activeValueKey] / 100).toString()
        renderStore()
    }
    function executeAction() {
        const {...oldStore} = calcStore
        const {firstValue, secondValue, action} = oldStore
        resetStore()
        calcStore.firstValue = eval(firstValue + action + secondValue)
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
        calcStore.action =
            action.includes('×') ? '*' :
            action.includes('÷') ? '/' :
            action

        renderStore()
    }
    calcNode.addEventListener('click', ({target}) => {
        if(target.hasAttribute('data-value')) {
            const clickValue = target.getAttribute('data-value') || ''
            const activeValueKey = calcStore.action === null ? 'firstValue' : 'secondValue'
            clickValue.match(/\d/) ? changeValue(activeValueKey, clickValue) :
            clickValue.match(/\./) ? addDot(activeValueKey) :
            clickValue.includes('AC') ? resetStore() :
            clickValue.includes('+/-') ? changeSign(activeValueKey) :
            clickValue.includes('%') ? makePercent(activeValueKey) :
            clickValue.includes('=') ? executeAction() :
            clickValue.includes('+') || clickValue.includes('-')
            clickValue.includes('×') || clickValue.includes('÷') ? addAction(clickValue) :
            console.log('false')
        }
    })
    renderStore()
})