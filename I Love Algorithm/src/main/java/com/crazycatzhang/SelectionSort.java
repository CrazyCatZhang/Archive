package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class SelectionSort {
    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 5, 2, 6, 4, 7};
        selectionSort(arr);
        for (int i :
                arr) {
            System.out.print(i + " ");
        }
    }

    public static void selectionSort(int[] arr) {
        if (arr.length <= 2) {
            return;
        }
        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < arr.length; j++) {
                minIndex = arr[j] < arr[minIndex] ? j : minIndex;
            }
            swap(arr, i, minIndex);
        }
    }

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
