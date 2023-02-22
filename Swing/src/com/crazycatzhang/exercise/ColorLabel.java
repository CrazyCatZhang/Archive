package com.crazycatzhang.exercise;

import javax.swing.*;
import java.awt.*;

public class ColorLabel {
    public static void main(String[] args) {
        JFrame frame = new MyFrame("ColorLabel");
        frame.setSize(420, 470);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

class MyFrame extends JFrame {
    public MyFrame(String title) throws HeadlessException {
        super(title);

        JPanel root = new JPanel();
        this.setContentPane(root);

        JLabel label1 = new MyColorLabel("1", Color.YELLOW);
        JLabel label2 = new MyColorLabel("2", Color.LIGHT_GRAY);
        JLabel label3 = new MyColorLabel("3", Color.GREEN);
        JLabel label4 = new MyColorLabel("4", Color.CYAN);

        root.add(label1);
        root.add(label2);
        root.add(label3);
        root.add(label4);
    }

    private static class MyColorLabel extends JLabel {
        public MyColorLabel(String text, Color color) throws HeadlessException {
            this.setText(text);
            this.setOpaque(true);
            this.setBackground(color);
            this.setHorizontalAlignment(SwingConstants.CENTER);
            this.setPreferredSize(new Dimension(60, 30));
        }
    }
}
