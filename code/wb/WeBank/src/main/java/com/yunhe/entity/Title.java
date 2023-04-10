package com.yunhe.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Title {

    /**
     * 题
     */
    @TableId(value = "title_id", type = IdType.AUTO)
    private Integer titleId;

    /**
     * 出的题
     */
    private String titlePen;

    /**
     * 答案
     */
    private String titleAnswer;

    /**
     * 备注
     */
    private String titleRemarks;

    /**
     * 统计1,input; 2,单选
     */
    private String titleCensus;
}
