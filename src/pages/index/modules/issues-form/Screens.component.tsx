import * as React from 'react';
import { useStepper } from '~/hooks';

import { Screen } from './IssuesForm.styled';

export type ScreenItemType = {
  title: string;
  render: React.ReactElement;
  prevText?: string;
  nextText?: string;
  canPrev?: (step: number) => boolean;
  canNext?: (step: number) => boolean;
};

export type ScreensProps = {
  items: ScreenItemType[];
  defaultItem?: number;
  onSelect: () => void;
};

export const Screens: React.FunctionComponent<ScreensProps> = (props) => {
  const { items, defaultItem, onSelect } = props;

  const { step, nextStep, prevStep, stepTo } = useStepper(defaultItem || 0, [0, items.length - 1]);

  const currentScreen = items[step];

  const canPrev = currentScreen.canPrev ? currentScreen.canPrev(step) : true;
  const canNext = currentScreen.canNext ? currentScreen.canNext(step) : true;

  return (
    <Screen className="screen">
      <h2 className="screen__title">{currentScreen.title || `Step ${step}`}</h2>
      <div className="screen__content">{currentScreen.render}</div>
      <div className="screen__footer">
        {step !== 0 && (
          <button
            disabled={!canPrev}
            className="screen__button screen__prev"
            type="button"
            onClick={prevStep}
          >
            {currentScreen.prevText || 'Go back'}
          </button>
        )}
        <button
          disabled={!canNext}
          className="screen__button screen__next"
          type="button"
          onClick={step === items.length - 1 ? onSelect : nextStep}
        >
          {currentScreen.nextText || 'Go next'}
        </button>
      </div>
    </Screen>
  );
};
