package com.fenquan.demo.controller;

import com.fenquan.demo.entity.PushNews;
import com.fenquan.demo.entity.UserInfo;
import com.fenquan.demo.service.PushNewsService;

import com.fenquan.demo.util.ResultInfo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/psuhnews")
public class PushNewsController {

    @Autowired
    PushNewsService pushNewsService;

    @RequestMapping("/getnews")
    public ResultInfo getnews(HttpSession session) {
        try {
            String companyName = (String) session.getAttribute("companyName");
            log.info("从session获取的companyName: {}", companyName);
            if (companyName != null && !companyName.isEmpty()) {
                // 将companyName传递给service方法
                List<PushNews> select_list = pushNewsService.getList(companyName);
                return ResultInfo.success("获取成功", select_list);
            } else {
                log.error("公司名称为空");
                return ResultInfo.error("公司名称为空!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

}
