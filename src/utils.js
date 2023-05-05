export const formToJson = (formData) => {
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        const keys = key.split(/\[(.*?)\]/).filter(Boolean);
        let objRef = formObject;
        for (let i = 0; i < keys.length; i++) {
            const currentKey = keys[i];
            const isLastKey = i === keys.length - 1;
            if (isLastKey) {
                if (currentKey === "-1") objRef.push(value)
                else objRef[currentKey] = value;
            } else {
                const isArray = Number.isInteger(Number(keys[i + 1]));
                objRef[currentKey] =
                    objRef[currentKey] || (isArray ? [] : {});
                objRef = objRef[currentKey];
            }
        }
    }
    return formObject;
};

export const assignData = (object, assign) => {
    Object.entries(assign).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            return value.forEach((item, index) => {
                if (typeof item === "object") return assignData(object[key][index], item)
                object[key][index] = item
            })
        }
        object[key] = value
    })
    return object
}

export const dateToInput = (date) => {
    const day = ("0" + date.getUTCDate()).slice(-2);
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    return date.getUTCFullYear() + "-" + (month) + "-" + (day);
}