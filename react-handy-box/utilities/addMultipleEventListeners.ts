const addMultipleEventListeners = (
  element: HTMLElement,
  eventNames: Array<string>,
  handler: EventListenerOrEventListenerObject
) => {
  eventNames.forEach((eventName) => {
    element.addEventListener(eventName, handler);
  });

  return () => {
    eventNames.forEach((eventName) => {
      element.removeEventListener(eventName, handler);
    });
  };
};

export { addMultipleEventListeners };
