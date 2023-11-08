import {ObjectInputProps, set, unset} from 'sanity'
import {Stack, Button, TextInput, Text, ThemeProvider} from '@sanity/ui'
import {ImagePicker} from '../views/ImagePicker'
import {FormEvent, useCallback, useState} from 'react'
import {AddIcon} from '@sanity/icons'
import {ImagePreview} from './ImagePreview'
import {ImageLoading} from './ImageLoading'
import {ReplaceOrDeleteButton} from './ReplaceOrDeleteButton'

export function ImageshopInputComponent(props: ObjectInputProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [altText, setAltText] = useState(props.value?.metadata?.alt || '')

  function handleInputOpen() {
    setOpen(true)
  }

  function handleInputClose() {
    setOpen(false)
  }

  function handleImageDelete() {
    props.onChange(unset())
  }

  const onAltChange = useCallback((event: FormEvent<HTMLInputElement>) => {
    const newAltText = event.currentTarget.value
    setAltText(newAltText)

    const newValue = {...props.value}
    newValue.metadata.alt = newAltText

    props.onChange(set(newValue))
  }, [props])

  return (
    <ThemeProvider>
      {open && <ImagePicker {...props} onClose={handleInputClose} setLoading={setLoading} />}
      {loading ? (
        <ImageLoading />
      ) : (
        <>
          {props.value ? (
            <Stack space={2}>
              <ReplaceOrDeleteButton onReplace={handleInputOpen} onDelete={handleImageDelete} />

              {props.value.permalink ? (
                <ImagePreview src={props.value.permalink} />
              ) : (
                <span>Could not preview selected image</span>
              )}

              <Stack space={2} marginTop={2}>
                <Text size={1} weight="bold">
                  Alternative text
                </Text>
                <Text size={1} muted>
                  Important for SEO and accessibility
                </Text>
                <TextInput onChange={onAltChange} value={altText} />
              </Stack>
            </Stack>
          ) : (
            <Button icon={AddIcon} text={'Add image'} mode="ghost" onClick={handleInputOpen} />
          )}
        </>
      )}
    </ThemeProvider>
  )
}
