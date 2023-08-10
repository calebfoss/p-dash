import { Vector } from "./vector";
import { Base } from "../elements/base";

type ContextMethods = Pick<
  CanvasRenderingContext2D,
  {
    [Key in keyof CanvasRenderingContext2D]: CanvasRenderingContext2D[Key] extends Function
      ? Key
      : never;
  }[keyof CanvasRenderingContext2D]
>;
type Transformations = {
  [Key in keyof ContextMethods]?: Parameters<ContextMethods[Key]>;
};

export const transform = <T extends typeof Base>(baseClass: T) =>
  class TransformElement extends baseClass {
    #transformations: Transformations = {};
    #canvas_transformation: DOMMatrix;
    constructor(...args: any[]) {
      super(...args);
    }
    #anchor_x = 0;
    #anchor_y = 0;
    #anchor = new Vector(
      () => this.#anchor_x,
      (value) => {
        this.#anchor_x = value;
        this.#transformations.translate = [value, this.#anchor_y];
      },
      () => this.#anchor_y,
      (value) => {
        this.#anchor_y = value;
        this.#transformations.translate = [this.#anchor_x, value];
      }
    );
    get anchor() {
      return this.#anchor;
    }
    set anchor(value) {
      this.#anchor = value;
      this.#transformations.translate = [value.x, value.y];
      this.setDocumentElementStyle("translate", `${value.x} ${value.y}`);
    }
    #angle = 0;
    get angle() {
      return this.#angle;
    }
    set angle(value) {
      this.#angle = value;
      this.#transformations.rotate = [value];
      this.setDocumentElementStyle("rotate", `${value}rad`);
    }
    #scale_x = 1;
    #scale_y = 1;
    #scale = new Vector(
      () => this.#scale_x,
      (value) => {
        this.#scale_x = value;
        this.#transformations.scale = [value, this.#scale_y];
      },
      () => this.#scale_y,
      (value) => {
        this.#scale_y = value;
        this.#transformations.scale = [this.#scale_x, value];
      }
    );
    get scale() {
      return this.#scale;
    }
    set scale(value) {
      if (typeof value === "number") value = new Vector(value, value);
      this.#scale = value;
      this.#transformations.scale = [value.x, value.y];
      this.setDocumentElementStyle("scale", `${value.x} ${value.y}`);
    }
    styleSVGElement(
      groupElement: SVGGElement,
      element: SVGElement,
      newElement?: boolean
    ): void {
      let transformationString = "";
      for (const [transformationName, args] of Object.entries(
        this.#transformations
      )) {
        switch (transformationName) {
          case "rotate":
            transformationString += `rotate(${args
              .map((arg: any) => (arg * 180) / Math.PI)
              .join(" ")})`;
            break;
          case "transform":
            transformationString += `matrix(${args.join(" ")})`;
            break;
          default:
            transformationString += `${transformationName}(${args.join(" ")})`;
        }
      }
      if (transformationString.length)
        groupElement.setAttribute("transform", transformationString);
      super.styleSVGElement(groupElement, element, newElement);
    }
    transform(x: number, y: number): Vector;
    transform(vector: Vector): Vector;
    transform() {
      const [x, y] =
        typeof arguments[0] === "object"
          ? [arguments[0].x, arguments[0].y]
          : arguments;
      if (typeof this.#canvas_transformation === "undefined")
        return new Vector(x, y);
      const original_position = new DOMPointReadOnly(x, y);
      const inverted_matrix = this.#canvas_transformation.inverse();
      const transformed_point =
        inverted_matrix.transformPoint(original_position);
      return new Vector(transformed_point.x, transformed_point.y);
    }
    transform_context(context: CanvasRenderingContext2D): void {
      const transformations = Object.entries(this.#transformations).sort(
        ([methodA], [methodB]) => {
          if (methodA === "translate") return -1;
          if (methodB === "translate") return 1;
          return 0;
        }
      );
      for (const [methodName, args] of transformations) {
        context[methodName](...args);
      }
      this.#canvas_transformation = context.getTransform();
    }
    #transformation: [
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number
    ];
    get transformation() {
      return this.#transformation;
    }
    set transformation(value) {
      this.#transformation = value;
      this.#transformations.transform = value;
      this.setDocumentElementStyle("transform", `matrix(${value})`);
    }
    untransform(x: number, y: number): Vector;
    untransform(vector: Vector): Vector;
    untransform() {
      const [x, y] =
        typeof arguments[0] === "object"
          ? [arguments[0].x, arguments[0].y]
          : arguments;
      if (typeof this.#canvas_transformation === "undefined")
        return new Vector(x, y);
      const original_position = new DOMPointReadOnly(x, y);
      const untransformed_point =
        this.#canvas_transformation.transformPoint(original_position);
      return new Vector(untransformed_point.x, untransformed_point.y);
    }
  };
