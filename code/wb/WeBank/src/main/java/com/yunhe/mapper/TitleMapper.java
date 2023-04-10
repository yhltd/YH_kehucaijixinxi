package com.yunhe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yunhe.entity.Title;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TitleMapper  extends BaseMapper<Title> {

    @Select("select * from title;")
    List<Title> selecttitle();

    @Delete("delete  from title where title_pen = #{titlePen};")
    Boolean deletitle(String titlePen);



}
