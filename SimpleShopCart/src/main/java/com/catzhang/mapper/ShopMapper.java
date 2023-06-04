package com.catzhang.mapper;

import com.catzhang.pojo.Shop;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface ShopMapper {

    @Select("select * from tb_shop")
    List<Shop> selectAll();

    @Select("select * from tb_shop where goodsName = #{goodsName}")
    Shop selectByGoodsName(String goodsName);

    @Update("update tb_shop set goodsCount = #{goodsCount} where goodsName = #{goodsName}")
    int updateGoodsCount(Shop shop);
}
