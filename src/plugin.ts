import {definePlugin} from 'sanity'
import {input} from './schemas/input'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {imageshopInput} from 'sanity-plugin-imageshop-input'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [imageshopInput()],
 * })
 * ```
 */
export const imageshopInput = definePlugin(() => {
  return {
    name: 'sanity-plugin-imageshop-input',
    schema: {
      types: [input],
    },
  }
})
