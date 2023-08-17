package com.fenquan.demo.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.FormShouJi;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
@DS("druid")
public interface FormShouJiMapper extends BaseMapper<FormShouJi> {
    @Select("select * from form_shouji where form_id = #{id}")
    List<FormShouJi> getList(String company,int id);
}
