export function removeAttributes(data:object,attributes:string[]|string='updatedAt,deletedAt'){
    const keys:string[] = typeof attributes == "string" ? attributes.split(',') : attributes;
    const copy = Object.assign({},data);
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        if(copy.hasOwnProperty(element)){
            delete copy[element];
        }
    }
    return copy;
}