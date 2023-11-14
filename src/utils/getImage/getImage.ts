export async function getImage(permalink: string): Promise<HTMLImageElement> {
  // I have to get the blob first because of some CORS issue when applying the
  // image to canvases
  const imageBlob = await fetch(permalink).then((res) => res.blob())

  const blobUrl = URL.createObjectURL(imageBlob)

  const imagePromise: Promise<HTMLImageElement> = new Promise((resolve) => {
    const image = new Image()
    image.src = blobUrl
    image.onload = () => resolve(image)
    image.onerror = () => {
      throw new Error('Could not generate lqip')
    }
  })

  const image = await imagePromise
  return image
}
