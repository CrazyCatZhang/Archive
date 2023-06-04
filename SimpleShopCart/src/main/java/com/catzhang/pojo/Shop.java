package com.catzhang.pojo;

public class Shop {
    private String goodsName;
    private Integer goodsCount;

    public Shop(String goodsName, Integer goodsCount) {
        this.goodsName = goodsName;
        this.goodsCount = goodsCount;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public Integer getGoodsCount() {
        return goodsCount;
    }

    public void setGoodsCount(Integer goodsCount) {
        this.goodsCount = goodsCount;
    }

    @Override
    public String toString() {
        return "ShoppingCart{" +
                "goodsName='" + goodsName + '\'' +
                ", goodsCount=" + goodsCount +
                '}';
    }
}
