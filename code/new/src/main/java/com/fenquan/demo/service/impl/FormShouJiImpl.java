package com.fenquan.demo.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.FormShouJi;
import com.fenquan.demo.mapper.FormCreateMapper;
import com.fenquan.demo.mapper.FormShouJiMapper;
import com.fenquan.demo.service.IFormCreateService;
import com.fenquan.demo.service.IFormShouJiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormShouJiImpl extends ServiceImpl<FormShouJiMapper, FormShouJi> implements IFormShouJiService {

    @Autowired
    FormShouJiMapper formShouJiMapper;

    @Override
    public List<FormShouJi> getList(String company,int id) {
        return formShouJiMapper.getList(company,id);
    }

    @Override
    public FormShouJi add(FormShouJi formShouJi) {return this.save(formShouJi) ? formShouJi : null;}

    @Override
    public boolean update(FormShouJi formShouJi) {
        return this.updateById(formShouJi);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
