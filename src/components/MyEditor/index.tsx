import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  BaseEditor,
  Text,
} from 'slate'
import { withHistory } from 'slate-history'
import {
  Button,
  Toolbar,
  Icon,
  MarkButton,
  BlockButton,
  toggleMark,
} from '../atoms'
import { css } from '@emotion/css'
import { DndProvider } from 'react-dnd'
import Element from '../atoms/Element'
import Leaf from '../atoms/Leaf'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableElement from '../atoms/DraggableElement'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const defaultValue: Descendant[] | any = [
  {
    type: 'paragraph',
    children: [
      { text: 'Hello. ', strikethrough: true },
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Paragraph 4',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Paragraph 5',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Paragraph 6',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Paragraph 7',
      },
    ],
  },
  //   {
  //     type: 'paragraph',
  //     align: 'center',
  //     children: [{ text: 'Try it out for yourself!' }],
  //   },
]

const MyEditor = (): JSX.Element => {
  // const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderElement = useCallback(
    (props: any) => <DraggableElement {...props} />,
    []
  )

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor: ReactEditor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const initialValue = useMemo(() => {
    const content = localStorage.getItem('content')
    if (content) {
      return JSON.parse(content)
    } else {
      return defaultValue
    }
  }, [])
  const [search, setSearch] = useState<string | undefined>()
  const decorate = useCallback(
    ([node, path]: any) => {
      const ranges: any = []

      if (search && Text.isText(node)) {
        const { text } = node
        const parts = text.split(search)
        let offset = 0

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path, offset: offset - search.length },
              focus: { path, offset },
              highlight: true,
            })
          }

          offset = offset + part.length + search.length
        })
      }

      return ranges
    },
    [search]
  )

  const onKeyDown = (event: any) => {
    if (event.key === '&') {
      // Prevent the ampersand character from being inserted.
      event.preventDefault()
      // Execute the `insertText` method when the event occurs.
      editor.insertText('and')
    }
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  const onChange = (values: any) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    )
    console.log(isAstChange)

    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(values)
      localStorage.setItem('content', content)
    }
  }

  const moveBlock = () => {
    // Transforms.moveNodes(editor, {
    //   at: [0],
    //   to: [1],
    // })
    // console.log('MOVED')
    // console.log(editor)
    // Transforms.removeNodes(editor, {
    //   at: [0],
    // })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Slate
        editor={editor}
        value={initialValue}
        // onChange={onChange}
      >
        <Toolbar>
          {/* <div
          className={css`
            position: relative;
          `}
        >
          <Icon
            className={css`
              position: absolute;
              top: 0.3em;
              left: 0.4em;
              color: #ccc;
            `}
          >
            search
          </Icon>
          <input
            type='search'
            placeholder='Search the text...'
            onChange={(e) => setSearch(e.target.value)}
            className={css`
              padding-left: 2.5em;
              width: 100%;
            `}
          />
        </div> */}
          <MarkButton format='bold' icon='format_bold' />
          <MarkButton format='italic' icon='format_italic' />
          <MarkButton format='underline' icon='format_underlined' />
          <MarkButton format='code' icon='code' />
          <BlockButton format='heading-one' icon='looks_one' />
          <BlockButton format='heading-two' icon='looks_two' />
          <BlockButton format='block-quote' icon='format_quote' />
          <BlockButton format='numbered-list' icon='format_list_numbered' />
          <BlockButton format='bulleted-list' icon='format_list_bulleted' />
          <BlockButton format='left' icon='format_align_left' />
          <BlockButton format='center' icon='format_align_center' />
          <BlockButton format='right' icon='format_align_right' />
          <BlockButton format='justify' icon='format_align_justify' />
          {/* <button onClick={moveBlock}>Move</button> */}
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder='Enter some rich text…'
          spellCheck
          autoFocus
          decorate={decorate}
          onKeyDown={onKeyDown}
          // onDragStart={(e) => console.log(e)}
        />
      </Slate>
    </DndProvider>
  )
}

// const withDragAndDrop = (component: () => JSX.Element) => {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <component />
//     </DndProvider>
//   )
// }

export default MyEditor
// export default withDragAndDrop(MyEditor)
