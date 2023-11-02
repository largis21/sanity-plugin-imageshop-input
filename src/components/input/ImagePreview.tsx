import {Card} from '@sanity/ui'

export function ImagePreview({src}: {src: string}) {
  return (
    <Card padding={3} style={{outline: '1px solid #3f434a', borderRadius: '0.1875rem'}}>
      <img src={src} alt="" style={{width: '100%', height: 'auto'}} />
    </Card>
  )
}
