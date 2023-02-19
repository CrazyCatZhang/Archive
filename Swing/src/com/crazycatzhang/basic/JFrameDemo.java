package com.crazycatzhang.basic;

import javax.swing.*;

public class JFrameDemo {
    public static void main(String[] args) {
        new JFrameDemo().init();
    }

    public void init() {
        JFrame jFrame = new JFrame();
        jFrame.setBounds(100, 100, 200, 200);
        jFrame.setVisible(true);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
