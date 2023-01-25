package com.crazycatzhang.container;

import java.awt.*;

public class PanelDemo {
    public static void main(String[] args) {
        Frame frame = new Frame("Frame");
        Panel panel = new Panel();
        panel.add(new TextField("TextField"));
        panel.add(new Button("Button"));
        frame.add(panel);
        frame.setBounds(100, 100, 500, 300);
        frame.setVisible(true);
    }
}
