import {ObjectDefinition, ObjectOptions, defineField, defineType} from 'sanity'
import {ExternalIframeParams} from '../utils'
import {ImageshopInputComponent} from '../components/input/ImageshopInputComponent'

const imageshopTypeName = 'imageshop' as const

export type ImageshopInputValue = {
  _type: 'imageshop'
  permalink: string
  metadata: {
    alt: string
    documentId: number
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export type ImageshopInputOptions = {
  /**
   * Options for changing the imageshop imagepicker parameters
   */
  iFrameParams?: ExternalIframeParams
  /*
   * Disable/Enable the alt input field, default is true
   */
  showAlt?: boolean
}

/**
 * @public
 */
export type ImageshopDefinition = Omit<ObjectDefinition, 'type' | 'fields' | 'options'> & {
  type: typeof imageshopTypeName
  options?: ImageshopInputOptions & ObjectOptions
}

declare module '@sanity/types' {
  export interface IntrinsicDefinitions {
    imageshop: ImageshopDefinition
  }
}

declare module 'sanity' {
  export interface IntrinsicDefinitions {
    imageshop: ImageshopDefinition
  }
}

export const input = defineType({
  name: imageshopTypeName,
  title: 'Imageshop',
  type: 'object',
  components: {
    input: ImageshopInputComponent,
  },
  fields: [
    defineField({
      name: 'permalink',
      type: 'string',
    }),
    defineField({
      name: 'metadata',
      type: 'object',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
        defineField({
          name: 'documentId',
          type: 'number',
        }),
        defineField({
          name: 'dimensions',
          type: 'object',
          fields: [
            defineField({
              name: 'width',
              type: 'number',
            }),
            defineField({
              name: 'height',
              type: 'number',
            }),
            defineField({
              name: 'aspectRatio',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
})
