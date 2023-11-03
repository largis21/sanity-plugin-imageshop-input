import {ImageshopDocument} from '../../components/hooks/useOnDocumentSelected'
import {ImageshopInputValue} from '../../schemas/input'

export async function mapDocumentToSchema(
  document: ImageshopDocument,
): Promise<ImageshopInputValue> {
  const permalink = document.image.file

  const imagePromise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
    const image = new Image()
    image.src = permalink
    image.onload = () => resolve(image)
    image.onerror = () => {
      throw new Error('Could not get metadata for image')
    }
  })

  const image = await imagePromise

  try {
    return {
      type: 'imageshop',
      permalink,
      metadata: {
        alt: 'no alt', // TODO
        documentId: document.documentId,
        dimensions: {
          width: image.width,
          height: image.height,
          aspectRatio: image.width / image.height,
        },
      },
    }
  } catch {
    throw new Error('Could not map document to schema')
  }
}
