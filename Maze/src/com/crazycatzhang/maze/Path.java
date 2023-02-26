package com.crazycatzhang.maze;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Path {
    public List<MazeBlock> paths = null;
    public MazePanel panel = null;
    Stack<MazeBlock> stack = new Stack<>();
    public int shortestPathCount = Integer.MAX_VALUE;
    public MazeBlock[][] blocks;

    public Path(MazePanel panel) {
        this.panel = panel;
        this.paths = new ArrayList<>();
        this.blocks = panel.blocks;
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

        if (i == panel.ROWS - 1 && j == panel.COLS - 1) {
            if (step < shortestPathCount) {
                paths.clear();
                shortestPathCount = step;
                paths.addAll(stack);
            }
            return;
        }
        //Right
        if (isNotHasWall(current, 1) && !blocks[i][j + 1].isVisited()) {
            stack.push(blocks[i][j + 1]);
            blocks[i][j + 1].setVisited(true);
            dfs(i, j + 1, step + 1);
            blocks[i][j + 1].setVisited(false);
            stack.pop();
        }
        //Bottom
        if (isNotHasWall(current, 2) && !blocks[i + 1][j].isVisited()) {
            stack.push(blocks[i + 1][j]);
            blocks[i + 1][j].setVisited(true);
            dfs(i + 1, j, step + 1);
            blocks[i + 1][j].setVisited(false);
            stack.pop();
        }
        //Left
        if (isNotHasWall(current, 3) && !blocks[i][j - 1].isVisited()) {
            stack.push(blocks[i][j - 1]);
            blocks[i][j - 1].setVisited(true);
            dfs(i, j - 1, step + 1);
            blocks[i][j - 1].setVisited(false);
            stack.pop();
        }
        //Top
        if (isNotHasWall(current, 0) && !blocks[i - 1][j].isVisited()) {
            stack.push(blocks[i - 1][j]);
            blocks[i - 1][j].setVisited(true);
            dfs(i - 1, j, step + 1);
            blocks[i - 1][j].setVisited(false);
            stack.pop();
        }
    }

    public void bfs() {

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
