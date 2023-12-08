import {Button, Dialog} from '@sanity/ui'
import {CogIcon} from '@sanity/icons'
import {ExternalIframeParams, getIframeUrl} from '../../utils'
import {useMemo} from 'react'

export function ImageshopView({
  iFrameSettings,
  onClose,
  imageshopToken,
  openSecrets,
}: {
  iFrameSettings?: ExternalIframeParams
  onClose: () => void
  imageshopToken: string
  openSecrets: () => void
}) {
  const iFrameUrl = useMemo(() => {
    const defaultIframeSettings: ExternalIframeParams = {
      imageshopSizes: '2048x0',
      ...iFrameSettings,
    }

    return getIframeUrl(defaultIframeSettings, imageshopToken)
  }, [iFrameSettings, imageshopToken])

  return (
    <Dialog
      id="imageshop-asset-source"
      title="Select image from Imageshop"
      open
      onClose={onClose}
      width={4}
      header={
        <Button
          fontSize={[1]}
          icon={CogIcon}
          onClick={openSecrets}
          mode="bleed"
          aria-label="Imageshop settings"
        />
      }
    >
      <iframe src={iFrameUrl} style={{width: '100%', height: '70vh'}} />
    </Dialog>
  )
}
