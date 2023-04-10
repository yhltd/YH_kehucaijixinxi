package com.yunhe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yunhe.entity.Orderitem;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author guihai.yu
 * @since 2023-03-07 10:10:53
 */
@Repository
@Mapper
public interface OrderitemMapper  extends BaseMapper<Orderitem> {

}
