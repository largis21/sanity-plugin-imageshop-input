import {ObjectInputProps, unset} from 'sanity'
import {Stack, Button} from '@sanity/ui'
import {ImagePicker} from '../views/ImagePicker'
import {useState} from 'react'
import {AddIcon} from '@sanity/icons'
import {ImagePreview} from './ImagePreview'
import {ImageLoading} from './ImageLoading'
import {ReplaceOrDeleteButton} from './ReplaceOrDeleteButton'

export function ImageshopInputComponent(props: ObjectInputProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleInputOpen() {
    setOpen(true)
  }

  function handleInputClose() {
    setOpen(false)
  }

  function handleDelete() {
    props.onChange(unset())
  }

  return (
    <>
      {open && <ImagePicker {...props} onClose={handleInputClose} setLoading={setLoading} />}
      {loading ? (
        <ImageLoading />
      ) : (
        <>
          {props.value ? (
            <Stack space={2}>
              <ReplaceOrDeleteButton onReplace={handleInputOpen} onDelete={handleDelete} />
              {props.value.permalink ? (
                <ImagePreview src={props.value.permalink} />
              ) : (
                <span>Could not preview selected image</span>
              )}
            </Stack>
          ) : (
            <Button icon={AddIcon} text={'Add image'} mode="ghost" onClick={handleInputOpen} />
          )}
        </>
      )}
    </>
  )
}
