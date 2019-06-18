import * as React from 'react';

export type StepperType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  stepTo: (step: number) => void;
};

export const useStepper = (
  initialStep: number = 0,
  range?: Array<null | number>,
  loop?: boolean,
): StepperType => {
  const [step, setStep] = React.useState(initialStep);

  const nextStep = () => {
    if (!range) return setStep(step + 1);

    const min = range[0];
    const max = range[1];

    if (max && step === max && loop) return setStep(min || 0);

    return setStep(step + 1);
  };

  const prevStep = () => {
    if (!range) return setStep(step - 1);

    const min = range[0];
    const max = range[1];

    if (min && step === min && loop) return setStep(max || 0);

    return setStep(step - 1);
  };

  const stepTo = (step: number) => setStep(step);

  return { step, nextStep, prevStep, stepTo };
};
