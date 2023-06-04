package com.crazycatzhang.maze;

import java.awt.*;
import java.util.List;
import java.util.Queue;
import java.util.*;

/**
 * @author crazycatzhang
 */
public class Path {
    public List<MazeBlock> paths;
    public MazePanel panel;
    Stack<MazeBlock> stack = new Stack<>();
    LinkedList<MazeBlock> queue = new LinkedList<>();
    public int shortestPathCount = Integer.MAX_VALUE;
    public MazeBlock[][] blocks;
    public MazeBlock[][] parentBlocks;
    public int[][] directionsArray = {
            {0, 1},
            {1, 0},
            {0, -1},
            {-1, 0}
    };

    public Path(MazePanel panel) {
        this.panel = panel;
        this.paths = new ArrayList<>();
        this.blocks = panel.blocks;
        this.parentBlocks = new MazeBlock[panel.ROWS][panel.COLS];
        init();
    }

    public void init() {
        for (int k = 0; k < panel.ROWS; k++) {
            for (int l = 0; l < panel.COLS; l++) {
                blocks[k][l].setVisited(false);
            }
        }
        blocks[0][0].setVisited(true);
    }

    public void dfs(int i, int j, int step) {
        MazeBlock current = panel.blocks[i][j];
        int ti, tj;

        if (i == panel.ROWS - 1 && j == panel.COLS - 1) {
            if (step < shortestPathCount) {
                paths.clear();
                shortestPathCount = step;
                paths.addAll(stack);
            }
            return;
        }

        for (int k = 0; k < 4; k++) {
            int direction = (k + 1) % 4;
            ti = directionsArray[k][0] + i;
            tj = directionsArray[k][1] + j;
            if (isNotHasWall(current, direction) && !blocks[ti][tj].isVisited()) {
                stack.push(blocks[ti][tj]);
                blocks[ti][tj].setVisited(true);
                dfs(ti, tj, step + 1);
                blocks[ti][tj].setVisited(false);
                stack.pop();
            }
        }
    }

    public void bfs() {
        MazeBlock current = blocks[0][0];
        queue.offer(current);
        int i, j, ti, tj;
        while (!queue.isEmpty()) {
            current = queue.poll();
            i = current.getI();
            j = current.getJ();
            if (current == blocks[panel.ROWS - 1][panel.COLS - 1]) {
                MazeBlock currentPathTile = current;
                while (currentPathTile != blocks[0][0]) {
                    paths.add(currentPathTile);
                    currentPathTile = currentPathTile.getConnection();
                }
                return;
            } else {
                for (int k = 0; k < 4; k++) {
                    int direction = (k + 1) % 4;
                    ti = directionsArray[k][0] + i;
                    tj = directionsArray[k][1] + j;
                    if (isNotHasWall(current, direction) && !blocks[ti][tj].isVisited()) {
                        queue.offer(blocks[ti][tj]);
                        blocks[ti][tj].setVisited(true);
                        blocks[ti][tj].setConnection(current);
                    }
                }
            }
        }
    }

    public void A_Search() {
        PriorityQueue<MazeBlock> frontier = new PriorityQueue<>(Comparator.comparingInt(MazeBlock::getFCost));
        Queue<MazeBlock> processed = new LinkedList<>();
        blocks[0][0].setFCost(0);
        frontier.add(blocks[0][0]);

        while (!frontier.isEmpty()) {
            MazeBlock current = frontier.poll();
            processed.add(current);

            if (current == blocks[panel.ROWS - 1][panel.COLS - 1]) {
                MazeBlock currentPathTile = current;
                while (currentPathTile != blocks[0][0]) {
                    paths.add(currentPathTile);
                    currentPathTile = currentPathTile.getConnection();
                }
                return;
            }

            List<MazeBlock> neighbors = current.getAllNeighborsWithoutWalls();
            for (MazeBlock neighbor : neighbors) {
                if (!processed.contains(neighbor)) {
                    boolean inSearch = frontier.contains(neighbor);
                    int costToNeighbor = current.getGCost() + 1;
                    if (!inSearch || costToNeighbor < neighbor.getGCost()) {
                        neighbor.setGCost(costToNeighbor);
                        neighbor.setConnection(current);

                        if (!inSearch) {
                            frontier.add(neighbor);
                        }
                    }
                }
            }
        }
    }

    public boolean isNotHasWall(MazeBlock block, int direction) {
        return !block.walls[direction];
    }

    public void drawPath(Graphics g) {
        g.setColor(Color.ORANGE);
        for (MazeBlock path : paths) {
            g.fillOval(path.getX1() + 2, path.getY1() + 2, path.getLength() - 3, path.getLength() - 3);
        }
    }
}
