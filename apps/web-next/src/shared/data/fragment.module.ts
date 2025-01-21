import predictionCardData from './fragment.json'
import buttonData from './button.fragment.json'

export const fragmentModule = {
  _type: 'Fragment',
  _id: '',
  name: 'PredictionCard',
  data: predictionCardData,
  linkedFragments: [
    {
      _type: 'Fragment',
      _id: 'buttonid',
      name: 'Button',
      data: buttonData
    }
  ]
}
