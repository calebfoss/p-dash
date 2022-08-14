import { wrapP5PrototypeMethod } from "./base";

p5.prototype._defineSnakeAlias("deviceOrientation", "turnAxis");

//  TODO - test on mobile device
p5.prototype.device_moved = false;

//  TODO - test on mobile device
p5.prototype.device_turned = false;

p5.prototype.mouse_down = false;

p5.prototype.mouse_up = false;

p5.prototype.mouse_dragging = false;

p5.prototype.mouse_double_clicked = false;

p5.prototype._mouseWheel = 0;

p5.prototype.key_down = false;

p5.prototype.key_up = false;

p5.prototype._startAngleZ;
wrapP5PrototypeMethod(
  "_handleMotion",
  (base) =>
    function () {
      base.call(this);
      this._setProperty("deviced_moved", true);
    }
);

wrapP5PrototypeMethod(
  "_onmousedown",
  (base) =>
    function (e) {
      base.call(this, e);
      this._setProperty("mouse_down", true);
    }
);

wrapP5PrototypeMethod(
  "_ondbclick",
  (base) =>
    function (e) {
      base.call(this, e);
      this._setProperty("mouse_double_clicked", true);
    }
);

wrapP5PrototypeMethod(
  "_onmousemove",
  (base) =>
    function (e) {
      base.call(this, e);
      this._setProperty("mouse_dragging", this.mouseIsPressed);
    }
);

wrapP5PrototypeMethod(
  "_onwheel",
  (base) =>
    function (e) {
      base.call(this, e);
      this._setProperty("_mouseWheel", this._mouseWheelDeltaY);
    }
);

wrapP5PrototypeMethod(
  "_onkeyup",
  (base) =>
    function (e) {
      base.call(this, e);
      this._setProperty("key_up", true);
      this._setProperty("key_held", false);
    }
);

p5.prototype._onkeydownbase = p5.prototype._onkeydown;
p5.prototype._onkeydown = function (e) {
  this._onkeydownbase(e);
  this._setProperty("key_down", true);
};

p5.prototype.registerMethod("pre", function () {
  this._setProperty(
    "mouse_up",
    this.mouseIsPressed == false && this.mouse_held == true
  );
  this._setProperty("mouse_held", this.mouseIsPressed);
  this._setProperty("key_held", this.key_down);
});

p5.prototype.registerMethod("post", function () {
  this._setProperty("device_moved", false);
  this._setProperty("mouse_down", false);
  this._setProperty("mouse_dragging", false);
  this._setProperty("mouse_double_clicked", false);
  this._setProperty("_mouseWheel", false);
  this._setProperty("key_up", false);
  this._setProperty("key_down", false);
});

//  Create properties with default value
p5.prototype._moveThreshold = 0.5;
p5.prototype._shakeThreshold = 30;

p5.prototype._defineProperties({
  //  TODO - test on mobile device
  device_acceleration: {
    get: function () {
      return this.createVector(
        this.accelerationX,
        this.accelerationY,
        this.accelerationZ
      );
    },
  },
  //  TODO - test on mobile device
  device_prev_acceleration: {
    get: function () {
      return this.createVector(
        this.pAccelerationX,
        this.pAccelerationY,
        this.pAccelerationZ
      );
    },
  },
  //  TODO - test on mobile device
  device_rotation: {
    get: function () {
      return this.createVector(this.rotationX, this.rotationY, this.rotationZ);
    },
  },
  //  TODO - test on mobile device
  device_prev_rotation: {
    get: function () {
      return this.createVector(
        this.pRotationX,
        this.pRotationY,
        this.pRotationZ
      );
    },
  },
  //  TODO - test on mobile device
  device_turned: {
    get: function () {
      if (
        this.rotationX === null &&
        this.rotationY === null &&
        this.rotationZ === null
      )
        return false;
      return (
        this.rotationX !== this.pRotationX ||
        this.rotationY !== this.pRotationY ||
        this.rotationZ !== this.pRotationZ
      );
    },
  },
  first_frame: {
    get: function () {
      return this.frameCount === 1;
    },
  },
  key_code: {
    get: function () {
      return this.keyCode;
    },
  },
  mouse_button: {
    get: function () {
      return this.mouseButton;
    },
  },
  mouse_pos: {
    get: function () {
      return this.createVector(this.mouseX, this.mouseY);
    },
  },
  mouse_pos_x: {
    get: function () {
      return this.mouseX;
    },
  },
  mouse_pos_y: {
    get: function () {
      return this.mouseY;
    },
  },
  mouse_prev_pos: {
    get: function () {
      return this.createVector(this.pmouseX, this.pmouseY);
    },
  },
  mouse_prev_pos_x: {
    get: function () {
      return this.pmouseX;
    },
  },
  mouse_prev_pos_y: {
    get: function () {
      return this.pmouseY;
    },
  },
  mouse_wheel: {
    get: function () {
      return this._mouseWheel;
    },
  },
  mouse_window_pos: {
    get: function () {
      return this.createVector(this.winMouseX, this.winMouseY);
    },
  },
  mouse_window_pos_x: {
    get: function () {
      return this.winMouseX;
    },
  },
  mouse_window_pos_y: {
    get: function () {
      return this.winMouseY;
    },
  },
  mouse_prev_window_pos: {
    get: function () {
      return this.createVector(this.pwinMouseX, this.pwinMouseY);
    },
  },
  mouse_window_prev_pos_x: {
    get: function () {
      return this.pwinMouseX;
    },
  },
  mouse_window_prev_pos_y: {
    get: function () {
      return this.pwinMouseY;
    },
  },
  move_threshold: {
    get: function () {
      return this._moveThreshold;
    },
    set: function (val) {
      this.setMoveThreshold(val);
    },
  },
  moved: {
    get: function () {
      return this.createVector(this.movedX, this.movedY);
    },
  },
  moved_x: {
    get: function () {
      return this.movedX;
    },
  },
  moved_y: {
    get: function () {
      return this.movedY;
    },
  },
  pointer_lock_request: {
    get: function () {
      return document.pointerLockElement === this._curElement.elt;
    },
    set: function (val) {
      if (val) this.requestPointerLock();
      else this.exitPointerLock();
    },
  },
  shake_threshold: {
    get: function () {
      return this._shakeThreshold;
    },
    set: function (val) {
      this.setShakeThreshold(val);
    },
  },
});
