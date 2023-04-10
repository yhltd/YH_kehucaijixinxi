package com.yunhe.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yunhe.entity.Title;
import com.yunhe.entity.User;
import com.yunhe.exception.SystemException;
import com.yunhe.mapper.TitleMapper;
import com.yunhe.model.TitleOrderKey;
import com.yunhe.result.Result;
import com.yunhe.service.TitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/title")
public class TitltController {

    @Autowired
    TitleService titleService;
    @Autowired
    TitleMapper titleMapper;

    /**
     * 查所有题
     * @param
     * @return
     */
    @GetMapping("/info")
    @Transactional
    public Result gettitleInfo() {

        List<Title> title = titleMapper.selecttitle();

        List<TitleOrderKey> titleOrderKey = new ArrayList<>();
        for (int i = 0; i < title.size(); i++) {
            TitleOrderKey titleOrderKey1 = new TitleOrderKey();

            titleOrderKey1.setTitlePen(title.get(i).getTitlePen());
            titleOrderKey1.setTitleId(title.get(i).getTitleId());
            titleOrderKey1.setTitleAnswer(title.get(i).getTitleAnswer());
            titleOrderKey1.setTitleRemarks(title.get(i).getTitleRemarks());
            titleOrderKey1.setTitleCensus(title.get(i).getTitleCensus());
            titleOrderKey1.setOrderKey(title.get(i).getTitleAnswer());
            titleOrderKey.add(titleOrderKey1);
        }

        return Result.success(titleOrderKey);
    }
    /**
     * 删除题
     * @param
     * @return
     */
    @PostMapping("/dele")
    @Transactional
    public Result deletitledele( String titlePen) {

        return Result.success(titleMapper.deletitle(titlePen));
    }
    /**
     *添加
     * @param
     * @return
     */
    @PostMapping("/pos")
    @Transactional
    public Result posttitlepos( Title title) {

        //创建入库对象
        Title title2 = new Title();

        if(title.getTitlePen().equals(null)){
            throw new SystemException("出的题不能为空");
        }
        //答案为空
        if(title.getTitleAnswer().equals(null) || "" == title.getTitleAnswer()){
            title2.setTitlePen(title.getTitlePen());
            title2.setTitleAnswer("");
            if (title.getTitleRemarks().equals(null) ||  "" == title.getTitleRemarks()){
                title2.setTitleRemarks("");
            }else{
                title2.setTitleRemarks(title.getTitleRemarks());
            }
            title2.setTitleCensus(title.getTitleCensus());

        }else{
            title2.setTitlePen(title.getTitlePen());
            title2.setTitleAnswer(title.getTitleAnswer());
            if (title.getTitleRemarks().equals(null) ||  "" == title.getTitleRemarks()){
                title2.setTitleRemarks("");
            }else{
                title2.setTitleRemarks(title.getTitleRemarks());
            }
            title2.setTitleCensus(title.getTitleCensus());
        }

        return Result.success( titleService.save(title2));
    }

}
