package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 5, 2, 6, 4, 7};
        bubbleSort(arr);
        for (int i :
                arr) {
            System.out.print(i + " ");
        }
    }

    public static void bubbleSort(int[] arr) {
        if (arr.length <= 2) {
            return;
        }

        for (int i = arr.length - 1; i > 0; i--) {
            for (int j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }

    public static void swap(int[] arr, int i, int j) {
        arr[i] = arr[i] ^ arr[j];
        arr[j] = arr[j] ^ arr[i];
        arr[i] = arr[j] ^ arr[i];
    }
}
