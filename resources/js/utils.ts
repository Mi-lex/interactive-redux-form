/**
 * Function for concatinating several class names from classes obj
 */

export const classesExtractor = (classes, classNames: string[]): string => {
    return classNames.map(name => classes[name]).join(' ');
};
