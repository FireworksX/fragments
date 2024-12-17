import { SpringValue as LibSpringValue } from "@react-spring/web";

export class SpringValue extends LibSpringValue {
  constructor(...args) {
    console.log("create SpringValue");
    super(...args);
  }
}
