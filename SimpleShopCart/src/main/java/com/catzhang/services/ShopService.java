package com.catzhang.services;

import com.catzhang.mapper.ShopMapper;
import com.catzhang.pojo.Shop;
import com.catzhang.utils.SqlSessionFactoryUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class ShopService {
    SqlSessionFactory factory = SqlSessionFactoryUtils.getSqlSessionFactory();

    public List<Shop> selectAll() {
        SqlSession sqlSession = factory.openSession();
        ShopMapper mapper = sqlSession.getMapper(ShopMapper.class);
        List<Shop> shops = mapper.selectAll();
        sqlSession.close();
        return shops;
    }

    public Shop selectByGoodsName(String name) {
        SqlSession sqlSession = factory.openSession();
        ShopMapper mapper = sqlSession.getMapper(ShopMapper.class);
        Shop shop = mapper.selectByGoodsName(name);
        sqlSession.close();
        return shop;
    }

    public void updateGoodsCount(String name) {
        SqlSession sqlSession = factory.openSession();
        ShopMapper mapper = sqlSession.getMapper(ShopMapper.class);
        Shop shop = mapper.selectByGoodsName(name);
        shop.setGoodsCount(shop.getGoodsCount() - 1);
        int count = mapper.updateGoodsCount(shop);
        sqlSession.commit();
        sqlSession.close();
    }
}
