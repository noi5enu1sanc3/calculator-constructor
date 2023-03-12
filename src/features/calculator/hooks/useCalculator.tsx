import { useState } from 'react';

import {
  BUTTON_NODE_NAME,
  CALCULATE_ACTION,
  DECIMAL_ACTION,
  DIGIT_VALUES,
  INITIAL_VALUE,
  NUMBER_ACTION,
  OPERATIONS,
  OPERATORS,
  OPERATOR_ACTION,
} from '../utils/constants';

export const useCalculator = () => {
  const [calculator, setCalculator] = useState<any>({
    firstValue: INITIAL_VALUE,
    operator: '',
    secondValue: '',
    previousAction: '',
  });
  const [displayValue, setDisplayValue] = useState<string>(INITIAL_VALUE);

  const handleClick = (event: React.MouseEvent) => {
    const { nodeName, textContent } = event.target as HTMLElement;

    if (nodeName !== BUTTON_NODE_NAME || !textContent) return;

    const action = getaction(textContent);

    const newValue = createResultString(textContent);

    setCalculator((prev: any) => {
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

      setCalculator((prev: any) => {
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

      setCalculator((prev: any) => {
        return {
          ...prev,
          secondValue: updatedsecondValue,
          previousAction: updatedpreviousAction,
        };
      });
    }

    setDisplayValue(newValue === 'Infinity' ? 'Не определено' : newValue); //TODO reset all
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
    if (value === '.') return DECIMAL_ACTION;
    if (DIGIT_VALUES.includes(value)) return NUMBER_ACTION;
    if (OPERATORS.includes(value)) return OPERATOR_ACTION;
    if (value === '=') return CALCULATE_ACTION;
  };

  const createResultString = (value: string) => {
    const action = getaction(value);

    if (action === NUMBER_ACTION) {
      return displayValue === '0' ||
        calculator.previousAction === OPERATOR_ACTION ||
        calculator.previousAction === CALCULATE_ACTION
        ? value
        : displayValue + value;
    }
    if (action === DECIMAL_ACTION) {
      if (!displayValue.includes('.')) return displayValue + '.';
      if (calculator.previousAction === OPERATOR_ACTION || calculator.previousAction === CALCULATE_ACTION) return '0.';
    }
    if (action === OPERATOR_ACTION) {
      return calculator.firstValue &&
        calculator.operator &&
        calculator.previousAction !== OPERATOR_ACTION &&
        calculator.previousAction !== CALCULATE_ACTION
        ? calculate(calculator.firstValue, calculator.operator, displayValue).toString()
        : displayValue;
    }
    return calculator.firstValue
      ? calculator.previousAction === CALCULATE_ACTION
        ? calculate(displayValue, calculator.operator, calculator.secondValue).toString()
        : calculate(calculator.firstValue, calculator.operator, displayValue).toString()
      : displayValue;
  };

  const getOperation = (value: string) => {
    if (value === OPERATIONS.ADDITION) return OPERATIONS.ADDITION;
    if (value === OPERATIONS.DIVISION) return OPERATIONS.DIVISION;
    if (value === OPERATIONS.MULTIPLICATION) return OPERATIONS.MULTIPLICATION;
    return OPERATIONS.SUBTRACTION;
  };

  return { displayValue, handleClick };
};
