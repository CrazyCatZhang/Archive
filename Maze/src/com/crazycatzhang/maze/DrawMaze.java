package com.crazycatzhang.maze;

import javax.swing.*;

public class DrawMaze {
    public DrawMaze() {
        JFrame mazeFrame = new MazeFrame();

        MazePanel root = new MazePanel();
        mazeFrame.setContentPane(root);

    }
}
