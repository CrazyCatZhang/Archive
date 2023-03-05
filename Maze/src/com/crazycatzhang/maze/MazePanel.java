package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class MazePanel extends JPanel {

    public final int ROWS = 70;
    public final int COLS = 70;
    private final int LENGTH = 10;
    public MazeBlock[][] blocks = null;
    public static MazeMouse start = null;
    public static MazeMouse end = null;
    public Path path = null;

    public MazePanel() {
        this.setLayout(null);
        this.setFocusable(true);
        creatBlocks();
        createMazeMouse();
        this.addKeyListener(new MyKeyListener());
        this.add(new ControlPanel(this));
    }

    private static class MyKeyListener extends KeyAdapter {
        @Override
        public void keyPressed(KeyEvent e) {
            super.keyPressed(e);

            int keyCode = e.getKeyCode();
            switch (keyCode) {
                case KeyEvent.VK_UP -> {
                    if (start != null) {
                        start.move(0);
                    }
                }
                case KeyEvent.VK_RIGHT -> {
                    if (start != null) {
                        start.move(1);
                    }
                }
                case KeyEvent.VK_DOWN -> {
                    if (start != null) {
                        start.move(2);
                    }
                }
                case KeyEvent.VK_LEFT -> {
                    if (start != null) {
                        start.move(3);
                    }
                }
            }
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        drawBlocks(g);
        drawMazeMouse(g);
        drawPaths(g);
    }

    public void creatBlocks() {
        blocks = new MazeBlock[ROWS][COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                blocks[i][j] = new MazeBlock(i, j, LENGTH, this);
            }
        }
    }

    public void drawBlocks(Graphics g) {
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                blocks[i][j].drawBlock(g);
            }
        }
    }

    public void createMazeMouse() {
        start = new MazeMouse(0, 0, LENGTH, "start", this);
        end = new MazeMouse(ROWS - 1, COLS - 1, LENGTH, "end", this);
    }

    public void drawMazeMouse(Graphics g) {
        start.draw(g);
        end.draw(g);
    }


    public void drawPaths(Graphics g) {
        if (path != null) {
            path.drawPath(g);
        }
    }

    public void generateMazeByDFS() throws NoSuchAlgorithmException {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        Stack<MazeBlock> stack = new Stack<>();
        MazeBlock currentBlock = blocks[0][0];
        currentBlock.setVisited(true);
        int notVisitedBlockCount = ROWS * COLS - 1;
        List<MazeBlock> neighbors;
        MazeBlock nextBlock;
        while (notVisitedBlockCount > 0) {
            neighbors = currentBlock.getAllNeighbors();
            if (neighbors.size() > 0) {
                nextBlock = neighbors.get(random.nextInt(neighbors.size()));
                stack.push(currentBlock);
                removeWall(currentBlock, nextBlock);
                nextBlock.setVisited(true);
                notVisitedBlockCount--;
                currentBlock = nextBlock;
            } else if (!stack.isEmpty()) {
                MazeBlock cell = stack.pop();
                currentBlock = cell;
            }
        }
        repaint();
    }

    public void generateMazeByPrim() throws NoSuchAlgorithmException {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        MazeBlock currentBlock = blocks[0][0];
        currentBlock.setVisited(true);
        List<MazeBlock> neighbors = currentBlock.getAllNeighbors();
        LinkedList<MazeBlock> wayPoints = new LinkedList<>(neighbors);
        while (!wayPoints.isEmpty()) {
            MazeBlock wayPoint = wayPoints.get(random.nextInt(wayPoints.size()));
            List<MazeBlock> neighborsWithVisited = wayPoint.getAllNeighborsWithVisited();
            List<MazeBlock> neighborsWithoutVisited = wayPoint.getAllNeighbors();
            MazeBlock nextPoint = neighborsWithVisited.get(random.nextInt(neighborsWithVisited.size()));
            wayPoint.setVisited(true);
            removeWall(wayPoint, nextPoint);
            for (MazeBlock mazeBlock : neighborsWithoutVisited) {
                if (!wayPoints.contains(mazeBlock)) {
                    wayPoints.add(mazeBlock);
                }
            }
            wayPoints.remove(wayPoint);
        }
        repaint();
    }

    public void removeWall(MazeBlock currentBlock, MazeBlock nextBlock) {
        if (currentBlock.getI() == nextBlock.getI()) {
            if (currentBlock.getJ() > nextBlock.getJ()) {
                currentBlock.walls[3] = false;
                nextBlock.walls[1] = false;
            } else {
                currentBlock.walls[1] = false;
                nextBlock.walls[3] = false;
            }
        } else if (currentBlock.getJ() == nextBlock.getJ()) {
            if (currentBlock.getI() > nextBlock.getI()) {
                currentBlock.walls[0] = false;
                nextBlock.walls[2] = false;
            } else {
                currentBlock.walls[2] = false;
                nextBlock.walls[0] = false;
            }
        }
    }

    public void clear() {
        path.paths.clear();
        repaint();
    }

    public void createPathWithDFS() {
        path = new Path(this);
        path.dfs(0, 0, 1);
        repaint();
    }

    public void createPathWithBFS() {
        path = new Path(this);
        path.bfs();
        repaint();
    }

    public void createPathWithAStar() {
        path = new Path(this);
        path.A_Search();
        repaint();
    }

    public void restart() {
        MazeBlock block;
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                block = blocks[i][j];
                if (block != null) {
                    block.setVisited(false);
                    block.walls[0] = true;
                    block.walls[1] = true;
                    block.walls[2] = true;
                    block.walls[3] = true;
                }
            }
        }
        start.setI(0);
        start.setJ(0);
        repaint();
    }
}
