import * as React from 'react';

export const useRemember = <T, R>(initialValue?: T, initialInstance?: R) => {
  const [value, setValue] = React.useState(initialValue);
  const [instance, setInstance] = React.useState(initialInstance);

  return [value, setValue, instance, setInstance];
};
