function statement_that_is_switch(level) {
    //[which game tile (index over all game tiles), what value should it have, "the hint", [indices of ALL tiles to zoom in on (indices over all tiles) except tile in hint]]
    switch (level) {
        case 0:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            hints = [
                [[0], [1], "If this edge tile needs to see 3 towers, which tower can only be put here?", [5]],
                [[2], [3], "If this edge tile needs to see 1 tower, which tower can only be put here?", [9]],
                [[1], [2], "If this row can only contain each number once, what number is the only option left?", [6, 8]]
            ];
            break;
        case 1:
            width = 5;
            height = 5;
            edge_values = [1, 3, 2, 1, 2, 3, 1, 2, 2, 2, 1, 2];
            hints = [
                [[0], [3], "If these edge tiles need to see 1 tower, which tower can only be put here?", [1, 5]],
                [[1], [1], "If this edge tile needs to see 3 towers, which tower can only be put here?", [2]],
                [[2], [2], "If this row can only contain each number once, what number is the only option left?", [6, 7]]
            ];
            break;
        case 2:
            width = 6;
            height = 6;
            edge_values = [1, 3, 2, 2, 1, 2, 3, 2, 2, 3, 3, 1, 3, 2, 2, 1];
            hints = [
                [[0], [4], "If you don't know what to put here, learn from the previous puzzles first!", [1, 6]],
                [[15], [4], "If you don't know what to put here, learn from the previous puzzles first!", [29,34]],
                [[8], [3], "If the other edges need to see 3 towers, there is a specific number you cannot put at the front of that row. That means that number has to go here!", [12, 13, 18, 24, 25]],
                [[9, 10, 11], [4, 2, 1], "If this edge needs to see 3 towers, what ordering of the remaining numbers in this row make that possible?", [23]],
                [[6], [4], "What number should go here? Think from sudoku perspective!", []],
                [[3, 7], [3, 2], "How can you ensure this edge sees the right amount?", [4]]
            ];
            break;
        case 3:
            width = 7;
            height = 7;
            edge_values = [1, 5, 3, 2, 2, 1, 3, 3, 1, 3, 2, 3, 2, 2, 3, 2, 1, 3, 2, 3];
            hints = [
                [[0, 9, 21], [5, 5, 5], "Start with the simple ones!", [1, 7, 20, 44]],
                [[1, 6, 11, 16, 21], [1, 2, 3, 4, 5], "Place 5 towers in such a way you can see all 5.", [2]],
                [[12], [5], "If you have to see three towers, which 2 numbers can't you place at the start? And what about the tile after?", [3, 45]],
                [[20], [4], "You can use a trick from a previous puzzle here.", [14, 15, 21, 22, 28, 29, 35, 36]]
            ];
            break;
        case 4:
            width = 8;
            height = 8;
            edge_values = [3, 6, 2, 3, 1, 2, 3, 2, 6, 1, 2, 3, 1, 2, 3, 3, 2, 3, 2, 1, 3, 2, 6, 3];
            hints = [
                [[4, 11, 18, 31], [6, 6, 6, 6], "Start with the simple ones!", [5, 23, 32, 58]],
                [[1, 6, 34], [1, 1, 1], "Place 6 towers in such a way you can see all 6.", [2, 16, 61]],
                [[23], [5], "If the edge can only see 2, and it will see the 6 at the end, which tower must go here?", [33, 39]],
                [[12], [5], "Which 2 towers could go here? Why is one not an option?", [17, 24, 26, 29, 33]],
                [[0, 24, 30], [2, 3, 4], "This column has 3 remaining numbers. Which one can go where in order to meet the edge requirements?", [1, 9, 17, 25, 33, 41, 49, 57]]

            ];
            break;    
        default:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            hints = [
                [[0], [1], "If this edge tile needs to see 3 towers, which tower can only be put here?", [5]],
                [[2], [3], "If this edge tile needs to see 1 tower, which tower can only be put here?", [9]],
                [[1], [2], "If this row can only contain each number once, what number is the only option left?", [6, 8]]
                
            ];
            break;
    }
}