package com.fenquan.demo.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fenquan.demo.entity.SoftTime;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
@DS("softtime")
public interface SoftTimeMapper extends BaseMapper<SoftTime> {

    @Select("select * from control_soft_time where name = #{company} and soft_name = '采集'")
    List<SoftTime> getList(String company);

}
