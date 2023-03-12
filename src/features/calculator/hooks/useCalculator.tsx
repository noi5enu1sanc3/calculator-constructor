import { useState } from 'react';

import {
  BUTTON_NODE_NAME,
  CALCULATE_ACTION,
  DECIMAL_ACTION,
  DECIMAL_SYMBOL,
  DIGIT_VALUES,
  INFINITY_MESSAGE,
  INITIAL_VALUE,
  MAX_LENGTH,
  NUMBER_ACTION,
  OPERATIONS,
  OPERATORS,
  OPERATOR_ACTION,
} from '../utils/constants';

export const useCalculator = () => {
  type Calculator = {
    firstValue: string;
    operator: string;
    secondValue: string;
    previousAction: string;
  };
  const [calculator, setCalculator] = useState<Calculator>({
    firstValue: INITIAL_VALUE,
    operator: '',
    secondValue: '',
    previousAction: '',
  });
  const [displayValue, setDisplayValue] = useState<string>(INITIAL_VALUE);
  const [isError, setIsError] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    const { nodeName, textContent } = event.target as HTMLElement;

    if (nodeName !== BUTTON_NODE_NAME || !textContent) return;

    const action = getaction(textContent);

    const newValue = createResultString(textContent);

    if (newValue.includes(INFINITY_MESSAGE)) {
      setIsError(false);
      setDisplayValue(INITIAL_VALUE);
      resetCalculator();
      return;
    }

    if (newValue.includes('Infinity')) {
      setIsError(true);
      setDisplayValue(INFINITY_MESSAGE);
      resetCalculator();
      return;
    }

    if (isError) return;

    setCalculator((prev: Calculator) => {
      return {
        ...prev,
        previousAction: action,
      };
    });

    if (action === OPERATOR_ACTION) {
      const updatedOperator = getOperation(textContent);
      const updatedFirstValue =
        calculator.firstValue &&
        calculator.operator &&
        calculator.previousAction !== OPERATOR_ACTION &&
        calculator.previousAction !== CALCULATE_ACTION
          ? newValue
          : displayValue;
      const updatedpreviousAction = action;

      setCalculator((prev: Calculator) => {
        return {
          ...prev,
          operator: updatedOperator,
          firstValue: updatedFirstValue,
          previousAction: updatedpreviousAction,
        };
      });
    }

    if (action === CALCULATE_ACTION) {
      const updatedsecondValue =
        calculator.firstValue && calculator.previousAction === CALCULATE_ACTION ? calculator.secondValue : displayValue;
      const updatedpreviousAction = action;

      setCalculator((prev: Calculator) => {
        return {
          ...prev,
          secondValue: updatedsecondValue,
          previousAction: updatedpreviousAction,
        };
      });
    }

    setDisplayValue(newValue);
  };

  const resetCalculator = () => {
    setCalculator({
      firstValue: INITIAL_VALUE,
      operator: '',
      secondValue: '',
      previousAction: '',
    });
  };

  const fitToLength = (maxLength: number, value: string): string => {
    let res = value;

    if (res.length <= maxLength) return res;

    if (res.includes(DECIMAL_SYMBOL)) {
      const intSymbolCount = res.split(DECIMAL_SYMBOL)[0].length + 1;
      const decimalCount = maxLength - intSymbolCount;
      if (decimalCount <= 0) {
        res = Math.round(Number(res)).toString();
      } else {
        const newFloat = parseFloat(res);
        res = newFloat.toFixed(maxLength - intSymbolCount);
      }
    }
    return res;
  };

  const calculate = (n1: string, operator: string, n2: string): number => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === OPERATIONS.ADDITION) return firstNum + secondNum;
    if (operator === OPERATIONS.SUBTRACTION) return firstNum - secondNum;
    if (operator === OPERATIONS.MULTIPLICATION) return firstNum * secondNum;
    return firstNum / secondNum;
  };

  const getaction = (value: string) => {
    if (value === DECIMAL_SYMBOL) return DECIMAL_ACTION;
    if (DIGIT_VALUES.includes(value)) return NUMBER_ACTION;
    if (OPERATORS.includes(value)) return OPERATOR_ACTION;
    return CALCULATE_ACTION;
  };

  const createResultString = (value: string) => {
    const action = getaction(value);

    if (action === NUMBER_ACTION) {
      return displayValue === INITIAL_VALUE ||
        calculator.previousAction === OPERATOR_ACTION ||
        calculator.previousAction === CALCULATE_ACTION
        ? value
        : fitToLength(MAX_LENGTH, displayValue + value);
    }
    if (action === DECIMAL_ACTION) {
      if (!displayValue.includes(DECIMAL_SYMBOL)) return fitToLength(6, displayValue + DECIMAL_SYMBOL);
      if (calculator.previousAction === OPERATOR_ACTION || calculator.previousAction === CALCULATE_ACTION)
        return `${INITIAL_VALUE}${DECIMAL_SYMBOL}`;
    }
    if (action === OPERATOR_ACTION) {
      return calculator.firstValue &&
        calculator.operator &&
        calculator.previousAction !== OPERATOR_ACTION &&
        calculator.previousAction !== CALCULATE_ACTION
        ? fitToLength(MAX_LENGTH, calculate(calculator.firstValue, calculator.operator, displayValue).toString())
        : displayValue;
    }
    return calculator.firstValue !== INITIAL_VALUE
      ? calculator.previousAction === CALCULATE_ACTION
        ? fitToLength(MAX_LENGTH, calculate(displayValue, calculator.operator, calculator.secondValue).toString())
        : fitToLength(MAX_LENGTH, calculate(calculator.firstValue, calculator.operator, displayValue).toString())
      : displayValue;
  };

  const getOperation = (value: string) => {
    if (value === OPERATIONS.ADDITION) return OPERATIONS.ADDITION;
    if (value === OPERATIONS.DIVISION) return OPERATIONS.DIVISION;
    if (value === OPERATIONS.MULTIPLICATION) return OPERATIONS.MULTIPLICATION;
    return OPERATIONS.SUBTRACTION;
  };

  return { displayValue, handleClick, isError };
};
