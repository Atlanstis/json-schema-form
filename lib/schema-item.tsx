import { defineComponent } from 'vue'
import { NumberField, StringField } from './fields'
import { SchemaTypes, FieldPropsDefine } from './types'

export default defineComponent({
  name: 'SchemaItem',

  props: FieldPropsDefine,

  setup(props) {
    return () => {
      const { schema } = props
      const type = schema.type
      let Componet: any

      switch (type) {
        case SchemaTypes.STRING: {
          Componet = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Componet = NumberField
          break
        }
        default: {
          console.warn(`${type} is not sopport!`)
        }
      }

      return <Componet {...props}></Componet>
    }
  },
})
