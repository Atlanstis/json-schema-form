import { defineComponent, reactive, Ref, ref, watchEffect } from 'vue'
import MonacoEditor from './components/monaco-editor'
import './styles/app.scss'
import demos from './demos'
import SchemaForm from '../lib'

type Schema = any
type UISchema = any

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0)

    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })

    function handleCodeChange(
      field: 'schema' | 'data' | 'uiSchema',
      value: string
    ) {
      try {
        const json = JSON.parse(value)
        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        console.error(err)
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    return () => {
      const selected = selectedRef.value
      return (
        <div class="container">
          <div class="menu">
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    'menu-button': true,
                    'menu-selected': index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class="content">
            <div class="code">
              <MonacoEditor
                code={demo.schemaCode}
                class="code-panel"
                onChange={handleSchemaChange}
                title="Schema"
              ></MonacoEditor>
              <div class="ui-and-value">
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class="code-panel"
                  onChange={handleUISchemaChange}
                  title="UI Schema"
                ></MonacoEditor>
                <MonacoEditor
                  code={demo.dataCode}
                  class="code-panel"
                  onChange={handleDataChange}
                  title="Value"
                ></MonacoEditor>
              </div>
            </div>
            <div class="form">
              <SchemaForm></SchemaForm>
            </div>
          </div>
        </div>
      )
    }
  },
})
