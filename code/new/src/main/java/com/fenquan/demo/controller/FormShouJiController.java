package com.fenquan.demo.controller;

import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.FormShouJi;
import com.fenquan.demo.service.IFormCreateService;
import com.fenquan.demo.service.IFormShouJiService;
import com.fenquan.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/formShouJi")
public class FormShouJiController {

    @Autowired
    IFormShouJiService iFormShouJiService;

    //管理员获取全部表单
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session,int id) {
        try {
            String token = SessionUtil.getToken(session);
            String[] token_list = token.split(",");
            String[] powerArr = token_list[4].split("\"");
            String[] nameArr = token_list[1].split("\"");
            token_list = token_list[5].split("\"");
            String login_company = token_list[3];
            String power = powerArr[3];
            String name = nameArr[3];
            List<FormShouJi> select_list = null;
            select_list = iFormShouJiService.getList(login_company,id);
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /*
     *添加
     * */
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody String menuSettingsJson,HttpSession session){
        FormShouJi formShouJi = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String formattedDate = formatter.format(date);
        try{
            formShouJi = DecodeUtil.decodeToJson(menuSettingsJson, FormShouJi.class);
            formShouJi.setInsertDate(formattedDate);
            formShouJi = iFormShouJiService.add(formShouJi);
            if (StringUtils.isNotNull(formShouJi)) {
                return ResultInfo.success("提交成功", formShouJi);
            } else {
                return ResultInfo.success("提交失败", null);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }


    /*
     *删除
     * */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session){
        try{
            GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
            List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
            if (iFormShouJiService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            return ResultInfo.error("删除失败");
        }
    }

}
