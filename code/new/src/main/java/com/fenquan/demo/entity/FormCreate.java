package com.fenquan.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("form_create")
public class FormCreate {

    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 表单名称
     */
    private String formName;

    /**
     * 表单内容(用于信息采集和预览)
     */
    private String formBody;

    /**
     * 表单类型
     */
    private String formType;

    /**
     * 创建时间
     */
    private String insertDate;

    /**
     * 最后修改时间
     */
    private String updateDate;

    /**
     * 创建人
     */
    private String createName;

    /**
     * 表单状态
     */
    private String formState;

    /**
     * 公司
     */
    private String company;

    /**
     * 表单内容(用于修改)
     */
    private String bodyUpd;


}
