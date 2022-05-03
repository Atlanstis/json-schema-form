import { defineComponent, PropType } from 'vue'
import { NumberField, StringField } from './fields'
import { Schema, SchemaTypes } from './types'

export default defineComponent({
  name: 'SchemaItem',

  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },

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
