/**
 * Function for concatinating several class names from classes obj
 */

export const classesExtractor = (classes: any, classNames: string[]): string => {
    return classNames.map(name => classes[name]).join(' ');
};

export const getDateString = (date: Date): string => {
    const day: string = date
        .getDate()
        .toString()
        .padStart(2, '0');

    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');

    const year: string = date
        .getUTCFullYear()
        .toString()
        .slice(0, -2);

    return `${day}.${month}.${year}`;
};

export const generateUniqueId = (): string => (Date.now() + Math.random()).toString(36);

/**
 * function for conditionally joining classNames together
 * @param args
 */

// export const classNames = (...args) => {
//     const classes: Array<number | string> = [];

//     for (let i = 0; i < args.length; i++) {
//         const arg = args[i];
//         if (!arg) continue;

//         const argType = typeof arg;

//         if (argType === 'string' || argType === 'number') {
//             classes.push(arg);
//         } else if (Array.isArray(arg) && arg.length) {
//             const inner = classNames(...arg);
//             if (inner) {
//                 classes.push(inner);
//             }
//         } else if (argType === 'object') {
//             for (const key in arg) {
//                 if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
//                     classes.push(key);
//                 }
//             }
//         }
//     }

//     return classes.join(' ');
// };
