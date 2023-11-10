import {InputProps, set} from 'sanity'
import {imageshopInputSecret, namespace, Secrets} from './Secrets'
import {useSecrets} from '@sanity/studio-secrets'
import {Dispatch, SetStateAction, useState} from 'react'
import {ImageshopView} from './imageshopView'
import {ImageshopInputOptions} from '../../schemas/input'
import {mapDocumentToSchema} from '../../utils'
import {useOnDocumentSelected} from '../hooks/useOnDocumentSelected'

export function ImagePicker(
  props: InputProps & {onClose: Function; setLoading: Dispatch<SetStateAction<boolean>>},
) {
  const {secrets} = useSecrets<imageshopInputSecret>(namespace)

  const [secretsOpen, setSecretsOpen] = useState(false)

  function openSecrets() {
    setSecretsOpen(true)
  }

  function handleSecretsClose() {
    if (!secrets?.imageshopToken) {
      props.onClose()
      return
    }

    setSecretsOpen(false)
  }

  function handleImageshopViewClose() {
    props.onClose()
  }

  useOnDocumentSelected(async (doc) => {
    props.onClose()
    props.setLoading(true)

    /*
     * ISSUE #1
     *
     * This function is what makes the image loading so slow;
     * It first has to wait for Imageshop to generate the image before it can load it
     * and get the image dimensions
     */
    const mappedDocument = await mapDocumentToSchema(doc)
    if (!mappedDocument) return

    props.onChange(set(mappedDocument))
    props.setLoading(false)
  })

  return (
    <>
      {!secrets || secretsOpen ? (
        <Secrets onClose={handleSecretsClose} />
      ) : (
        <ImageshopView
          onClose={handleImageshopViewClose}
          iFrameSettings={(props.schemaType.options as ImageshopInputOptions)?.iFrameParams}
          imageshopToken={secrets.imageshopToken}
          openSecrets={openSecrets}
        />
      )}
    </>
  )
}
