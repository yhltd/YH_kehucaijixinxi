package com.fenquan.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fenquan.demo.entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IUserInfoService {
    /**
     * 查询公司下拉
     *
     * @return 信息集合
     */
    List<UserInfo> get_select_List();

    /**
     * 查询人员下拉
     *
     * @return 信息集合
     */
    List<UserInfo> get_renyuan_List(String company);


    /**
     * 登陆
     *
     * @param username 用户名
     * @param password  密码
     * @param company   公司
     * @return 转Json后的用户信息
     */
    Map<String,Object> login(String username, String password, String company);

    /**
     * 登录查询
     */
    List<UserInfo> queryC(String company);

    /**
     * 登录查询
     */
    List<UserInfo> queryC_Inquire(String company ,String query);

    /**
     * 添加baitaoquanxian_renyun表
     */
    UserInfo add(UserInfo userInfo);

    /**
     * 修改
     */
    boolean update(UserInfo userInfo);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);
}
