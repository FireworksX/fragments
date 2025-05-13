module.exports = [
  {
    type: 'input',
    name: 'component_name',
    message: 'What is the component name?'
  },
  {
    type: 'input',
    name: 'path',
    message: 'Where is the directory (Default: src/components)',
    default: 'src/components'
    // transformer: input => {
    //   // Например, добавляем "/" в конец, если его нет
    //   console.log(input)
    //   if (input.startsWith('src')) {
    //     return input
    //   }
    //
    //   const srcIndex = input.indexOf('/s')
    //
    //   const nextInput = input.splice(srcIndex)
    //
    //   console.log(srcIndex, nextInput)
    //
    //   return input
    // }
  }
]
