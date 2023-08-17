package com.fenquan.demo.service;

import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IFormCreateService {

    /**
     * 管理员查询表单列表
     */
    List<FormCreate> getList(String company);

    /**
     * 管理员查询表单列表
     */
    List<FormCreate> queryList(String company,String query);

    /**
     * 普通用户查询表单列表
     */
    List<FormCreate> getListByName(String company,String name);

    /**
     * 普通用户查询表单列表
     */
    List<FormCreate> queryListByName(String company,String name,String query);

    /**
     * 填报页面根据id查询
     */
    List<FormCreate> queryListById(int id);

    /**
     * 添加表单
     */
    FormCreate add(FormCreate formCreate);

    /**
     * 修改表单基础信息
     */
    boolean update(FormCreate formCreate);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

}
