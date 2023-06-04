package com.crazycatzhang.maze;

import javax.swing.*;
import java.awt.*;

/**
 * @author crazycatzhang
 */
public class MazeFrame extends JFrame {
    public MazeFrame(String title) throws HeadlessException {
        super(title);

        JPanel root = new MazePanel();
        this.setContentPane(root);
    }
}
