package com.crazycatzhang;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Queue;

/**
 * @author crazycatzhang
 */
public class TreeMaxWidth {

    public static void main(String[] args) {
        int maxLevel = 10;
        int maxValue = 100;
        int testTimes = 1000000;
        for (int i = 0; i < testTimes; i++) {
            Node head = generateRandomBST(maxLevel, maxValue);
            if (maxWidthWithMap(head) != maxWidthNoMap(head)) {
                System.out.println("Oops!");
            }
        }
        System.out.println("finish!");
    }

    // for test
    public static Node generateRandomBST(int maxLevel, int maxValue) {
        return generate(1, maxLevel, maxValue);
    }

    // for test
    public static Node generate(int level, int maxLevel, int maxValue) {
        if (level > maxLevel || Math.random() < 0.5) {
            return null;
        }
        Node head = new Node((int) (Math.random() * maxValue));
        head.left = generate(level + 1, maxLevel, maxValue);
        head.right = generate(level + 1, maxLevel, maxValue);
        return head;
    }

    public static class Node {
        public int value;
        public Node left;
        public Node right;

        public Node(int data) {
            this.value = data;
        }
    }

    public static int maxWidthWithMap(Node head) {
        if (head == null) {
            return 0;
        }
        Queue<Node> queue = new LinkedList<>();
        queue.add(head);
        HashMap<Node, Integer> levelMap = new HashMap<>();
        levelMap.put(head, 1);
        int currentLevel = 1;
        int currentLevelNodes = 0;
        int max = 0;
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            int currentNodeLevel = levelMap.get(current);
            if (current.left != null) {
                levelMap.put(current.left, currentNodeLevel + 1);
                queue.add(current.left);
            }
            if (current.right != null) {
                levelMap.put(current.right, currentNodeLevel + 1);
                queue.add(current.right);
            }
            if (currentNodeLevel == currentLevel) {
                currentLevelNodes++;
            } else {
                max = Math.max(max, currentLevelNodes);
                currentLevel++;
                currentLevelNodes = 1;
            }
        }
        return Math.max(max, currentLevelNodes);
    }

    public static int maxWidthNoMap(Node head) {
        if (head == null) {
            return 0;
        }
        Queue<Node> queue = new LinkedList<>();
        queue.add(head);
        Node currentEnd = head;
        Node nextEnd = null;
        int max = 0;
        int currentLevelNodes = 0;
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            if (current.left != null) {
                queue.add(current.left);
                nextEnd = current.left;
            }
            if (current.right != null) {
                queue.add(current.right);
                nextEnd = current.right;
            }
            currentLevelNodes++;
            if (current == currentEnd) {
                max = Math.max(max, currentLevelNodes);
                currentLevelNodes = 0;
                currentEnd = nextEnd;
            }
        }
        return max;
    }
}
