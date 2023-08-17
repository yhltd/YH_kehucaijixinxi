package com.fenquan.demo.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.mapper.FormCreateMapper;
import com.fenquan.demo.service.IFormCreateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormCreateImpl extends ServiceImpl<FormCreateMapper, FormCreate> implements IFormCreateService {

    @Autowired
    FormCreateMapper formCreateMapper;

    @Override
    public List<FormCreate> getList(String company) {
        return formCreateMapper.getList(company);
    }

    @Override
    public List<FormCreate> queryList(String company,String query) {
        return formCreateMapper.queryList(company,query);
    }

    @Override
    public List<FormCreate> getListByName(String company,String create) {
        return formCreateMapper.getListByName(company,create);
    }

    @Override
    public List<FormCreate> queryListByName(String company,String create,String query) {
        return formCreateMapper.queryListByName(company,create,query);
    }

    @Override
    public List<FormCreate> queryListById(int id) {
        return formCreateMapper.queryListById(id);
    }

    @Override
    public FormCreate add(FormCreate formCreate) {return this.save(formCreate) ? formCreate : null;}

    @Override
    public boolean update(FormCreate formCreate) {
        return this.updateById(formCreate);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
