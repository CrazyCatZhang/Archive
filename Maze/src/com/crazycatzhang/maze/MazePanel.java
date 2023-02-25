package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Stack;

public class MazePanel extends JPanel {

    public final int ROWS = 72;
    public final int COLS = 70;
    private final int LENGTH = 10;
    public MazeBlock[][] blocks = null;

    public MazePanel() {
        this.setLayout(null);
        creatBlocks();
        try {
            generateMaze();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        drawBlocks(g);
    }

    private Font createFont() {
        return new Font("微软雅黑", Font.BOLD, 18);
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

    public void generateMaze() throws NoSuchAlgorithmException {
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
}
