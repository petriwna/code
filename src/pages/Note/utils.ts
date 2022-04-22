import { Editor, Transforms, Text } from 'slate';

import { CustomEditor, CustomNode } from '../../react-app-env';

export const CustomEditorHelpers = {
  isBoldMarkActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: CustomNode) => Text.isText(n) && n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isItalicMarkActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: CustomNode) => Text.isText(n) && n.italic === true,
      universal: true,
    });

    return !!match;
  },

  isUnderlineMarkActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: CustomNode) => Text.isText(n) && n.underline === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, { match: (n: CustomNode) => Text.isText(n) && n.code === true });

    return !!match;
  },

  toggleBlockMark(editor: CustomEditor) {
    const isActive = CustomEditorHelpers.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n: CustomNode) => Text.isText(n), split: true },
    );
  },

  toggleItalicMark(editor: CustomEditor) {
    const isActive = CustomEditorHelpers.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: (n: CustomNode) => Text.isText(n), split: true },
    );
  },

  toggleUnderlineMark(editor: CustomEditor) {
    const isActive = CustomEditorHelpers.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? undefined : true },
      { match: (n: CustomNode) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor: CustomEditor) {
    const isActive = CustomEditorHelpers.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { code: isActive ? undefined : true },
      { match: (n: CustomNode) => Text.isText(n), split: true },
    );
  },
};
