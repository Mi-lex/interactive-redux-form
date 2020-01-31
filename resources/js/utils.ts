/**
 * Function for concatinating several class names from classes obj
 */

export const classesExtractor = (classes, classNames: string[]): string => {
    return classNames.map(name => classes[name]).join(' ');
};

export const getDateString = (date: Date): string => {
    const day: string = date
        .getDate()
        .toString()
        .padStart(2, '0');

    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');

    const year: number = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const generateUniqueId = (): string => (Date.now() + Math.random()).toString(36);
