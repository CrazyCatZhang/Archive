package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class InsertionSort {

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 5, 2, 6, 4, 7};
        insertionSort(arr);
        for (int i :
                arr) {
            System.out.print(i + " ");
        }
    }

    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            for (int j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
                swap(arr, j, j + 1);
            }
        }
    }

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
