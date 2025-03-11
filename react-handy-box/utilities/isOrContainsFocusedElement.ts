const isOrContainsFocusedElement = (element: HTMLElement) => {
  if (element.matches(':focus')) {
    return true;
  }

  if (element.querySelector(':focus')) {
    return true;
  }

  return false;
};

export { isOrContainsFocusedElement };
