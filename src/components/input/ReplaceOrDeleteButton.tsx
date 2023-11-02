import {Flex, Card, Button} from '@sanity/ui'
import {SyncIcon, TrashIcon} from '@sanity/icons'

export function ReplaceOrDeleteButton({
  onReplace,
  onDelete,
}: {
  onReplace: () => void
  onDelete: () => void
}) {
  return (
    <Flex>
      <Card flex={1} paddingRight={2}>
        <Button
          icon={SyncIcon}
          text={'Replace Image'}
          mode="ghost"
          onClick={onReplace}
          style={{width: '100%'}}
        />
      </Card>
      <Button icon={TrashIcon} tone="critical" mode="ghost" onClick={onDelete} />
    </Flex>
  )
}
