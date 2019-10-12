type Input<T> = {
  [K in keyof T]: T[K] extends string
    ? (string | typeof String)
    : T[K] extends number
    ? (number | typeof Number)
    : T[K] extends boolean
    ? (boolean | typeof Boolean)
    : never
}

interface ValidInput {
  [key: string]: string | typeof String | number | typeof Number | boolean | typeof Boolean
}

type Output<T> = {
  [K in keyof T]: T[K] extends string | typeof String
    ? string
    : T[K] extends number | typeof Number
    ? number
    : T[K] extends boolean | typeof Boolean
    ? boolean
    : never
}

interface ValidOutput {
  [key: string]: string | number | boolean
}

declare function Env<T extends ValidInput>(config: T): Output<T>
declare function Env<T extends ValidOutput>(config: Output<T>): T

export = Env
