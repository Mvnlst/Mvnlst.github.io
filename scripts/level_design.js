function statement_that_is_switch(level) {
    //[which game tile (index over all game tiles), what value should it have, "the hint", [indices of ALL tiles to zoom in on (indices over all tiles) except tile in hint]]
    switch (level) {
        case 0:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            hints = [
                [0, 1, "if this edge tile needs to see 3 towers, which tower can only be put here?", [5]],
                [2, 3, "if this edge tile needs to see 1 tower, which tower can only be put here?", [9]],
                [1, 2, "if this row can only contain each number once, what number is the only option left?", [6, 8]]
            ];
            break;
        case 1:
            width = 5;
            height = 5;
            edge_values = [1, 3, 2, 1, 2, 3, 1, 2, 2, 2, 1, 2];
            hints = [

            ];
            break;
        case 2:
            width = 6;
            height = 6;
            edge_values = [1, 3, 2, 2, 1, 2, 3, 2, 2, 3, 3, 1, 3, 2, 2, 1];
            hints = [

            ];
            break;
        case 3:
            width = 7;
            height = 7;
            edge_values = [1, 5, 3, 2, 2, 1, 3, 3, 1, 3, 2, 3, 2, 2, 3, 2, 1, 3, 2, 3];
            hints = [

            ];
            break;
        case 4:
            width = 8;
            height = 8;
            edge_values = [3, 6, 2, 3, 1, 2, 3, 2, 6, 1, 2, 3, 1, 2, 3, 3, 2, 3, 2, 1, 3, 2, 6, 3];
            hints = [

            ];
            break;    
        default:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            hints = [

            ];
            break;
    }
}