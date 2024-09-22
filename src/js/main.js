import { Logger } from './logger.js'
import { isFeatureAvailable, threadBlockerFactory, yieldToMain } from './utils.js'

const useNewAPI = document.getElementById('useNewAPI')

if (!isFeatureAvailable()) {
  useNewAPI.setAttribute('disabled', true)
  console.log(useNewAPI.nextElementSibling)
  useNewAPI.nextElementSibling.classList.add('text-disabled')
  alert('It seems that your browser does not support scheduler.yield')
}

const DURATION = 1000

const blockBtn = document.getElementById('block')
const helloBtn = document.getElementById('hello')

const executionView = document.getElementById('exec-view') 
const clearLogBtn = document.getElementById('clear')

const logger = new Logger(executionView)

clearLogBtn.addEventListener('click', () => logger.clear())

helloBtn.addEventListener('click', () => logger.log('Hello guys !', 'lightgreen'))

blockBtn.addEventListener('click', async () => {
  const blockMainThread = threadBlockerFactory(DURATION) 

  for (let i = 0; i < 5; i++) {
    logger.log('Block Main thread')
    blockMainThread()

    // Proof of the prioritization
    logger.log('Registrer setTimeout callback to proove prioritization', 'lightblue')
    setTimeout(() => logger.log('setTimeout callback executed', 'yellow'), 0)

    await yieldToMain(useNewAPI.checked)
  }
})

