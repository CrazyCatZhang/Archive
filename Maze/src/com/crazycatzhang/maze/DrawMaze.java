package com.crazycatzhang.maze;

import javax.swing.*;

public class DrawMaze {
    public DrawMaze() {
        JFrame mazeFrame = new MazeFrame("Maze");
        mazeFrame.setSize(720, 780);
        mazeFrame.setLocationRelativeTo(null);
        mazeFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        mazeFrame.setVisible(true);
    }
}
