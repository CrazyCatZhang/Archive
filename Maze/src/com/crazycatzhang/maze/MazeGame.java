package com.crazycatzhang.maze;

import javax.swing.*;

public class MazeGame {
    public MazeGame() {
        JFrame mazeFrame = new MazeFrame("Maze");
        mazeFrame.setSize(720, 780);
        mazeFrame.setLocationRelativeTo(null);
        mazeFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        mazeFrame.setVisible(true);
    }
}
