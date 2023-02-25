package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;
import java.util.Arrays;

public class MazeBlock extends JPanel {
    private final MazePanel panel;

    //offset for the Controller
    private final int offset = 10;

    //Array Index
    private int i = 0;
    private int j = 0;

    //Block Width and Height
    private int length = 0;

    private int x1 = 0;
    private int y1 = 0;

    private int x2 = 0;
    private int y2 = 0;

    private int x3 = 0;
    private int y3 = 0;

    private int x4 = 0;
    private int y4 = 0;

    boolean[] walls = new boolean[4];

    public MazeBlock(int i, int j, int length, MazePanel panel) {
        this.i = i;
        this.j = j;
        this.length = length;
        this.panel = panel;
        this.init();
    }

    public void init() {

        //Top Left
        this.x1 = offset + j * length;
        this.y1 = offset + i * length;

        //Top Right
        this.x2 = offset + (j + 1) * length;
        this.y2 = offset + i * length;

        //Bottom Right
        this.x3 = offset + (j + 1) * length;
        this.y3 = offset + (i + 1) * length;

        //Bottom Left
        this.x4 = offset + j * length;
        this.y4 = offset + (i + 1) * length;

        //Four sides are set as walls
        Arrays.fill(walls, true);
    }

    public void drawBlock(Graphics g) {
        boolean top = walls[0];
        boolean right = walls[1];
        boolean bottom = walls[2];
        boolean left = walls[3];

        g.setColor(Color.BLACK);

        if (top) {
            g.drawLine(x1, y1, x2, y2);
        }
        if (right) {
            g.drawLine(x2, y2, x3, y3);
        }
        if (bottom) {
            g.drawLine(x3, y3, x4, y4);
        }
        if (left) {
            g.drawLine(x4, y4, x1, y1);
        }
    }


}
