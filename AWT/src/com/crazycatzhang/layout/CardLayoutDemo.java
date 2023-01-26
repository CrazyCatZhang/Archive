package com.crazycatzhang.layout;

import java.awt.*;
import java.awt.event.ActionListener;

public class CardLayoutDemo {
    public static void main(String[] args) {
        Frame frame = new Frame("CardLayoutDemo");
        Panel panel = new Panel();
        CardLayout cardLayout = new CardLayout();
        panel.setLayout(cardLayout);
        String[] names = {"One", "Two", "Three", "Four", "Five"};
        for (String name : names) {
            panel.add(name, new Button(name));
        }
        frame.add(panel);

        Panel panel1 = new Panel();
        Button b1 = new Button("上一张");
        Button b2 = new Button("下一张");
        Button b3 = new Button("第一张");
        Button b4 = new Button("最后一张");
        Button b5 = new Button("第三张");
        ActionListener actionListener = e -> {
            String actionCommand = e.getActionCommand();
            switch (actionCommand) {
                case "上一张" -> cardLayout.previous(panel);
                case "下一张" -> cardLayout.next(panel);
                case "第一张" -> cardLayout.first(panel);
                case "最后一张" -> cardLayout.last(panel);
                case "第三张" -> cardLayout.show(panel, "Three");
            }
        };
        b1.addActionListener(actionListener);
        b2.addActionListener(actionListener);
        b3.addActionListener(actionListener);
        b4.addActionListener(actionListener);
        b5.addActionListener(actionListener);
        panel1.add(b1);
        panel1.add(b2);
        panel1.add(b3);
        panel1.add(b4);
        panel1.add(b5);
        frame.add(panel1, BorderLayout.SOUTH);

        frame.pack();
        frame.setVisible(true);
    }
}
