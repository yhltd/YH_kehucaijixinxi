package com.fenquan.demo.service.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fenquan.demo.entity.PushNews;
import com.fenquan.demo.mapper.PushNewsMapper;
import com.fenquan.demo.service.PushNewsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PushNewImpl extends ServiceImpl<PushNewsMapper, PushNews> implements PushNewsService {

    @Override
    @DS("db3")
    public List<PushNews> getList(String companyName) {
        // 将companyName参数传递给mapper
        return baseMapper.getList(companyName);
    }

    @Override
    @DS("db3")
    public List<PushNews> getLogin(String companyName) {
        // 使用父类提供的 getBaseMapper() 方法获取 mapper
        return baseMapper.getLogin(companyName);
    }
}
