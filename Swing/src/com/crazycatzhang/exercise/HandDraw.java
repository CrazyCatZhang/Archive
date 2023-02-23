package com.crazycatzhang.exercise;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

public class HandDraw {
    public static void main(String[] args) {
        HandFrame frame = new HandFrame("HandDraw");
        frame.setSize(520, 570);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

class HandFrame extends JFrame {
    public HandFrame(String title) throws HeadlessException {
        super(title);

        HandController handController = new HandController();
        this.setContentPane(handController);
    }
}

class HandController extends JPanel {

    private boolean pressed = false;
    private final List<Curve> curveList = new ArrayList<>();

    public HandController() {
        MyMouseListener myMouseListener = new MyMouseListener();
        this.addMouseListener(myMouseListener);
        this.addMouseMotionListener(myMouseListener);
    }

    private class MyMouseListener extends MouseAdapter {
        @Override
        public void mousePressed(MouseEvent e) {
            Curve curve = new Curve();
            curveList.add(curve);
            curve.points.add(e.getPoint());
            pressed = true;
        }

        @Override
        public void mouseReleased(MouseEvent e) {
            pressed = false;
        }

        @Override
        public void mouseDragged(MouseEvent e) {
            if (pressed) {
                Curve curve = curveList.get(curveList.size() - 1);
                curve.points.add(e.getPoint());
                repaint();
            }
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        int width = this.getWidth();
        int height = this.getHeight();

        g.setColor(new Color(0xfffff0));
        g.fillRect(0, 0, width, height);

        g.setColor(new Color(0x555555));
        g.drawRect(0, 0, width - 1, height - 1);

        curveList.forEach(curve -> {
            List<Point> points = curve.points;
            if (points.size() >= 2) {
                Point point1 = points.get(0);
                for (int i = 1; i < points.size(); i++) {
                    Point point2 = points.get(i);
                    g.drawLine(point1.x, point1.y, point2.x, point2.y);
                    point1 = point2;
                }
            }
        });
    }

    public static class Curve {
        public final List<Point> points = new ArrayList<>();
    }
}