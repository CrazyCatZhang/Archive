package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class RadixSort {

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 5, 2, 6, 4, 7};
        radixSort(arr);
        for (int i :
                arr) {
            System.out.print(i + " ");
        }
    }

    public static void radixSort(int[] arr) {
        if (arr.length < 2) {
            return;
        }
        radixSort(arr, 0, arr.length - 1, maxBits(arr));
    }

    public static int maxBits(int[] arr) {
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            max = Math.max(max, arr[i]);
        }
        int res = 0;
        while (max != 0) {
            res++;
            max /= 10;
        }
        return res;
    }

    public static void radixSort(int[] arr, int L, int R, int digit) {
        final int radix = 10;
        int i, j;
        int[] buckets = new int[R - L + 1];
        for (int d = 1; d <= digit; d++) {
            int[] count = new int[radix];
            for (i = L; i <= R; i++) {
                j = getDigits(arr[i], d);
                count[j]++;
            }
            for (i = 1; i < radix; i++) {
                count[i] = count[i] + count[i - 1];
            }
            for (i = R; i >= L; i--) {
                j = getDigits(arr[i], d);
                buckets[--count[j]] = arr[i];
            }
            for (i = L, j = 0; i <= R; i++, j++) {
                arr[i] = buckets[j];
            }
        }
    }

    public static int getDigits(int x, int d) {
        return ((x / (int) Math.pow(10, d - 1)) % 10);
    }
}
