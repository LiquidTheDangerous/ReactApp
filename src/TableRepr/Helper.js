

export default function getObjectHeaders(Obj, columnsWidth,editable=false,widthComponents=null) {
    if (columnsWidth===null){
        return
    }
    if (Obj == null){
        return
    }
    const keys = Object.keys(Obj);
    var columns = [];
    keys.forEach(key => {
        var colWithd = columnsWidth
        if (!String(key).includes("id")) {
            if (widthComponents!= null){
                if (widthComponents[key] !== undefined){
                    colWithd = widthComponents[key]
                    console.log(colWithd,key);
                }
            }
            columns.push({
                field: key,
                headerName: key,
                width: colWithd,
                editable: editable
            })
        }
        else {
            columns.push({
                field: key,
                headerName: key,
                width: colWithd,
                editable: false
            });
        };
    });
    return columns
}