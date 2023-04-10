package com.yunhe.controller;

import com.alibaba.fastjson.JSONArray;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yunhe.entity.Orderheader;
import com.yunhe.entity.Orderitem;
import com.yunhe.exception.SystemException;
import com.yunhe.mapper.OrderheaderMapper;
import com.yunhe.model.OrderAndOrderitem;
import com.yunhe.result.Result;
import com.yunhe.service.OrderheaderService;
import com.yunhe.service.OrderitemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderOrderitemController {

    @Autowired
    OrderheaderService orderheaderService;

    @Autowired
    OrderitemService orderitemService;

    @Autowired
    OrderheaderMapper orderheaderMapper;

    /**
     *添加订单头订单体
     * @param
     * @return
     */
    @PostMapping("/pos")
    @Transactional
    public Result postorderpos( OrderAndOrderitem orderAndOrderitem) {

        System.out.println(orderAndOrderitem);
        //将接收到的字符串转换为json数组
        JSONArray jsonArray =
                JSONArray.parseArray(orderAndOrderitem.getOrderitem());

        //将json数组转换为list集合
        List<Orderitem> orderitem =
                jsonArray.toJavaList(Orderitem.class);

        if(orderAndOrderitem.getUserId() == null){
            throw new SystemException("用户id不能为空");
        }
        //创建入库对象
        Orderheader order1 = new Orderheader();
        order1.setOrderUserId(orderAndOrderitem.getUserId());
        LocalDateTime localDateTime = LocalDateTime.now();
        order1.setOrderTime(localDateTime);
        //添加到数据库
//        Boolean bl = orderMapper.boolinsert(order.getOrderTime(),order.getOrderUserId());
        Boolean bl = orderheaderService.save(order1);


        if (bl){
            //订单头添加完毕添加订单体

            //创建入库订单体list集合
            List<Orderitem> orderitemList = new ArrayList<>();

            List<Orderitem> orderitemListOrderitem = orderitem;

             List<Orderheader> orderheaders = orderheaderMapper.odhd();

            for (int j = 0; j < orderitemListOrderitem.size() ; j++) {

                Orderitem orderitemm = new Orderitem();
                orderitemm.setOrderHaderId(orderheaders.get(orderheaders.size()-1).getOrderId());
                orderitemm.setOrderTitle(orderitemListOrderitem.get(j).getOrderTitle());
                orderitemm.setOrderKey(orderitemListOrderitem.get(j).getOrderKey());

                //添加到入库list中
                orderitemList.add(orderitemm);
            }

            boolean bool = orderitemService.saveBatch(orderitemList);
            if (!bool){
                return Result.success(false);
            }
        }


        return Result.success(true);
    }

    /**
     *查询订单头
     * @param
     * @return
     */
    @GetMapping("/gett")
    @Transactional
    public Result getordergett(Integer orderUserId) {

        if (orderUserId == null){
            throw new SystemException("用户id不能为空");
        }

        QueryWrapper queryWrapper = new QueryWrapper();

         queryWrapper.eq("order_user_id", orderUserId);

         //查询订单头数据
        return Result.success(orderheaderService.list(queryWrapper));
    }
    /**
     *查询订单体
     * @param
     * @return
     */
    @GetMapping("/geet")
    @Transactional
    public Result getordergeet(String orderTime) {

        if (orderTime == null){
            throw new SystemException("时间不能为空");
        }
        QueryWrapper queryWrapper = new QueryWrapper();

        //根据时间查那一条的orderId
        queryWrapper.eq("order_time",orderTime);

        List<Orderheader> orderheader = orderheaderService.list(queryWrapper);

        //判断没查到报错
        if (orderheader.size() != 1){
            return Result.success("错误");
        }

        Integer orderHaderId = orderheader.get(0).getOrderId();

        QueryWrapper queryWrapper2 = new QueryWrapper();

        queryWrapper2.eq("order_hader_id", orderHaderId);

        return Result.success(orderitemService.list(queryWrapper2));
    }
}
