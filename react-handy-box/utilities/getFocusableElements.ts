const FOCUSABLE_ELEMENTS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const getFocusableElements: (
  targetElement: HTMLElement
) => Array<HTMLElement> = (targetElement) => {
  const elements = Array.from<HTMLElement>(
    targetElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)
  );

  // Sort by tabIndex, but don't mess with the order of focus traps
  elements.sort((a, b) =>
    a.matches(':not([data-is-focus-trap])') ? a.tabIndex - b.tabIndex : 0
  );

  return elements;
};

export { getFocusableElements };
