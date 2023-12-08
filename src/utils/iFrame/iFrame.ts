type Booleanish = 'true' | 'false'

export type ExternalIframeParams = {
  /**
   * The imageshop size picker is a bit weird, it will scale your image up to your size,
   * no matter how much it is cropped, this also applies to the inverse, if your imageshopSizes
   * is 16x9 the final image will be 16 pixels wide. Set to "2048x0" by default
   *
   * @example "1600x900"
   */
  imageshopSizes?: `${string}x${string}`
}

type IframeParameters = {
  IFRAMEINSERT: Booleanish
  HIDEIMAGEINFO: Booleanish
  INSERTIMIDIATELY: Booleanish
  SHOWSIZEDIALOGUE: Booleanish
  SHOWCROPDIALOGUE: Booleanish
  FREECROP: Booleanish
  IMAGESHOPINTERFACENAME: string
  IMAGESHOPDOCUMENTPREFIX: string
  CULTURE: string
  PROFILEID: string
  REQUIREDUPLOADFIELDS: string
  UPLOADFIELDLANGUAGES: string
  IMAGESHOPSIZES: `${string}x${string}`
  FORMAT: 'json'
  IMAGESHOPTOKEN: string
}

function getIframeParams(params: ExternalIframeParams, apiKey: string): IframeParameters {
  return {
    IFRAMEINSERT: 'true',
    HIDEIMAGEINFO: 'false',
    INSERTIMIDIATELY: 'false',
    SHOWSIZEDIALOGUE: 'true',
    SHOWCROPDIALOGUE: 'true',
    FREECROP: 'false',
    IMAGESHOPINTERFACENAME: '',
    IMAGESHOPDOCUMENTPREFIX: '',
    CULTURE: 'nb-NO',
    PROFILEID: '0', // hack to ignore the default imageshop profile
    REQUIREDUPLOADFIELDS: '',
    UPLOADFIELDLANGUAGES: 'no,en',
    IMAGESHOPSIZES: `0x0;${params.imageshopSizes}`,
    FORMAT: 'json',
    IMAGESHOPTOKEN: apiKey,
  }
}

export function getIframeUrl(params: ExternalIframeParams, imageshopToken: string): string {
  const newParams = getIframeParams(params, imageshopToken)

  return `https://client.imageshop.no/InsertImage2.aspx?${new URLSearchParams(newParams)}`
}
