export function drawCircle(ctx, x, y, r, clr = null, stroke = 0, ang = [0, 6.29]) {
    if (clr)
        if (stroke > 0)
            ctx.strokeStyle = clr;
        else
            ctx.fillStyle = clr;
    ctx.beginPath();
    ctx.arc(x, y, r, ang[0], ang[1]);
    ctx.lineWidth = stroke;
    if (stroke > 0)
        ctx.stroke();
    else
        ctx.fill();
}
export function drawRoundRect(ctx, x, y, r, w = ctx.canvas.width, h = ctx.canvas.height, clr = "#000000", corn = [true, true, true, true], stroke = 0) {
    var x1 = x + r, x2 = x + w - r, y1 = y + r, y2 = y + h - r;
    ctx.beginPath();
    if (corn[0])
        ctx.arc(x1, y1, r, 3.14, 4.71);
    else
        ctx.lineTo(x, y);
    if (corn[1])
        ctx.arc(x2, y1, r, 4.71, 6.28);
    else
        ctx.lineTo(x + w, y);
    if (corn[2])
        ctx.arc(x2, y2, r, 0, 1.57);
    else
        ctx.lineTo(x + w, y + h);
    if (corn[3])
        ctx.arc(x1, y2, r, 1.57, 3.14);
    else
        ctx.lineTo(x, y + h);
    if (corn[0])
        ctx.lineTo(x, y1);
    else
        ctx.lineTo(x, y);
    if (stroke) {
        ctx.strokeStyle = clr;
        ctx.lineWidth = stroke;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = clr;
        ctx.fill();
    }
}
export function drawLine(ctx, x1, y1, x2, y2, clr = null, lineW = null) {
    if (clr)
        ctx.strokeStyle = clr;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (lineW)
        ctx.lineWidth = lineW;
    ctx.stroke();
}
;
export function positionCanvas(canvas, { setStyleWH = false, wscale = 1, hscale = 1, w = null, h = null, x = 0, y = 0, } = {}) {
    canvas.width = (w || window.innerWidth - 0) * wscale;
    canvas.height = (h || window.innerHeight - 0) * hscale;
    if (setStyleWH) {
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
    }
    if (x || y) {
        canvas.style.left = x + "px";
        canvas.style.top = y + "px";
        canvas.style.position = "absolute";
    }
}
export function dist2(dx, dy) {
    return dx * dx + dy * dy;
}
//finds which el minimizes fun
export function arrFindMin(arr, fun) {
    var d = Infinity, d2, imin;
    for (var i = 0; i < arr.length; i++) {
        // if(arr[i]){
        d2 = fun(arr[i]);
        if (d2 < d) {
            imin = i;
            d = d2;
        }
    }
    return (d == Infinity) ? null : { o: arr[imin], i: imin, d: d };
}
//removes element from array
export function arrDel(arr, o) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === o) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
}
//checks if it an Object or Function
export function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
;
//makes a copy of an object with all insides copied as well
export function makeCopy(src) {
    // if the value is a nested object, recursively copy all it's properties
    if (isObject(src)) {
        let target;
        if (Array.isArray(src)) {
            target = [];
            for (let el = 0; el < src["length"]; el++)
                target[el] = makeCopy(src[el]);
        }
        else {
            target = {};
            for (let prop in src)
                if (src.hasOwnProperty(prop))
                    target[prop] = makeCopy(src[prop]);
            return target;
        }
        return target;
    }
    else {
        return src;
    }
}
//# sourceMappingURL=tools.js.map