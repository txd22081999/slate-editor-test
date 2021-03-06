import { Node } from 'slate'

export const serialize = (value: any[]) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (str: string) => {
  // Return a value array of children derived by splitting the string.
  return str.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    }
  })
}
