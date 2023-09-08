package com.crazycatzhang;

/**
 * @author crazycatzhang
 */
public class MergeSort {

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 5, 2, 6, 4, 7};
        mergeSort(arr);
        for (int i :
                arr) {
            System.out.print(i + " ");
        }
    }

    public static void mergeSort(int[] arr) {
        if (arr.length <= 2) {
            return;
        }
        process(arr, 0, arr.length - 1);
    }

    public static void process(int[] arr, int L, int R) {
        if (L == R) {
            return;
        }
        int mid = L + ((R - L) >> 1);
        process(arr, L, mid);
        process(arr, mid + 1, R);
        merge(arr, L, mid, R);
    }

    public static void merge(int[] arr, int L, int M, int R) {
        int[] help = new int[R - L + 1];
        int i = 0;
        int p1 = L;
        int p2 = M + 1;
        while (p1 <= M && p2 <= R) {
            help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
        }
        while (p1 <= M) {
            help[i++] = arr[p1++];
        }
        while (p2 <= R) {
            help[i++] = arr[p2++];
        }
        for (int j = 0; j < help.length; j++) {
            arr[L + j] = help[j];
        }
    }
}
