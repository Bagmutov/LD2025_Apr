import { LD_GLOB } from "./main.js";
import { drawRoundRect } from "./tools.js";
export var GAME_LD;
(function (GAME_LD) {
    let grid = [];
    function initGame() {
        for (let j = 0; j < 10; j++) {
            grid[j] = [];
            for (let i = 0; i < 10; i++) {
                grid[j][i] = 0;
            }
        }
        grid[1][1] = 1;
        grid[2][2] = 1;
        grid[3][2] = 1;
        grid[3][1] = 1;
        grid[3][0] = 1;
        // grid[1][1]=1;
        // grid[1][2]=1;
        // grid[2][1]=1;
        // grid[2][2]=1;
        start_x = (LD_GLOB.canv.width - grid[0].length * cell_size) / 2;
        start_y = (LD_GLOB.canv.height - grid[0].length * cell_size) / 2;
    }
    GAME_LD.initGame = initGame;
    let stepN = 0;
    function step() {
        stepN++;
        if (stepN % 5 == 0) {
            let grid_old = [];
            for (let j = 0; j < grid.length; j++) {
                grid_old[j] = [];
                for (let i = 0; i < grid[0].length; i++) {
                    grid_old[j][i] = grid[j][i];
                }
            }
            for (let j = 0; j < grid.length; j++) {
                for (let i = 0; i < grid[0].length; i++) {
                    let count = 0;
                    getCell(grid_old, i - 1, j - 1);
                    getCell(grid_old, i - 1, j);
                    getCell(grid_old, i - 1, j + 1);
                    getCell(grid_old, i, j - 1);
                    getCell(grid_old, i, j + 1);
                    getCell(grid_old, i + 1, j - 1);
                    getCell(grid_old, i + 1, j);
                    getCell(grid_old, i + 1, j + 1);
                    if (grid[j][i] == 1) {
                        if (count < 2 || count > 3)
                            grid[j][i] = 0;
                    }
                    else if (count == 3)
                        grid[j][i] = 1;
                    function getCell(grid, i, j) {
                        i = (i + grid[0].length) % grid[0].length;
                        j = (j + grid.length) % grid.length;
                        count += grid[j][i];
                    }
                }
            }
        }
    }
    GAME_LD.step = step;
    let cell_size = 50, start_x = 0, start_y = 0;
    function drawGameGrid(ctx) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                drawRoundRect(ctx, start_x + i * cell_size, start_y + j * cell_size, 5, cell_size - 4, cell_size - 4, LD_GLOB.COLORS.main_2);
                if (grid[j][i] == 1)
                    ctx.drawImage(LD_GLOB.getImage('face'), start_x + i * cell_size - 2, start_y + j * cell_size - 2);
            }
        }
    }
    GAME_LD.drawGameGrid = drawGameGrid;
})(GAME_LD || (GAME_LD = {}));
//# sourceMappingURL=game.js.map