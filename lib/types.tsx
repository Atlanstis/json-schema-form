import { PropType } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }
export interface Schema {
  type: SchemaTypes | string
  const?: any
  format?: string
  default?: any
  properties?: {
    [key: string]: Schema | { $ref: string }
  }
  items?: Schema | Schema[] | SchemaRef
  dependencies?: {
    [key: string]: string[] | Schema | { $ref: string }
  }
  oneOf?: Schema[]
  // vjfs?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItes?: Schema
}

export const FieldPropsDefine = {
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
} as const // ts 在接受 props 时，props 应为 ReadOnly。 as const 用于解决 props 被定义为变量时，props 下属性可能为 undefined 问题
