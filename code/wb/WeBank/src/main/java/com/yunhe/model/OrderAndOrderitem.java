package com.yunhe.model;

import com.yunhe.entity.Orderheader;
import com.yunhe.entity.Orderitem;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class OrderAndOrderitem extends Orderheader {


    private Integer userId;


    private String orderitem;
}
