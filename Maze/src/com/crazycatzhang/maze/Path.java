package com.crazycatzhang.maze;

import java.awt.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class Path {
    public List<MazeBlock> paths;
    public MazePanel panel;
    Stack<MazeBlock> stack = new Stack<>();
    LinkedList<MazeBlock> queue = new LinkedList<>();
    public int shortestPathCount = Integer.MAX_VALUE;
    public MazeBlock[][] blocks;
    public MazeBlock[][] parentBlocks;

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
        MazeBlock current = blocks[0][0];
        queue.offer(current);
        int i, j;
        while (!queue.isEmpty()) {
            current = queue.poll();
            i = current.getI();
            j = current.getJ();
            if (i == panel.ROWS - 1 && j == panel.COLS - 1) {
                while (current.getI() != 0 || current.getJ() != 0) {
                    current = parentBlocks[current.getI()][current.getJ()];
                    paths.add(current);
                }
                return;
            } else {
                //Right
                if (isNotHasWall(current, 1) && !blocks[i][j + 1].isVisited()) {
                    queue.offer(blocks[i][j + 1]);
                    blocks[i][j + 1].setVisited(true);
                    parentBlocks[i][j + 1] = current;
                }
                //Bottom
                if (isNotHasWall(current, 2) && !blocks[i + 1][j].isVisited()) {
                    queue.offer(blocks[i + 1][j]);
                    blocks[i + 1][j].setVisited(true);
                    parentBlocks[i + 1][j] = current;
                }
                //Left
                if (isNotHasWall(current, 3) && !blocks[i][j - 1].isVisited()) {
                    queue.offer(blocks[i][j - 1]);
                    blocks[i][j - 1].setVisited(true);
                    parentBlocks[i][j - 1] = current;
                }
                //Top
                if (isNotHasWall(current, 0) && !blocks[i - 1][j].isVisited()) {
                    queue.offer(blocks[i - 1][j]);
                    blocks[i - 1][j].setVisited(true);
                    parentBlocks[i - 1][j] = current;
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
