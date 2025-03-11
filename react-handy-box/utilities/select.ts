const select = (selector: string, parentNode: HTMLElement = document.body) =>
  !selector ? null : (parentNode.querySelector(selector) as HTMLElement);

const selectAll = (selector: string, parentNode: HTMLElement = document.body) =>
  !selector
    ? null
    : (Array.from(parentNode.querySelectorAll(selector)) as Array<HTMLElement>);

export { select, selectAll };
