import { useEffect, useRef } from 'react';

const usePreviousValue = (stateVariableValue: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = stateVariableValue;
  }, [stateVariableValue]);

  return ref.current;
};

export { usePreviousValue };
