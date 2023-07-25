import { Base } from "./base";

export class Window extends Base {
  constructor() {
    super();
    window.addEventListener("customElementsDefined", () => this.setup());
    window.addEventListener("mousemove", (e) => {
      this.#mouse_x = e.x;
      this.#mouse_y = e.y;
    });
  }
  get height() {
    return window.innerHeight;
  }
  #mouse_x = 0;
  #mouse_y = 0;
  get mouse() {
    return {
      x: this.#mouse_x,
      y: this.#mouse_y,
    };
  }
  get width() {
    return window.innerWidth;
  }
  get window() {
    return this;
  }
}
customElements.define("m-window", Window);
