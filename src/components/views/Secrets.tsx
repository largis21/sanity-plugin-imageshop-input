import {SettingsView} from '@sanity/studio-secrets'

export const namespace = 'imageshopPlugin'

const pluginConfigKeys = [
  {
    key: 'imageshopToken',
    title: 'Imageshop api token',
  },
]

export type imageshopInputSecret = {
  imageshopToken: string
}

export function Secrets({onClose}: {onClose: () => void}) {
  return (
    <SettingsView
      title="Imageshop api token"
      namespace={namespace}
      keys={pluginConfigKeys}
      onClose={onClose}
    />
  )
}
