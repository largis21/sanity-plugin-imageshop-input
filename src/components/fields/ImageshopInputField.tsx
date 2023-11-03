import {ThemeProvider, Stack, Text} from '@sanity/ui'
import {ObjectFieldProps} from 'sanity'
import {ImageshopInputComponent} from '../input/ImageshopInputComponent'

export function ImageshopInputField(props: ObjectFieldProps) {
  const inputProps = props.inputProps

  return (
    <ThemeProvider>
      <Stack space={2}>
        {props.title && (
          <Text size={1} weight="bold">
            {props.title}
          </Text>
        )}
        {props.description && (
          <Text size={1} muted>
            {props.description}
          </Text>
        )}
        <ImageshopInputComponent {...inputProps} />
      </Stack>
    </ThemeProvider>
  )
}
