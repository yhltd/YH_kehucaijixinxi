package com.fenquan.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("form_shouji")
public class FormShouJi {

    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 提交日期
     */
    private String insertDate;

    /**
     * 表单收集内容
     */
    private String insertText;

    /**
     * 表单ID
     */
    private int formId;
}
