import {useEffect} from 'react'

export type ImageshopDocument = {
  AuthorName: string
  InterfaceList: {InterfaceID: number; InterfaceName: string}
  code: string
  documentId: number
  extraInfo: unknown
  image: {
    file: string
    height: number
    width: 0
    thumbnail: string
    profile: unknown
    text: {
      [key: string]: {
        categories: unknown[]
        credits: string
        description: string
        documentInfo: unknown[]
        rights: string
        tags: string
        title: string
      }
    }
  }
}

export function useOnDocumentSelected(cb: (docs: ImageshopDocument) => any): void {
  function handleMessageReceived(e: MessageEvent) {
    if (e.origin !== 'https://client.imageshop.no') return

    try {
      const [imageShopDataString] = e.data.split(';')

      if (!imageShopDataString) return

      const parsedEventData = JSON.parse(imageShopDataString) as ImageshopDocument

      // eslint-disable-next-line consistent-return
      return cb(parsedEventData)
    } catch {
      console.error('Could not get parse data')
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessageReceived)

    return () => {
      window.removeEventListener('message', handleMessageReceived)
    }
  })
}
