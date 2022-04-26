import React from 'react';
import { useParams } from 'react-router-dom';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { RenderElementProps, RenderLeafProps } from 'slate-react/dist/components/editable';
import { FaBold, FaCode, FaItalic, FaUnderline } from 'react-icons/fa';
import { MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { DefaultElement } from './DefaultElement';
import { Leaf } from './Leaf';
import { CustomEditorHelpers } from './utils';
import { CustomEditor } from '../../react-app-env';
import './Editor.css';

function renderElement(props: RenderElementProps) {
  const { attributes, children } = props;
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (props.element.type) {
    default:
      return <DefaultElement attributes={attributes}>{children}</DefaultElement>;
  }
}

function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}

export default function Editor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { noteId } = useParams<{ noteId: string }>();

  const editor = React.useMemo<CustomEditor>(() => withHistory(withReact(createEditor())), []);

  const initialValue = React.useMemo<Descendant[]>(() => {
    // @ts-ignore
    let value: Descendant[] = [{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }];
    const content = localStorage.getItem('content');

    if (content) {
      try {
        value = JSON.parse(content);
      } catch (e) {
        console.error(e);
      }
    }

    return value;
  }, []);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some((op) => op.type !== 'set_selection');

        if (isAstChange) {
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }
      }}
    >
      <div className="buttons-container">
        <button
          className="button"
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditorHelpers.toggleBlockMark(editor);
          }}
        >
          <FaBold size="1.3em" />
        </button>
        <button
          className="button"
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditorHelpers.toggleItalicMark(editor);
          }}
        >
          <FaItalic size="1.3em" />
        </button>
        <button
          className="button"
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditorHelpers.toggleUnderlineMark(editor);
          }}
        >
          <FaUnderline size="1.3em" />
        </button>
        <button
          className="button"
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditorHelpers.toggleCodeBlock(editor);
          }}
        >
          <FaCode size="1.5em" />
        </button>
        <button
          className="button"
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditorHelpers.toggleCodeBlock(editor);
          }}
        >
          <MdFormatListBulleted size="1.5em" />
        </button>
        <button className="button" type="button">
          <MdFormatListNumbered size="1.5em" />
        </button>
      </div>
      <Editable
        className="content"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case '`': {
              event.preventDefault();
              CustomEditorHelpers.toggleCodeBlock(editor);
              break;
            }
            case 'b': {
              event.preventDefault();
              CustomEditorHelpers.toggleBlockMark(editor);
              break;
            }
            case 'i': {
              event.preventDefault();
              CustomEditorHelpers.toggleItalicMark(editor);
              break;
            }
            case 'u': {
              event.preventDefault();
              CustomEditorHelpers.toggleUnderlineMark(editor);
              break;
            }
            case 'l': {
              event.preventDefault();
              CustomEditorHelpers.toggleUnderlineMark(editor);
              break;
            }
            default:
          }
        }}
      />
    </Slate>
  );
}
