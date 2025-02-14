import { createContext, useState } from "react";

export const CounterContext = createContext();

export default function CounterProvider(props) {
  const [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(Math.random() * 100);
  }

  return (
    <CounterContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
