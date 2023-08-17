package com.fenquan.demo.service;

import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.FormShouJi;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IFormShouJiService {

    /**
     * 管理员查询表单列表
     */
    List<FormShouJi> getList(String company, int id);

    /**
     * 添加表单
     */
    FormShouJi add(FormShouJi formShouJi);

    /**
     * 修改表单基础信息
     */
    boolean update(FormShouJi formShouJi);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

}
