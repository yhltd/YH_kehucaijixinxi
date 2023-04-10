package com.yunhe.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class User {

    /**
     * 员工信息id
     */
    @TableId(value = "user_id", type = IdType.AUTO)
    private Integer userId;

    /**
     * 员工姓名
     */
    private String userName;

    /**
     * 登录账号
     */
    private String account;

    /**
     * 登录密码
     */
    private String password;



    /**
     *
     *权限
     */
    private Integer limits;

}
