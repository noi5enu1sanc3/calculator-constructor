export enum BlockId {
  DISPLAY = 'display',
  OPERATORS = 'operators',
  DIGITS = 'digits',
  EQUALS = 'equals',
}

export const LOCKED_BLOCKS = [BlockId.DISPLAY];

export const DROPPABLE_CONTAINER_ID = 'CANVAS';

export const SENSOR_OPTIONS = {
  delay: 100,
  tolerance: 5,
};
