"use strict";
import "./core";
import "./elements/canvas_elements";
import "./modules/collide";
import "./elements/2d_shape_elements";
import "./modules/environment";
import "./elements/color_elements";
import "./modules/shape";
import "./modules/structure";
import "./modules/dom";
import "./modules/data";
import "./modules/math";
import "./modules/rendering";
import "./modules/transform";
import "./modules/events";
import "./modules/image";
import "./modules/io";
import "./modules/typography";
import "./elements/3d_shape_elements";
import "./elements/3d_light_elements";

const customElementsDefined = new Event("customElementsDefined");
dispatchEvent(customElementsDefined);
