import * as React from 'react';

import { Component } from './Input.styled';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Component ref={ref} {...props} />;
});
