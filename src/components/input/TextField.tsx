import {Stack, Text, TextInput} from '@sanity/ui'

export function TextField({
  value,
  onChange,
  title,
  description,
}: {
  value: string
  onChange: (..._: any) => any
  title?: string
  description?: string
}) {
  return (
    <Stack space={2} marginTop={2}>
      {title && (
        <Text size={1} weight="bold">
          {title}
        </Text>
      )}
      {description && (
        <Text size={1} muted>
          {description}
        </Text>
      )}
      <TextInput onChange={onChange} value={value} />
    </Stack>
  )
}
