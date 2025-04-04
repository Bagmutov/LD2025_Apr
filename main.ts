


export namespace LD_GLOB{
    export let version='0.1';
    export let canv:HTMLCanvasElement;
    export let mainctx:CanvasRenderingContext2D;
}

namespace LD_STARTER{
    export function initialization(){
        LD_GLOB.canv = <HTMLCanvasElement>document.getElementById('can');
        LD_GLOB.mainctx = LD_GLOB.canv.getContext('2d');
        LD_GLOB.mainctx.font=20+'px Shantell Sans';
        LD_GLOB.mainctx.fillText('Font should be fancy.',10,30);
        LD_GLOB.mainctx.fillText(' If not - reload.',10,60);


        console.log(`Starting LD 2025 v${LD_GLOB.version}`);
        
    }
}


window['starterBP']=LD_STARTER.initialization;
