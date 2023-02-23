package com.crazycatzhang.encapsulation;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.InputStream;

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

    public void setImage(File file) {
        try {
            this.image = ImageIO.read(file);
            this.repaint();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setImage(String resourcePath) {
        try {
            InputStream res = this.getClass().getResourceAsStream(resourcePath);
            assert res != null;
            this.image = ImageIO.read(res);
            this.repaint();
        } catch (Exception e) {
            e.printStackTrace();
        }
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
