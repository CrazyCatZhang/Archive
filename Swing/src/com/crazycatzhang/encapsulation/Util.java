package com.crazycatzhang.encapsulation;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class Util {
    public static void snapshot(Component component, File file) throws IOException {
        int width = component.getWidth();
        int height = component.getHeight();
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);

        Graphics graphics = bufferedImage.getGraphics();
        component.paint(graphics);

        ImageIO.write(bufferedImage, "JPEG", file);
    }
}
