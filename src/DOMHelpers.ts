export class DOMHelpers {
  protected getElement = (selector: string): HTMLElement => {
    const element = <HTMLElement>document.querySelector(selector);
    if (element) {
      return element;
    }

    const errMsg = 'Element was not found in the dom';
    throw new Error(errMsg);
  };

  protected getAllElements = (selector: string): NodeList => {
    const elements = <NodeList>document.querySelectorAll(selector);

    if (elements) {
      return elements;
    }

    const errMsg = 'Elements were not found in the dom';
    throw new Error(errMsg);
  };

  protected createElement = (
    tag: string,
    className?: string,
    dataset?: string[]
  ): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (dataset) element.dataset[dataset[0]] = dataset[1];

    return element;
  };

  protected removeNodesContent = (
    selector: string,
    classToRemove?: string
  ): void => {
    const elements = this.getAllElements(selector);
    const elementsArr = [...elements];
    elementsArr.forEach((element: Node): void => {
      let htmlElement = <HTMLElement>element;
      htmlElement.innerHTML = '';
      if (classToRemove) htmlElement.classList.remove(classToRemove);
    });
  };

  protected removeElement = (selector: string): void => {
    const elementToRemove = this.getElement(selector);
    elementToRemove.remove();
  };
}
