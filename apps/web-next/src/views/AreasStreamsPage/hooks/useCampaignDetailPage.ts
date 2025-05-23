import { useParams } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useCreateCampaignMutation } from '@/views/AreasStreamsPage/queries/CreateCampaign.generated'

export const useCampaignDetailPage = () => {
  const tableRef = useRef(null)
  const { areaSlug, projectSlug } = useParams()
  const [createStream, { loading: creatingStream }] = useCreateCampaignMutation()
  // const [executeCreateStream, { loading: loadingCreateStream }] = useMutation(CREATE_STREAM)
  // const [executeUpdateStream, { loading: loadingUpdateStream }] = useMutation(UPDATE_STREAM)
  // const [, updateModal] = useGraph(modalStore, modalStore.key)

  const handleCreateStream = async name => {
    await createStream({
      variables: {
        name,
        active: false,
        areaId: +areaSlug
      }
    })
  }

  const clickCreateStream = () => {
    tableRef?.current?.createNew?.()
  }

  return {
    tableRef,
    creatingStream,
    areaSlug,
    projectSlug,
    handleCreateStream,
    clickCreateStream
  }
}

// Преобразует SVG в base64 строку для использования как изображение
const svgToBase64 = svg => `data:image/svg+xml;base64,${btoa(svg)}`

// Генерирует случайное целое число в диапазоне [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Генерирует случайное число с плавающей точкой в диапазоне [min, max]
function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

// Список доступных цветов
const availableColors = ['#FFC700', '#1BC47D', '#f2371f', '#18A0FB', '#907CFF', '#00c5df', '#EE46D3']

// Генерирует SVG для прямоугольника с поддержкой градиента
function generateRectangleSVG({ x, y, width, height, fill, fillType, gradient }) {
  let gradientDef = ''
  let fillValue = fill

  if (fillType === 'gradient') {
    const { type, x1, y1, x2, y2, stops } = gradient
    fillValue = `url(#lg_${x}_${y})` // Ссылка на градиент
    gradientDef = `
            <linearGradient id="lg_${x}_${y}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
                <stop offset="0%" stop-color="${stops[0].color}" stop-opacity="${stops[0].opacity}"/>
                <stop offset="100%" stop-color="${stops[1].color}" stop-opacity="${stops[1].opacity}"/>
            </linearGradient>`
  }

  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fillValue}"/>${gradientDef}`
}

// Генерирует SVG для эллипса
function generateEllipseSVG({ x, y, width, height, fill }) {
  return `<ellipse cx="${x}" cy="${y}" rx="${width / 2}" ry="${height / 2}" fill="${fill}"/>`
}

// Генерирует SVG для треугольника
function generateTriangleSVG({ x, y, width, height, fill }) {
  return `<path d="M${x} ${y} L${x - width / 2} ${y + height} L${x + width / 2} ${y + height} Z" fill="${fill}"/>`
}

// Генерирует случайную фигуру с параметрами
function generateShape(index) {
  const x = getRandomInt(0, 800) // Случайная координата X
  const y = getRandomInt(0, 800) // Случайная координата Y
  const width = getRandomInt(800, 1280) // Случайная ширина
  const height = getRandomInt(800, 1280) // Случайная высота
  const fillColor = availableColors[getRandomInt(0, availableColors.length - 1)] // Случайный цвет

  const shapeConfig = {
    type: 'shape',
    id: index || 0,
    value: fillColor
  }

  const shape = {
    shape: ['rectangle', 'ellipse', 'triangle'][getRandomInt(0, 2)], // Случайный тип фигуры
    x: x,
    y: y,
    width: width,
    height: height,
    fill: fillColor,
    fillType: 'solid', // По умолчанию сплошной цвет
    opacity: getRandom(0.5, 1), // Случайная прозрачность
    gradient: {}
  }

  // 20% шанс использовать градиент
  if (Math.random() < 0.2) {
    shape.fillType = 'gradient'
    shape.gradient = {
      type: 'linear',
      x1: x,
      y1: y + height / 2,
      x2: x + width,
      y2: y + height / 2,
      stops: [
        { color: availableColors[getRandomInt(0, availableColors.length - 1)], opacity: getRandom(0.5, 1) },
        { color: availableColors[getRandomInt(0, availableColors.length - 1)], opacity: getRandom(0.5, 1) }
      ]
    }
  }

  return {
    shape: shape,
    color: shapeConfig
  }
}

