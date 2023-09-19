package com.fenquan.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fenquan.demo.entity.SoftTime;
import com.fenquan.demo.mapper.SoftTimeMapper;
import com.fenquan.demo.service.ISoftTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoftTimeImpl extends ServiceImpl<SoftTimeMapper, SoftTime> implements ISoftTimeService {

    @Autowired
    SoftTimeMapper softTimeMapper;

//    @Override
//    public List<SoftTime> getList(String company) {
//        return softTimeMapper.getList(company);
//    }

    @Override
    public List<SoftTime> getList(String company) {
        return softTimeMapper.getList(company);
    }

}
