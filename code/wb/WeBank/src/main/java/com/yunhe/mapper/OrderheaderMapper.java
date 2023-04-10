package com.yunhe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yunhe.entity.Orderheader;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author guihai.yu
 * @since 2023-03-07 10:22:45
 */
@Repository
@Mapper
public interface OrderheaderMapper extends BaseMapper<Orderheader> {

    @Insert("insert into orderheader (order_time,order_user_id) value (#(orderTime),#(orderUserId))")
    boolean boolinsert(@Param("orderTime") LocalDateTime orderTime,
                       @Param("orderUserId") Integer orderUserId);

    @Select("select * from orderheader ;")
    List<Orderheader> odhd();


}
