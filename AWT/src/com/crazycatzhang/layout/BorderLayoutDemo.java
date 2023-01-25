package com.crazycatzhang.layout;

import java.awt.*;

public class BorderLayoutDemo {
    public static void main(String[] args) {
        Frame frame = new Frame("BorderLayoutDemo");
        frame.add(new Button("North Button"), BorderLayout.NORTH);
        frame.add(new Button("South Button"), BorderLayout.SOUTH);
        frame.add(new Button("East Button"), BorderLayout.EAST);
        frame.add(new Button("West Button"), BorderLayout.WEST);
        frame.add(new Button("Center Button"), BorderLayout.CENTER);

        frame.pack();
        frame.setVisible(true);
    }
}
