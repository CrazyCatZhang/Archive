package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;

public class MazePanel extends JPanel {

    private final int ROWS = 72;
    private final int COLS = 70;
    private final int LENGTH = 10;
    private MazeBlock[][] blocks = null;

    public MazePanel() {
        this.setLayout(null);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        creatBlocks(g);
    }

    private Font createFont() {
        return new Font("微软雅黑", Font.BOLD, 18);
    }

    public void creatBlocks(Graphics g) {
        blocks = new MazeBlock[ROWS][COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                blocks[i][j] = new MazeBlock(i, j, LENGTH, this);
                blocks[i][j].drawBlock(g);
            }
        }
    }
}
