package com.crazycatzhang.maze;

import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MazeBlock {
    private final MazePanel panel;

    //offset for the Controller
    private final int offset = 10;
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

    public int gCost = 0;
    public int hCost = 0;
    public int FCost = 0;

    boolean[] walls = new boolean[4];

    private boolean visited = false;

    public MazeBlock connection = null;

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

        this.hCost = heuristic();
    }

    public int heuristic() {
        int dx = Math.abs(panel.ROWS - 1 - i);
        int dy = Math.abs(panel.COLS - 1 - j);
        return dx + dy;
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

    public MazeBlock getNeighborByDirection(int direction, boolean isIgnore) {
        MazeBlock neighbor;
        int neighborI = 0, neighborJ = 0;
        if (direction == 0) {
            neighborI = this.i - 1;
            neighborJ = this.j;
        } else if (direction == 1) {
            neighborI = this.i;
            neighborJ = this.j + 1;
        } else if (direction == 2) {
            neighborI = this.i + 1;
            neighborJ = this.j;
        } else if (direction == 3) {
            neighborI = this.i;
            neighborJ = this.j - 1;
        }

        MazeBlock[][] blocks = panel.blocks;

        if (neighborI < 0 || neighborJ < 0 || neighborI >= panel.ROWS || neighborJ >= panel.COLS) {
            neighbor = null;
        } else {
            neighbor = blocks[neighborI][neighborJ];
            if (neighbor.visited && !isIgnore) {
                neighbor = null;
            }
        }

        return neighbor;
    }

    public List<MazeBlock> getAllNeighbors() {
        List<MazeBlock> neighbors = new ArrayList<>();
        MazeBlock topNeighbor = this.getNeighborByDirection(0, false);
        MazeBlock rightNeighbor = this.getNeighborByDirection(1, false);
        MazeBlock bottomNeighbor = this.getNeighborByDirection(2, false);
        MazeBlock leftNeighbor = this.getNeighborByDirection(3, false);

        if (topNeighbor != null) {
            neighbors.add(topNeighbor);
        }
        if (rightNeighbor != null) {
            neighbors.add(rightNeighbor);
        }
        if (bottomNeighbor != null) {
            neighbors.add(bottomNeighbor);
        }
        if (leftNeighbor != null) {
            neighbors.add(leftNeighbor);
        }

        return neighbors;
    }

    public List<MazeBlock> getAllNeighborsWithoutWalls() {
        List<MazeBlock> neighbors = new ArrayList<>();
        MazeBlock topNeighbor = this.getNeighborByDirection(0, false);
        MazeBlock rightNeighbor = this.getNeighborByDirection(1, false);
        MazeBlock bottomNeighbor = this.getNeighborByDirection(2, false);
        MazeBlock leftNeighbor = this.getNeighborByDirection(3, false);

        if (topNeighbor != null && !this.walls[0]) {
            neighbors.add(topNeighbor);
        }
        if (rightNeighbor != null && !this.walls[1]) {
            neighbors.add(rightNeighbor);
        }
        if (bottomNeighbor != null && !this.walls[2]) {
            neighbors.add(bottomNeighbor);
        }
        if (leftNeighbor != null && !this.walls[3]) {
            neighbors.add(leftNeighbor);
        }

        return neighbors;
    }

    public List<MazeBlock> getAllNeighborsWithVisited() {
        List<MazeBlock> neighbors = new ArrayList<>();
        MazeBlock topNeighbor = this.getNeighborByDirection(0, true);
        MazeBlock rightNeighbor = this.getNeighborByDirection(1, true);
        MazeBlock bottomNeighbor = this.getNeighborByDirection(2, true);
        MazeBlock leftNeighbor = this.getNeighborByDirection(3, true);

        if (topNeighbor != null && topNeighbor.isVisited()) {
            neighbors.add(topNeighbor);
        }
        if (rightNeighbor != null && rightNeighbor.isVisited()) {
            neighbors.add(rightNeighbor);
        }
        if (bottomNeighbor != null && bottomNeighbor.isVisited()) {
            neighbors.add(bottomNeighbor);
        }
        if (leftNeighbor != null && leftNeighbor.isVisited()) {
            neighbors.add(leftNeighbor);
        }
        return neighbors;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public boolean isVisited() {
        return visited;
    }

    public int getI() {
        return i;
    }

    public int getJ() {
        return j;
    }

    public int getLength() {
        return length;
    }

    public int getX1() {
        return x1;
    }

    public int getY1() {
        return y1;
    }

    public int getFCost() {
        return gCost + hCost;
    }

    public void setFCost(int fCost) {
        this.FCost = fCost;
    }

    public void setGCost(int gCost) {
        this.gCost = gCost;
    }

    public int getGCost() {
        return gCost;
    }

    public MazeBlock getConnection() {
        return connection;
    }

    public void setConnection(MazeBlock connection) {
        this.connection = connection;
    }
}
