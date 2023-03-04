package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;

public class ControlPanel extends JPanel {
    public MazePanel panel;

    public ControlPanel(MazePanel panel) {
        this.setBounds(10, 715, 700, 35);
        this.setBackground(Color.LIGHT_GRAY);
        this.panel = panel;
    }
}
