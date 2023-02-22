package com.crazycatzhang.exercise;

import javax.swing.*;
import java.awt.*;

public class SinCurve {
    public static void main(String[] args) {
        JFrame frame = new SinFrame("SinCurve");
        frame.setSize(420, 470);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

class SinFrame extends JFrame {
    public SinFrame(String title) throws HeadlessException {
        super(title);

        JPanel panel = new JPanel();
        this.setContentPane(panel);

        SinControl sinControl = new SinControl();
        sinControl.setPreferredSize(new Dimension(420,470));
        panel.add(sinControl);
    }
}

class SinControl extends JPanel {

    public int radius = 50;
    public int period = 100;

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        int width = this.getWidth();
        int height = this.getHeight();

        g.setColor(Color.white);
        g.fillRect(0, 0, width, height);

        int center = height / 2;
        g.setColor(Color.blue);
        g.drawLine(0, center, width, center);

        int x1 = 0;
        int y1 = 0;
        for (int i = 0; i < width; i++) {
            double angle = 2 * Math.PI * i / period;
            int y2 = (int) (radius * Math.sin(angle));

            g.drawLine(x1, center + y1, i, center + y2);

            x1 = i;
            y1 = y2;
        }
    }
}
