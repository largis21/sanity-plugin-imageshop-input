import {ObjectDefinition, defineField, defineType} from 'sanity'
import {ImageshopInputComponent} from '../components/input/ImageshopInputComponent'
import {ExternalIframeParams} from '../utils'

const imageshopTypeName = 'imageshop' as const

export type ImageshopInputOptions = {
  iFrameParams?: ExternalIframeParams
}

/**
 * @public
 */
export type ImageshopDefinition = Omit<ObjectDefinition, 'type' | 'fields' | 'options'> & {
  type: typeof imageshopTypeName
  options?: ImageshopInputOptions
}

declare module '@sanity/types' {
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