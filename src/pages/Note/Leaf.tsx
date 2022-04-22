import React from 'react';

import { CustomText } from '../../react-app-env';

type Props = {
  attributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>;
  leaf: CustomText;
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
};

export function Leaf(props: Props) {
  const { attributes, children, leaf } = props;

  let element = children;

  if (leaf.code) {
    element = <code>{children}</code>;
  }

  if (leaf.bold) {
    element = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    element = <em>{children}</em>;
  }

  if (leaf.underline) {
    element = <u>{children}</u>;
  }

  return <span {...attributes}>{element}</span>;
}
