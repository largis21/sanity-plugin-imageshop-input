import {ObjectFieldProps} from 'sanity'
import {ImageshopInputComponent} from '../input/ImageshopInputComponent'

export function ImageshopInputField(props: ObjectFieldProps) {
  const inputProps = props.inputProps

  return <ImageshopInputComponent {...inputProps} />
}
