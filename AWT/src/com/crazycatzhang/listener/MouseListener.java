package com.crazycatzhang.listener;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class MouseListener {
    public static void main(String[] args) {
        new MyFrame("Draw");
    }
}

class MyFrame extends Frame {

    ArrayList<Point> points;

    public MyFrame(String name) {
        super(name);
        setBounds(200, 200, 400, 300);
        points = new ArrayList<>();
        this.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                MyFrame frame = (MyFrame) e.getSource();
                frame.addPaint(e.getPoint());
                frame.repaint();
            }
        });

        setVisible(true);
    }

    @Override
    public void paint(Graphics g) {
        for (Point p : points) {
            g.setColor(Color.RED);
            g.fillOval(p.x, p.y, 10, 10);
        }
    }

    public void addPaint(Point point) {
        points.add(point);
    }
}