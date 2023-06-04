package com.crazycatzhang.maze;

import java.awt.*;

/**
 * @author crazycatzhang
 */
public class MazeMouse {
    private int i = 0;
    private int j = 0;
    private int x = 0;
    private int y = 0;
    private int length = 0;
    private int offset = 10;
    private String type = "";
    private MazePanel panel = null;

    public MazeMouse(int i, int j, int length, String type, MazePanel panel) {
        this.i = i;
        this.j = j;
        this.length = length;
        this.type = type;
        this.panel = panel;
    }

    public void init() {
        this.x = offset + j * length + 2;
        this.y = offset + i * length + 2;
    }

    public void draw(Graphics g) {
        init();
        if ("start".equals(type)) {
            g.setColor(Color.ORANGE);
        } else {
            g.setColor(Color.BLUE);
        }
        g.fillOval(x, y, length - 3, length - 3);
    }

    public void move(int direction) {
        MazeBlock currentBlock = panel.blocks[i][j];
        boolean wall = currentBlock.walls[direction];
        if (!wall) {
            MazeBlock nextBlock = currentBlock.getNeighborByDirection(direction, true);
            if (nextBlock != null) {
                i = nextBlock.getI();
                j = nextBlock.getJ();
                panel.repaint();
                if (i == MazePanel.end.i && j == MazePanel.end.j) {
                    System.out.println("You Are Win");
                }
            }
        }
    }

    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
    }

    public int getJ() {
        return j;
    }

    public void setJ(int j) {
        this.j = j;
    }
}
