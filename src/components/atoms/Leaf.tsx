const Leaf = (props: any) => {
  let { attributes, children, leaf } = props

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: 'line-through' }}>{children}</span>
    )
  }

  return (
    <div draggable onDragStart={(e) => console.log(e)}>
      <span {...attributes}>{children}</span>
    </div>
  )
}

export default Leaf
