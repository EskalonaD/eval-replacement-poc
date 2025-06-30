/**
 * 
 * @param {Record<string,string>} evalBasedObject 
 * @param {string[]} operators 
 * @returns object with methods dependetmts on context with predefined operators 
 */
export function convertEvalBasedJsonToJS(evalBasedObject, operators) {
    const stringDataObjectEntriesWithStringifiedFunctions = Object.entries(evalBasedObject)
        .map(([key, script]) => {
            const prefix = '(context) => {'
            const postfix = '}';

            script = prefix + script + postfix;

            return [key, script];
        })
        .map(entry => {
            let stringifiedFunc = entry[1];

            operators.forEach(
                operator => stringifiedFunc = stringifiedFunc.replaceAll(operator, `context.${operator}`),
            );
            return [entry[0], stringifiedFunc];
        });

    const objectWithStringifiedFunctions = Object.fromEntries(stringDataObjectEntriesWithStringifiedFunctions);

    const stringifiedObjectWithStringifiedFunctions = JSON.stringify(objectWithStringifiedFunctions);
    
    const stringifiedFunctionBasedObject = stringifiedObjectWithStringifiedFunctions
        .replaceAll('"(context) =>', "(context) =>")
        .replaceAll('}"', '}');


    const prefix = 'window.script = '

    return prefix + stringifiedFunctionBasedObject;
}

