import {ObjectInputProps, set, unset} from 'sanity'
import {Stack, Button, ThemeProvider} from '@sanity/ui'
import {ImagePicker} from '../views/ImagePicker'
import {FormEvent, useCallback, useState} from 'react'
import {AddIcon} from '@sanity/icons'
import {ImagePreview} from './ImagePreview'
import {ImageLoading} from './ImageLoading'
import {ReplaceOrDeleteButton} from './ReplaceOrDeleteButton'
import {TextField} from './TextField'

export function ImageshopInputComponent(props: ObjectInputProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [altText, setAltText] = useState(props.value?.alt || '')
  const [captionText, setCaptionText] = useState(props.value?.caption || '')

  function handleInputOpen() {
    setOpen(true)
  }

  function handleInputClose() {
    setOpen(false)
  }

  function handleImageDelete() {
    props.onChange(unset())
  }

  const onAltChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const newAltText = event.currentTarget.value
      setAltText(newAltText)

      const newValue = {...props.value}
      newValue.alt = newAltText

      props.onChange(set(newValue))
    },
    [props],
  )

  const onCaptionChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const newCaption = event.currentTarget.value
      setCaptionText(newCaption)

      const newValue = {...props.value}
      newValue.caption = newCaption

      props.onChange(set(newValue))
    },
    [props],
  )

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
                <ImagePreview src={props.value.metadata?.lqip || props.value.permalink} />
              ) : (
                <span>Could not preview selected image</span>
              )}

              {props.schemaType.options.showAlt !== false && (
                <TextField
                  value={altText}
                  onChange={onAltChange}
                  title="Alternative text"
                  description="Important for SEO and accessibility"
                />
              )}

              {props.schemaType.options.showCaption && (
                <TextField value={captionText} onChange={onCaptionChange} title="Image Caption" />
              )}
            </Stack>
          ) : (
            <Button icon={AddIcon} text={'Add image'} mode="ghost" onClick={handleInputOpen} />
          )}
        </>
      )}
    </ThemeProvider>
  )
}