// Генерирует конфигурацию градиента и фигур
function generateGradientConfig() {
  const shapeCounts = [1, 2, 3, 4, 5, 6]
  const config = []

  const backgroundOpacity = getRandom(0.1, 0.5)
  const backgroundColor = availableColors[getRandomInt(0, availableColors.length - 1)]
  const lightDarkMode = getRandomInt(0, 10) % 2 ? '#FFFFFF' : '#000000'

  const numberOfShapes = shapeCounts[Math.floor(Math.random() * shapeCounts.length)]
  console.log('Количество фигур для рисования:', numberOfShapes)

  const shapes = []
  for (let i = 0; i < numberOfShapes; i++) {
    try {
      const { shape, color } = generateShape(i)
      console.log('Фигура:', shape.shape, 'Цвет:', color.value)
      config.push(color)
      shapes.push(shape)
    } catch (error) {
      console.log('Ошибка при генерации фигуры:', error)
    }
  }

  config.push({
    type: 'background',
    id: config.length,
    value: backgroundColor
  })

  console.log('Массив фигур:', shapes)
  console.log('Общее количество фигур:', shapes.length)

  return {
    background: {
      color: backgroundColor,
      opacity: backgroundOpacity
    },
    shapes: shapes,
    lightDarkMode: lightDarkMode,
    allColors: config,
    noiseConfig: {
      isNoise: true,
      baseFrequency: 0.23,
      numOctaves: 8,
      value: 7.5,
      seed: 0
    }
  }
}

// Генерирует SVG на основе конфигурации
function generateSVG(config) {
  const { background, shapes, lightDarkMode, allColors, noiseConfig } = config

  const svgParts = []
  svgParts[0] =
    '<svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="border-radius: 0px">'
  svgParts[1] = `<rect width="1600" height="1600" fill="${lightDarkMode}"/>`
  svgParts[2] = `<rect width="1600" height="1600" fill="${background.color}" fill-opacity="${background.opacity}"/>`
  svgParts[3] = '<g clip-path="url(#clip0_50_327)"><g filter="url(#filter0_f_50_327)">'

  const shapeSVGs = shapes
    .map(shape => {
      if (shape.shape === 'rectangle') return generateRectangleSVG(shape)
      if (shape.shape === 'ellipse') return generateEllipseSVG(shape)
      if (shape.shape === 'triangle') return generateTriangleSVG(shape)
      return ''
    })
    .join('')
  svgParts[4] = shapeSVGs

  svgParts[5] =
    '</g></g>\n        <g style="mix-blend-mode:overlay">\n          <rect width="1600" height="1600" fill="url(#pattern0)" fill-opacity="0.75"/>\n          <rect x="0" y="0" width="1600" height="1600" style="fill:gray; stroke:transparent; filter: url(#feTurb02)" />\n        </g>\n        <defs xmlns="http://www.w3.org/2000/svg">\n          <filter id="feTurb02" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">'
  svgParts[6] = `<feTurbulence baseFrequency="${noiseConfig.baseFrequency}" numOctaves="${noiseConfig.numOctaves}" seed="${noiseConfig.seed}" result="out1"/>`
  svgParts[7] =
    ' <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"/>\n            <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"/>\n          </filter>\n          <filter id="filter0_f_50_327" x="0" y="0" width="1600" height="1600" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_50_327"/>\n          </filter>\n          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="0.08375" height="0.08375">\n            <use xlink:href="#image0_50_327" transform="scale(0.001)"/>\n          </pattern>\n\n          <clipPath id="clip0_50_327">\n            <rect width="1600" height="1600" fill="white"/>\n          </clipPath>'
  svgParts[8] = '</defs></svg>'

  const svgBody = svgParts.join('')

  return {
    svg_body: svgBody,
    allColors: allColors
  }
}

// Пример использования
const config = generateGradientConfig()
const result = generateSVG(config)
console.log(result.svg_body)
// Если нужно сохранить как изображение
// const base64Image = svgToBase64(result.svg_body);
// console.log(base64Image);
