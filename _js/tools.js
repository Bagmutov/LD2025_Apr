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
;
export function drawRoundRect(ctx, x, y, r, w = ctx.canvas.width, h = ctx.canvas.height, clr = '#000000', corn = [true, true, true, true], stroke = 0) {
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
export function positionCanvas(canvas, { setStyleWH = false, wscale = 1, hscale = 1, w = null, h = null, x = 0, y = 0 } = {}) {
    canvas.width = (w || (window.innerWidth - 0)) * wscale;
    canvas.height = (h || (window.innerHeight - 0)) * hscale;
    if (setStyleWH) {
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
    }
    if (x || y) {
        canvas.style.left = x + "px";
        canvas.style.top = y + "px";
        canvas.style.position = "absolute";
    }
}
//# sourceMappingURL=tools.js.map