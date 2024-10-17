package com.fenquan.demo.controller;

import com.fenquan.demo.entity.SoftTime;
import com.fenquan.demo.entity.UserInfo;
import com.fenquan.demo.service.ISoftTimeService;
import com.fenquan.demo.service.IUserInfoService;
import com.fenquan.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Slf4j
@RestController
@RequestMapping("/user")
public class UserInfoController{

    @Autowired
    IUserInfoService iUserInfoService;

    @Autowired
    ISoftTimeService iSoftTimeService;

    //登录页面公司下拉查询
    @RequestMapping("/get_select_List")
    public ResultInfo queryList() {
        try {
            List<UserInfo> select_list = iUserInfoService.get_select_List();
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    //查询人员下拉列表
    @RequestMapping("/get_renyuan_List")
    public ResultInfo get_renyuan_List(HttpSession session) {
        try {
            String token = SessionUtil.getToken(session);
            String[] token_list = token.split(",");
            token_list = token_list[1].split("\"");
            String login_company = token_list[3];
            List<UserInfo> select_list = iUserInfoService.get_renyuan_List(login_company);
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    //登录
    @RequestMapping("/login")
    public ResultInfo login(HttpSession session, String username, String password, String company) {
        try {

            String endtime = "";
            String mark1 = "";
            String mark2 = "";
            String mark3 = "";
            String mark4 = "";
            //获取user
            SessionUtil.remove(session, "token");
            List<SoftTime> softTime = iSoftTimeService.getList(company);
            if (softTime.size() == 0) {
                return ResultInfo.error(-1, "工具到期，请联系我公司续费。");
            }else{
                if(softTime.get(0).getEndtime() != null){
                    endtime = softTime.get(0).getEndtime().trim();
                }
                if(softTime.get(0).getMark1() != null){
                    mark1 = softTime.get(0).getMark1().trim();
                }
                if(softTime.get(0).getMark2() != null){
                    mark2 = softTime.get(0).getMark2().trim();
                }
                if(softTime.get(0).getMark3() != null){
                    mark3 = softTime.get(0).getMark3().trim();
                    if(mark3 != ""){
                        mark3 = mark3.split(":")[1];
                        mark3 = mark3.replace("(","");
                        mark3 = mark3.replace(")","");
                    }
                }
                if(softTime.get(0).getMark4() != null){
                    mark4 = softTime.get(0).getMark4().trim();
                }
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                if(!mark1.equals("a8xd2s")){
                    if(endtime == ""){
                        return ResultInfo.error(-1, "工具到期，请联系我公司续费");
                    }
                    if(mark2 == ""){
                        return ResultInfo.error(-1, "服务器到期，请联系我公司续费");
                    }
                    Date enddate = sdf.parse(endtime);
                    Date fuwudate = sdf.parse(mark2);
                    Date now = new Date();
                    String this_time = sdf.format(now);
                    now = sdf.parse(this_time);
                    if(now.getTime() > enddate.getTime()){
                        return ResultInfo.error(-1, "工具到期，请联系我公司续费");
                    }
                    if(now.getTime() > fuwudate.getTime()){
                        return ResultInfo.error(-1, "服务器到期，请联系我公司续费");
                    }
                }
//
            }

            Map<String, Object> map = iUserInfoService.login(username, password, company);
            //为Null则查询不到
            if (StringUtils.isEmpty(map)) {
                SessionUtil.remove(session, "token");
                return ResultInfo.error(-1, "用户名密码错误或账号被锁定");
            } else {
                SessionUtil.setToken(session, map.get("token").toString());
                SessionUtil.setUserNum(session, StringUtils.cast(mark3));
                return ResultInfo.success("登陆成功", null);
            }
        } catch (Exception e) {
            log.error("登陆失败：{}", e.getMessage());
            log.error("参数：{}", username);
            log.error("参数：{}", password);
            return ResultInfo.error("错误!");
        }
    }

    /*
     *人员信息页面刷新
     * */
    @RequestMapping("/queryC")
    public ResultInfo queryC(HttpSession session){
        String token = SessionUtil.getToken(session);
        System.out.println(token);
        System.out.println("---------------------------------------------------");
        String[] token_list = token.split(",");
        //token_list = token_list[5].split("\"");
       // String login_company = token_list[3];
        String login_company = token_list[5].split("\"")[3];
        String power = token_list[4].split("\"")[3];
        System.out.println("Power: " + power);
// 获取username
        String username = token_list[2].split("\"")[3];
        System.out.println("Username: " + username);
        System.out.println("---------------------------------------------------");
        try {
            if (power.equals("管理员")) {
                List<UserInfo> queryC = iUserInfoService.queryC(login_company);
                return ResultInfo.success("查询成功!",queryC);
            }else{
                List<UserInfo> queryC = iUserInfoService.queryC1(login_company,username);
                return ResultInfo.success("查询成功!",queryC);
            }
        }catch (Exception e){
            log.error("查询失败：{}",e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
    @RequestMapping("/queryC3")
    public ResultInfo queryC3(HttpSession session){
        String token = SessionUtil.getToken(session);
        System.out.println(token);
        System.out.println("---------------------------------------------------");
        String[] token_list = token.split(",");
        //token_list = token_list[5].split("\"");
        // String login_company = token_list[3];
        String login_company = token_list[5].split("\"")[3];
        String power = token_list[4].split("\"")[3];
        System.out.println("Power: " + power);
// 获取username
        String username = token_list[2].split("\"")[3];
        System.out.println("Username: " + username);
        System.out.println("---------------------------------------------------");
        try {

                List<UserInfo> queryC = iUserInfoService.queryC1(login_company,username);
                return ResultInfo.success("查询成功!",queryC);

        }catch (Exception e){
            log.error("查询失败：{}",e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
    /*
     *人员信息页面条件查询
     * */
    @RequestMapping("/queryC_Inquire")
    public ResultInfo queryC_Inquire(HttpSession session,String query){
        String token = SessionUtil.getToken(session);
        String[] token_list = token.split(",");
//        token_list = token_list[5].split("\"");
//        String login_company = token_list[3];
        String login_company = token_list[5].split("\"")[3];
        String power = token_list[4].split("\"")[3];
        System.out.println("Power: " + power);
// 获取username
        String username = token_list[2].split("\"")[3];
        System.out.println("Username: " + username);
        System.out.println("---------------------------------------------------");
        try {
            if(power.equals("管理员")) {
                List<UserInfo> queryC_Inquire = iUserInfoService.queryC_Inquire(login_company, query);
                return ResultInfo.success("查询成功!", queryC_Inquire);
            }else{
                return ResultInfo.error("非管理员只能查看自己!");
            }
        }catch (Exception e){
            log.error("查询失败：{}",e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /*
     *添加
     * */
    @RequestMapping("/add")
    public ResultInfo add(String name,String username,String password,String power,HttpSession session){
        String token = SessionUtil.getToken(session);
        String[] token_list = token.split(",");
        token_list = token_list[5].split("\"");
        String login_company = token_list[3];

        String userNum = SessionUtil.getUserNum(session);
        if(userNum != ""){
            int num = Integer.parseInt(userNum);
            List<UserInfo> NumList = iUserInfoService.getUserNum(login_company);
            int thisNum = NumList.get(0).getId();
            if(thisNum >= num){
                return ResultInfo.error("已有账号数量过多，请删除无用账号后再试", null);
            }
        }

        UserInfo iuser = new UserInfo();
        try{
            iuser.setName(name);
            iuser.setUsername(username);
            iuser.setPassword(password);
            iuser.setPower(power);
            iuser.setCompany(login_company);
            iuser = iUserInfoService.add(iuser);
            if (StringUtils.isNotNull(iuser)) {
                return ResultInfo.success("添加成功", iuser);
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
        UserInfo userInfo = null;
        try{
            userInfo = DecodeUtil.decodeToJson(menuSettingsJson, UserInfo.class);
            if (iUserInfoService.update(userInfo)) {
                return ResultInfo.success("修改成功", userInfo);
            } else {
                return ResultInfo.success("修改失败", userInfo);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            return ResultInfo.error("修改失败");
        }
    }
    @RequestMapping(value = "/update1", method = RequestMethod.POST)
    public ResultInfo update1(int id,String name,String username,String password,
                              String power){

        try{
            System.out.println("-----------------------------------------");
            System.out.println(id);
            System.out.println(name);
            System.out.println(username);
            System.out.println(power);
            System.out.println(password);
            System.out.println("-----------------------------------------");
            if (iUserInfoService.update1(name,username,password,power,id)) {
                return ResultInfo.success("修改成功");
            } else {
                return ResultInfo.success("修改失败");
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
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session){
        try{
            GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
            List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
            if (iUserInfoService.delete(idList)) {
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
