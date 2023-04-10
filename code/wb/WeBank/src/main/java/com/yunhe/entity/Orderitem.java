package com.yunhe.entity;

import com.baomidou.mybatisplus.annotation.IdType;

import com.baomidou.mybatisplus.annotation.TableId;

import lombok.Data;
import lombok.EqualsAndHashCode;

import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author guihai.yu
 * @since 2023-03-07 10:10:53
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Orderitem {

    /**
     * 订单尾id
     */
    @TableId(value = "order_item_id", type = IdType.AUTO)
    private Integer orderItemId;

    /**
     * 关联订单头
     */

    private Integer orderHaderId;

    /**
     * 题
     */

    private String orderTitle;

    /**
     * 答案
     */

    private String orderKey;


}
