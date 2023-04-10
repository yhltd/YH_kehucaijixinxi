package com.yunhe.service.impl;

import com.yunhe.entity.Orderitem;

import com.yunhe.mapper.OrderitemMapper;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yunhe.service.OrderitemService;

import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author guihai.yu
 * @since 2023-03-07 10:10:53
 */
@Service
public class OrderitemServiceImpl  extends ServiceImpl<OrderitemMapper, Orderitem> implements OrderitemService {

}
