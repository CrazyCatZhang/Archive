package com.crazycatzhang.encapsulation;

import javax.swing.*;
import java.awt.*;

public class PictureView extends JPanel {
    private Image image;
    private Color backgroundColor;

    public void setBackgroundColor(Color color) {
        this.backgroundColor = color;
        this.repaint();
    }

    public void setImage(Image image) {
        this.image = image;
        this.repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        int width = this.getWidth();
        int height = this.getHeight();

        if (backgroundColor != null) {
            g.setColor(backgroundColor);
            g.fillRect(0, 0, width, height);
        }

        if (image != null) {
            int imageWidth = image.getWidth(null);
            int imageHeight = image.getHeight(null);

            int fitWidth = width;
            int fitHeight = width * imageHeight / imageWidth;
            if (fitHeight > height) {
                fitHeight = height;
                fitWidth = height * imageWidth / imageHeight;
            }

            int fitX = (width - fitWidth) / 2;
            int fitY = (height - fitHeight) / 2;

            g.drawImage(image, fitX, fitY, fitWidth, fitHeight, null);
        }
    }
}
