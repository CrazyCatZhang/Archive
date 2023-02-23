package com.crazycatzhang.exercise;

import com.crazycatzhang.encapsulation.PictureView;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;

public class MyPicture {
    public static void main(String[] args) throws IOException {
        JFrame frame = new PictureFrame("Picture");
        frame.setSize(520, 570);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

class PictureFrame extends JFrame {
    public PictureFrame(String title) throws HeadlessException, IOException {
        super(title);

        PictureView pictureView = new PictureView();
        this.setContentPane(pictureView);
        Image image = ImageIO.read(new File("data/WechatIMG4.jpeg"));
        pictureView.setImage(image);
    }
}

