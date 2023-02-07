package com.crazycatzhang.calculator;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class TestCalc {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}

class Calculator extends Frame {

    TextField num1, num2, num3;

    public void loadFrame() {
        num1 = new TextField(10);
        num2 = new TextField(10);
        num3 = new TextField(10);
        Label label = new Label("+");
        Button button = new Button("=");

        button.addActionListener(e -> {
            int n1 = Integer.parseInt(num1.getText());
            int n2 = Integer.parseInt(num2.getText());
            num3.setText("" + (n1 + n2));
            num1.setText("");
            num2.setText("");
        });

        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });

        setLayout(new FlowLayout());
        add(num1);
        add(label);
        add(num2);
        add(button);
        add(num3);

        pack();
        setVisible(true);
    }
}
