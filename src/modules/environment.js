import { P5Function } from "./base";

p5.prototype._registerElements(
  class Describe extends P5Function {
    constructor() {
      super(["text, [display]"]);
    }
  },
  class DescribeElement extends P5Function {
    constructor() {
      super(["name, text, [display]"]);
    }
  },
  class TextOutput extends P5Function {
    constructor() {
      super(["[display]"]);
    }
  },
  class GridOutput extends P5Function {
    constructor() {
      super(["[display]"]);
    }
  },
  class Print extends P5Function {
    constructor() {
      super(["contents"]);
    }
  },
  class FrameRate extends P5Function {
    constructor() {
      super(["", "fps"]);
    }
  }
);

p5.prototype._setCursor = p5.prototype.cursor;

p5.prototype.window_resized = false;
p5.prototype._onresizebase = p5.prototype._onresize;
p5.prototype._onresize = function (e) {
  this._onresizebase(e);
  this._setProperty("window_resized", true);
};

p5.prototype.registerMethod("post", function () {
  this._setProperty("window_resized", false);
});

p5.prototype._fullscreen = p5.prototype.fullscreen;
p5.prototype._width = p5.prototype.width;
p5.prototype._height = p5.prototype.height;

p5.prototype._defineProperties({
  cursor: {
    get: function () {
      return this.canvas?.style.cursor;
    },
    set: function (val) {
      if (Array.isArray(val)) this._setCursor(...val);
      else this._setCursor(val);
    },
  },
  frame_count: {
    get: function () {
      return this.frameCount;
    },
  },
  delta_time: {
    get: function () {
      return this.deltaTime;
    },
  },
  display_width: {
    get: function () {
      return this.displayWidth;
    },
  },
  display_height: {
    get: function () {
      return this.displayHeight;
    },
  },
  window_width: {
    get: function () {
      return this.windowWidth;
    },
  },
  window_height: {
    get: function () {
      return this.windowHeight;
    },
  },
  fullscreen: {
    get: function () {
      return this._fullscreen();
    },
    set: function (val) {
      this._fullscreen(val);
    },
  },
  pixel_density: {
    get: function () {
      return this.pixelDensity();
    },
    set: function (val) {
      this.pixelDensity(val);
    },
  },
  display_density: {
    get: function () {
      return this.displayDensity();
    },
  },
  url: {
    get: function () {
      return this.getURL();
    },
  },
  url_path: {
    get: function () {
      return this.getURLPath();
    },
  },
  url_params: {
    get: function () {
      return this.getURLParams();
    },
  },
  width: {
    get: function () {
      return this._width;
    },
    set: function (val) {
      if (val !== this._width) {
        this._setProperty("_width", val);
        this.resizeCanvas(this._width, this._height);
      }
    },
  },
  height: {
    get: function () {
      return this._height;
    },
    set: function (val) {
      if (val !== this._height) {
        this._setProperty("_height", val);
        this.resizeCanvas(this._width, this._height);
      }
    },
  },
});
