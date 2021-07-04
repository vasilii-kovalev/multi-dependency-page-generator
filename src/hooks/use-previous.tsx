import * as React from "react";

// Source: https://usehooks.com/usePrevious/
const usePrevious = <Type,>(value: Type): Type | undefined => {
  const ref = React.useRef<Type>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export { usePrevious };
