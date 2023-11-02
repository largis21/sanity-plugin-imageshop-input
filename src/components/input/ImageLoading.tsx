import {Card, Flex, Spinner, Text} from '@sanity/ui'

export function ImageLoading() {
  return (
    <Card padding={3} style={{outline: '1px solid #3f434a', borderRadius: '0.1875rem'}}>
      <Flex justify={'center'} align={'center'} direction={'column'} paddingY={1}>
        <Spinner muted />
        <Text size={1} muted style={{padding: '1rem'}}>
          Loading...
        </Text>
      </Flex>
    </Card>
  )
}
