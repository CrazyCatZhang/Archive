package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class xorQuestion {

    /*
        有一个int数组
        1. 数组中一种数出现了奇数次，其他数出现了偶数次，求这个数
        2. 数组中两种数出现了奇数次，其他数出现了偶数次，求这两种数
     */

    public static void main(String[] args) {
        process(new int[]{1, 1, 1, 1, 2, 2, 3, 3, 3});
        process1(new int[]{1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4});
    }

    public static void process(int[] arr) {
        int xor = 0;
        for (int i :
                arr) {
            xor ^= i;
        }
        System.out.println(xor);
    }

    public static void process1(int[] arr) {
        int xor = 0;
        for (int i :
                arr) {
            xor ^= i;
        }

        int rightOne = xor & (~xor + 1);
        int onlyOne = 0;
        for (int i :
                arr) {
            if ((i & rightOne) == 0) {
                onlyOne ^= i;
            }
        }
        System.out.println(onlyOne + " " + (xor ^ onlyOne));
    }
}
