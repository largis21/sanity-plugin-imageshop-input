export function generateLqip(image: HTMLImageElement, size: number): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to get canvas context')
  }

  canvas.width = size
  canvas.height = size

  ctx.drawImage(image, 0, 0, size, size)

  const lqip = canvas.toDataURL()

  return lqip
}
