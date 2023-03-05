package com.crazycatzhang.maze;

import javax.swing.*;
import java.security.NoSuchAlgorithmException;

public class ControlPanel extends JPanel {
    public MazePanel panel;
    public JButton restart = new JButton("Restart");
    public JButton dfsMaze = new JButton("DFS Maze");
    public JButton primMaze = new JButton("Prim Maze");
    public JButton clear = new JButton("Clear");
    public JButton dfs = new JButton("DFS");
    public JButton bfs = new JButton("BFS");
    public JButton aStar = new JButton("AStar");

    public ControlPanel(MazePanel panel) {
        this.setBounds(10, 715, 700, 35);
        this.panel = panel;
        this.add(restart);
        this.add(dfsMaze);
        this.add(primMaze);
        this.add(clear);
        this.add(dfs);
        this.add(bfs);
        this.add(aStar);
        addEventListener();
    }

    public void addEventListener() {
        restart.addActionListener(e -> {
            panel.restart();
        });

        dfsMaze.addActionListener(e -> {
            try {
                panel.generateMazeByDFS();
            } catch (NoSuchAlgorithmException ex) {
                throw new RuntimeException(ex);
            }
        });

        primMaze.addActionListener(e -> {
            try {
                panel.generateMazeByPrim();
            } catch (NoSuchAlgorithmException ex) {
                throw new RuntimeException(ex);
            }
        });

        clear.addActionListener(e -> {
            panel.clear();
        });

        dfs.addActionListener(e -> {
            panel.createPathWithDFS();
        });

        bfs.addActionListener(e -> {
            panel.createPathWithBFS();
        });

        aStar.addActionListener(e -> {
            panel.createPathWithAStar();
        });
    }
}
