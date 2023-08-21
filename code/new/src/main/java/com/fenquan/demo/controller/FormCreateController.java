package com.fenquan.demo.controller;

import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.UserInfo;
import com.fenquan.demo.service.IFormCreateService;
import com.fenquan.demo.service.IUserInfoService;
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
import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/formCreate")
public class FormCreateController {

    @Autowired
    IFormCreateService iFormCreateService;

    //管理员获取全部表单
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        try {
            String token = SessionUtil.getToken(session);
            String[] token_list = token.split(",");
            String[] powerArr = token_list[4].split("\"");
            String[] nameArr = token_list[1].split("\"");
            token_list = token_list[5].split("\"");
            String login_company = token_list[3];
            String power = powerArr[3];
            String name = nameArr[3];
            List<FormCreate> select_list = null;
            if(power.equals("管理员")){
                select_list = iFormCreateService.getList(login_company);
            }else{
                select_list = iFormCreateService.getListByName(login_company,name);
            }
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    //管理员表单查询
    @RequestMapping("/queryList")
    public ResultInfo queryList(HttpSession session,String query) {
        try {
            String token = SessionUtil.getToken(session);
            String[] token_list = token.split(",");
            String[] powerArr = token_list[4].split("\"");
            String[] nameArr = token_list[1].split("\"");
            token_list = token_list[5].split("\"");
            String login_company = token_list[3];
            String power = powerArr[3];
            String name = nameArr[3];
            List<FormCreate> select_list = null;
            if(power.equals("管理员")){
                select_list = iFormCreateService.queryList(login_company,query);
            }else{
                select_list = iFormCreateService.queryListByName(login_company,name,query);
            }
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    //表单填报页面根据id查询
    @RequestMapping("/queryListById")
    public ResultInfo queryListByName(HttpSession session,int id) {
        try {
            List<FormCreate> select_list = iFormCreateService.queryListById(id);
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
    public ResultInfo add(String formName,String formType,String formState,HttpSession session){
        String token = SessionUtil.getToken(session);
        String[] token_list = token.split(",");
        String[] nameArr = token_list[1].split("\"");
        token_list = token_list[5].split("\"");
        String login_company = token_list[3];
        String name = nameArr[3];
        FormCreate formCreate = new FormCreate();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String formattedDate = formatter.format(date);
        try{
            formCreate.setFormName(formName);
            formCreate.setFormBody("");
            formCreate.setFormType(formType);
            formCreate.setFormState(formState);
            formCreate.setInsertDate(formattedDate);
            formCreate.setUpdateDate("");
            formCreate.setBodyUpd("");
            formCreate.setCreateName(name);
            formCreate.setCompany(login_company);
            formCreate = iFormCreateService.add(formCreate);
            if (StringUtils.isNotNull(formCreate)) {
                return ResultInfo.success("添加成功", formCreate);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }


    /*
     *修改
     * */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String menuSettingsJson ,HttpSession session){
        FormCreate formCreate = null;
        try{
            formCreate = DecodeUtil.decodeToJson(menuSettingsJson, FormCreate.class);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();
            String formattedDate = formatter.format(date);
            formCreate.setUpdateDate(formattedDate);
            if (iFormCreateService.update(formCreate)) {
                return ResultInfo.success("修改成功", formCreate);
            } else {
                return ResultInfo.success("修改失败", formCreate);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            return ResultInfo.error("修改失败");
        }
    }

    /*
     *修改
     * */
    @RequestMapping(value = "/updateBody", method = RequestMethod.POST)
    public ResultInfo updateBody(String formBody,int id,String bodyUpd,HttpSession session){
        FormCreate formCreate = new FormCreate();
        try{
            formCreate.setFormBody(formBody);
            formCreate.setBodyUpd(bodyUpd);
            formCreate.setId(id);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();
            String formattedDate = formatter.format(date);
            formCreate.setUpdateDate(formattedDate);
            if (iFormCreateService.update(formCreate)) {
                return ResultInfo.success("修改成功", formCreate);
            } else {
                return ResultInfo.success("修改失败", formCreate);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            return ResultInfo.error("修改失败");
        }
    }


    /*
     *修改
     * */
    @RequestMapping(value = "/updateImg", method = RequestMethod.POST)
    public ResultInfo updateBody(@RequestBody String menuSettingsJson ,HttpSession session){
        FormCreate formCreate = null;
        try{
            formCreate = DecodeUtil.decodeToJson(menuSettingsJson, FormCreate.class);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();
            String formattedDate = formatter.format(date);
            formCreate.setUpdateDate(formattedDate);
            if (iFormCreateService.update(formCreate)) {
                return ResultInfo.success("修改成功", formCreate);
            } else {
                return ResultInfo.success("修改失败", formCreate);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            return ResultInfo.error("修改失败");
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
            if (iFormCreateService.delete(idList)) {
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
