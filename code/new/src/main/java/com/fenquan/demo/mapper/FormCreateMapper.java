package com.fenquan.demo.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
@DS("druid")
public interface FormCreateMapper extends BaseMapper<FormCreate> {
    @Select("select id,form_name,form_type,insert_date,create_name,form_state,company,update_date from form_create where company = #{company}")
    List<FormCreate> getList(String company);

    @Select("select id,form_name,form_type,insert_date,create_name,form_state,company,update_date from form_create from form_create where company = #{company} and form_name like '%' + #{query} + '%'")
    List<FormCreate> queryList(String company,String query);

    @Select("select id,form_name,form_type,insert_date,create_name,form_state,company,update_date from form_create from form_create where company = #{company} and create_name = #{create}")
    List<FormCreate> getListByName(String company,String create);

    @Select("select id,form_name,form_type,insert_date,create_name,form_state,company,update_date from form_create from form_create where company = #{company} and create_name = #{create} and form_name like '%' + #{query} + '%'")
    List<FormCreate> queryListByName(String company,String create,String query);

    @Select("select * from form_create where id = #{id}")
    List<FormCreate> queryListById(int id);

}
