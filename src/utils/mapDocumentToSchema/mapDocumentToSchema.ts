import {ImageshopDocument} from '../../components/hooks/useOnDocumentSelected'
import {ImageshopInputValue} from '../../schemas/input'
import {generateLqip} from '../generateLqip/generateLqip'
import {getImage} from '../getImage/getImage'

export async function mapDocumentToSchema(
  document: ImageshopDocument,
): Promise<ImageshopInputValue> {
  const permalink = document.image.file

  const image = await getImage(permalink)

  const lqip = generateLqip(image, 16)

  try {
    return {
      _type: 'imageshop',
      permalink,
      alt: '',
      caption: '',
      metadata: {
        documentId: document.documentId,
        lqip,
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
