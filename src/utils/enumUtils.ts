
/**
 * Returns a random value from an enum Set
 */
export function chooseRandomEnumValue(enumSet: any){
    let _enumKeys: string[];

    _enumKeys = Object.keys(enumSet);
    
    _enumKeys = _enumKeys.filter(val => {
        // print('Val = ', val);
        // print("The test ", typeof +val);
        return typeof +val === 'string';
    });
    
    return enumSet[_enumKeys[Math.floor(Math.random()*_enumKeys.length)]];
}

