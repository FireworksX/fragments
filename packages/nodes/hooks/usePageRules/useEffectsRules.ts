import * as CSS from "csstype";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";
import { builderEffectType } from "@fragments/fragments-plugin";
// import styles from './../../styles/animations.module.scss'

export const useEffectsRules = (layerField: Field) => {
  const layerInvoker = useLayerInvokerNew(layerField);
  const rules: CSS.Properties = {};

  const effects = layerInvoker("effects");

  effects.value?.forEach?.((effect) => {
    if (effect.type === builderEffectType.loop) {
      const animations: any = {
        // bounce: styles.bounce,
        // wiggle: styles.wiggle,
        // fade: styles.fade,
        // increase: styles.increase
      };

      rules.animationDelay = `${effect.delay}s`;
      rules.animation = `${effect.duration}s linear ${effect.delay}s infinite ${
        animations[effect.name]
      }`;
    }
  });

  return rules;
};
