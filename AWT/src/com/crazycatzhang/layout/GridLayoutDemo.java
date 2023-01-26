package com.crazycatzhang.layout;

import java.awt.*;

public class GridLayoutDemo {
    public static void main(String[] args) {
        Frame frame = new Frame("Calculator");
        Panel panel = new Panel();
        panel.add(new TextField(45));
        frame.add(panel, BorderLayout.NORTH);
        Panel panel1 = new Panel();
        panel1.setLayout(new GridLayout(3, 5, 4, 4));
        for (int i = 0; i < 10; i++) {
            panel1.add(new Button(i + ""));
        }
        panel1.add(new Button("+"));
        panel1.add(new Button("-"));
        panel1.add(new Button("*"));
        panel1.add(new Button("/"));
        panel1.add(new Button("."));
        frame.add(panel1);

        frame.pack();
        frame.setVisible(true);
    }
}
