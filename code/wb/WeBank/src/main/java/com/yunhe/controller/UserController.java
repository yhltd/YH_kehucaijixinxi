package com.yunhe.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yunhe.entity.Title;
import com.yunhe.entity.User;
import com.yunhe.exception.SystemException;
import com.yunhe.result.Result;
import com.yunhe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;


    /**
     * 登录验证
     * @param user 用户信息
     * @return
     */
    @GetMapping("/info")
    @Transactional
    public Result getUserInfo( User user) {

        /*验证账号，密码是否为空*/
        if (0 == user.getAccount().length() || 0 == user.getPassword().length()) {
            return Result.success("账号或密码为空");
        }

        //构建动态检索条件
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        List<User> list1 = new ArrayList<>();

        //将账号，密码作为查询条件
        queryWrapper.eq("account", user.getAccount()).eq("password", user.getPassword());
        list1 = userService.list(queryWrapper);

        /*判断是否查询到数据*/
        if ( list1.size()<1) {
            return Result.success(false);
        }

        return Result.success(list1.get(0));
    }


    /**
     *添加
     * @param
     * @return
     */
    @PostMapping("/pos")
    @Transactional
    public Result posttitlepos( User user2) {
        System.out.println(user2);
        if(null == user2.getUserName()){
            throw new SystemException("姓名不能为空");
        }

        if(null == user2.getAccount()){
            throw new SystemException("账号不能为空");
        }

        if(null == user2.getPassword()){
            throw new SystemException("密码不能为空");
        }

        if(null == user2.getLimits()){
            throw new SystemException("权限不能为空");
        }

        User user1 = new User();
        user1.setUserName(user2.getUserName());
        user1.setAccount(user2.getAccount());
        user1.setPassword(user2.getPassword());
        user1.setLimits(user2.getLimits());
        Boolean b = userService.save(user1);
        return Result.success(b);
    }
    }