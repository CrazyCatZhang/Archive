package com.crazycatzhang.component;

import javax.swing.*;
import java.awt.*;

public class DialogDemo {
    public static void main(String[] args) {
        Frame frame = new Frame();
        Dialog dialog = new Dialog(frame, "Dialog", true);
        Box verticalBox = Box.createVerticalBox();
        verticalBox.add(new TextField(20));
        verticalBox.add(new Button("OK"));
        dialog.add(verticalBox);
        dialog.setBounds(20, 30, 300, 200);

        Button openDialog = new Button("Open Dialog");
        openDialog.addActionListener(e -> dialog.setVisible(true));

        frame.add(openDialog, BorderLayout.SOUTH);

        frame.pack();
        frame.setVisible(true);
    }
}
