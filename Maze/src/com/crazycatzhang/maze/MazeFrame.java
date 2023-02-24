package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;

public class MazeFrame extends JFrame {
    public MazeFrame() throws HeadlessException {
        this.setTitle("Maze");
        this.setSize(720, 770);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        this.setVisible(true);
    }
}
