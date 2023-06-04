package com.catzhang.web;

import com.catzhang.pojo.Shop;
import com.catzhang.services.ShopService;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
@WebServlet("/showList")
public class ShopListServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        //创建service对象
        ShopService service = new ShopService();
        //调用服务
        List<Shop> shops = service.selectAll();
        //转发
        System.out.println(11111111);
        req.setAttribute("goodss",shops);
        req.getRequestDispatcher("/shoplist.jsp").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
