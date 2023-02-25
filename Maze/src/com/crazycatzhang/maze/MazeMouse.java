package com.crazycatzhang.maze;

import java.awt.*;

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
        init();
    }

    public void init() {
        this.x = offset + j * length + 2;
        this.y = offset + i * length + 2;
    }

    public void draw(Graphics g) {
        if ("start".equals(type)) {
            g.setColor(Color.ORANGE);
        } else {
            g.setColor(Color.BLUE);
        }
        g.fillOval(x, y, length - 3, length - 3);
    }


}
