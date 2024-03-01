import {
  convertFromWei,
  convertToWei
} from '../../../../../util/converter'

{
  const inputtedData = {}
  const options = document.querySelectorAll('[type=radio]')
  const formConverter = document.querySelector('form')
  const inputs = document.querySelectorAll('.input input')

  const convert = (type, value, option) => {
    const _wei = convertToWei(type, value)
    const inputTypes = document.querySelectorAll(`.inputs.${option} input`)

    inputTypes.forEach((type) => {
      if (!value) {
        type.value = ''
        return
      }

      type.value = (type === type.dataset.type) ? value : (convertFromWei(type.dataset.type, _wei))
    })
  }

  inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      const target = e.target
      const dataset = target.dataset

      if (target.value > 0) {
        convert(dataset.type, target.value, dataset.option)
      }

      inputtedData.value = target.value
      inputtedData.type = dataset.type
    })
  })

  options.forEach((option) => {
    option.addEventListener('change', (e) => {
      const selected = e.target.value
      const formConverterClassList = formConverter.classList
      formConverterClassList.remove('simple', 'extended')
      formConverterClassList.add(selected)

      if (inputtedData?.value > 0) {
        convert(inputtedData.type, inputtedData.value, selected)
      }
    })
  })
}
