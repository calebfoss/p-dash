import { MarkerElement } from "../elements/base";

export const visible = <T extends typeof MarkerElement>(baseClass: T) =>
  class VisibleElement extends baseClass {
    constructor(...args: any[]) {
      super(...args);
    }
    #visible: boolean = null;
    get visible(): boolean {
      if (this.#visible !== null) return this.#visible;
      return this.inherit("visible", true);
    }
    set visible(value) {
      this.#visible = value;
      this.setDocumentElementStyle("display", value ? "block" : "none");
      this.setSVGElementAttribute("display", value ? "unset" : "none");
    }
  };
