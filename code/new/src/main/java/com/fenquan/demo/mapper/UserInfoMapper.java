package com.fenquan.demo.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
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
public interface UserInfoMapper extends BaseMapper<UserInfo> {
    @Select("select company from userInfo GROUP BY company")
    List<UserInfo> get_select_List();

    @Select("select name from userInfo where company=#{company} GROUP BY name")
    List<UserInfo> get_renyuan_List(String company);

    @Select("select * from userInfo where  company=#{company} ")
    List<UserInfo> queryC(String company);

    @Select("select * from userInfo where company=#{company} and name like '%'+#{query}+'%'")
    List<UserInfo> queryC_Inquire(String company ,String query);

    @Insert("insert into userInfo(name,username,password,power,company) values(#{name},#{username},#{password},#{power},#{company})")
    List<UserInfo> add(String name, String username, String password,String power, String company);

    @Delete("delete from userInfo where id =#{id}")
    boolean delete(int id);
}
