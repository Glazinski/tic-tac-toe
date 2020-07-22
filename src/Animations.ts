import gsap from 'gsap';
import { DOMHelpers } from './DOMHelpers';
import { Directions } from './types/Directions';

export class Animations extends DOMHelpers {
  stripe: HTMLElement;
  boardElement: HTMLElement;

  constructor() {
    super();
    this.stripe = this.createElement('div', 'line');
    this.boardElement = this.createElement('div');
  }

  animateLine = (
    selector: string,
    basedSelector: string,
    direction: Directions
  ): void => {
    this.boardElement = this.getElement(selector);
    const { height, width } = this.boardElement.getBoundingClientRect();
    document.body.insertAdjacentElement('afterbegin', this.stripe);
    const basedElement = this.getElement(basedSelector);
    const {
      x: basedX,
      y: basedY,
      height: basedHeight,
      width: basedWidth,
    } = basedElement.getBoundingClientRect();
    const diagonalWidth = Math.sqrt(width ** 2 + height ** 2);

    if (direction === Directions.Horizontal) {
      gsap.set(this.stripe, {
        x: basedX,
        y: basedY + basedHeight / 2 - 8,
        width: width,
        rotate: 0,
        transformOrigin: 'left center',
      });
    } else if (direction === Directions.Vertical) {
      gsap.set(this.stripe, {
        x: basedX + basedWidth / 2,
        y: basedY - 8,
        width: width,
        rotate: 90,
        transformOrigin: 'left center',
      });
    } else if (direction === Directions.LeftDiagonal) {
      gsap.set(this.stripe, {
        x: basedX,
        y: basedY - 8,
        width: diagonalWidth,
        transformOrigin: 'left center',
        rotate: 45,
      });
    } else if (direction === Directions.RightDiagonal) {
      gsap.set(this.stripe, {
        x: basedX - (diagonalWidth - basedWidth),
        y: basedY - 8,
        width: diagonalWidth,
        transformOrigin: 'right center',
        rotate: -45,
      });
    }

    gsap.fromTo(this.stripe, 0.6, { scaleX: 0 }, { scaleX: 1 });
    setTimeout(() => {
      this.stripe.remove();
    }, 1000);
  };
}
