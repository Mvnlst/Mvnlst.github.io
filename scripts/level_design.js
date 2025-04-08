function statement_that_is_switch(level) {
    switch (level) {
        case 0:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            break;
        case 1:
            width = 5;
            height = 5;
            edge_values = [1, 3, 2, 1, 2, 3, 1, 2, 2, 2, 1, 2];
            break;
        case 2:
            width = 6;
            height = 6;
            edge_values = [1, 3, 2, 2, 1, 2, 3, 2, 2, 3, 3, 1, 3, 2, 2, 1];
            break;
        case 3:
            width = 7;
            height = 7;
            edge_values = [1, 5, 3, 2, 2, 1, 3, 3, 1, 3, 2, 3, 2, 2, 3, 2, 1, 3, 2, 3];
            break;
        case 4:
            width = 8;
            height = 8;
            edge_values = [3, 6, 2, 3, 1, 2, 3, 2, 6, 1, 2, 3, 1, 2, 3, 3, 2, 3, 2, 1, 3, 2, 6, 3];
            break;    
        default:
            width = 5;
            height = 3;
            edge_values = [1, 1, 1, 3, 1, 1, 1, 1];
            break;
    }
}