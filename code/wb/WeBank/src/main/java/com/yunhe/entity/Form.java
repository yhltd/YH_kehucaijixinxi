package com.yunhe.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

/**
 * @author hui
 * @date 2023/5/15 19:59
 */
@Data
@TableName("tb_form")
public class Form {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer userId;

    private String html;

    private String url;

    private Integer version;

    private String erweima;

    private Date addtime;
}
