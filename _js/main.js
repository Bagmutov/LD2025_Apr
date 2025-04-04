export var LD_GLOB;
(function (LD_GLOB) {
    LD_GLOB.version = '0.1';
})(LD_GLOB || (LD_GLOB = {}));
var LD_STARTER;
(function (LD_STARTER) {
    function initialization() {
        LD_GLOB.canv = document.getElementById('can');
        LD_GLOB.mainctx = LD_GLOB.canv.getContext('2d');
        LD_GLOB.mainctx.font = 20 + 'px Shantell Sans';
        LD_GLOB.mainctx.fillText('Font should be fancy.', 10, 30);
        LD_GLOB.mainctx.fillText(' If not - reload.', 10, 60);
        console.log(`Starting LD 2025 v${LD_GLOB.version}`);
    }
    LD_STARTER.initialization = initialization;
})(LD_STARTER || (LD_STARTER = {}));
window['starterBP'] = LD_STARTER.initialization;
//# sourceMappingURL=main.js.map