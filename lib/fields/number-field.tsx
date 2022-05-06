import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',

  props: FieldPropsDefine,

  setup(props) {
    const handleChange = (e: any) => {
      const value = Number(e.target.value)
      if (Number.isNaN(value)) {
        props.onChange(undefined)
      } else {
        props.onChange(value)
      }
    }

    return () => {
      return <input value={props.value} onInput={handleChange}></input>
    }
  },
})
