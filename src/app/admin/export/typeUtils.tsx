export class Field {
    subType: any;
    constructor(type: any) {
        this.subType = type;
    }
}

export class OptionalField {
    subType: any;
    constructor(type: any) {
        this.subType = type;
    }
}

function convertBasicType(data: string, dataType: (d: string) => any): any {
    switch (dataType) {
        case Number:
            return Number(data);
        case Boolean:
            return Boolean(data);
        case Date:
            return new Date(data);
        case String:
            return String(data);
        default:
            return dataType(data);
    }
}

export function convertTypes(data: any, schema: any, useNull: boolean = true): any {
    // Optional fields
    if (schema instanceof OptionalField) {
        // If data is empty, returns null or undefined
        // If the param "useNull" is false, the returned value should be undefined
        if (!data) return useNull ? null : undefined;
        return convertBasicType(data, schema.subType);
    }

    // Simple fields
    if (schema instanceof Field) {
        return convertBasicType(data, schema.subType);
    }

    // Complex fields (json like)
    return Object.entries(schema).reduce((acc, [attr, attrType]) => {
        return {...acc, [attr]: convertTypes(data[attr], attrType)};
    }, {});
}
