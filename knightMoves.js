class coords {
    constructor(x = 0, y = 0, dist = 0, prev = null) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.prev = prev;
    }
}
const KnightTravails = (() => {
    function isValid(node) {
        if (node.x >= 0 && node.x < 8 && node.y >= 0 && node.y < 8)
            return true;
        return false;
    }
    const knightMoves = (start, end) => {
        if (!isValid(start) || !isValid(end))
            return "Provide Valid Inputs";
        let changes = [[-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, -2], [2, -1], [2, 1], [1, 2]];
        let visited = new Array(8).fill().map(() => Array(8).fill(0));
        let queue = [new coords(start.x, start.y)];
        visited[start.x][start.y] = 1;
        while (queue.length) {
            let node = queue[0];
            if (node.x == end.x && node.y == end.y)
                return node;
            for (let change of changes) {
                let child = new coords(change[0] + node.x, change[1] + node.y, node.dist + 1, node);

                if (child.x == end.x && child.y == end.y)
                    return child;
                if (isValid(child) && !visited[child.x][child.y]) {
                    queue.push(child);
                    visited[child.x][child.y] = 1;
                }
            }
            queue.shift();
        }
    }
    return { isValid, knightMoves };
})();
const driver = (() => {
    let ans = [];
    function printPath(lastNode) {
        if (lastNode == null)
            return;
        printPath(lastNode.prev);
        let res = [lastNode.x, lastNode.y];
        ans.push(res);
    }
    let startPositionX = 0;
    let startPositionY = 6;
    let endPositionX = 6;
    let endPositionY = 5;

    let startNode = new coords(startPositionX, startPositionY);
    let endNode = new coords(endPositionX, endPositionY);
    let lastNode = KnightTravails.knightMoves(startNode, endNode);
    console.log("Minimum moves", lastNode.dist);
    printPath(lastNode);
    console.log("Full Path", ans);
});
driver();